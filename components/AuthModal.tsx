
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [aiGreeting, setAiGreeting] = useState("Welcome back to ZYRAJO");

  useEffect(() => {
    if (isOpen) {
      generateDynamicGreeting();
    }
  }, [isOpen]);

  const generateDynamicGreeting = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a very short (max 5 words) sophisticated fashion greeting for a high-end clothing store. Current context: ${isLogin ? 'returning customer' : 'new member'}.`,
      });
      if (response.text) {
        setAiGreeting(response.text.replace(/"/g, ''));
      }
    } catch (e) {
      console.error("AI Greeting failed", e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content - Fabrilife Inspired Clean Layout */}
      <div className="relative w-full max-w-[450px] bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header Bar */}
        <div className="h-1.5 bg-primary w-full"></div>
        
        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <h2 className="text-2xl font-serif font-bold text-primary mb-1">{isLogin ? 'Login' : 'Sign Up'}</h2>
              <p className="text-xs text-accent font-medium uppercase tracking-[0.2em]">{aiGreeting}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
                />
              </div>
            )}
            
            <div>
              <input 
                type="email" 
                placeholder="Email or Phone Number"
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
              />
            </div>

            <div>
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-all"
              />
              {isLogin && (
                <div className="flex justify-end mt-2">
                  <button className="text-[11px] text-gray-400 hover:text-primary transition-colors underline underline-offset-4">Forgot password?</button>
                </div>
              )}
            </div>

            <button className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-black transition-all shadow-md active:translate-y-0.5">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-gray-300">Or connect with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-3 border border-gray-200 py-3 hover:bg-gray-50 transition-all text-[11px] font-bold uppercase tracking-widest text-gray-600">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-3 border border-gray-200 py-3 hover:bg-gray-50 transition-all text-[11px] font-bold uppercase tracking-widest text-gray-600">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
              <span>Facebook</span>
            </button>
          </div>

          <div className="mt-10 border-t border-gray-50 pt-6 text-center">
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                generateDynamicGreeting();
              }}
              className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-primary transition-colors"
            >
              {isLogin ? "New to ZYRAJO? Create an account" : "Already a member? Sign in here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
