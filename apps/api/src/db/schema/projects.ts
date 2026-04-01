import {
  pgTable,
  uuid,
  text,
  timestamp,
  bigint,
  integer,
  decimal,
  jsonb,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { programs } from './programs';
import { users } from './users';

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id),
  programId: uuid('program_id').references(() => programs.id),
  name: text('name').notNull(),
  type: text('type', {
    enum: ['minigrid', 'mesh_grid', 'c_and_i', 'standalone_solar'],
  }).notNull(),
  status: text('status', {
    enum: [
      'draft',
      'pre_qual_submitted',
      'pre_qual_approved',
      'pre_qual_rejected',
      'full_app_submitted',
      'full_app_approved',
      'full_app_rejected',
      'active',
      'monitoring',
      'completed',
      'suspended',
    ],
  })
    .notNull()
    .default('draft'),

  country: text('country').notNull().default('NG'),
  state: text('state'),
  lga: text('lga'),
  community: text('community'),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),

  pvCapacityKw: decimal('pv_capacity_kw', { precision: 10, scale: 2 }),
  storageKwh: decimal('storage_kwh', { precision: 10, scale: 2 }),
  connections: integer('connections'),
  renewableFraction: decimal('renewable_fraction', { precision: 5, scale: 2 }),

  capexUsd: bigint('capex_usd', { mode: 'bigint' }),
  tariffNgn: bigint('tariff_ngn', { mode: 'bigint' }),
  grantAmountUsd: bigint('grant_amount_usd', { mode: 'bigint' }),
  irr: decimal('irr', { precision: 5, scale: 2 }),
  lcoe: decimal('lcoe', { precision: 10, scale: 4 }),

  reaSiteId: text('rea_site_id'),
  subsidyTier: text('subsidy_tier'),

  codDate: date('cod_date'),

  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});

export const projectsRelations = relations(projects, ({ one }) => ({
  organization: one(organizations, {
    fields: [projects.organizationId],
    references: [organizations.id],
  }),
  program: one(programs, {
    fields: [projects.programId],
    references: [programs.id],
  }),
}));
