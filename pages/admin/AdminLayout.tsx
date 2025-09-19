
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-6 sm:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
