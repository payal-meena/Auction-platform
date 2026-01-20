import React from 'react';

const NavItem = ({ icon, label, active = false, badge = false }) => (
  <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer relative ${
    active ? 'bg-[#13ec5b]/10 text-[#13ec5b]' : 'text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-[#23482f]'
  }`}>
    <span className={`material-symbols-outlined ${active ? 'fill-icon' : ''}`}>{icon}</span>
    <p className={`text-sm ${active ? 'font-semibold' : 'font-medium'}`}>{label}</p>
    {badge && <span className="absolute right-3 top-1/2 -translate-y-1/2 flex h-2 w-2 rounded-full bg-[#13ec5b]"></span>}
  </div>
);

const UserSidebar = () => {
  return (
    <aside className="w-64 hidden lg:flex flex-col bg-white dark:bg-[#112217] border-r border-slate-200 dark:border-[#23482f] p-6 justify-between h-screen sticky top-0">
      <div className="flex flex-col gap-8">
        <div className="flex gap-3 items-center px-2">
          <div className="bg-[#13ec5b] rounded-lg p-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#102216] font-bold">swap_horiz</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">SwapSkill</h1>
            <p className="text-slate-500 dark:text-[#92c9a4] text-xs font-normal">Peer-to-Peer Learning</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem icon="dashboard" label="Dashboard" active />
          <NavItem icon="psychology" label="My Skills" />
          <NavItem icon="handshake" label="Requests" badge />
          <NavItem icon="chat_bubble" label="Messages" />
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <NavItem icon="settings" label="Settings" />
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer">
          <span className="material-symbols-outlined">logout</span>
          <p className="text-sm font-medium">Logout</p>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;