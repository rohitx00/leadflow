import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage.jsx';
import DashboardPage from '../features/dashboard/DashboardPage.jsx';
import PublicLeadForm from '../features/leads/pages/PublicLeadForm.jsx';
import { LeadDetailPage } from '../features/leads/pages/LeadDetailPage.jsx';
import { ProtectedRoute } from '../components/layout/ProtectedRoute.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLeadForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/leads/:id" 
        element={
          <ProtectedRoute>
            <LeadDetailPage />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
