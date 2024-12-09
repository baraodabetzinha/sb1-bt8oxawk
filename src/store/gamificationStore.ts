import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Achievement, Mission, UserLevel, Ranking } from '../types/gamification';

interface GamificationState {
  level: UserLevel;
  achievements: Achievement[];
  dailyMissions: Mission[];
  rankings: Ranking[];
  addExperience: (amount: number) => void;
  completeMission: (missionId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateRankings: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      level: {
        current: 1,
        experience: 0,
        nextLevelExperience: 100
      },
      achievements: [
        {
          id: 'first-story',
          title: 'Primeira História',
          description: 'Criou sua primeira história mágica',
          icon: '📖'
        },
        {
          id: 'story-master',
          title: 'Mestre das Histórias',
          description: 'Criou 10 histórias diferentes',
          icon: '👑'
        },
        {
          id: 'creative-mind',
          title: 'Mente Criativa',
          description: 'Usou todos os personagens disponíveis',
          icon: '🎨'
        }
      ],
      dailyMissions: [
        {
          id: 'daily-story',
          title: 'História do Dia',
          description: 'Crie uma história hoje',
          reward: 50,
          progress: 0,
          total: 1,
          expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
        },
        {
          id: 'character-explorer',
          title: 'Explorador de Personagens',
          description: 'Use 3 personagens diferentes',
          reward: 30,
          progress: 0,
          total: 3,
          expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString()
        }
      ],
      rankings: [],
      addExperience: (amount: number) => {
        set((state) => {
          let { current, experience, nextLevelExperience } = state.level;
          experience += amount;
          
          while (experience >= nextLevelExperience) {
            current += 1;
            experience -= nextLevelExperience;
            nextLevelExperience = Math.floor(nextLevelExperience * 1.5);
          }
          
          return {
            level: {
              current,
              experience,
              nextLevelExperience
            }
          };
        });
      },
      completeMission: (missionId: string) => {
        set((state) => ({
          dailyMissions: state.dailyMissions.map((mission) =>
            mission.id === missionId
              ? {
                  ...mission,
                  progress: mission.total,
                  completedAt: new Date().toISOString()
                }
              : mission
          )
        }));
      },
      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === achievementId && !achievement.unlockedAt
              ? {
                  ...achievement,
                  unlockedAt: new Date().toISOString()
                }
              : achievement
          )
        }));
      },
      updateRankings: () => {
        // Simulação de ranking
        set({
          rankings: [
            {
              position: 1,
              userId: '1',
              userName: 'João',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
              level: 5,
              experience: 450
            },
            {
              position: 2,
              userId: '2',
              userName: 'Maria',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              level: 4,
              experience: 380
            },
            {
              position: 3,
              userId: '3',
              userName: 'Pedro',
              avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
              level: 3,
              experience: 290
            }
          ]
        });
      }
    }),
    {
      name: 'gamification-storage'
    }
  )
);