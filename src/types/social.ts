export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface SharedStory {
  id: string;
  storyId: string;
  userId: string;
  sharedWith: string[];
  accessCode: string;
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  avatar?: string;
  favoriteSport?: string;
  favoriteColor?: string;
  favoriteFood?: string;
  petName?: string;
}

export interface CommunityStory {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  settings: any;
}