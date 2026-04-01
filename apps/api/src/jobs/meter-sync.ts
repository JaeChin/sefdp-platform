import { Worker } from 'bullmq';
import type { Job } from 'bullmq';
import { redis } from '../lib/redis.js';
import { logger } from '../lib/logger.js';

interface MeterSyncPayload {
  integrationId: string;
  projectId: string;
  provider: string;
}

async function processMeterSync(job: Job<MeterSyncPayload>): Promise<void> {
  const { integrationId, projectId, provider } = job.data;

  logger.info({ integrationId, projectId, provider }, 'Processing meter sync');

  // TODO: fetch readings from provider API based on integration config
  // TODO: normalize reading data to common format
  // TODO: store readings in meter_readings table
  // TODO: update integration.lastSyncAt

  logger.info({ integrationId }, 'Meter sync completed');
}

export function startMeterSyncWorker(): Worker<MeterSyncPayload> {
  const worker = new Worker<MeterSyncPayload>('meter-sync', processMeterSync, {
    connection: redis,
    concurrency: 5,
  });

  worker.on('completed', (job) => {
    logger.info({ jobId: job.id }, 'Meter sync job completed');
  });

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, err }, 'Meter sync job failed');
  });

  return worker;
}
