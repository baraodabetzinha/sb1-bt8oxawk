import { loadStripe } from '@stripe/stripe-js';
import { subscriptionPlans } from '../data/subscriptionPlans';

// Mock Stripe integration for development
const mockStripeIntegration = true;

export const stripePromise = mockStripeIntegration 
  ? null 
  : loadStripe('your_publishable_key');

export async function createSubscription(priceId: string, customerId: string) {
  if (mockStripeIntegration) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find the plan
    const plan = subscriptionPlans.find(p => p.stripePriceId === priceId);
    if (!plan) {
      throw new Error('Invalid plan selected');
    }

    // Return mock subscription data
    return {
      id: `sub_${Math.random().toString(36).substr(2, 9)}`,
      status: 'active',
      plan: {
        id: plan.id,
        name: plan.name,
        price: plan.price
      },
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      customer: customerId
    };
  }

  // Real Stripe integration code
  try {
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerId,
      }),
    });
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}