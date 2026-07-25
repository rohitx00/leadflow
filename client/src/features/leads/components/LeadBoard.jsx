import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLeadStatus } from '../api/lead.api.js';
import { LeadCard } from './LeadCard.jsx';

const columns = [
  { id: 'NEW', title: 'New Leads', color: 'bg-blue-50 border-blue-200' },
  { id: 'CONTACTED', title: 'Contacted', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'QUALIFIED', title: 'Qualified', color: 'bg-purple-50 border-purple-200' },
  { id: 'CONVERTED', title: 'Won / Converted', color: 'bg-green-50 border-green-200' },
  { id: 'LOST', title: 'Lost', color: 'bg-red-50 border-red-200' },
];

export const LeadBoard = ({ leads, isLoading, isError }) => {
  const queryClient = useQueryClient();

  const updateLeadMutation = useMutation({
    mutationFn: ({ id, data }) => updateLeadStatus(id, data),
    onMutate: async ({ id, data }) => {
      // Optimistic update for snappy drag and drop
      await queryClient.cancelQueries({ queryKey: ['leads'] });
      const previousLeads = queryClient.getQueryData(['leads']);
      
      // We don't have the exact filters used in the query key easily available here without context,
      // but if we are just invalidating on success, the UI will be snappy enough or we can safely 
      // rely on the fast server response. For true optimistic, we'd need to update all matching cache keys.
      // Let's stick to the fast server invalidation for simplicity.
      return { previousLeads };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Trigger update
    const newStatus = destination.droppableId;
    updateLeadMutation.mutate({ id: draggableId, data: { status: newStatus } });
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading board...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Error loading board.</div>;

  return (
    <div className="overflow-x-auto pb-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 min-w-max items-start">
          {columns.map((column) => {
            const columnLeads = leads.filter((lead) => lead.status === column.id);

            return (
              <div key={column.id} className={`w-80 flex-shrink-0 flex flex-col rounded-lg border ${column.color} max-h-[75vh]`}>
                <div className="p-3 border-b border-gray-200/50 flex justify-between items-center bg-white/50 rounded-t-lg">
                  <h3 className="font-semibold text-gray-800">{column.title}</h3>
                  <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">
                    {columnLeads.length}
                  </span>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 overflow-y-auto p-3 min-h-[150px] transition-colors ${snapshot.isDraggingOver ? 'bg-black/5' : ''}`}
                    >
                      {columnLeads.map((lead, index) => (
                        <LeadCard key={lead.id} lead={lead} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};
