
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedFabric, setSelectedFabric] = useState(product.fabrics[0]);
  const [isVirtualTryOn, setIsVirtualTryOn] = useState(false);
  const [rotation, setRotation] = useState(0);

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Back button */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Visual Display */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] bg-secondary rounded-2xl overflow-hidden group perspective-1000">
              {isVirtualTryOn ? (
                <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-white p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-accent"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    <p className="text-sm font-medium mb-2">AR Mirror Active</p>
                    <p className="text-xs text-gray-500 text-center mb-6">Position yourself in frame to see the {product.name} virtually.</p>
                    <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all">Take Photo</button>
                    <button onClick={() => setIsVirtualTryOn(false)} className="mt-4 text-xs underline text-gray-400 hover:text-white">Exit AR Mode</button>
                </div>
              ) : (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ transform: `rotateY(${rotation}deg)` }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                />
              )}
              
              {!isVirtualTryOn && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 dark-glass px-4 py-2 rounded-full flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setRotation(r => r - 45)} className="text-white hover:text-accent transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <span className="text-white text-[10px] uppercase font-bold tracking-widest whitespace-nowrap">Explore 360°</span>
                    <button onClick={() => setRotation(r => r + 45)} className="text-white hover:text-accent transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-transparent hover:border-accent">
                   <img src={`${product.image}&v=${i}`} className="w-full h-full object-cover" alt={`${product.name} alternate view ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Details & Customizer */}
          <div className="flex flex-col">
            <div className="border-b border-gray-100 pb-8 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">{product.category}</span>
                  <h1 className="text-5xl font-serif mt-2 mb-4">{product.name}</h1>
                </div>
                {/* Sustainability Badge */}
                <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="#f3f4f6" strokeWidth="4" />
                            <circle cx="32" cy="32" r="28" fill="transparent" stroke="#10b981" strokeWidth="4" 
                                strokeDasharray={2 * Math.PI * 28} 
                                strokeDashoffset={(2 * Math.PI * 28) * (1 - (product.sustainabilityScore || 0) / 100)} 
                            />
                        </svg>
                        <span className="absolute text-[10px] font-bold text-green-600">{(product.sustainabilityScore || 0)}%</span>
                    </div>
                    <span className="text-[8px] uppercase tracking-widest mt-1 text-gray-500 font-bold">Eco Impact</span>
                </div>
              </div>
              <p className="text-2xl font-light text-gray-500">${product.price}.00</p>
              <p className="mt-6 text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-10">
              {/* Color Customizer */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Select Palette</h4>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${selectedColor === color ? 'border-primary scale-110' : 'border-transparent'}`}
                      aria-label={`Select color ${color}`}
                    >
                      <div className="w-full h-full rounded-full shadow-inner" style={{ backgroundColor: color }}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric Customizer */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4">Fabric Selection</h4>
                <div className="flex flex-wrap gap-3">
                  {product.fabrics.map(fabric => (
                    <button 
                      key={fabric}
                      onClick={() => setSelectedFabric(fabric)}
                      className={`px-6 py-2 border rounded-full text-xs font-medium transition-all ${selectedFabric === fabric ? 'bg-primary text-white border-primary' : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-400'}`}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Size recommendation */}
              <div className="p-4 bg-secondary rounded-xl flex items-start space-x-4 border border-white shadow-sm">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-accent shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                </div>
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-tight mb-1">AI Size Assistant</h5>
                  <p className="text-xs text-gray-500">Our ZYRAJO AI suggests <span className="font-bold text-primary">Size M</span> based on your profile.</p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4">
                <button className="w-full bg-primary text-white py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-black transition-all flex items-center justify-center space-x-3 shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    <span>Add to Wardrobe</span>
                </button>
                <button 
                  onClick={() => setIsVirtualTryOn(true)}
                  className="w-full border border-gray-200 py-4 font-bold uppercase tracking-[0.2em] text-sm hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                  <span>Virtual Try-On</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
