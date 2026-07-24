import React from 'react';
import { useAuth } from '../auth/hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Logout
          </button>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
          <p className="text-blue-800">Welcome back, <strong>{user?.name}</strong>!</p>
          <p className="text-sm text-blue-600 mt-1">Role: {user?.role}</p>
        </div>
        <p className="text-gray-600">This is a protected dashboard. Lead management features will go here.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
