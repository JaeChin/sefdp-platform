import { z } from 'zod';

export const developerProfileSchema = z.object({
  yearsOperating: z.number().int().nonnegative(),
  totalProjects: z.number().int().nonnegative(),
  totalConnections: z.number().int().nonnegative(),
  totalCapacityKw: z.number().nonnegative(),
  countriesOperating: z.array(z.string()).min(1, 'At least one country is required'),
  operatingStates: z.array(z.string()).optional(),
  projectTypes: z.array(
    z.enum(['minigrid', 'mesh_grid', 'c_and_i', 'standalone_solar']),
  ),
  avgTariffUsdKwh: z.number().positive().optional(),
  avgUptimePercentage: z.number().min(0).max(100).optional(),
  hasAuditedFinancials: z.boolean().optional(),
  description: z.string().max(2000).optional(),
});

export const financierProfileSchema = z.object({
  financierType: z.enum(['dfi', 'commercial_bank', 'investor', 'impact_fund']),
  minDealSizeUsd: z.number().nonnegative(),
  maxDealSizeUsd: z.number().positive(),
  preferredCountries: z.array(z.string()),
  preferredTypes: z.array(
    z.enum(['minigrid', 'mesh_grid', 'c_and_i', 'standalone_solar']),
  ),
  minIrr: z.number().min(0).max(100).optional(),
  maxRiskRating: z.number().int().min(1).max(10).optional(),
  instruments: z.array(
    z.enum(['debt', 'equity', 'grant', 'mezzanine', 'guarantee', 'results_based_finance']),
  ),
  ticketCurrency: z.string().length(3).optional(),
  description: z.string().max(2000).optional(),
});

export const updateMatchStatusSchema = z.object({
  status: z.enum([
    'suggested',
    'viewed',
    'interested',
    'in_discussion',
    'term_sheet',
    'closed',
    'declined',
  ]),
});

export type DeveloperProfileInput = z.infer<typeof developerProfileSchema>;
export type FinancierProfileInput = z.infer<typeof financierProfileSchema>;
export type UpdateMatchStatusInput = z.infer<typeof updateMatchStatusSchema>;
