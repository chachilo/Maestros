import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ClipboardList, User } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Welcome to your teacher portal. Manage your groups and track attendance.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/groups"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Groups</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your student groups
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/attendance"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Attendance</h2>
              <p className="mt-1 text-sm text-gray-500">
                Take and view attendance
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/profile"
          className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-gray-500">
                View and edit your profile
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}