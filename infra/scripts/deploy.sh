#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
COMPOSE_FILE="$PROJECT_ROOT/infra/docker-compose.prod.yml"
HEALTH_URL="${HEALTH_CHECK_URL:-http://localhost/api/health}"
MAX_RETRIES=10
RETRY_INTERVAL=5

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }

log "Starting deployment..."

log "Pulling latest changes from git..."
cd "$PROJECT_ROOT"
git pull origin main

log "Building Docker images..."
docker compose -f "$COMPOSE_FILE" build --no-cache

log "Running database migrations..."
"$SCRIPT_DIR/migrate.sh"

log "Starting services..."
docker compose -f "$COMPOSE_FILE" up -d

log "Running health check..."
retries=0
until curl -sf "$HEALTH_URL" > /dev/null 2>&1; do
  retries=$((retries + 1))
  if [ "$retries" -ge "$MAX_RETRIES" ]; then
    log "ERROR: Health check failed after $MAX_RETRIES attempts"
    log "Rolling back..."
    docker compose -f "$COMPOSE_FILE" logs --tail=50
    exit 1
  fi
  log "Waiting for services to become healthy (attempt $retries/$MAX_RETRIES)..."
  sleep "$RETRY_INTERVAL"
done

log "Health check passed."

log "Cleaning up old Docker images..."
docker image prune -f

log "Deployment complete."
