import { pgTable, uuid, text, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { programs } from './programs';
import { users } from './users';

export const applications = pgTable('applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  programId: uuid('program_id')
    .notNull()
    .references(() => programs.id),
  type: text('type', {
    enum: ['pre_qualification', 'full_application', 'site_specific'],
  }).notNull(),
  status: text('status', {
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'revision_requested'],
  })
    .notNull()
    .default('draft'),
  formData: jsonb('form_data'),
  score: integer('score'),
  scoreBreakdown: jsonb('score_breakdown'),
  reviewerNotes: text('reviewer_notes'),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  submittedAt: timestamp('submitted_at', { withTimezone: true }),
  reviewedAt: timestamp('reviewed_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const applicationsRelations = relations(applications, ({ one }) => ({
  project: one(projects, {
    fields: [applications.projectId],
    references: [projects.id],
  }),
  program: one(programs, {
    fields: [applications.programId],
    references: [programs.id],
  }),
  reviewer: one(users, {
    fields: [applications.reviewedBy],
    references: [users.id],
  }),
}));
