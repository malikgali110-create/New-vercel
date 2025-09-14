import { NextRequest, NextResponse } from 'next/server';
import { S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

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
    const { key, uploadId, bucket } = await request.json();

    if (!key || !uploadId || !bucket) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId
    });

    await s3Client.send(command);

    return NextResponse.json({
      success: true,
      message: 'Upload aborted successfully'
    });
  } catch (error) {
    console.error('Failed to abort multipart upload:', error);
    return NextResponse.json(
      { error: 'Failed to abort upload' },
      { status: 500 }
    );
  }
}