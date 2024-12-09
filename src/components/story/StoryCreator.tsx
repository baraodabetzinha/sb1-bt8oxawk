import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { CharacterSelector } from '../CharacterSelector';
import { StoryForm } from '../StoryForm';
import { StoryDisplay } from '../StoryDisplay';
import { StorySettings, Character } from '../../types/story';
import { saveStory } from '../../lib/supabase';
import { Wand2, CheckCircle2 } from 'lucide-react';

export function StoryCreator() {
  const [settings, setSettings] = React.useState<Partial<StorySettings>>({});
  const [story, setStory] = React.useState<string>('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const user = useAuthStore(state => state.user);
  const updateProfile = useAuthStore(state => state.updateProfile);

  const handleCharacterSelect = (character: Character) => {
    setSettings({ ...settings, mainCharacter: character });
  };

  const generateStory = async () => {
    if (!user || user.stories_available <= 0) {
      alert('Sem histórias disponíveis. Por favor, atualize seu plano.');
      return;
    }

    if (!settings.mainCharacter || !settings.setting || !settings.theme) {
      alert('Por favor, complete todos os campos necessários.');
      return;
    }

    setIsGenerating(true);
    try {
      const characterName = settings.characterName || settings.mainCharacter.name;
      
      const storyTemplate = `
        Era uma vez em ${settings.setting}, vivia um ${settings.mainCharacter.type} chamado ${characterName}. 
        ${characterName} era conhecido em toda a terra por ser ${settings.mainCharacter.personality}.
        
        ${settings.brief ? `A aventura começa quando ${settings.brief}\n\n` : ''}
        
        Usando sua natureza ${settings.mainCharacter.personality.toLowerCase()}, ${characterName} enfrentou muitos desafios.
        A jornada foi repleta de momentos ${settings.mood} enquanto aprendia importantes lições sobre ${settings.theme}.
        
        Com determinação e coragem, ${characterName} descobriu que ser ${settings.mainCharacter.personality.toLowerCase()}
        era sua maior força. A história ensina aos jovens leitores que todos têm qualidades únicas que os tornam especiais.
        
        E assim, a aventura de ${characterName} chegou ao fim, mas as memórias e lições durarão para sempre.
      `.trim();

      const title = `A Aventura de ${characterName} sobre ${settings.theme}`;
      
      await saveStory(user.id, title, storyTemplate, settings);
      setStory(storyTemplate);

      await updateProfile({
        stories_created: user.stories_created + 1,
        stories_available: user.stories_available - 1,
      });
    } catch (error) {
      console.error('Erro ao gerar história:', error);
      alert('Falha ao gerar história. Por favor, tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isStep1Complete = !!settings.mainCharacter;
  const isStep2Complete = settings.setting && settings.theme && settings.mood && settings.ageGroup;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-purple-600" />
          Criar uma História Mágica
        </h2>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <div className={`flex items-center ${isStep1Complete ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full mr-2">
                {isStep1Complete ? <CheckCircle2 className="w-6 h-6" /> : '1'}
              </div>
              <span className="font-medium">Escolha do Personagem</span>
            </div>
          </div>
          <div className="w-12 h-1 bg-gray-200">
            <div className={`h-full transition-all duration-300 ${isStep1Complete ? 'bg-purple-600' : 'bg-gray-200'}`} />
          </div>
          <div className="flex-1">
            <div className={`flex items-center ${isStep2Complete ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full mr-2">
                {isStep2Complete ? <CheckCircle2 className="w-6 h-6" /> : '2'}
              </div>
              <span className="font-medium">Configuração da História</span>
            </div>
          </div>
          <div className="w-12 h-1 bg-gray-200">
            <div className={`h-full transition-all duration-300 ${isStep2Complete ? 'bg-purple-600' : 'bg-gray-200'}`} />
          </div>
          <div className="flex-1">
            <div className={`flex items-center ${story ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className="flex items-center justify-center w-8 h-8 border-2 rounded-full mr-2">
                {story ? <CheckCircle2 className="w-6 h-6" /> : '3'}
              </div>
              <span className="font-medium">História Gerada</span>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* Step 1: Character Selection */}
          <div className={`transition-all duration-300 ${isStep1Complete ? 'opacity-50' : ''}`}>
            <CharacterSelector 
              selectedCharacter={settings.mainCharacter || null} 
              onSelect={handleCharacterSelect}
            />
          </div>
          
          {/* Step 2: Story Configuration */}
          <div className={`transition-all duration-300 ${!isStep1Complete ? 'opacity-50 pointer-events-none' : ''}`}>
            <StoryForm 
              settings={settings} 
              onSettingsChange={setSettings}
              onComplete={generateStory}
              isGenerating={isGenerating}
            />
          </div>
        </div>
      </div>

      {/* Step 3: Story Display */}
      {story && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-purple-500" />
            História Gerada
          </h3>
          <StoryDisplay settings={settings} story={story} />
        </div>
      )}
    </div>
  );
}