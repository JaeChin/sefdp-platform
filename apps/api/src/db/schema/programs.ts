import { pgTable, uuid, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const programs = pgTable('programs', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  type: text('type', {
    enum: ['minigrid_pbg', 'minigrid_mst', 'sas_pbg', 'sas_catalytic'],
  }).notNull(),
  status: text('status', {
    enum: ['draft', 'open', 'review', 'closed'],
  })
    .notNull()
    .default('draft'),
  description: text('description'),
  eligibility: jsonb('eligibility'),
  deadline: timestamp('deadline', { withTimezone: true }),
  config: jsonb('config'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const programsRelations = relations(programs, ({ one }) => ({
  creator: one(users, {
    fields: [programs.createdBy],
    references: [users.id],
  }),
}));
