import path from 'node:path';

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'text/csv',
]);

const ALLOWED_EXTENSIONS = new Set([
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.xlsx',
  '.docx',
  '.csv',
]);

export interface UploadValidationError {
  code: 'INVALID_FILE_TYPE' | 'INVALID_MIME_TYPE';
  message: string;
}

/**
 * Validates that an uploaded file has an allowed extension and MIME type.
 * Both must be whitelisted — an attacker cannot bypass this by renaming a file.
 */
export function validateUploadFile(
  filename: string,
  mimetype: string,
): UploadValidationError | null {
  const ext = path.extname(filename).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return {
      code: 'INVALID_FILE_TYPE',
      message: `File extension '${ext}' is not allowed. Accepted: ${[...ALLOWED_EXTENSIONS].join(', ')}`,
    };
  }

  if (!ALLOWED_MIME_TYPES.has(mimetype)) {
    return {
      code: 'INVALID_MIME_TYPE',
      message: `MIME type '${mimetype}' is not allowed`,
    };
  }

  return null;
}
