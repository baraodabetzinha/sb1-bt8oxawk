import React from 'react';
import { StorySettings } from '../types/story';
import { Settings, Palette, Sparkles, User, Wand2 } from 'lucide-react';

interface StoryFormProps {
  settings: Partial<StorySettings>;
  onSettingsChange: (settings: Partial<StorySettings>) => void;
  onComplete: () => void;
  isGenerating: boolean;
}

export function StoryForm({ settings, onSettingsChange, onComplete, isGenerating }: StoryFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
        Passo 2: Configure sua História
      </h3>

      {settings.mainCharacter && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-500" />
            Nome do Personagem na História
          </label>
          <input
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 px-4 py-2"
            placeholder={`Como você quer chamar ${settings.mainCharacter.name}?`}
            value={settings.characterName || ''}
            onChange={(e) => onSettingsChange({ ...settings, characterName: e.target.value })}
          />
          <p className="mt-1 text-sm text-gray-500">
            Deixe em branco para usar o nome original: {settings.mainCharacter.name}
          </p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
          Resumo da História
        </label>
        <textarea
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 min-h-[100px]"
          placeholder="Que aventura emocionante você gostaria que seu personagem vivesse? (ex: descobrir um jardim mágico, fazer novos amigos...)"
          value={settings.brief || ''}
          onChange={(e) => onSettingsChange({ ...settings, brief: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Settings className="w-4 h-4 mr-2 text-purple-500" />
            Cenário
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={settings.setting || ''}
            onChange={(e) => onSettingsChange({ ...settings, setting: e.target.value })}
            required
          >
            <option value="">Escolha um lugar mágico...</option>
            <option value="Floresta Encantada">Floresta Encantada</option>
            <option value="Castelo de Cristal">Castelo de Cristal</option>
            <option value="Reino do Arco-Íris">Reino do Arco-Íris</option>
            <option value="Cidade Submarina">Cidade Submarina</option>
            <option value="Paraíso nas Nuvens">Paraíso nas Nuvens</option>
            <option value="Terra dos Doces">Terra dos Doces</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Palette className="w-4 h-4 mr-2 text-purple-500" />
            Clima da História
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={settings.mood || ''}
            onChange={(e) => onSettingsChange({ ...settings, mood: e.target.value })}
            required
          >
            <option value="">Selecione o clima...</option>
            <option value="Feliz">Feliz</option>
            <option value="Emocionante">Emocionante</option>
            <option value="Misterioso">Misterioso</option>
            <option value="Divertido">Divertido</option>
            <option value="Mágico">Mágico</option>
            <option value="Aventureiro">Aventureiro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
            Tema
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={settings.theme || ''}
            onChange={(e) => onSettingsChange({ ...settings, theme: e.target.value })}
            required
          >
            <option value="">Escolha uma lição...</option>
            <option value="Amizade">Amizade</option>
            <option value="Coragem">Coragem</option>
            <option value="Bondade">Bondade</option>
            <option value="Criatividade">Criatividade</option>
            <option value="Perseverança">Perseverança</option>
            <option value="Trabalho em Equipe">Trabalho em Equipe</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-purple-500" />
            Faixa Etária
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={settings.ageGroup || ''}
            onChange={(e) => onSettingsChange({ ...settings, ageGroup: e.target.value })}
            required
          >
            <option value="">Selecione a faixa etária...</option>
            <option value="3-5">3-5 anos</option>
            <option value="6-8">6-8 anos</option>
            <option value="9-12">9-12 anos</option>
          </select>
        </div>
      </div>

      <button
        onClick={onComplete}
        disabled={isGenerating || !settings.setting || !settings.theme || !settings.mood || !settings.ageGroup}
        className={`w-full flex justify-center items-center px-4 py-3 rounded-md text-white font-medium transition-colors ${
          isGenerating || !settings.setting || !settings.theme || !settings.mood || !settings.ageGroup
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700'
        }`}
      >
        {isGenerating ? (
          <>
            <span className="animate-spin mr-2">⭐</span>
            Criando Magia...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5 mr-2" />
            Gerar História
          </>
        )}
      </button>
    </div>
  );
}