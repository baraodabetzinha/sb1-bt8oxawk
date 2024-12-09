import React from 'react';
import { Check, Crown, Star } from 'lucide-react';
import { SubscriptionPlan } from '../../types/subscription';
import { useLanguageStore } from '../../store/languageStore';

interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export function PlanCard({ plan, isCurrentPlan, onSelectPlan }: PlanCardProps) {
  const { language } = useLanguageStore();

  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${
      isCurrentPlan ? 'ring-2 ring-purple-500' : ''
    } ${plan.recommended ? 'transform scale-105' : ''}`}>
      {plan.recommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
            <Crown className="w-4 h-4 mr-1" />
            {language === 'pt-BR' ? 'Mais Popular' : 'Most Popular'}
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold">R$ {plan.price}</span>
          <span className="text-gray-500 dark:text-gray-400">/mês</span>
        </div>
        {isCurrentPlan && (
          <span className="inline-block bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            {language === 'pt-BR' ? 'Plano Atual' : 'Current Plan'}
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
            {plan.id === 'unlimited' ? (
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
            ) : (
              <Check className="w-5 h-5 text-green-500 mr-2" />
            )}
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelectPlan(plan)}
        disabled={isCurrentPlan}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
          isCurrentPlan
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {isCurrentPlan 
          ? (language === 'pt-BR' ? 'Plano Atual' : 'Current Plan')
          : (language === 'pt-BR' ? 'Assinar Agora' : 'Subscribe Now')}
      </button>

      {plan.recommended && (
        <div className="mt-4 text-center">
          <span className="text-sm text-purple-600 dark:text-purple-400">
            {language === 'pt-BR' 
              ? '🎁 7 dias grátis ao assinar'
              : '🎁 7-day free trial when you subscribe'}
          </span>
        </div>
      )}
    </div>
  );
}