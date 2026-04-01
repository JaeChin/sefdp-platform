import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255),
  type: z.enum(['minigrid', 'mesh_grid', 'c_and_i', 'standalone_solar']),
  programId: z.string().uuid('Invalid program ID').optional(),
  state: z.string().min(1, 'State is required'),
  lga: z.string().min(1, 'LGA is required'),
  community: z.string().min(1, 'Community is required'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  pvCapacityKw: z.number().positive('PV capacity must be positive'),
  storageKwh: z.number().nonnegative('Storage capacity must be non-negative'),
  connections: z.number().int().positive('Connections must be a positive integer'),
  estimatedCostUsd: z.number().positive().optional(),
  estimatedCommissioningDate: z.string().datetime().optional(),
  description: z.string().max(2000).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const createApplicationSchema = z.object({
  projectId: z.string().uuid('Invalid project ID'),
  programId: z.string().uuid('Invalid program ID'),
  type: z.enum(['pre_qualification', 'full_application', 'site_specific']),
  formData: z.record(z.string(), z.unknown()),
});

export const submitClaimSchema = z.object({
  projectId: z.string().uuid('Invalid project ID'),
  milestoneId: z.string().uuid('Invalid milestone ID').optional(),
  programId: z.string().uuid('Invalid program ID'),
  claimType: z.enum(['pbg', 'paygo', 'subsidy', 'bonus']),
  connectionsClaimed: z.number().int().nonnegative(),
  avgConsumptionKwh: z.number().nonnegative(),
  uptimePercentage: z.number().min(0).max(100),
  paymentCompliance: z.number().min(0).max(100),
  claimedAmountUsd: z.number().positive('Claimed amount must be positive'),
  evidenceNotes: z.string().max(2000).optional(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type SubmitClaimInput = z.infer<typeof submitClaimSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type UuidParam = z.infer<typeof uuidParamSchema>;
