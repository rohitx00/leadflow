import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeadTasks, createTask, updateTask } from '../api/task.api.js';
import { useAuth } from '../../auth/hooks/useAuth.jsx';

export const TaskList = ({ leadId }) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { data: tasksResponse, isLoading } = useQuery({
    queryKey: ['tasks', leadId],
    queryFn: () => getLeadTasks(leadId),
  });

  const createTaskMutation = useMutation({
    mutationFn: (data) => createTask(data),
    onSuccess: () => {
      setTitle('');
      setDueDate('');
      queryClient.invalidateQueries({ queryKey: ['tasks', leadId] });
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', leadId] });
      queryClient.invalidateQueries({ queryKey: ['my-tasks'] });
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    
    // Assign to self for now, or allow selecting assignee later
    createTaskMutation.mutate({
      title,
      dueDate: new Date(dueDate).toISOString(),
      leadId,
      assignedToId: user.id
    });
  };

  const handleToggleComplete = (task) => {
    updateTaskMutation.mutate({
      id: task.id,
      data: { isCompleted: !task.isCompleted }
    });
  };

  if (isLoading) return <div className="text-gray-500 italic p-4">Loading tasks...</div>;
  
  const tasks = tasksResponse?.data || [];
  const pendingTasks = tasks.filter(t => !t.isCompleted);
  const completedTasks = tasks.filter(t => t.isCompleted);

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        Tasks
        <span className="ml-2 bg-blue-100 text-blue-800 text-xs py-0.5 px-2 rounded-full">
          {pendingTasks.length} pending
        </span>
      </h2>
      
      <form onSubmit={handleCreate} className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-100 flex flex-col md:flex-row gap-3">
        <input 
          type="text" 
          placeholder="Task title (e.g., Call to follow up)"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input 
          type="datetime-local" 
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />
        <button 
          type="submit" 
          disabled={createTaskMutation.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow-sm text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Add
        </button>
      </form>

      <div className="space-y-4">
        {pendingTasks.map(task => (
          <div key={task.id} className="flex items-start gap-3 p-3 border border-blue-100 bg-blue-50/30 rounded-md">
            <input 
              type="checkbox" 
              className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              checked={false}
              onChange={() => handleToggleComplete(task)}
              disabled={updateTaskMutation.isPending || task.assignedToId !== user.id}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{task.title}</p>
              <div className="text-xs text-gray-500 flex justify-between mt-1">
                <span>Due: {new Date(task.dueDate).toLocaleString()}</span>
                <span>Assignee: {task.assignedTo?.name}</span>
              </div>
            </div>
          </div>
        ))}

        {pendingTasks.length === 0 && <p className="text-sm text-gray-500 italic text-center py-2">No pending tasks.</p>}

        {completedTasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Completed Tasks</h3>
            <div className="space-y-2 opacity-60">
              {completedTasks.map(task => (
                <div key={task.id} className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={true}
                    onChange={() => handleToggleComplete(task)}
                    disabled={updateTaskMutation.isPending || task.assignedToId !== user.id}
                    className="h-4 w-4 text-gray-400 rounded border-gray-300 focus:ring-gray-400 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600 line-through">{task.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
