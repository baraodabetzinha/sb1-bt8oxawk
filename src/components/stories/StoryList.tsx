import React from 'react';
import { Book, Calendar, Star } from 'lucide-react';
import { Story } from '../../types/story';
import { useLanguageStore } from '../../store/languageStore';

interface StoryListProps {
  stories: Story[];
}

export function StoryList({ stories }: StoryListProps) {
  const { language } = useLanguageStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <div key={story.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {story.content.substring(0, 100)}...
                </p>
              </div>
              <Star className="w-6 h-6 text-yellow-400 flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(story.created_at).toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}
              </div>
              <button className="flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium">
                <Book className="w-4 h-4 mr-1" />
                {language === 'pt-BR' ? 'Ler Mais' : 'Read More'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}