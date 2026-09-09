export type PgTier = 'large' | 'mid' | 'specialized';

export interface PgCompany {
  id: string;
  name: string;
  tier: PgTier;
  tierLabel: string;
  marketShareOrRevenue: string;
  badge: string;
  keyStrengths: string[];
  settlementPeriod: string;
  specializedIndustries: string[];
  riskPolicy: string;
  description: string;
  uniqueFeature: string;
  metrics: {
    capitalStability: number; // 0-100
    altPaymentStrength: number; // 0-100
    developerFlexibility: number; // 0-100
    globalSupport: number; // 0-100
  };
}

export interface FeeTier {
  category: string;
  revenueRange: string;
  cardCostRate: number; // percentage
  finalPgRate: number; // percentage
  pgMargin: number; // percentage
  description: string;
}

export interface RiskItem {
  id: string;
  name: string;
  type: 'banned' | 'high_risk' | 'normal';
  category: string;
  reason: string;
  requiredHedge?: 'sgi' | 'rolling_reserve' | 'none' | 'escrow';
  hedgeDetails?: string;
  recommendedPgTier?: string;
  approvalDifficulty: 'impossible' | 'very_high' | 'moderate' | 'easy';
}

export interface RegulatoryPhase {
  year: string;
  ratio: number;
  title: string;
  description: string;
  penalty: string;
  impactOnSellers: string;
}
