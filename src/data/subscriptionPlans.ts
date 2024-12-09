import { SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Básico',
    price: 9.99,
    storiesPerMonth: 10,
    features: [
      '10 histórias por mês',
      'Personagens básicos',
      'Temas padrão',
      'Suporte por email',
      'Histórias em português'
    ],
    stripePriceId: 'price_basic123',
    recommended: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    storiesPerMonth: 30,
    features: [
      '30 histórias por mês',
      'Todos os personagens',
      'Temas premium',
      'Suporte prioritário',
      'Download em PDF',
      'Histórias em português e inglês',
      'Ilustrações personalizadas',
      'Narração em áudio',
      'Modo família (até 3 perfis)'
    ],
    stripePriceId: 'price_premium123',
    recommended: true
  },
  {
    id: 'unlimited',
    name: 'Ilimitado',
    price: 29.99,
    storiesPerMonth: -1,
    features: [
      'Histórias ilimitadas',
      'Todos os personagens',
      'Temas personalizados',
      'Suporte 24/7',
      'Download em PDF e ePub',
      'Histórias em português e inglês',
      'Ilustrações personalizadas premium',
      'Narração em áudio profissional',
      'Modo família (até 5 perfis)',
      'Criação de personagens próprios',
      'Clube VIP de histórias',
      'Acesso antecipado a novos recursos'
    ],
    stripePriceId: 'price_unlimited123',
    recommended: false
  }
];