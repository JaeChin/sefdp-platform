import type { ScoreBreakdown, ScoringDimension } from '@sefdp/shared';

interface ScoringInput {
  trackRecordYears: number;
  completedProjects: number;
  revenueConsistency: number;
  debtServiceCoverage: number;
  currentRatio: number;
  capacityInstalledKw: number;
  avgUptimePercentage: number;
  hasQualifiedEngineers: boolean;
  regulatoryCompliance: boolean;
  hasEsiaApprovals: boolean;
  hasCommunityEngagement: boolean;
  connectionsServed: number;
  percentFemaleConnections: number;
}

const WEIGHTS = {
  trackRecord: 0.30,
  financialHealth: 0.25,
  technicalCapacity: 0.20,
  compliance: 0.15,
  socialImpact: 0.10,
} as const;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function scoreTrackRecord(input: ScoringInput): ScoringDimension {
  let score = 0;
  score += clamp(input.trackRecordYears / 10, 0, 1) * 50;
  score += clamp(input.completedProjects / 20, 0, 1) * 50;

  return {
    name: 'Track Record',
    weight: WEIGHTS.trackRecord,
    score: Math.round(score),
    maxScore: 100,
  };
}

function scoreFinancialHealth(input: ScoringInput): ScoringDimension {
  let score = 0;
  score += clamp(input.revenueConsistency, 0, 1) * 40;
  score += clamp(input.debtServiceCoverage / 2, 0, 1) * 30;
  score += clamp(input.currentRatio / 2, 0, 1) * 30;

  return {
    name: 'Financial Health',
    weight: WEIGHTS.financialHealth,
    score: Math.round(score),
    maxScore: 100,
  };
}

function scoreTechnicalCapacity(input: ScoringInput): ScoringDimension {
  let score = 0;
  score += clamp(input.capacityInstalledKw / 5000, 0, 1) * 30;
  score += clamp(input.avgUptimePercentage / 100, 0, 1) * 40;
  score += input.hasQualifiedEngineers ? 30 : 0;

  return {
    name: 'Technical Capacity',
    weight: WEIGHTS.technicalCapacity,
    score: Math.round(score),
    maxScore: 100,
  };
}

function scoreCompliance(input: ScoringInput): ScoringDimension {
  let score = 0;
  score += input.regulatoryCompliance ? 50 : 0;
  score += input.hasEsiaApprovals ? 30 : 0;
  score += input.hasCommunityEngagement ? 20 : 0;

  return {
    name: 'Compliance & Governance',
    weight: WEIGHTS.compliance,
    score: Math.round(score),
    maxScore: 100,
  };
}

function scoreSocialImpact(input: ScoringInput): ScoringDimension {
  let score = 0;
  score += clamp(input.connectionsServed / 10000, 0, 1) * 60;
  score += clamp(input.percentFemaleConnections / 50, 0, 1) * 40;

  return {
    name: 'Social Impact',
    weight: WEIGHTS.socialImpact,
    score: Math.round(score),
    maxScore: 100,
  };
}

export function calculateDeveloperScore(input: ScoringInput): ScoreBreakdown {
  const dimensions: ScoringDimension[] = [
    scoreTrackRecord(input),
    scoreFinancialHealth(input),
    scoreTechnicalCapacity(input),
    scoreCompliance(input),
    scoreSocialImpact(input),
  ];

  const totalScore = Math.round(
    dimensions.reduce((sum, d) => sum + (d.score / d.maxScore) * d.weight * 100, 0),
  );

  return { dimensions, totalScore };
}
