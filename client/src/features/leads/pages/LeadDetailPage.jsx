import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLeadById, addLeadNote } from '../api/lead.api.js';
import { LeadStatusBadge } from '../components/LeadStatusBadge.jsx';
import { TaskList } from '../../tasks/components/TaskList.jsx';

export const LeadDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [noteContent, setNoteContent] = useState('');

  const { data: leadResponse, isLoading, isError } = useQuery({
    queryKey: ['lead', id],
    queryFn: () => getLeadById(id),
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ content }) => addLeadNote(id, content),
    onSuccess: () => {
      setNoteContent('');
      queryClient.invalidateQueries({ queryKey: ['lead', id] });
    },
  });

  if (isLoading || !leadResponse) return <div className="text-center p-8 text-gray-500">Loading lead details...</div>;
  if (isError) return <div className="text-center p-8 text-red-500">Failed to load lead details.</div>;

  const lead = leadResponse?.data;
  if (!lead) return <div className="text-center p-8 text-red-500">Lead not found.</div>;

  // Combine notes and activities into a single timeline, sorted by date descending
  const timelineEvents = [
    ...(lead.notes || []).map(note => ({ ...note, type: 'NOTE' })),
    ...(lead.activities || []).map(activity => ({ ...activity, type: 'ACTIVITY' }))
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    addNoteMutation.mutate({ content: noteContent });
  };

  return (
    <div className="flex-grow bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <div>
          <Link to="/dashboard" className="text-blue-600 hover:underline flex items-center">
            &larr; Back to Dashboard
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{lead.firstName} {lead.lastName || ''}</h1>
              <p className="text-gray-500 mt-1">{lead.email} {lead.phone && `• ${lead.phone}`}</p>
            </div>
            <LeadStatusBadge status={lead.status} />
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500 font-medium">Company:</span> {lead.company || '-'}
            </div>
            <div>
              <span className="text-gray-500 font-medium">Source:</span> <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">{lead.source}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Assigned To:</span> {lead.assignedTo?.name || 'Unassigned'}
            </div>
            <div>
              <span className="text-gray-500 font-medium">Captured:</span> {new Date(lead.createdAt).toLocaleString()}
            </div>
            {lead.externalReference && (
              <div>
                <span className="text-gray-500 font-medium">Ext Ref:</span> {lead.externalReference}
              </div>
            )}
          </div>
          
          {lead.message && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
              <p className="text-gray-800 text-sm bg-gray-50 p-3 rounded-md italic">
                "{lead.message}"
              </p>
            </div>
          )}
        </div>

        {/* Task List Integration */}
        <TaskList leadId={lead.id} />

        {/* Note Input */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Add a Note</h2>
          <form onSubmit={handleNoteSubmit}>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              rows="3"
              placeholder="Write an internal note..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              disabled={addNoteMutation.isPending}
            ></textarea>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={addNoteMutation.isPending || !noteContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow-sm disabled:opacity-50 transition-colors"
              >
                {addNoteMutation.isPending ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </form>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Activity Timeline</h2>
          {timelineEvents.length === 0 ? (
            <p className="text-gray-500 italic">No activity yet.</p>
          ) : (
            <div className="space-y-6">
              {timelineEvents.map(event => (
                <div key={event.id} className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {event.type === 'NOTE' ? (
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        N
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        A
                      </div>
                    )}
                  </div>
                  <div className="flex-1 border-b border-gray-100 pb-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {event.type === 'NOTE' ? event.author?.name || 'Unknown' : 'System'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(event.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {event.type === 'NOTE' ? event.content : event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
