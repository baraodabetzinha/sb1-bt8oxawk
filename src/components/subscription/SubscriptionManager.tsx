import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { PlanCard } from './PlanCard';
import { subscriptionPlans } from '../../data/subscriptionPlans';
import { createSubscription } from '../../lib/stripe';
import { Crown, Shield, Zap } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import type { SubscriptionPlan } from '../../types/subscription';

export function SubscriptionManager() {
  const user = useAuthStore(state => state.user);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { language } = useLanguageStore();

  const handleSelectPlan = async (plan: SubscriptionPlan) => {
    if (!user) return;

    setIsProcessing(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const subscription = await createSubscription(plan.stripePriceId, user.id);
      
      await updateProfile({
        subscription: {
          planId: plan.id,
          isActive: true,
          currentPeriodEnd: subscription.current_period_end
        },
        stories_available: plan.storiesPerMonth
      });

      setSuccessMessage(
        language === 'pt-BR'
          ? `Assinatura do plano ${plan.name} realizada com sucesso!`
          : `Successfully subscribed to ${plan.name} plan!`
      );
    } catch (err) {
      setError(
        language === 'pt-BR'
          ? 'Falha ao processar assinatura. Tente novamente.'
          : 'Failed to process subscription. Please try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const benefits = [
    {
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      title: language === 'pt-BR' ? 'Conteúdo Premium' : 'Premium Content',
      description: language === 'pt-BR' 
        ? 'Acesso a personagens exclusivos e temas especiais'
        : 'Access to exclusive characters and special themes'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: language === 'pt-BR' ? 'Garantia de Satisfação' : 'Satisfaction Guarantee',
      description: language === 'pt-BR'
        ? '7 dias de garantia em qualquer plano'
        : '7-day money-back guarantee on any plan'
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: language === 'pt-BR' ? 'Recursos Avançados' : 'Advanced Features',
      description: language === 'pt-BR'
        ? 'Narração em áudio e ilustrações personalizadas'
        : 'Audio narration and custom illustrations'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          <Crown className="w-8 h-8 text-purple-600 mr-2" />
          {language === 'pt-BR' ? 'Planos de Assinatura' : 'Subscription Plans'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'pt-BR'
            ? 'Escolha o plano perfeito para sua jornada de histórias. Desbloqueie mais histórias e recursos para criar momentos mágicos com sua criança.'
            : 'Choose the perfect plan for your storytelling journey. Unlock more stories and features to create magical moments with your child.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className="inline-block p-3 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {benefit.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="max-w-md mx-auto mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isCurrentPlan={user?.subscription?.planId === plan.id}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              {language === 'pt-BR'
                ? 'Processando sua assinatura...'
                : 'Processing your subscription...'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}