import React, { useState } from 'react';
import { useSocialStore } from '../../store/socialStore';
import { Share2, Mail, Globe, X } from 'lucide-react';

interface ShareStoryProps {
  storyId: string;
  onClose: () => void;
}

export function ShareStory({ storyId, onClose }: ShareStoryProps) {
  const { shareStory, publishToCommunity } = useSocialStore();
  const [emails, setEmails] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleAddEmail = () => {
    if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setEmails([...emails, newEmail]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (emails.length > 0) {
        await shareStory(storyId, emails);
      }
      if (isPublic) {
        await publishToCommunity({
          storyId,
          isPublic: true,
          createdAt: new Date().toISOString()
        });
      }
      onClose();
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Compartilhar História
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 mb-2">
              <Mail className="w-5 h-5" />
              <span>Compartilhar por Email</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Digite um email"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              />
              <button
                onClick={handleAddEmail}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Adicionar
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {emails.map((email) => (
                <span
                  key={email}
                  className="inline-flex items-center space-x-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
                >
                  <span>{email}</span>
                  <button
                    onClick={() => handleRemoveEmail(email)}
                    className="hover:text-purple-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <Globe className="w-5 h-5" />
              <span>Publicar na Biblioteca da Comunidade</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleShare}
              disabled={isSharing || (!isPublic && emails.length === 0)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
                isSharing || (!isPublic && emails.length === 0)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              <Share2 className="w-5 h-5" />
              <span>{isSharing ? 'Compartilhando...' : 'Compartilhar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}