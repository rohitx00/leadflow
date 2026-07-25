import React from 'react';
import { Link } from 'react-router-dom';
import { UserList } from '../components/UserList.jsx';
import { CreateUserForm } from '../components/CreateUserForm.jsx';

export const UserManagementPage = () => {
  return (
    <div className="flex-grow bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/dashboard" className="text-blue-600 hover:underline flex items-center text-sm mb-2">
              &larr; Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-2/3">
            <UserList />
          </div>
          <div className="w-full md:w-1/3">
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
  );
};
