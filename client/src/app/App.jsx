import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">LeadFlow CRM</h1>
        <p className="text-gray-600 mb-6">
          Tailwind CSS, React, and Vite are successfully configured.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default App;
