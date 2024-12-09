import React from 'react';
import { Book, Search } from 'lucide-react';
import { StoryList } from './StoryList';
import { useStoryStore } from '../../store/storyStore';
import { useLanguageStore } from '../../store/languageStore';

export function StoriesPage() {
  const stories = useStoryStore(state => state.stories);
  const [searchTerm, setSearchTerm] = React.useState('');
  const { language } = useLanguageStore();

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Book className="w-6 h-6 mr-2 text-purple-600" />
          {language === 'pt-BR' ? 'Minhas Histórias' : 'My Stories'}
        </h1>
        
        <div className="relative">
          <input
            type="text"
            placeholder={language === 'pt-BR' ? 'Buscar histórias...' : 'Search stories...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>

      {filteredStories.length === 0 ? (
        <div className="text-center py-12">
          <Book className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {language === 'pt-BR' ? 'Nenhuma história encontrada' : 'No stories found'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? (language === 'pt-BR' 
                  ? "Nenhuma história corresponde à sua busca" 
                  : "No stories match your search")
              : (language === 'pt-BR'
                  ? "Comece a criar histórias mágicas!"
                  : "Start creating magical stories!")
            }
          </p>
        </div>
      ) : (
        <StoryList stories={filteredStories} />
      )}
    </div>
  );
}