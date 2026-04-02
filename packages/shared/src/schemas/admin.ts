import { z } from 'zod';

const USER_ROLES = [
  'super_admin',
  'pmu_admin',
  'pmu_viewer',
  'developer_admin',
  'developer_member',
  'financier_admin',
  'financier_analyst',
  'seforall_admin',
  'regulator_viewer',
] as const;

const PROGRAM_TYPES = ['minigrid_pbg', 'minigrid_mst', 'sas_pbg', 'sas_catalytic'] as const;
const PROGRAM_STATUSES = ['draft', 'active', 'closed'] as const;

export const updateUserSchema = z
  .object({
    isActive: z.boolean().optional(),
    role: z.enum(USER_ROLES).optional(),
  })
  .strict();

export const createProgramSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(255),
    type: z.enum(PROGRAM_TYPES),
    description: z.string().max(2000).optional(),
    deadline: z.string().datetime().optional(),
  })
  .strict();

export const updateProgramSchema = z
  .object({
    name: z.string().min(1).max(255).optional(),
    type: z.enum(PROGRAM_TYPES).optional(),
    status: z.enum(PROGRAM_STATUSES).optional(),
    description: z.string().max(2000).optional(),
    deadline: z.string().datetime().optional(),
  })
  .strict();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateProgramInput = z.infer<typeof createProgramSchema>;
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>;
