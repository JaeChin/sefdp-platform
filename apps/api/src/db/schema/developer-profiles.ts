import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { organizations } from './organizations';

export const developerProfiles = pgTable('developer_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id')
    .notNull()
    .unique()
    .references(() => organizations.id),
  yearsOperating: integer('years_operating'),
  totalProjects: integer('total_projects').default(0),
  totalConnections: integer('total_connections').default(0),
  totalCapacityKw: decimal('total_capacity_kw', { precision: 12, scale: 2 }),
  countriesOperating: jsonb('countries_operating').$type<string[]>(),
  operatingStates: jsonb('operating_states').$type<string[]>(),
  projectTypes: jsonb('project_types').$type<string[]>(),
  avgTariffUsdKwh: decimal('avg_tariff_usd_kwh', { precision: 8, scale: 4 }),
  avgUptimePercentage: decimal('avg_uptime_percentage', { precision: 5, scale: 2 }),
  hasAuditedFinancials: boolean('has_audited_financials').default(false),
  creditScore: integer('credit_score'),
  creditScoreBreakdown: jsonb('credit_score_breakdown'),
  lastScoredAt: timestamp('last_scored_at', { withTimezone: true }),
  description: text('description'),
  logoUrl: text('logo_url'),
  websiteUrl: text('website_url'),
  isPublished: boolean('is_published').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const developerProfilesRelations = relations(developerProfiles, ({ one }) => ({
  organization: one(organizations, {
    fields: [developerProfiles.organizationId],
    references: [organizations.id],
  }),
}));
