import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Comment, SharedStory, ChildProfile, CommunityStory } from '../types/social';
import { supabase } from '../lib/supabase';

interface SocialState {
  communityStories: CommunityStory[];
  sharedStories: SharedStory[];
  childProfiles: ChildProfile[];
  addChildProfile: (profile: Omit<ChildProfile, 'id'>) => Promise<void>;
  shareStory: (storyId: string, emails: string[]) => Promise<void>;
  publishToCommunity: (story: Omit<CommunityStory, 'id'>) => Promise<void>;
  addComment: (storyId: string, content: string) => Promise<void>;
  likeStory: (storyId: string) => Promise<void>;
  fetchCommunityStories: () => Promise<void>;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      communityStories: [],
      sharedStories: [],
      childProfiles: [],

      addChildProfile: async (profile) => {
        try {
          const { data, error } = await supabase
            .from('child_profiles')
            .insert([{ ...profile, id: crypto.randomUUID() }])
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            childProfiles: [...state.childProfiles, data]
          }));
        } catch (error) {
          console.error('Erro ao adicionar perfil:', error);
          throw error;
        }
      },

      shareStory: async (storyId, emails) => {
        try {
          const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
          
          const { error } = await supabase
            .from('shared_stories')
            .insert([{
              storyId,
              sharedWith: emails,
              accessCode,
              createdAt: new Date().toISOString()
            }]);

          if (error) throw error;

          // Enviar emails (mock)
          console.log(`História compartilhada com ${emails.join(', ')} - Código: ${accessCode}`);
        } catch (error) {
          console.error('Erro ao compartilhar história:', error);
          throw error;
        }
      },

      publishToCommunity: async (story) => {
        try {
          const { data, error } = await supabase
            .from('community_stories')
            .insert([story])
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            communityStories: [data, ...state.communityStories]
          }));
        } catch (error) {
          console.error('Erro ao publicar história:', error);
          throw error;
        }
      },

      addComment: async (storyId, content) => {
        try {
          const { data, error } = await supabase
            .from('comments')
            .insert([{
              storyId,
              content,
              createdAt: new Date().toISOString()
            }])
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            communityStories: state.communityStories.map(story =>
              story.id === storyId
                ? { ...story, comments: [...story.comments, data] }
                : story
            )
          }));
        } catch (error) {
          console.error('Erro ao adicionar comentário:', error);
          throw error;
        }
      },

      likeStory: async (storyId) => {
        try {
          const { data, error } = await supabase
            .from('community_stories')
            .update({ likes: supabase.raw('likes + 1') })
            .eq('id', storyId)
            .select()
            .single();

          if (error) throw error;

          set((state) => ({
            communityStories: state.communityStories.map(story =>
              story.id === storyId ? data : story
            )
          }));
        } catch (error) {
          console.error('Erro ao curtir história:', error);
          throw error;
        }
      },

      fetchCommunityStories: async () => {
        try {
          const { data, error } = await supabase
            .from('community_stories')
            .select(`
              *,
              comments (*)
            `)
            .order('createdAt', { ascending: false });

          if (error) throw error;

          set({ communityStories: data });
        } catch (error) {
          console.error('Erro ao buscar histórias:', error);
          throw error;
        }
      }
    }),
    {
      name: 'social-storage'
    }
  )
);