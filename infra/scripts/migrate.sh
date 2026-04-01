#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

log "Running database migrations..."

cd "$PROJECT_ROOT"

if pnpm --filter @sefdp/api db:migrate; then
  log "Migrations completed successfully."
else
  log "ERROR: Migration failed. Aborting."
  exit 1
fi
