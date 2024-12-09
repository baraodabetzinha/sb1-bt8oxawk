import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Book, Star, User } from 'lucide-react';
import { GamificationPanel } from '../gamification/GamificationPanel';

export function Dashboard() {
  const user = useAuthStore(state => state.user);

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Histórias Criadas</h3>
            <Book className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{user.stories_created}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Histórias Disponíveis</h3>
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{user.stories_available}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Perfil</h3>
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">Criança: {user.child_name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Idade: {new Date().getFullYear() - new Date(user.birth_date).getFullYear()} anos
            </p>
          </div>
        </div>
      </div>

      <GamificationPanel />
    </div>
  );
}