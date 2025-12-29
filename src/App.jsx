import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AssetProvider } from './context/AssetContext';
import { UIProvider } from './context/UIContext';
import ProtectedRoute from './components/auth/protected-route/ProtectedRoute';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <AuthProvider>
      <AssetProvider>
        <UIProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UIProvider>
      </AssetProvider>
    </AuthProvider>
  );
}

export default App;