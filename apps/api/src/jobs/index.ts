import { Queue } from 'bullmq';
import { redis } from '../lib/redis.js';

const defaultOpts = { connection: redis };

export const meterSyncQueue = new Queue('meter-sync', defaultOpts);
export const disbursementCalcQueue = new Queue('disbursement-calc', defaultOpts);
export const reportGenerationQueue = new Queue('report-generation', defaultOpts);
export const notificationsQueue = new Queue('notifications', defaultOpts);
export const scoringUpdateQueue = new Queue('scoring-update', defaultOpts);

export async function closeAllQueues(): Promise<void> {
  await Promise.all([
    meterSyncQueue.close(),
    disbursementCalcQueue.close(),
    reportGenerationQueue.close(),
    notificationsQueue.close(),
    scoringUpdateQueue.close(),
  ]);
}
