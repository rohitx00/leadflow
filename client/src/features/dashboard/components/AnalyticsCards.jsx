import React from 'react';

export const AnalyticsCards = ({ leads = [] }) => {
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === 'NEW').length;
  const wonLeads = leads.filter(l => l.status === 'CONVERTED').length;
  const lostLeads = leads.filter(l => l.status === 'LOST').length;

  const closedLeads = wonLeads + lostLeads;
  const conversionRate = closedLeads === 0 ? 0 : Math.round((wonLeads / closedLeads) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
        <h3 className="text-gray-500 text-sm font-medium">Total Leads</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{total}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
        <h3 className="text-gray-500 text-sm font-medium">New Leads</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{newLeads}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
        <h3 className="text-gray-500 text-sm font-medium">Won Leads</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{wonLeads}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
        <h3 className="text-gray-500 text-sm font-medium">Win Rate</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{conversionRate}%</p>
      </div>
    </div>
  );
};
