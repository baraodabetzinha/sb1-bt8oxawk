import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserPlus, ArrowLeft } from 'lucide-react';

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const { signUp, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password, {
        full_name: fullName,
        child_name: childName,
        birth_date: new Date(new Date().getFullYear() - parseInt(childAge), 0, 1).toISOString(),
      });
    } catch (err) {
      console.error('Falha no cadastro:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Criar Conta</h2>
          <Link
            to="/login"
            className="text-purple-600 hover:text-purple-700 flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Voltar
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Digite seu email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Criança</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Digite o nome da criança"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Idade da Criança</label>
            <input
              type="number"
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Digite a idade da criança"
              min="1"
              max="12"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
              isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⭐</span>
                Criando conta...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 mr-2" />
                Criar Conta
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}