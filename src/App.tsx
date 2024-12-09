import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { SidebarLayout } from './components/layout/SidebarLayout';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { StoriesPage } from './components/stories/StoriesPage';
import { StoryCreator } from './components/story/StoryCreator';
import { ProfileManager } from './components/profile/ProfileManager';
import { ProtectedLoginRoute } from './components/auth/ProtectedLoginRoute';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { initialize, isInitialized, user } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedLoginRoute>
                <LoginForm />
              </ProtectedLoginRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedLoginRoute>
                <RegisterForm />
              </ProtectedLoginRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <PrivateRoute>
                <StoriesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <StoryCreator />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileManager />
              </PrivateRoute>
            }
          />
          <Route path="/" element={user ? <Navigate to="/create" /> : <Navigate to="/login" />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;