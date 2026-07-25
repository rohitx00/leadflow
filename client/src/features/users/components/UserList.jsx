import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUserRole, updateUserStatus, deleteUser } from '../api/user.api.js';
import { useAuth } from '../../auth/hooks/useAuth.jsx';

export const UserList = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  const { data: usersResponse, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const updateRoleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      alert(err.response?.data?.error?.message || 'Failed to update role');
    }
  });
  
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, isActive }) => updateUserStatus(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      alert(err.response?.data?.error?.message || 'Failed to update status');
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      alert(err.response?.data?.error?.message || 'Failed to delete user');
    }
  });

  const handleRoleChange = (id, newRole) => {
    if (id === currentUser.id) {
      alert('You cannot change your own role.');
      return;
    }
    updateRoleMutation.mutate({ id, role: newRole });
  };
  
  const handleStatusChange = (id, isActive) => {
    if (id === currentUser.id) {
      alert('You cannot deactivate your own account.');
      return;
    }
    updateStatusMutation.mutate({ id, isActive });
  };

  const handleDelete = (id) => {
    if (id === currentUser.id) {
      alert('You cannot delete your own account.');
      return;
    }
    if (window.confirm('Are you sure you want to permanently delete this user? This will also destroy all their assigned tasks and notes!')) {
      deleteUserMutation.mutate(id);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load users.</div>;

  const users = usersResponse?.data || [];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className={`hover:bg-gray-50 ${!user.isActive ? 'opacity-60 bg-gray-50' : ''}`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {user.name} 
                  {user.id === currentUser.id && <span className="text-blue-500 text-xs ml-1">(You)</span>}
                  {!user.isActive && <span className="text-red-500 text-xs ml-2 font-bold uppercase">Deactivated</span>}
                </div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  disabled={user.id === currentUser.id || updateRoleMutation.isPending || !user.isActive}
                  className={`block w-32 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-1.5 transition-colors duration-200 ${
                    updateRoleMutation.isPending && updateRoleMutation.variables?.id === user.id
                      ? 'bg-blue-100 text-blue-800 animate-pulse border-blue-300'
                      : user.role === 'ADMIN' ? 'bg-purple-50 text-purple-800 border-purple-200 font-semibold' : 'bg-white text-gray-800 border-gray-200'
                  }`}
                >
                  <option value="MEMBER">MEMBER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => handleStatusChange(user.id, !user.isActive)}
                    disabled={user.id === currentUser.id || updateStatusMutation.isPending}
                    className={`${user.isActive ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'} font-semibold disabled:opacity-50 transition-colors`}
                  >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    disabled={user.id === currentUser.id || deleteUserMutation.isPending}
                    className="text-red-600 hover:text-red-900 font-semibold disabled:opacity-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
