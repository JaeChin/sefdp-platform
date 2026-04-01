import { pgTable, uuid, text, timestamp, bigint, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { claims } from './claims';
import { applications } from './applications';

export const disbursements = pgTable('disbursements', {
  id: uuid('id').primaryKey().defaultRandom(),
  claimId: uuid('claim_id').references(() => claims.id),
  applicationId: uuid('application_id').references(() => applications.id),
  status: text('status', {
    enum: ['pending', 'processing', 'completed', 'failed', 'reversed'],
  })
    .notNull()
    .default('pending'),
  amountUsd: bigint('amount_usd', { mode: 'bigint' }).notNull(),
  currency: text('currency').notNull().default('USD'),
  paymentMethod: text('payment_method'),
  paymentReference: text('payment_reference'),
  bankDetails: jsonb('bank_details'),
  failureReason: text('failure_reason'),
  processedAt: timestamp('processed_at', { withTimezone: true }),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const disbursementsRelations = relations(disbursements, ({ one }) => ({
  claim: one(claims, {
    fields: [disbursements.claimId],
    references: [claims.id],
  }),
  application: one(applications, {
    fields: [disbursements.applicationId],
    references: [applications.id],
  }),
}));
