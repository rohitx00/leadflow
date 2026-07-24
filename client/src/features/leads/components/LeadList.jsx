import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeads, updateLeadStatus, deleteLead } from '../api/lead.api.js';
import { getUsers } from '../../users/api/user.api.js';
import { LeadStatusBadge } from './LeadStatusBadge.jsx';
import { useAuth } from '../../auth/hooks/useAuth.jsx';

export const LeadList = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const { data: leadsResponse, isLoading, isError } = useQuery({
    queryKey: ['leads'],
    queryFn: getLeads
  });

  const { data: usersResponse } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    enabled: user?.role === 'ADMIN',
  });

  const updateLeadMutation = useMutation({
    mutationFn: ({ id, data }) => updateLeadStatus(id, data), // updateLeadStatus accepts (id, data) natively now, wait, no it doesn't. We need to update lead.api.js next.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: (id) => deleteLead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  if (isLoading) return <div className="text-gray-500 p-4 text-center mt-8">Loading leads...</div>;
  if (isError) return <div className="text-red-500 p-4 text-center mt-8">Error loading leads.</div>;

  const leads = leadsResponse?.data || [];
  const users = usersResponse?.data || [];
  
  const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST'];

  const handleStatusChange = (id, newStatus) => {
    updateLeadMutation.mutate({ id, data: { status: newStatus } });
  };
  
  const handleAssigneeChange = (id, newAssigneeId) => {
    updateLeadMutation.mutate({ id, data: { assignedToId: newAssigneeId || null } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLeadMutation.mutate(id);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company/Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No leads found. Waiting for submissions!
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/dashboard/leads/${lead.id}`} className="font-medium text-blue-600 hover:text-blue-800 hover:underline">
                      {lead.firstName} {lead.lastName}
                    </Link>
                    <div className="text-sm text-gray-500">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.company || '-'}</div>
                    <div className="text-sm text-gray-500">{lead.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user?.role === 'ADMIN' ? (
                      <select
                        value={lead.assignedToId || ''}
                        onChange={(e) => handleAssigneeChange(lead.id, e.target.value)}
                        disabled={updateLeadMutation.isPending}
                        className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-1.5 bg-white text-gray-700"
                      >
                        <option value="">Unassigned</option>
                        {users.map(u => (
                          <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm text-gray-700">
                        {lead.assignedTo?.name || <span className="text-gray-400 italic">Unassigned</span>}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        disabled={updateLeadMutation.isPending}
                        className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-1.5 bg-white text-gray-700"
                      >
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {user?.role === 'ADMIN' && (
                        <button 
                          onClick={() => handleDelete(lead.id)}
                          disabled={deleteLeadMutation.isPending}
                          className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50 transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
