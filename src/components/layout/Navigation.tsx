import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BookOpen, LogOut, User } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  if (!user) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-xl">Criador de Histórias</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Painel
              </Link>
              <Link
                to="/create"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/create'
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Criar História
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:block">Perfil de {user.child_name}</span>
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:block">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}