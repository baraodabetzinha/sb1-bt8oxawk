import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, Wand2, User } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';

export function MobileNavigation() {
  const location = useLocation();
  const { language } = useLanguageStore();

  const navItems = [
    {
      path: '/dashboard',
      icon: <LayoutDashboard className="w-6 h-6" />,
      label: language === 'pt-BR' ? 'Painel' : 'Dashboard'
    },
    {
      path: '/stories',
      icon: <Library className="w-6 h-6" />,
      label: language === 'pt-BR' ? 'Histórias' : 'Stories'
    },
    {
      path: '/create',
      icon: <Wand2 className="w-6 h-6" />,
      label: language === 'pt-BR' ? 'Criar' : 'Create'
    },
    {
      path: '/profile',
      icon: <User className="w-6 h-6" />,
      label: language === 'pt-BR' ? 'Perfil' : 'Profile'
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              location.pathname === item.path
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}