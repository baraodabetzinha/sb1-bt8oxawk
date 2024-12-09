export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  storiesPerMonth: number;
  features: string[];
  stripePriceId: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  planId: string | null;
  currentPeriodEnd: string | null;
}