
import React, { useState, useRef, useEffect } from 'react';
import { BRAND_NAME } from '../constants';
import { searchWithAI } from '../services/geminiService';
import AuthModal from './AuthModal';
import TrackOrderModal from './TrackOrderModal';

const CATEGORIES = [
  { 
    name: 'MEN', 
    groups: [
      { title: 'Top Wear', items: ['T-Shirts', 'Polo Shirts', 'Casual Shirts', 'Formal Shirts', 'Jackets'] },
      { title: 'Bottom Wear', items: ['Denim', 'Chinos', 'Joggers', 'Formal Pants', 'Shorts'] },
      { title: 'Accessories', items: ['Belts', 'Wallets', 'Caps', 'Socks', 'Sunglasses'] }
    ]
  },
  { 
    name: 'WOMEN', 
    groups: [
      { title: 'Clothing', items: ['Dresses', 'Tops & Tees', 'Kurtis', 'Leggings', 'Skirts'] },
      { title: 'Bags & Shoes', items: ['Handbags', 'Clutches', 'Heels', 'Flats', 'Sneakers'] },
      { title: 'Jewelry', items: ['Earrings', 'Necklaces', 'Bracelets', 'Rings'] }
    ]
  },
  { 
    name: 'TEENS', 
    groups: [
      { title: 'Streetwear', items: ['Graphic Tees', 'Oversized Hoodies', 'Cargo Pants', 'Vests'] },
      { title: 'Lifestyle', items: ['Sneakers', 'Backpacks', 'Tech Sleeves', 'Watches'] }
    ]
  },
  { 
    name: 'KIDS', 
    groups: [
      { title: 'Boys', items: ['T-Shirts', 'Pants', 'Sets'] },
      { title: 'Girls', items: ['Dresses', 'Tops', 'Leggings'] },
      { title: 'Infant', items: ['Rompers', 'Accessories'] }
    ]
  },
  { 
    name: 'SPORTS', 
    groups: [
      { title: 'Activewear', items: ['Gym Tees', 'Leggings', 'Sports Bras', 'Tracksuits'] },
      { title: 'Gear', items: ['Yoga Mats', 'Training Shoes', 'Water Bottles'] }
    ]
  }
];

const Header: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const results = await searchWithAI(searchQuery);
    setAiSuggestions(results);
    setShowSuggestions(true);
    setIsSearching(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 h-[85px] flex items-center shadow-sm">
        <div className="max-w-[1440px] mx-auto w-full flex items-center h-full">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-2 mr-8 shrink-0">
            <div className="w-8 h-8 bg-primary transform -skew-x-12 flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-lg italic">Z</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-[#112040] cursor-pointer" onClick={() => window.location.reload()}>
              {BRAND_NAME}
            </h1>
          </div>

          {/* Categories Menu */}
          <div className="flex items-center space-x-8 text-[#112040] font-bold text-[13px] tracking-wide shrink-0 relative h-full" ref={menuRef}>
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="h-full flex items-center">
                <button 
                  onClick={() => setActiveMenu(activeMenu === cat.name ? null : cat.name)}
                  className={`hover:text-primary transition-all h-full flex items-center px-1 border-b-2 font-black ${activeMenu === cat.name ? 'border-primary text-primary' : 'border-transparent text-[#112040]'}`}
                >
                  {cat.name}
                  <svg className={`ml-1.5 w-3 h-3 transition-transform duration-300 ${activeMenu === cat.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path></svg>
                </button>
              </div>
            ))}

            {/* Mega Menu / Folder Pop-up */}
            {activeMenu && (
              <div className="absolute top-[85px] left-[-200px] w-[1000px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-x border-b border-gray-100 p-10 animate-in fade-in slide-in-from-top-4 duration-300 rounded-b-2xl z-[100] grid grid-cols-4 gap-12">
                <div className="col-span-1 border-r border-gray-50 pr-8">
                  <h3 className="text-xl font-serif font-bold text-[#112040] mb-2">{activeMenu}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold mb-6">Explore Collection</p>
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-secondary group cursor-pointer relative">
                    <img 
                      src={`https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt="Featured" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                       <span className="text-white text-[10px] font-bold tracking-widest uppercase border border-white/40 px-4 py-2 backdrop-blur-sm">View Lookbook</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-3 grid grid-cols-3 gap-8">
                  {CATEGORIES.find(c => c.name === activeMenu)?.groups.map((group, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.15em] border-b border-gray-100 pb-2">{group.title}</h4>
                      <ul className="space-y-2.5">
                        {group.items.map(item => (
                          <li key={item}>
                            <a href="#" className="text-[13px] text-gray-500 hover:text-primary hover:translate-x-1 transition-all inline-block font-medium">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 pt-6 border-t border-gray-50 mt-4 flex items-center justify-end">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors flex items-center">
                      Shop All {activeMenu} <svg className="ml-2 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Bar Section */}
          <div className="flex-1 mx-8 relative">
            <div className="relative group">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAISearch()}
                placeholder="Search products, styles..."
                className="w-full bg-[#f4f5f7] border-none px-5 py-2.5 rounded-sm text-sm focus:ring-1 focus:ring-primary/10 focus:bg-white focus:shadow-sm transition-all text-[#112040]"
              />
              <button 
                onClick={handleAISearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary ${isSearching ? 'animate-pulse' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </div>

            {/* AI Suggestions Dropdown */}
            {showSuggestions && aiSuggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white mt-1 shadow-2xl border border-gray-100 rounded-sm overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2">
                <div className="p-3 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">AI Recommendations</span>
                  <button onClick={() => setShowSuggestions(false)} className="text-gray-400 hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                <div className="p-2">
                  {aiSuggestions.map((tag, idx) => (
                    <button key={idx} className="w-full text-left px-4 py-2 text-sm hover:bg-secondary transition-colors text-[#112040] font-medium">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-5 shrink-0">
            
            {/* Order Status Icon */}
            <div 
              onClick={() => setIsTrackOpen(true)}
              className="flex flex-col items-center cursor-pointer group px-1"
            >
              <div className="p-1 group-hover:text-primary text-[#112040] transition-all duration-300 transform group-hover:-translate-y-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M40 40H75V65H40V40Z" />
                  <path d="M75 45H90V65H75V45Z" />
                  <path d="M75 45L83 45L90 55" />
                  <circle cx="48" cy="72" r="8" />
                  <circle cx="82" cy="72" r="8" />
                  <line x1="5" y1="50" x2="30" y2="50" />
                  <line x1="10" y1="58" x2="30" y2="58" />
                  <line x1="15" y1="66" x2="30" y2="66" />
                  <line x1="20" y1="74" x2="30" y2="74" />
                  <path d="M57 15C51 15 47 20 47 25C47 33 57 45 57 45C57 45 67 33 67 25C67 20 63 15 57 15Z" />
                  <circle cx="57" cy="25" r="4" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[8px] font-black text-[#112040] mt-0.5 tracking-tighter uppercase whitespace-nowrap">Order Status</span>
            </div>

            {/* Profile */}
            <div 
              onClick={() => setIsAuthOpen(true)}
              className="flex flex-col items-center cursor-pointer group px-1"
            >
              <div className="p-1 group-hover:text-primary text-[#112040] transition-all duration-300 transform group-hover:-translate-y-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span className="text-[8px] font-black text-[#112040] mt-0.5 tracking-tighter uppercase">Profile</span>
            </div>

            {/* Wishlist */}
            <div className="flex flex-col items-center cursor-pointer group px-1">
              <div className="p-1 group-hover:text-primary text-[#112040] transition-all duration-300 transform group-hover:-translate-y-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <span className="text-[8px] font-black text-[#112040] mt-0.5 tracking-tighter uppercase">Wishlist</span>
            </div>

            {/* Bag */}
            <div className="flex flex-col items-center cursor-pointer group relative px-1">
              <div className="p-1 group-hover:text-primary text-[#112040] transition-all duration-300 transform group-hover:-translate-y-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span className="absolute top-0 right-1 w-1.5 h-1.5 bg-accent rounded-full border border-white"></span>
              </div>
              <span className="text-[8px] font-black text-[#112040] mt-0.5 tracking-tighter uppercase">Bag</span>
            </div>

          </div>
        </div>
      </nav>

      {/* Spacing for fixed header */}
      <div className="h-[85px]"></div>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />

      <TrackOrderModal 
        isOpen={isTrackOpen} 
        onClose={() => setIsTrackOpen(false)} 
      />
    </>
  );
};

export default Header;
