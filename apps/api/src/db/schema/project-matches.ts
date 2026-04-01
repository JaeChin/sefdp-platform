import { pgTable, uuid, text, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { financierProfiles } from './financier-profiles';

export const projectMatches = pgTable('project_matches', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  financierProfileId: uuid('financier_profile_id')
    .notNull()
    .references(() => financierProfiles.id),
  status: text('status', {
    enum: ['suggested', 'viewed', 'interested', 'in_discussion', 'term_sheet', 'closed', 'declined'],
  })
    .notNull()
    .default('suggested'),
  initiator: text('initiator', {
    enum: ['algorithm', 'developer', 'financier'],
  })
    .notNull()
    .default('algorithm'),
  matchScore: integer('match_score'),
  matchCriteria: jsonb('match_criteria'),
  notes: text('notes'),
  lastActivityAt: timestamp('last_activity_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const projectMatchesRelations = relations(projectMatches, ({ one }) => ({
  project: one(projects, {
    fields: [projectMatches.projectId],
    references: [projects.id],
  }),
  financierProfile: one(financierProfiles, {
    fields: [projectMatches.financierProfileId],
    references: [financierProfiles.id],
  }),
}));
