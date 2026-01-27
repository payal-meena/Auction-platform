import React from 'react';
import { LogOut as LogOutIcon, X } from 'lucide-react';

const LogOut = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop with Heavy Blur (Theme Style) */}
      <div 
        className="absolute inset-0 bg-[#050a06]/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card - Dark Theme with Green Glow */}
      <div className="relative bg-[#102216] w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-[#13ec5b]/10 animate-in zoom-in-95 duration-300">
        
        {/* Top Glow Accent (Neon Green) */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#13ec5b] to-transparent opacity-50" />

        <div className="p-10 flex flex-col items-center text-center">
          {/* Neon Icon Container */}
          <div className="size-24 rounded-[2rem] bg-[#13ec5b]/5 flex items-center justify-center mb-8 relative group">
            {/* Pulsing Outer Glow */}
            <div className="absolute inset-0 bg-[#13ec5b]/10 blur-2xl rounded-full animate-pulse" />
            
            <div className="relative z-10 size-16 rounded-2xl bg-[#13ec5b]/10 flex items-center justify-center border border-[#13ec5b]/20">
              <LogOutIcon size={32} className="text-[#13ec5b]" />
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-3">
            Confirmation
          </h2>
          <p className="text-[#92c9a4] text-[10px] font-black leading-relaxed max-w-[220px] uppercase tracking-[0.2em] opacity-60">
            Confirm if you wish to securely logout from your dashboard.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 w-full mt-12">
            <button 
              onClick={onClose}
              className="px-6 py-4 rounded-2xl border border-[#23482f] text-[#92c9a4] font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95"
            >
              Cancel
            </button>
            
            <button 
              onClick={onConfirm}
              className="px-6 py-4 rounded-2xl bg-[#13ec5b] text-[#102216] font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_30px_rgba(19,236,91,0.4)] hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Confirm Logout
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-[#92c9a4]/30 hover:text-[#13ec5b] transition-colors"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export default LogOut;