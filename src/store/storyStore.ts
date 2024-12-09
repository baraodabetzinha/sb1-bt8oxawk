import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Story } from '../types/story';
import { supabase } from '../lib/supabase';

interface StoryState {
  stories: Story[];
  addStory: (story: Story) => void;
  fetchStories: (userId: string) => Promise<void>;
  deleteStory: (storyId: string) => Promise<void>;
}

export const useStoryStore = create<StoryState>()(
  persist(
    (set, get) => ({
      stories: [],
      addStory: (story) => {
        set((state) => ({
          stories: [story, ...state.stories],
        }));
      },
      fetchStories: async (userId) => {
        try {
          const { data, error } = await supabase
            .from('stories')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

          if (error) throw error;
          set({ stories: data || [] });
        } catch (error) {
          console.error('Error fetching stories:', error);
          throw error;
        }
      },
      deleteStory: async (storyId) => {
        try {
          const { error } = await supabase
            .from('stories')
            .delete()
            .eq('id', storyId);

          if (error) throw error;

          set((state) => ({
            stories: state.stories.filter((story) => story.id !== storyId),
          }));
        } catch (error) {
          console.error('Error deleting story:', error);
          throw error;
        }
      },
    }),
    {
      name: 'story-storage',
    }
  )
);