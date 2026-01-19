import React from 'react'

const AdminSidebar = () => {
   return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        <a href="/admin/dashboard">Dashboard</a>
        <a href="/admin/users">Users</a>
        <a href="/admin/skills">Skills</a>
        <a href="/admin/exchanges">Exchanges</a>
      </nav>
    </div>
  );
}

export default AdminSidebar