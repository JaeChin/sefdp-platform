import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: text('type', {
    enum: ['developer', 'financier', 'pmu_admin', 'seforall', 'regulator'],
  }).notNull(),
  country: text('country').notNull().default('NG'),
  verified: boolean('verified').notNull().default(false),
  kycStatus: text('kyc_status', {
    enum: ['pending', 'submitted', 'verified', 'rejected'],
  })
    .notNull()
    .default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
