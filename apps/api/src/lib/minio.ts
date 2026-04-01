import { Client } from 'minio';
import { env } from '../env.js';

export const minioClient = new Client({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: env.MINIO_USE_SSL,
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
});

export async function ensureBucket(bucket: string): Promise<void> {
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, 'us-east-1');
  }
}

export async function uploadDocument(
  bucket: string,
  path: string,
  buffer: Buffer,
  contentType: string,
): Promise<void> {
  await ensureBucket(bucket);
  await minioClient.putObject(bucket, path, buffer, buffer.length, {
    'Content-Type': contentType,
  });
}

export async function getDocumentUrl(
  bucket: string,
  path: string,
  expirySeconds = 3600,
): Promise<string> {
  return minioClient.presignedGetObject(bucket, path, expirySeconds);
}

export async function deleteDocument(bucket: string, path: string): Promise<void> {
  await minioClient.removeObject(bucket, path);
}
