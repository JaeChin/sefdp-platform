export type ProjectType = 'minigrid' | 'mesh_grid' | 'c_and_i' | 'standalone_solar';

export type ProjectStatus =
  | 'draft'
  | 'submitted'
  | 'pre_qualified'
  | 'approved'
  | 'active'
  | 'suspended'
  | 'completed'
  | 'decommissioned';

export type ApplicationType = 'pre_qualification' | 'full_application' | 'site_specific';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'revision_requested';

export type MilestoneStatus =
  | 'pending'
  | 'in_progress'
  | 'submitted'
  | 'verified'
  | 'approved'
  | 'rejected'
  | 'overdue';

export type ClaimType = 'pbg' | 'paygo' | 'subsidy' | 'bonus';

export type ClaimStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'approved'
  | 'disbursement_pending'
  | 'disbursed'
  | 'rejected'
  | 'revision_requested';

export type DisbursementStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'reversed';

export type ProgramType =
  | 'minigrid_pbg'
  | 'minigrid_mst'
  | 'sas_pbg'
  | 'sas_catalytic';

export type ProgramStatus = 'draft' | 'open' | 'review' | 'closed';

export type MeterProvider =
  | 'sparkmeter'
  | 'steamaco'
  | 'calin'
  | 'mojec'
  | 'powergen'
  | 'husk'
  | 'other';

export type VerificationMethod = 'api' | 'file_upload' | 'manual';
