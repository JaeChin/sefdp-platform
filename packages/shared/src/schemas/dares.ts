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

const APPLICATION_STATUSES = [
  'draft',
  'submitted',
  'under_review',
  'approved',
  'rejected',
  'revision_requested',
] as const;

const MILESTONE_STATUSES = [
  'pending',
  'in_progress',
  'submitted',
  'verified',
  'approved',
  'rejected',
  'overdue',
] as const;

export const updateApplicationSchema = z
  .object({
    status: z.enum(APPLICATION_STATUSES).optional(),
    score: z.number().int().min(0).max(100).optional(),
    scoreBreakdown: z.record(z.string(), z.unknown()).optional(),
    reviewerNotes: z.string().max(2000).optional(),
    reviewedBy: z.string().uuid().optional(),
    reviewedAt: z.string().datetime().optional(),
  })
  .strict();

export const createMilestoneSchema = z
  .object({
    projectId: z.string().uuid('Invalid project ID'),
    programId: z.string().uuid('Invalid program ID').optional(),
    name: z.string().min(1, 'Milestone name is required').max(255),
    description: z.string().max(2000).optional(),
    sequenceOrder: z.number().int().nonnegative(),
    targetDate: z.string().datetime().optional(),
    connectionsRequired: z.number().int().nonnegative().optional(),
    disbursementAmountUsd: z.number().nonnegative().optional(),
  })
  .strict();

export const updateMilestoneStatusSchema = z
  .object({
    status: z.enum(MILESTONE_STATUSES),
  })
  .strict();

export const verifyClaimSchema = z
  .object({
    connectionsVerified: z.number().int().nonnegative(),
    verifiedAmountUsd: z.number().nonnegative(),
  })
  .strict();

export const approveClaimSchema = z
  .object({
    approvedAmountUsd: z.number().nonnegative(),
  })
  .strict();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type SubmitClaimInput = z.infer<typeof submitClaimSchema>;
export type VerifyClaimInput = z.infer<typeof verifyClaimSchema>;
export type ApproveClaimInput = z.infer<typeof approveClaimSchema>;
export type CreateMilestoneInput = z.infer<typeof createMilestoneSchema>;
export type UpdateMilestoneStatusInput = z.infer<typeof updateMilestoneStatusSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type UuidParam = z.infer<typeof uuidParamSchema>;
