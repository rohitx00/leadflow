import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLeads } from '../leads/api/lead.api.js';
import { LeadList } from '../leads/components/LeadList.jsx';
import { LeadBoard } from '../leads/components/LeadBoard.jsx';
import { AnalyticsCards } from './components/AnalyticsCards.jsx';
import { DashboardTasks } from '../tasks/components/DashboardTasks.jsx';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');
  const [viewMode, setViewMode] = useState('LIST');

  // Use a debounced search value for the API query
  const [debouncedSearch, setDebouncedSearch] = React.useState('');
  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filters = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(statusFilter && { status: statusFilter }),
    ...(assigneeFilter && { assignedToId: assigneeFilter }),
  };

  const { data: leadsResponse, isLoading, isError } = useQuery({
    queryKey: ['leads', filters],
    queryFn: () => getLeads(filters)
  });

  const leads = leadsResponse?.data || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Lead Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, <strong className="text-gray-900">{user?.name}</strong> ({user?.role})
            </span>
            <div className="flex bg-white rounded-lg shadow-sm border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('LIST')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'LIST' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('BOARD')}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  viewMode === 'BOARD' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Board
              </button>
            </div>
            {user?.role === 'ADMIN' && (
              <button 
                onClick={() => navigate('/dashboard/users')}
                className="bg-purple-100 border border-purple-200 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded shadow-sm transition"
              >
                Manage Users
              </button>
            )}
            <button 
              onClick={handleLogout}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded shadow-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
        
        <AnalyticsCards leads={leads} />
        
        <DashboardTasks />

        <div className="mb-8">
          {viewMode === 'LIST' ? (
            <LeadList 
              leads={leads} 
              isLoading={isLoading} 
              isError={isError}
              search={search}
              setSearch={setSearch}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              assigneeFilter={assigneeFilter}
              setAssigneeFilter={setAssigneeFilter}
            />
          ) : (
            <LeadBoard 
              leads={leads}
              isLoading={isLoading}
              isError={isError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
