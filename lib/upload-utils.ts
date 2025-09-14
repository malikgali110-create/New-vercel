// Browser-compatible crypto for MD5 hashing
const crypto = typeof window !== 'undefined' ? window.crypto : require('crypto');

export interface UploadChunk {
  index: number;
  start: number;
  end: number;
  size: number;
  data: Blob;
  etag?: string;
  uploaded?: boolean;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  totalSize: number;
  uploadedSize: number;
  chunks: UploadChunk[];
  uploadId?: string;
  status: 'pending' | 'uploading' | 'paused' | 'completed' | 'error';
  error?: string;
  rootCid?: string;
}

export interface CheckpointData {
  uploads: UploadProgress[];
  lastUpdated: number;
  collectionId: string;
}

export class UploadManager {
  private static readonly CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks
  private static readonly MAX_CONCURRENT = 3;
  private static readonly RETRY_ATTEMPTS = 3;
  private static readonly RETRY_DELAY = 1000;

  static createChunks(file: File): UploadChunk[] {
    const chunks: UploadChunk[] = [];
    const totalChunks = Math.ceil(file.size / this.CHUNK_SIZE);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.CHUNK_SIZE;
      const end = Math.min(start + this.CHUNK_SIZE, file.size);
      const chunkData = file.slice(start, end);

      chunks.push({
        index: i,
        start,
        end,
        size: end - start,
        data: chunkData,
        uploaded: false
      });
    }

    return chunks;
  }

  static async calculateMD5(chunk: Blob): Promise<string> {
    const buffer = await chunk.arrayBuffer();
    
    if (typeof window !== 'undefined') {
      // Browser environment - use Web Crypto API
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else {
      // Node.js environment
      const { createHash } = require('crypto');
      const hash = createHash('md5');
      hash.update(new Uint8Array(buffer));
      return hash.digest('hex');
    }
  }

  static saveCheckpoint(data: CheckpointData): void {
    try {
      localStorage.setItem('upload_checkpoint', JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save checkpoint:', error);
    }
  }

  static loadCheckpoint(): CheckpointData | null {
    try {
      const data = localStorage.getItem('upload_checkpoint');
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn('Failed to load checkpoint:', error);
      return null;
    }
  }

  static clearCheckpoint(): void {
    try {
      localStorage.removeItem('upload_checkpoint');
    } catch (error) {
      console.warn('Failed to clear checkpoint:', error);
    }
  }

  static async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async retryWithBackoff<T>(
    fn: () => Promise<T>,
    attempts: number = this.RETRY_ATTEMPTS,
    delay: number = this.RETRY_DELAY
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (attempts <= 1) {
        throw error;
      }
      
      await this.sleep(delay);
      return this.retryWithBackoff(fn, attempts - 1, delay * 2);
    }
  }
}

export class FilebaseS3Client {
  private endpoint: string;
  private bucket: string;
  private accessKey: string;
  private secretKey: string;

  constructor(config: {
    endpoint: string;
    bucket: string;
    accessKey: string;
    secretKey: string;
  }) {
    this.endpoint = config.endpoint;
    this.bucket = config.bucket;
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
  }

  async initiateMultipartUpload(key: string, contentType: string): Promise<string> {
    const url = `${this.endpoint}/${this.bucket}/${key}?uploads`;
    
    const response = await fetch('/api/s3/initiate-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        contentType,
        bucket: this.bucket
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to initiate upload: ${response.statusText}`);
    }

    const data = await response.json();
    return data.uploadId;
  }

  async uploadPart(
    key: string,
    uploadId: string,
    partNumber: number,
    data: Blob
  ): Promise<string> {
    const response = await fetch('/api/s3/upload-part', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        uploadId,
        partNumber,
        bucket: this.bucket,
        data: await this.blobToBase64(data)
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to upload part: ${response.statusText}`);
    }

    const result = await response.json();
    return result.etag;
  }

  async completeMultipartUpload(
    key: string,
    uploadId: string,
    parts: Array<{ partNumber: number; etag: string }>
  ): Promise<string> {
    const response = await fetch('/api/s3/complete-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        uploadId,
        parts,
        bucket: this.bucket
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to complete upload: ${response.statusText}`);
    }

    const data = await response.json();
    return data.location;
  }

  async abortMultipartUpload(key: string, uploadId: string): Promise<void> {
    await fetch('/api/s3/abort-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        uploadId,
        bucket: this.bucket
      })
    });
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:type;base64, prefix
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalFiles: number;
    mediaFiles: number;
    metadataFiles: number;
    collectionFile: boolean;
    duplicates: string[];
    orphanMedia: string[];
    orphanMetadata: string[];
  };
}

export class CollectionValidator {
  static async validateCollection(files: File[]): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];
    const duplicates: string[] = [];
    const orphanMedia: string[] = [];
    const orphanMetadata: string[] = [];
    
    let collectionFile = false;
    let mediaFiles = 0;
    let metadataFiles = 0;

    // Group files by type and name
    const mediaMap = new Map<string, File>();
    const metadataMap = new Map<string, File>();
    const fileNames = new Set<string>();

    for (const file of files) {
      // Check for duplicates
      if (fileNames.has(file.name)) {
        duplicates.push(file.name);
        continue;
      }
      fileNames.add(file.name);

      // Check file structure
      if (file.name === 'collection.json') {
        collectionFile = true;
        // Validate collection.json structure
        try {
          const content = await file.text();
          const data = JSON.parse(content);
          if (!data.name || !data.description) {
            errors.push('collection.json missing required fields (name, description)');
          }
        } catch (e) {
          errors.push('collection.json is not valid JSON');
        }
      } else if (file.name.startsWith('items/') && file.name.endsWith('.json')) {
        metadataFiles++;
        const tokenId = file.name.replace('items/', '').replace('.json', '');
        metadataMap.set(tokenId, file);
        
        // Validate metadata structure
        try {
          const content = await file.text();
          const metadata = JSON.parse(content);
          
          if (!metadata.name) {
            errors.push(`${file.name}: missing 'name' field`);
          }
          if (!metadata.image || !metadata.image.startsWith('ipfs://')) {
            errors.push(`${file.name}: 'image' must be ipfs:// URL`);
          }
          if (!metadata.attributes || !Array.isArray(metadata.attributes)) {
            errors.push(`${file.name}: missing or invalid 'attributes' array`);
          }
        } catch (e) {
          errors.push(`${file.name}: invalid JSON`);
        }
      } else if (file.name.startsWith('media/')) {
        mediaFiles++;
        const fileName = file.name.replace('media/', '');
        const tokenId = fileName.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
        mediaMap.set(tokenId, file);
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          errors.push(`${file.name}: unsupported file type`);
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          warnings.push(`${file.name}: large file size (${(file.size / 1024 / 1024).toFixed(1)}MB)`);
        }
      } else {
        warnings.push(`${file.name}: unexpected file location`);
      }
    }

    // Check for orphan files
    for (const [tokenId] of mediaMap) {
      if (!metadataMap.has(tokenId)) {
        orphanMedia.push(`media/${tokenId}.*`);
      }
    }

    for (const [tokenId] of metadataMap) {
      if (!mediaMap.has(tokenId)) {
        orphanMetadata.push(`items/${tokenId}.json`);
      }
    }

    // Required files check
    if (!collectionFile) {
      errors.push('Missing collection.json file');
    }
    if (metadataFiles === 0) {
      errors.push('No metadata files found in items/ folder');
    }
    if (mediaFiles === 0) {
      errors.push('No media files found in media/ folder');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      stats: {
        totalFiles: files.length,
        mediaFiles,
        metadataFiles,
        collectionFile,
        duplicates,
        orphanMedia,
        orphanMetadata
      }
    };
  }
}