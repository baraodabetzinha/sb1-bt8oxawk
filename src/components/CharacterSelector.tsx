import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Character } from '../types/story';
import { availableCharacters } from '../data/characters';
import { Sparkles } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CharacterSelectorProps {
  onSelect: (character: Character) => void;
  selectedCharacter: Character | null;
}

export function CharacterSelector({ onSelect, selectedCharacter }: CharacterSelectorProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
        Passo 1: Escolha seu Personagem
      </h3>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        {availableCharacters.map((character) => (
          <div
            key={character.name}
            onClick={() => onSelect(character)}
            className={`cursor-pointer transition-all transform hover:scale-105 ${
              selectedCharacter?.name === character.name
                ? 'ring-2 ring-purple-500 bg-purple-50'
                : 'hover:shadow-lg'
            } rounded-lg overflow-hidden bg-white shadow`}
          >
            <div className="aspect-[4/3] relative">
              <img
                src={character.imageUrl}
                alt={character.name}
                className="w-full h-full object-cover"
              />
              {selectedCharacter?.name === character.name && (
                <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Selecionado
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 text-center">{character.name}</h4>
              <p className="text-sm text-gray-600 text-center mt-1">{character.type}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          className="w-full"
        >
          {availableCharacters.map((character) => (
            <SwiperSlide key={character.name}>
              <div
                onClick={() => onSelect(character)}
                className={`cursor-pointer transition-all ${
                  selectedCharacter?.name === character.name
                    ? 'ring-2 ring-purple-500 bg-purple-50'
                    : ''
                } rounded-lg overflow-hidden bg-white shadow-lg`}
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={character.imageUrl}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedCharacter?.name === character.name && (
                    <div className="absolute inset-0 bg-purple-500 bg-opacity-20 flex items-center justify-center">
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Selecionado
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 text-center mb-2">
                    {character.name}
                  </h4>
                  <p className="text-gray-600 text-center">{character.description}</p>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => onSelect(character)}
                      className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                    >
                      Escolher {character.name}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}