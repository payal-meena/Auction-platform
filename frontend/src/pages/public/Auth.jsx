import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthLayout isLogin={isLogin}>
      <div className="flex h-12 w-full items-center justify-center rounded-xl bg-white/5 p-1 mb-8 border border-white/10">
        <button 
          onClick={() => setIsLogin(true)}
          className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all cursor-pointer ${isLogin ? 'bg-white/10 text-white' : 'text-slate-500'}`}
        >
          Login
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all cursor-pointer ${!isLogin ? 'bg-gradient-to-r from-[#39FF14] to-[#00cc00] text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]' : 'text-slate-500'}`}
        >
          Sign Up
        </button>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </AuthLayout>
  );
};

export default Auth;