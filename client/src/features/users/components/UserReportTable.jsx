import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserReport } from '../api/user.api.js';

export const UserReportTable = () => {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ['userReport'],
    queryFn: getUserReport
  });

  if (isLoading) return <div className="p-4 text-center text-gray-500">Loading report...</div>;
  if (isError) return <div className="p-4 text-center text-red-500">Failed to load user report.</div>;

  const users = response?.data || [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Team Performance Report</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team Member
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Assigned
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Pipeline
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversion Rate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Breakdown
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-gray-700">
                  {user.totalAssigned}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-blue-600">
                  {user.activeLeads}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.conversionRate > 20 ? 'bg-green-100 text-green-800' : 
                    user.conversionRate > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.conversionRate}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded" title="New">N: {user.statusBreakdown?.NEW || 0}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded" title="Contacted">C: {user.statusBreakdown?.CONTACTED || 0}</span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded" title="Qualified">Q: {user.statusBreakdown?.QUALIFIED || 0}</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded" title="Converted">V: {user.statusBreakdown?.CONVERTED || 0}</span>
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded" title="Lost">L: {user.statusBreakdown?.LOST || 0}</span>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                  No team members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
