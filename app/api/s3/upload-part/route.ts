import { NextRequest, NextResponse } from 'next/server';
import { S3Client, UploadPartCommand } from '@aws-sdk/client-s3';

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
    const { key, uploadId, partNumber, bucket, data } = await request.json();

    if (!key || !uploadId || !partNumber || !bucket || !data) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Convert base64 data back to buffer
    const buffer = Buffer.from(data, 'base64');

    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      Body: buffer
    });

    const response = await s3Client.send(command);

    return NextResponse.json({
      etag: response.ETag,
      partNumber
    });
  } catch (error) {
    console.error('Failed to upload part:', error);
    return NextResponse.json(
      { error: 'Failed to upload part' },
      { status: 500 }
    );
  }
}