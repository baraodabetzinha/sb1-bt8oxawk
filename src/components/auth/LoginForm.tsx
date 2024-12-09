import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogIn, UserPlus, KeyRound, ArrowRight } from 'lucide-react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const { signIn, signInWithGoogle, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      console.error('Falha no login:', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Falha no login com Google:', err);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.auth.resetPasswordForEmail(recoveryEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      setRecoverySuccess(true);
    } catch (err) {
      console.error('Falha ao enviar email de recuperação:', err);
    }
  };

  if (isRecovering) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recuperar Senha</h2>
            <button
              onClick={() => setIsRecovering(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {recoverySuccess ? (
            <div className="text-center space-y-4">
              <div className="bg-green-50 text-green-800 p-4 rounded-lg">
                <p>Email de recuperação enviado!</p>
                <p className="text-sm mt-2">Verifique sua caixa de entrada para redefinir sua senha.</p>
              </div>
              <button
                onClick={() => {
                  setIsRecovering(false);
                  setRecoverySuccess(false);
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Voltar para o login
              </button>
            </div>
          ) : (
            <form onSubmit={handleRecoverySubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Digite seu email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <KeyRound className="w-5 h-5 mr-2" />
                Enviar Email de Recuperação
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Bem-vindo de Volta!</h2>
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

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/register"
              className="text-purple-600 hover:text-purple-500 font-medium flex items-center"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Criar conta
            </Link>
            <button
              type="button"
              onClick={() => setIsRecovering(true)}
              className="text-purple-600 hover:text-purple-500 font-medium"
            >
              Esqueceu a senha?
            </button>
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
                Entrando...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Entrar
              </>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou continue com</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Entrar com Google
          </button>
        </form>
      </div>
    </div>
  );
}