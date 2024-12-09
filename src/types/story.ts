export interface Character {
  name: string;
  type: string;
  personality: string;
  imageUrl: string;
  description: string;
}

export interface StorySettings {
  mainCharacter: Character;
  characterName: string;
  setting: string;
  mood: string;
  theme: string;
  ageGroup: string;
  brief: string;
}