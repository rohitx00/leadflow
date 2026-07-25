import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getMyTasks, updateTask } from '../api/task.api.js';

export const DashboardTasks = () => {
  const queryClient = useQueryClient();

  const { data: tasksResponse, isLoading } = useQuery({
    queryKey: ['my-tasks'],
    queryFn: getMyTasks,
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
      // Also invalidate the specific lead's tasks just in case they navigate there
      // We don't strictly know the leadId here unless we check the cached data, but 
      // global invalidation or just navigating will refetch anyway.
    },
  });

  const handleToggleComplete = (task) => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { isCompleted: !task.isCompleted }
    });
  };

  if (isLoading) return <div className="text-gray-500 italic p-4 text-center">Loading your tasks...</div>;

  const tasks = tasksResponse?.data || [];

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">My Upcoming Tasks</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length} pending
        </span>
      </div>
      
      <div className="p-4 max-h-80 overflow-y-auto">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm italic text-center py-4">You have no pending tasks. Great job!</p>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-100 bg-white hover:bg-gray-50 transition-colors rounded-md shadow-sm">
                <input 
                  type="checkbox" 
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                  checked={task.isCompleted}
                  onChange={() => handleToggleComplete(task)}
                  disabled={updateTaskMutation.isPending}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <div className="text-xs text-gray-500 flex justify-between mt-1">
                    <span className={new Date(task.dueDate) < new Date() ? 'text-red-500 font-medium' : ''}>
                      Due: {new Date(task.dueDate).toLocaleString()}
                    </span>
                    {task.lead && (
                      <Link to={`/dashboard/leads/${task.leadId}`} className="text-blue-600 hover:underline">
                        {task.lead.firstName} {task.lead.lastName || ''}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
