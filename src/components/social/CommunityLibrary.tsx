import React, { useEffect, useState } from 'react';
import { useSocialStore } from '../../store/socialStore';
import { Heart, MessageCircle, Share2, Filter } from 'lucide-react';

export function CommunityLibrary() {
  const { communityStories, fetchCommunityStories, likeStory, addComment } = useSocialStore();
  const [filter, setFilter] = useState('recent');
  const [commentText, setCommentText] = useState('');
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  useEffect(() => {
    fetchCommunityStories();
  }, [fetchCommunityStories]);

  const handleLike = async (storyId: string) => {
    try {
      await likeStory(storyId);
    } catch (error) {
      console.error('Erro ao curtir:', error);
    }
  };

  const handleComment = async (storyId: string) => {
    if (!commentText.trim()) return;
    
    try {
      await addComment(storyId, commentText);
      setCommentText('');
      setSelectedStory(null);
    } catch (error) {
      console.error('Erro ao comentar:', error);
    }
  };

  const filteredStories = [...communityStories].sort((a, b) => {
    if (filter === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.likes - a.likes;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Biblioteca da Comunidade
        </h2>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="recent">Mais Recentes</option>
            <option value="popular">Mais Populares</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredStories.map((story) => (
          <div
            key={story.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={story.authorAvatar}
                alt={story.authorName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-500">
                  por {story.authorName} • {new Date(story.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {story.content.substring(0, 200)}...
            </p>

            <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(story.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-purple-600"
                >
                  <Heart className="w-5 h-5" />
                  <span>{story.likes}</span>
                </button>
                <button
                  onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                  className="flex items-center space-x-2 text-gray-500 hover:text-purple-600"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{story.comments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600">
                  <Share2 className="w-5 h-5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>

            {selectedStory === story.id && (
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  {story.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-3">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="font-medium text-sm">{comment.userName}</p>
                        <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start space-x-3">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Adicione um comentário..."
                    className="flex-1 rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    rows={2}
                  />
                  <button
                    onClick={() => handleComment(story.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}