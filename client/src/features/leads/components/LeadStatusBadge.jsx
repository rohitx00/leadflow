import React from 'react';

const statusColors = {
  NEW: 'bg-blue-100 text-blue-800 border-blue-200',
  CONTACTED: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  QUALIFIED: 'bg-purple-100 text-purple-800 border-purple-200',
  PROPOSAL: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  WON: 'bg-green-100 text-green-800 border-green-200',
  LOST: 'bg-red-100 text-red-800 border-red-200',
};

export const LeadStatusBadge = ({ status }) => {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {status}
    </span>
  );
};
