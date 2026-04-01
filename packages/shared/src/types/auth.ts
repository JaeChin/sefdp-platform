export type UserRole =
  | 'super_admin'
  | 'pmu_admin'
  | 'pmu_viewer'
  | 'developer_admin'
  | 'developer_member'
  | 'financier_admin'
  | 'financier_analyst'
  | 'seforall_admin'
  | 'regulator_viewer';

export type OrganizationType =
  | 'developer'
  | 'financier'
  | 'pmu_admin'
  | 'seforall'
  | 'regulator';

export type KycStatus = 'pending' | 'submitted' | 'verified' | 'rejected';

export interface TokenPayload {
  userId: string;
  organizationId: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
