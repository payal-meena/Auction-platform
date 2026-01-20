import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-white transition-colors duration-300 relative overflow-hidden">
      
      <main className="flex-1 flex items-center justify-center relative px-4 py-12 z-10" 
            // style={{ background: 'radial-gradient(circle at center, rgba(37, 244, 123, 0.08) 0%, rgba(10, 15, 12, 1) 70%)' }}
            >
        <div className="max-w-[440px] w-full flex flex-col items-center">
          
          <Link to="/" className="mb-8 group">
            <div className="size-12 text-primary transition-transform duration-300 group-hover:scale-110">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor"></path>
              </svg>
            </div>
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-white text-4xl font-extrabold tracking-tight mb-2">{title}</h1>
            <p className="text-[#25f47b]/60 text-sm font-light tracking-wide">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </main>

      {/* <div className="fixed top-1/4 -left-20 size-80 bg-[#25f47b]/5 rounded-full blur-[100px] pointer-events-none"></div> */}
      {/* <div className="fixed bottom-1/4 -right-20 size-96 bg-[#25f47b]/5 rounded-full blur-[120px] pointer-events-none"></div> */}
    </div>
  );
};

export default AuthLayout;