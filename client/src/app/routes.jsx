import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import DashboardPage from '../features/dashboard/DashboardPage.jsx';
import { ProtectedRoute } from '../components/layout/ProtectedRoute.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
