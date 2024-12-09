import React from 'react';
import { StorySettings } from '../types/story';

interface StoryDisplayProps {
  settings: Partial<StorySettings>;
  story: string;
}

export function StoryDisplay({ settings, story }: StoryDisplayProps) {
  if (!story) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {settings.mainCharacter?.name}'s Adventure
        </h2>
        {settings.mainCharacter && (
          <img
            src={settings.mainCharacter.imageUrl}
            alt={settings.mainCharacter.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
      </div>
      <div className="prose max-w-none">
        {story.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}