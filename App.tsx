
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AIStylist from './components/AIStylist';
import { Product } from './types';
import { BRAND_NAME } from './constants';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-secondary flex items-center justify-center z-[200]">
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-serif tracking-[1em] mb-8 animate-pulse text-primary">{BRAND_NAME}</h1>
            <div className="w-48 h-[1px] bg-gray-200 overflow-hidden relative">
                <div className="absolute inset-0 bg-accent animate-loading-bar"></div>
            </div>
            <p className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gray-400">Defining Excellence</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary relative overflow-x-hidden">
      <Header />
      
      <main className="transition-all duration-500">
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        ) : (
          <Home onProductClick={(p) => setSelectedProduct(p)} />
        )}
      </main>

      {/* Floating AI Stylist - Always accessible */}
      <AIStylist />

      {/* Footer */}
      <footer className="bg-primary text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif tracking-[0.2em] mb-6">{BRAND_NAME}</h2>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Synthesizing cutting-edge technology with timeless artistry to redefine the personal style experience.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Collections</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">Seasonal Edit</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">The Core Series</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Collaborations</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Archive</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Concierge</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent transition-colors">AI Styling Guide</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Bespoke Fitting</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Global Shipping</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Returns & Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">The Atelier</h4>
            <p className="text-sm text-gray-400 mb-6">Subscribe for exclusive early access and style insights.</p>
            <div className="flex border-b border-white/40 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent text-sm w-full outline-none placeholder-gray-600" />
                <button className="text-xs uppercase tracking-widest font-bold hover:text-accent transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.2em]">
          <p>© 2025 {BRAND_NAME} FASHION TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
            animation: loading-bar 1.5s infinite linear;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @keyframes slide-down {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
