import {
  pgTable,
  uuid,
  text,
  timestamp,
  bigint,
  decimal,
  integer,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { organizations } from './organizations';

export const financierProfiles = pgTable('financier_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id')
    .notNull()
    .unique()
    .references(() => organizations.id),
  financierType: text('financier_type', {
    enum: ['dfi', 'commercial_bank', 'investor', 'impact_fund'],
  }).notNull(),
  minDealSizeUsd: bigint('min_deal_size_usd', { mode: 'bigint' }),
  maxDealSizeUsd: bigint('max_deal_size_usd', { mode: 'bigint' }),
  preferredCountries: jsonb('preferred_countries').$type<string[]>(),
  preferredTypes: jsonb('preferred_types').$type<string[]>(),
  minIrr: decimal('min_irr', { precision: 5, scale: 2 }),
  maxRiskRating: integer('max_risk_rating'),
  instruments: jsonb('instruments').$type<string[]>(),
  ticketCurrency: text('ticket_currency').default('USD'),
  description: text('description'),
  logoUrl: text('logo_url'),
  websiteUrl: text('website_url'),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const financierProfilesRelations = relations(financierProfiles, ({ one }) => ({
  organization: one(organizations, {
    fields: [financierProfiles.organizationId],
    references: [organizations.id],
  }),
}));
