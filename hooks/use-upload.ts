'use client';

import { useState, useCallback, useRef } from 'react';
import {
  UploadProgress,
  UploadManager,
  FilebaseS3Client,
  CheckpointData,
  CollectionValidator,
  ValidationResult
} from '@/lib/upload-utils';

export interface UseUploadOptions {
  onProgress?: (progress: UploadProgress[]) => void;
  onComplete?: (rootCid: string) => void;
  onError?: (error: string) => void;
  onValidation?: (result: ValidationResult) => void;
  maxConcurrent?: number;
}

export interface UploadState {
  uploads: UploadProgress[];
  isUploading: boolean;
  isPaused: boolean;
  totalProgress: number;
  validation: ValidationResult | null;
  error: string | null;
  rootCid: string | null;
}

export function useUpload(options: UseUploadOptions = {}) {
  const [state, setState] = useState<UploadState>({
    uploads: [],
    isUploading: false,
    isPaused: false,
    totalProgress: 0,
    validation: null,
    error: null,
    rootCid: null
  });

  const abortController = useRef<AbortController | null>(null);
  const s3Client = useRef<FilebaseS3Client | null>(null);

  // Initialize S3 client
  const initializeS3 = useCallback(() => {
    if (!s3Client.current) {
      s3Client.current = new FilebaseS3Client({
        endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT || 'https://s3.filebase.com',
        bucket: process.env.NEXT_PUBLIC_S3_BUCKET || 'nft-collections',
        accessKey: process.env.NEXT_PUBLIC_S3_ACCESS_KEY || '',
        secretKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY || ''
      });
    }
    return s3Client.current;
  }, []);

  // Validate collection structure
  const validateFiles = useCallback(async (files: File[]) => {
    try {
      const result = await CollectionValidator.validateCollection(files);
      setState(prev => ({ ...prev, validation: result, error: null }));
      options.onValidation?.(result);
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Validation failed';
      setState(prev => ({ ...prev, error: errorMsg }));
      options.onError?.(errorMsg);
      return null;
    }
  }, [options]);

  // Load checkpoint from previous session
  const loadCheckpoint = useCallback(() => {
    const checkpoint = UploadManager.loadCheckpoint();
    if (checkpoint) {
      setState(prev => ({
        ...prev,
        uploads: checkpoint.uploads,
        totalProgress: calculateTotalProgress(checkpoint.uploads)
      }));
      return checkpoint;
    }
    return null;
  }, []);

  // Calculate total progress across all uploads
  const calculateTotalProgress = useCallback((uploads: UploadProgress[]) => {
    if (uploads.length === 0) return 0;
    
    const totalSize = uploads.reduce((sum, upload) => sum + upload.totalSize, 0);
    const uploadedSize = uploads.reduce((sum, upload) => sum + upload.uploadedSize, 0);
    
    return totalSize > 0 ? (uploadedSize / totalSize) * 100 : 0;
  }, []);

  // Update progress and save checkpoint
  const updateProgress = useCallback((updatedUploads: UploadProgress[]) => {
    const totalProgress = calculateTotalProgress(updatedUploads);
    
    setState(prev => ({
      ...prev,
      uploads: updatedUploads,
      totalProgress
    }));

    // Save checkpoint
    const checkpoint: CheckpointData = {
      uploads: updatedUploads,
      lastUpdated: Date.now(),
      collectionId: 'current' // TODO: Use actual collection ID
    };
    UploadManager.saveCheckpoint(checkpoint);
    
    options.onProgress?.(updatedUploads);
  }, [calculateTotalProgress, options]);

  // Upload single chunk with retry logic
  const uploadChunk = useCallback(async (
    upload: UploadProgress,
    chunkIndex: number,
    client: FilebaseS3Client
  ) => {
    const chunk = upload.chunks[chunkIndex];
    if (chunk.uploaded) return chunk.etag!;

    return UploadManager.retryWithBackoff(async () => {
      const etag = await client.uploadPart(
        `collections/${upload.fileId}/${upload.fileName}`,
        upload.uploadId!,
        chunkIndex + 1,
        chunk.data
      );
      
      chunk.etag = etag;
      chunk.uploaded = true;
      
      return etag;
    });
  }, []);

  // Upload single file with multipart upload
  const uploadFile = useCallback(async (
    file: File,
    client: FilebaseS3Client,
    onProgress: (progress: UploadProgress) => void
  ) => {
    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const chunks = UploadManager.createChunks(file);
    
    const progress: UploadProgress = {
      fileId,
      fileName: file.name,
      totalSize: file.size,
      uploadedSize: 0,
      chunks,
      status: 'pending'
    };

    try {
      // Initiate multipart upload
      progress.uploadId = await client.initiateMultipartUpload(
        `collections/${fileId}/${file.name}`,
        file.type
      );
      progress.status = 'uploading';
      onProgress(progress);

      // Upload chunks with concurrency control
      const maxConcurrent = options.maxConcurrent || 3;
      const uploadPromises: Promise<string>[] = [];
      
      for (let i = 0; i < chunks.length; i += maxConcurrent) {
        const batch = chunks.slice(i, i + maxConcurrent);
        const batchPromises = batch.map((_, batchIndex) => {
          const chunkIndex = i + batchIndex;
          return uploadChunk(progress, chunkIndex, client);
        });
        
        const etags = await Promise.all(batchPromises);
        
        // Update progress
        const uploadedChunks = chunks.filter(c => c.uploaded).length;
        progress.uploadedSize = uploadedChunks * UploadManager['CHUNK_SIZE'];
        if (progress.uploadedSize > progress.totalSize) {
          progress.uploadedSize = progress.totalSize;
        }
        
        onProgress(progress);
        
        // Check if upload was aborted
        if (abortController.current?.signal.aborted) {
          throw new Error('Upload aborted');
        }
      }

      // Complete multipart upload
      const parts = chunks.map((chunk, index) => ({
        partNumber: index + 1,
        etag: chunk.etag!
      }));
      
      const location = await client.completeMultipartUpload(
        `collections/${fileId}/${file.name}`,
        progress.uploadId,
        parts
      );
      
      progress.status = 'completed';
      progress.uploadedSize = progress.totalSize;
      onProgress(progress);
      
      return location;
    } catch (error) {
      progress.status = 'error';
      progress.error = error instanceof Error ? error.message : 'Upload failed';
      onProgress(progress);
      
      // Abort multipart upload on error
      if (progress.uploadId) {
        try {
          await client.abortMultipartUpload(
            `collections/${fileId}/${file.name}`,
            progress.uploadId
          );
        } catch (abortError) {
          console.warn('Failed to abort upload:', abortError);
        }
      }
      
      throw error;
    }
  }, [options.maxConcurrent, uploadChunk]);

  // Start upload process
  const startUpload = useCallback(async (files: File[]) => {
    if (state.isUploading) return;
    
    // Validate files first
    const validation = await validateFiles(files);
    if (!validation?.valid) {
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isUploading: true, 
      isPaused: false, 
      error: null,
      uploads: []
    }));

    abortController.current = new AbortController();
    const client = initializeS3();
    const uploads: UploadProgress[] = [];

    try {
      // Upload all files
      for (const file of files) {
        if (abortController.current.signal.aborted) break;
        
        await uploadFile(file, client, (progress) => {
          const existingIndex = uploads.findIndex(u => u.fileId === progress.fileId);
          if (existingIndex >= 0) {
            uploads[existingIndex] = progress;
          } else {
            uploads.push(progress);
          }
          updateProgress([...uploads]);
        });
      }

      // Generate root CID (placeholder - would integrate with IPFS)
      const rootCid = `bafybei${Math.random().toString(36).substr(2, 50)}`;
      
      setState(prev => ({ 
        ...prev, 
        isUploading: false, 
        rootCid 
      }));
      
      // Clear checkpoint on success
      UploadManager.clearCheckpoint();
      
      options.onComplete?.(rootCid);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Upload failed';
      setState(prev => ({ 
        ...prev, 
        isUploading: false, 
        error: errorMsg 
      }));
      options.onError?.(errorMsg);
    }
  }, [state.isUploading, validateFiles, initializeS3, uploadFile, updateProgress, options]);

  // Pause upload
  const pauseUpload = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: true }));
  }, []);

  // Resume upload
  const resumeUpload = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: false }));
    // TODO: Implement resume logic
  }, []);

  // Cancel upload
  const cancelUpload = useCallback(() => {
    abortController.current?.abort();
    setState(prev => ({ 
      ...prev, 
      isUploading: false, 
      isPaused: false,
      uploads: [],
      totalProgress: 0
    }));
    UploadManager.clearCheckpoint();
  }, []);

  // Retry failed uploads
  const retryUpload = useCallback((fileId: string) => {
    // TODO: Implement retry logic for specific file
  }, []);

  return {
    ...state,
    startUpload,
    pauseUpload,
    resumeUpload,
    cancelUpload,
    retryUpload,
    validateFiles,
    loadCheckpoint
  };
}