import { NextRequest, NextResponse } from 'next/server';
import { S3Client, CreateMultipartUploadCommand } from '@aws-sdk/client-s3';

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
    const { key, contentType, bucket } = await request.json();

    if (!key || !contentType || !bucket) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const command = new CreateMultipartUploadCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      Metadata: {
        'upload-timestamp': Date.now().toString(),
        'client': 'emc-store'
      }
    });

    const response = await s3Client.send(command);

    return NextResponse.json({
      uploadId: response.UploadId,
      key: response.Key
    });
  } catch (error) {
    console.error('Failed to initiate multipart upload:', error);
    return NextResponse.json(
      { error: 'Failed to initiate upload' },
      { status: 500 }
    );
  }
}