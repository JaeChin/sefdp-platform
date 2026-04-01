#!/usr/bin/env bash
set -euo pipefail

TIMESTAMP="$(date '+%Y%m%d_%H%M%S')"
BACKUP_DIR="/tmp/sefdp-backups"
BACKUP_FILE="sefdp_backup_${TIMESTAMP}.sql.gz"
S3_BUCKET="${BACKUP_S3_BUCKET:-s3://sefdp-backups}"
S3_ENDPOINT="${BACKUP_S3_ENDPOINT:-https://fsn1.your-objectstorage.com}"
RETENTION_DAYS=30

DB_HOST="${POSTGRES_HOST:-localhost}"
DB_PORT="${POSTGRES_PORT:-5432}"
DB_USER="${POSTGRES_USER:-sefdp}"
DB_NAME="${POSTGRES_DB:-sefdp}"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

mkdir -p "$BACKUP_DIR"

log "Starting PostgreSQL backup for database '$DB_NAME'..."

PGPASSWORD="${POSTGRES_PASSWORD}" pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --format=plain \
  --no-owner \
  --no-acl | gzip > "$BACKUP_DIR/$BACKUP_FILE"

BACKUP_SIZE=$(du -h "$BACKUP_DIR/$BACKUP_FILE" | cut -f1)
log "Backup created: $BACKUP_FILE ($BACKUP_SIZE)"

log "Uploading backup to S3..."
aws s3 cp \
  "$BACKUP_DIR/$BACKUP_FILE" \
  "$S3_BUCKET/$BACKUP_FILE" \
  --endpoint-url "$S3_ENDPOINT"

log "Upload complete. Removing local backup..."
rm -f "$BACKUP_DIR/$BACKUP_FILE"

log "Removing backups older than ${RETENTION_DAYS} days from S3..."
CUTOFF_DATE="$(date -d "-${RETENTION_DAYS} days" '+%Y-%m-%d' 2>/dev/null || date -v-${RETENTION_DAYS}d '+%Y-%m-%d')"
aws s3 ls "$S3_BUCKET/" --endpoint-url "$S3_ENDPOINT" | while read -r line; do
  file_date=$(echo "$line" | awk '{print $1}')
  file_name=$(echo "$line" | awk '{print $4}')
  if [[ -n "$file_name" && "$file_date" < "$CUTOFF_DATE" ]]; then
    log "Deleting old backup: $file_name"
    aws s3 rm "$S3_BUCKET/$file_name" --endpoint-url "$S3_ENDPOINT"
  fi
done

log "Backup process complete."
