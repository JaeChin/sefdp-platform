export type FinancierType = 'dfi' | 'commercial_bank' | 'investor' | 'impact_fund';

export type MatchStatus =
  | 'suggested'
  | 'viewed'
  | 'interested'
  | 'in_discussion'
  | 'term_sheet'
  | 'closed'
  | 'declined';

export type MatchInitiator = 'algorithm' | 'developer' | 'financier';

export interface ScoringDimension {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
}

export interface ScoreBreakdown {
  dimensions: ScoringDimension[];
  totalScore: number;
}
