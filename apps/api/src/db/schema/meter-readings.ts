import {
  pgTable,
  uuid,
  timestamp,
  decimal,
  integer,
  jsonb,
  bigserial,
  unique,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { projects } from './projects';
import { meterIntegrations } from './meter-integrations';

export const meterReadings = pgTable(
  'meter_readings',
  {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id),
    integrationId: uuid('integration_id').references(() => meterIntegrations.id),
    readingDate: date('reading_date').notNull(),
    consumptionKwh: decimal('consumption_kwh', { precision: 12, scale: 4 }),
    peakDemandKw: decimal('peak_demand_kw', { precision: 10, scale: 4 }),
    uptimePercentage: decimal('uptime_percentage', { precision: 5, scale: 2 }),
    activeConnections: integer('active_connections'),
    rawData: jsonb('raw_data'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    uniqueReading: unique('meter_readings_project_date_unique').on(
      table.projectId,
      table.readingDate,
    ),
  }),
);

export const meterReadingsRelations = relations(meterReadings, ({ one }) => ({
  project: one(projects, {
    fields: [meterReadings.projectId],
    references: [projects.id],
  }),
  integration: one(meterIntegrations, {
    fields: [meterReadings.integrationId],
    references: [meterIntegrations.id],
  }),
}));
