import React from 'react';

const AuthLayout = ({ children, isLogin }) => {
  return (
    <div className="bg-[#080808] min-h-screen text-white flex flex-col lg:flex-row font-display">
      <div className="relative hidden lg:flex lg:w-1/2 flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-center bg-no-repeat bg-cover opacity-40" 
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-[#39FF14] p-2 rounded-lg shadow-[0_0_10px_rgba(57,255,20,0.4)]">
            <span className="material-symbols-outlined text-black font-bold">swap_horiz</span>
          </div>
          <h2 className="text-white text-2xl font-bold tracking-tight">SwapSkill</h2>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-[#39FF14] text-5xl font-bold leading-tight mb-6 drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]">
            Master new skills by teaching what you know.
          </h1>
          <p className="text-slate-300 text-lg">Join the global peer-to-peer exchange where expertise is the currency.</p>
        </div>

        <div className="relative z-10 flex gap-12">
          <div>
            <p className="text-[#39FF14] text-3xl font-bold">15k+</p>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Active Learners</p>
          </div>
          <div>
            <p className="text-[#39FF14] text-3xl font-bold">500+</p>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Skills Exchanged</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-24 bg-[#080808] relative">
        <div className="mx-auto w-full max-w-[460px] bg-[#121212]/70 backdrop-blur-xl border border-white/10 p-8 lg:p-10 rounded-2xl shadow-2xl">
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="bg-[#39FF14] p-2 rounded-lg">
              <span className="material-symbols-outlined text-black">swap_horiz</span>
            </div>
            <h2 className="text-white text-xl font-bold">SwapSkill</h2>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Join SwapSkill'}
            </h2>
            <p className="text-slate-400 mb-8">
              {isLogin ? 'Login to your account.' : 'Create account to start swapping skills.'}
            </p>
          </div>

          {children}

          <footer className="mt-12 text-center text-slate-500 text-sm">
            © 2026 SwapSkill. Empowering peer-to-peer learning.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;