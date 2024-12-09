import React, { useState } from 'react';
import { useSocialStore } from '../../store/socialStore';
import { UserPlus, User } from 'lucide-react';
import type { ChildProfile } from '../../types/social';

export function ChildProfileManager() {
  const { childProfiles, addChildProfile } = useSocialStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<ChildProfile>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfile.name || !newProfile.birthDate) return;

    try {
      await addChildProfile(newProfile as Omit<ChildProfile, 'id'>);
      setIsAdding(false);
      setNewProfile({});
    } catch (error) {
      console.error('Erro ao adicionar perfil:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Perfis das Crianças
        </h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <UserPlus className="w-5 h-5" />
          <span>Adicionar Criança</span>
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={newProfile.name || ''}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={newProfile.birthDate || ''}
                onChange={(e) => setNewProfile({ ...newProfile, birthDate: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gênero
              </label>
              <select
                value={newProfile.gender || ''}
                onChange={(e) => setNewProfile({ ...newProfile, gender: e.target.value as ChildProfile['gender'] })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              >
                <option value="">Selecione...</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Esporte Favorito
              </label>
              <input
                type="text"
                value={newProfile.favoriteSport || ''}
                onChange={(e) => setNewProfile({ ...newProfile, favoriteSport: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Salvar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {childProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center space-x-4">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
              )}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date().getFullYear() - new Date(profile.birthDate).getFullYear()} anos
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {profile.favoriteSport && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Esporte Favorito: {profile.favoriteSport}
                </p>
              )}
              {profile.favoriteColor && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cor Favorita: {profile.favoriteColor}
                </p>
              )}
              {profile.petName && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Pet: {profile.petName}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}