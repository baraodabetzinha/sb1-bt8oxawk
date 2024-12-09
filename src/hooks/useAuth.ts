import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { getAuthErrorMessage } from '../utils/errorHandling';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate('/create');
    } catch (err) {
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/create`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, profile: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await signUp(email, password, profile);
      navigate('/create');
    } catch (err) {
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      setError(getAuthErrorMessage(err));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    signIn: handleSignIn,
    signInWithGoogle: handleSignInWithGoogle,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
}