export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  child_name: string;
  birth_date: string;
  gender: 'male' | 'female' | 'other';
  favorite_sport: string;
  pet_name: string | null;
  favorite_color: string;
  favorite_food: string;
  stories_created: number;
  stories_available: number;
  subscription?: {
    planId: string;
    isActive: boolean;
    currentPeriodEnd: string;
  };
}

export interface Story {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
  settings: any;
}