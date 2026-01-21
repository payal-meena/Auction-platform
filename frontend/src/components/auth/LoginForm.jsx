import React from 'react';

const LoginForm = () => (
  <form className="w-full space-y-8" onSubmit={(e) => e.preventDefault()}>
    <div className="flex flex-col w-full group">
      <label className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold mb-1 ml-1 group-focus-within:text-primary transition-colors text-left">Email Address</label>
      <input className="w-full bg-transparent border-0 border-b border-white/10 text-white py-3 px-1 text-sm font-light focus:ring-0 focus:outline-none focus:border-primary transition-all duration-300" placeholder="alex@example.com" type="email"/>
    </div>
    <div className="flex flex-col w-full group">
      <div className="flex justify-between items-end mb-1">
        <label className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold ml-1 group-focus-within:text-primary transition-colors">Password</label>
        <a className="text-white/30 hover:text-primary text-[10px] uppercase tracking-widest transition-colors" href="#forgot">Forgot?</a>
      </div>
      <input className="w-full bg-transparent border-0 border-b border-white/10 text-white py-3 px-1 text-sm font-light focus:ring-0 focus:outline-none focus:border-primary transition-all duration-300" placeholder="••••••••" type="password"/>
    </div>
    <div className="pt-6">
      <button className="w-full bg-primary text-[#0a0f0c] h-14 rounded-full font-extrabold text-base tracking-tight hover:shadow-[0_0_20px_rgba(37,244,123,0.4)] transition-all duration-300 active:scale-[0.98]" type="submit">
        Sign In
      </button>
    </div>
  </form>
);

export default LoginForm;