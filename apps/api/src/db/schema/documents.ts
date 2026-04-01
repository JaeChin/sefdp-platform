import { pgTable, uuid, text, timestamp, integer, bigint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { projects } from './projects';
import { applications } from './applications';
import { claims } from './claims';

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id').references(() => projects.id),
  applicationId: uuid('application_id').references(() => applications.id),
  claimId: uuid('claim_id').references(() => claims.id),
  uploadedBy: uuid('uploaded_by')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category', {
    enum: [
      'license',
      'financial',
      'technical',
      'environmental',
      'social',
      'meter_data',
      'photo',
      'contract',
      'report',
      'other',
    ],
  }).notNull(),
  mimeType: text('mime_type').notNull(),
  sizeBytes: bigint('size_bytes', { mode: 'bigint' }).notNull(),
  storagePath: text('storage_path').notNull(),
  storageBucket: text('storage_bucket').notNull(),
  version: integer('version').notNull().default(1),
  previousVersionId: uuid('previous_version_id'),
  isDeleted: text('is_deleted').notNull().default('false'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  project: one(projects, {
    fields: [documents.projectId],
    references: [projects.id],
  }),
  application: one(applications, {
    fields: [documents.applicationId],
    references: [applications.id],
  }),
  claim: one(claims, {
    fields: [documents.claimId],
    references: [claims.id],
  }),
  uploader: one(users, {
    fields: [documents.uploadedBy],
    references: [users.id],
  }),
}));
