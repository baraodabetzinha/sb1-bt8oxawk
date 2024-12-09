import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedLoginRouteProps {
  children: React.ReactNode;
}

export function ProtectedLoginRoute({ children }: ProtectedLoginRouteProps) {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return user ? <Navigate to="/create" /> : <>{children}</>;
}