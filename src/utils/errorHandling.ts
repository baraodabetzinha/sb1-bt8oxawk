import { AuthError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    switch (error.message) {
      case 'Invalid login credentials':
        return 'Email ou senha inválidos';
      case 'Email not confirmed':
        return 'Por favor, verifique seu email';
      default:
        return error.message;
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Ocorreu um erro inesperado';
}

export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}