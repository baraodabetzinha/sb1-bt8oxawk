export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  completedAt?: string;
  expiresAt: string;
}

export interface UserLevel {
  current: number;
  experience: number;
  nextLevelExperience: number;
}

export interface Ranking {
  position: number;
  userId: string;
  userName: string;
  avatar: string;
  level: number;
  experience: number;
}