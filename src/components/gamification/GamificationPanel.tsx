import React from 'react';
import { useGamificationStore } from '../../store/gamificationStore';
import { Trophy, Target, Award, Star } from 'lucide-react';

export function GamificationPanel() {
  const { level, achievements, dailyMissions, rankings } = useGamificationStore();
  const experienceProgress = (level.experience / level.nextLevelExperience) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nível e Experiência */}
        <div className="bg-purple-50 dark:bg-purple-900/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Star className="w-5 h-5 mr-2 text-purple-600" />
              Nível {level.current}
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {level.experience}/{level.nextLevelExperience} XP
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${experienceProgress}%` }}
            />
          </div>
        </div>

        {/* Missões Diárias */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-600" />
            Missões Diárias
          </h3>
          {dailyMissions.map((mission) => (
            <div
              key={mission.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{mission.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {mission.description}
                  </p>
                </div>
                <span className="text-purple-600 font-bold">+{mission.reward} XP</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {mission.progress}/{mission.total}
              </div>
            </div>
          ))}
        </div>

        {/* Conquistas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Award className="w-5 h-5 mr-2 text-purple-600" />
            Conquistas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  achievement.unlockedAt
                    ? 'bg-purple-50 dark:bg-purple-900/50'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium">{achievement.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-purple-600" />
            Ranking
          </h3>
          <div className="space-y-2">
            {rankings.map((rank) => (
              <div
                key={rank.userId}
                className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
              >
                <span className="font-bold text-lg w-8">{rank.position}º</span>
                <img
                  src={rank.avatar}
                  alt={rank.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-medium">{rank.userName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Nível {rank.level} • {rank.experience} XP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}