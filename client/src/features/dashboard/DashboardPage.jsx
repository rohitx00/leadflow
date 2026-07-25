import React, { useState } from 'react';
import { useAuth } from '../auth/hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLeads } from '../leads/api/lead.api.js';
import { LeadList } from '../leads/components/LeadList.jsx';
import { AnalyticsCards } from './components/AnalyticsCards.jsx';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('');

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
            <button 
              onClick={handleLogout}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded shadow-sm transition"
            >
              Logout
            </button>
          </div>
        </div>
        
        <AnalyticsCards leads={leads} />

        <div className="mb-8">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
