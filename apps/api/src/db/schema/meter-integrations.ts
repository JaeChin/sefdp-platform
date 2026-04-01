import { pgTable, uuid, text, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';

export const meterIntegrations = pgTable('meter_integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  provider: text('provider', {
    enum: ['sparkmeter', 'steamaco', 'calin', 'mojec', 'powergen', 'husk', 'other'],
  }).notNull(),
  verificationMethod: text('verification_method', {
    enum: ['api', 'file_upload', 'manual'],
  }).notNull(),
  apiEndpoint: text('api_endpoint'),
  apiCredentials: jsonb('api_credentials'),
  isActive: boolean('is_active').notNull().default(true),
  lastSyncAt: timestamp('last_sync_at', { withTimezone: true }),
  syncFrequencyMinutes: text('sync_frequency_minutes').default('1440'),
  config: jsonb('config'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const meterIntegrationsRelations = relations(meterIntegrations, ({ one }) => ({
  project: one(projects, {
    fields: [meterIntegrations.projectId],
    references: [projects.id],
  }),
}));
