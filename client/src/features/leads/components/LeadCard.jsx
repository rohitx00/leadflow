import React from 'react';
import { Link } from 'react-router-dom';
import { Draggable } from '@hello-pangea/dnd';

export const LeadCard = ({ lead, index }) => {
  return (
    <Draggable draggableId={lead.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-3 hover:shadow-md transition-shadow ${snapshot.isDragging ? 'opacity-90 ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex justify-between items-start mb-2">
            <Link to={`/dashboard/leads/${lead.id}`} className="font-semibold text-gray-900 hover:text-blue-600 truncate mr-2">
              {lead.firstName} {lead.lastName || ''}
            </Link>
          </div>
          
          <div className="text-sm text-gray-600 truncate mb-1">
            {lead.company || <span className="italic text-gray-400">No company</span>}
          </div>
          
          <div className="text-xs text-gray-500 truncate mb-3">
            {lead.email}
          </div>
          
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {new Date(lead.createdAt).toLocaleDateString()}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 max-w-[100px] truncate">
              {lead.assignedTo?.name || 'Unassigned'}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};
