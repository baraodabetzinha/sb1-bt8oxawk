import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Camera, Save, User, CreditCard, Receipt } from 'lucide-react';
import { SubscriptionManager } from '../subscription/SubscriptionManager';
import { BillingHistory } from './BillingHistory';

function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function ProfileManager() {
  const user = useAuthStore(state => state.user);
  const updateProfile = useAuthStore(state => state.updateProfile);
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'billing'>('profile');
  
  const [formData, setFormData] = useState({
    child_name: user?.child_name || '',
    birth_date: user?.birth_date || '',
    avatar_url: user?.avatar_url || '',
    full_name: user?.full_name || '',
    gender: user?.gender || '',
    favorite_sport: user?.favorite_sport || '',
    pet_name: user?.pet_name || '',
    favorite_color: user?.favorite_color || '',
    favorite_food: user?.favorite_food || ''
  });
  
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateProfile(formData);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Falha ao atualizar perfil. Por favor, tente novamente.');
    } finally {
      setIsUpdating(false);
    }
  };

  const childAge = formData.birth_date ? calculateAge(formData.birth_date) : null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 inline-flex items-center border-b-2 ${
              activeTab === 'profile'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <User className="w-5 h-5 mr-2" />
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`py-4 px-1 inline-flex items-center border-b-2 ${
              activeTab === 'subscription'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Assinatura
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`py-4 px-1 inline-flex items-center border-b-2 ${
              activeTab === 'billing'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <Receipt className="w-5 h-5 mr-2" />
            Histórico
          </button>
        </nav>
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-purple-600" />
            Configurações do Perfil
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <img
                  src={formData.avatar_url || 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&auto=format&fit=crop'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-100 dark:border-purple-900"
                />
                <label className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white cursor-pointer hover:bg-purple-700 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="text"
                    className="hidden"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="URL do Avatar"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome do Responsável</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome da Criança</label>
                <input
                  type="text"
                  value={formData.child_name}
                  onChange={(e) => setFormData({ ...formData, child_name: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data de Nascimento</label>
                <input
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
                {childAge !== null && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Idade: {childAge} anos
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gênero</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Esporte Favorito</label>
                <input
                  type="text"
                  value={formData.favorite_sport}
                  onChange={(e) => setFormData({ ...formData, favorite_sport: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Futebol, Natação, Ballet..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome do Pet</label>
                <input
                  type="text"
                  value={formData.pet_name}
                  onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Nome do animal de estimação (se tiver)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cor Favorita</label>
                <input
                  type="text"
                  value={formData.favorite_color}
                  onChange={(e) => setFormData({ ...formData, favorite_color: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Azul, Verde, Rosa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comida Favorita</label>
                <input
                  type="text"
                  value={formData.favorite_food}
                  onChange={(e) => setFormData({ ...formData, favorite_food: e.target.value })}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Pizza, Lasanha, Sorvete..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className={`w-full flex justify-center items-center px-4 py-2 rounded-md text-white font-medium ${
                isUpdating ? 'bg-gray-400 dark:bg-gray-600' : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600'
              } transition-colors`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isUpdating ? 'Atualizando...' : 'Salvar Alterações'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'subscription' && <SubscriptionManager />}
      {activeTab === 'billing' && <BillingHistory />}
    </div>
  );
}