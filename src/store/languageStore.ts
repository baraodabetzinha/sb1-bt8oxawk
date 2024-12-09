import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  language: 'pt-BR' | 'en';
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'pt-BR',
      toggleLanguage: () => set((state) => ({ 
        language: state.language === 'pt-BR' ? 'en' : 'pt-BR' 
      })),
    }),
    {
      name: 'language-storage',
    }
  )
);