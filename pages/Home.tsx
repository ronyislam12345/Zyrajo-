
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';

const Home: React.FC<{ onProductClick: (p: Product) => void }> = ({ onProductClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pb-20">
      <Hero />
      
      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif mb-4">Curated Selections</h2>
            <p className="text-gray-500 max-w-lg">Intelligent recommendations tailored to your unique aesthetic, updated in real-time as trends evolve.</p>
          </div>
          <div className="mt-6 md:mt-0 flex space-x-6 text-sm uppercase tracking-widest font-bold text-gray-400">
            <button className="text-primary border-b-2 border-primary pb-1">All</button>
            <button className="hover:text-primary transition-colors pb-1">Bestsellers</button>
            <button className="hover:text-primary transition-colors pb-1">New In</button>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {MOCK_PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </section>

      {/* Sustainable Section */}
      <section className="bg-primary text-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523381235312-706f97d515a4?q=80&w=800&auto=format&fit=crop" 
              className="rounded-2xl w-full h-[600px] object-cover"
              alt="Sustainable Fashion"
            />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
          <div className="space-y-8">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Ethical Luxury</span>
            <h3 className="text-5xl font-serif leading-tight">Conscious Design for <br/> a Better Tomorrow</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              Each piece in our collection is crafted with meticulous attention to environmental impact. From low-water silk to carbon-neutral shipping, we redefine luxury as a responsible choice.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-2xl font-bold mb-1">0%</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Synthetic Waste</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1">100%</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Traceable Supply</p>
              </div>
            </div>
            <button className="mt-8 border-b border-accent pb-2 text-sm font-bold tracking-widest uppercase hover:text-accent transition-colors">Learn More About Our Values</button>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-serif text-center mb-16">Style Universes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Minimalist', img: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop' },
            { name: 'Avant-Garde', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop' },
            { name: 'Heritage', img: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop' }
          ].map((cat, idx) => (
            <div key={idx} className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
              <img src={cat.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cat.name} />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h4 className="text-white text-3xl font-serif tracking-widest">{cat.name}</h4>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <button className="w-full bg-white py-3 text-xs font-bold uppercase tracking-widest">Explore Universe</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
