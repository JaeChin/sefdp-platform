import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  bigint,
  decimal,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { milestones } from './milestones';
import { programs } from './programs';
import { users } from './users';

export const claims = pgTable('claims', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  milestoneId: uuid('milestone_id').references(() => milestones.id),
  programId: uuid('program_id')
    .notNull()
    .references(() => programs.id),
  claimType: text('claim_type', {
    enum: ['pbg', 'paygo', 'subsidy', 'bonus'],
  }).notNull(),
  status: text('status', {
    enum: [
      'draft',
      'submitted',
      'under_review',
      'verified',
      'approved',
      'disbursement_pending',
      'disbursed',
      'rejected',
      'revision_requested',
    ],
  })
    .notNull()
    .default('draft'),

  // Verification fields
  connectionsClaimed: integer('connections_claimed').notNull(),
  connectionsVerified: integer('connections_verified'),
  avgConsumptionKwh: decimal('avg_consumption_kwh', { precision: 10, scale: 4 }),
  uptimePercentage: decimal('uptime_percentage', { precision: 5, scale: 2 }),
  paymentCompliance: decimal('payment_compliance', { precision: 5, scale: 2 }),

  // Financial — always in cents
  claimedAmountUsd: bigint('claimed_amount_usd', { mode: 'bigint' }).notNull(),
  verifiedAmountUsd: bigint('verified_amount_usd', { mode: 'bigint' }),
  approvedAmountUsd: bigint('approved_amount_usd', { mode: 'bigint' }),

  calculationBreakdown: jsonb('calculation_breakdown'),
  evidenceNotes: text('evidence_notes'),
  rejectionReason: text('rejection_reason'),

  submittedBy: uuid('submitted_by').references(() => users.id),
  verifiedBy: uuid('verified_by').references(() => users.id),
  approvedBy: uuid('approved_by').references(() => users.id),

  submittedAt: timestamp('submitted_at', { withTimezone: true }),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const claimsRelations = relations(claims, ({ one }) => ({
  project: one(projects, {
    fields: [claims.projectId],
    references: [projects.id],
  }),
  milestone: one(milestones, {
    fields: [claims.milestoneId],
    references: [milestones.id],
  }),
  program: one(programs, {
    fields: [claims.programId],
    references: [programs.id],
  }),
  submitter: one(users, {
    fields: [claims.submittedBy],
    references: [users.id],
    relationName: 'claimSubmitter',
  }),
  verifier: one(users, {
    fields: [claims.verifiedBy],
    references: [users.id],
    relationName: 'claimVerifier',
  }),
  approver: one(users, {
    fields: [claims.approvedBy],
    references: [users.id],
    relationName: 'claimApprover',
  }),
}));
