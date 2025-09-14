import { NextRequest, NextResponse } from 'next/server';
import { S3Client, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT || 'https://s3.filebase.com',
  region: process.env.S3_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_SECRET_KEY || ''
  },
  forcePathStyle: true
});

export async function POST(request: NextRequest) {
  try {
    const { key, uploadId, parts, bucket } = await request.json();

    if (!key || !uploadId || !parts || !bucket) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Sort parts by part number
    const sortedParts = parts
      .sort((a: any, b: any) => a.partNumber - b.partNumber)
      .map((part: any) => ({
        ETag: part.etag,
        PartNumber: part.partNumber
      }));

    const command = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: sortedParts
      }
    });

    const response = await s3Client.send(command);

    return NextResponse.json({
      location: response.Location,
      bucket: response.Bucket,
      key: response.Key,
      etag: response.ETag
    });
  } catch (error) {
    console.error('Failed to complete multipart upload:', error);
    return NextResponse.json(
      { error: 'Failed to complete upload' },
      { status: 500 }
    );
  }
}