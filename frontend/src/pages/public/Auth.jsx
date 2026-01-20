import React, { useState } from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm'; // Similar to LoginForm structure
import { Link } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout 
      title={isLogin ? "Welcome Back" : "Join the Ecosystem"} 
      subtitle="Enter the ecosystem of peer learning"
    >
      <div className="w-full mb-10">
        <div className="flex h-12 w-full items-center justify-center rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-sm">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 h-full rounded-full text-sm font-bold transition-all duration-300 ${isLogin ? 'bg-primary text-background-dark' : 'text-white/50 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 h-full rounded-full text-sm font-bold transition-all duration-300 ${!isLogin ? 'bg-primary text-background-dark' : 'text-white/50 hover:text-white'}`}
          >
            Register
          </button>
        </div>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div className="mt-12 w-full">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>
          <span className="relative bg-[#0a0f0c] px-4 text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">Or connect with</span>
        </div>
        <div className="flex justify-center gap-6">
          <SocialButton icon="globe" />
          <SocialButton icon="terminal" />
          <SocialButton icon="school" />
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-white/30 text-xs font-light">
          By continuing, you agree to SwapSkill's <a className="text-white/60 hover:text-[#25f47b] underline transition-colors" href="#terms">Terms of Service</a>
        </p>
      </div>
    </AuthLayout>    
  );
};

const SocialButton = ({ icon }) => (
  <button className="size-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary hover:shadow-[0_0_15px_rgba(37,244,123,0.1)] transition-all">
    <span className="material-symbols-outlined text-2xl">{icon}</span>
  </button>
);

export default AuthPage;