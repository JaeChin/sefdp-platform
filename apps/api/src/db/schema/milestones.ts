import { pgTable, uuid, text, timestamp, integer, bigint, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { programs } from './programs';

export const milestones = pgTable('milestones', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  programId: uuid('program_id').references(() => programs.id),
  name: text('name').notNull(),
  description: text('description'),
  sequenceOrder: integer('sequence_order').notNull(),
  status: text('status', {
    enum: ['pending', 'in_progress', 'submitted', 'verified', 'approved', 'rejected', 'overdue'],
  })
    .notNull()
    .default('pending'),
  targetDate: timestamp('target_date', { withTimezone: true }),
  completedDate: timestamp('completed_date', { withTimezone: true }),
  connectionsRequired: integer('connections_required'),
  connectionsAchieved: integer('connections_achieved'),
  disbursementAmountUsd: bigint('disbursement_amount_usd', { mode: 'bigint' }),
  verificationCriteria: jsonb('verification_criteria'),
  verificationEvidence: jsonb('verification_evidence'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const milestonesRelations = relations(milestones, ({ one }) => ({
  project: one(projects, {
    fields: [milestones.projectId],
    references: [projects.id],
  }),
  program: one(programs, {
    fields: [milestones.programId],
    references: [programs.id],
  }),
}));
