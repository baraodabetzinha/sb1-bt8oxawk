import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { useLanguageStore } from '../../store/languageStore';
import { MobileNavigation } from './MobileNavigation';
import { 
  BookOpen, 
  LogOut, 
  User, 
  LayoutDashboard, 
  Wand2, 
  Moon, 
  Sun, 
  ChevronLeft, 
  ChevronRight,
  Library,
  Globe
} from 'lucide-react';

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const user = useAuthStore(state => state.user);
  const signOut = useAuthStore(state => state.signOut);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDark, toggleTheme } = useThemeStore();
  const { language, toggleLanguage } = useLanguageStore();

  if (!user) return <>{children}</>;

  const totalStories = user.stories_created + user.stories_available;
  const progress = (user.stories_created / totalStories) * 100;

  return (
    <div className={`flex h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {/* Desktop Sidebar */}
      <div className={`hidden md:block ${isCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 relative`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b dark:border-gray-700">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              {!isCollapsed && <span className="font-bold text-lg dark:text-white">
                {language === 'pt-BR' ? 'Criador de Histórias' : 'Story Creator'}
              </span>}
            </Link>
          </div>

          {!isCollapsed && (
            <div className="p-4 border-b dark:border-gray-700">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{language === 'pt-BR' ? 'Progresso' : 'Progress'}</span>
                  <span>
                    {user.stories_created} {language === 'pt-BR' ? 'de' : 'of'} {totalStories} {language === 'pt-BR' ? 'histórias' : 'stories'}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-600'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                {!isCollapsed && <span>{language === 'pt-BR' ? 'Painel' : 'Dashboard'}</span>}
              </Link>
              <Link
                to="/stories"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  location.pathname === '/stories'
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-600'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Library className="w-5 h-5" />
                {!isCollapsed && <span>{language === 'pt-BR' ? 'Minhas Histórias' : 'My Stories'}</span>}
              </Link>
              <Link
                to="/create"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  location.pathname === '/create'
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-600'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Wand2 className="w-5 h-5" />
                {!isCollapsed && <span>{language === 'pt-BR' ? 'Criar História' : 'Create Story'}</span>}
              </Link>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  location.pathname === '/profile'
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-600'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span>{language === 'pt-BR' ? 'Perfil' : 'Profile'}</span>}
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t dark:border-gray-700 space-y-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 w-full p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Globe className="w-5 h-5" />
              {!isCollapsed && <span>
                {language === 'pt-BR' ? 'English' : 'Português'}
              </span>}
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 w-full p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              {!isCollapsed && <span>
                {language === 'pt-BR' 
                  ? (isDark ? 'Modo Claro' : 'Modo Escuro')
                  : (isDark ? 'Light Mode' : 'Dark Mode')
                }
              </span>}
            </button>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 w-full p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {!isCollapsed && <span>{language === 'pt-BR' ? 'Sair' : 'Sign Out'}</span>}
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-auto pb-16 md:pb-0">
        <main className="p-8">
          <div className={`${isDark ? 'dark' : ''}`}>
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
}