
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end p-6">
           <button className="w-full bg-white text-primary py-3 text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
             Quick Look
           </button>
        </div>
        {product.trending && (
          <span className="absolute top-4 left-4 bg-white/90 text-[10px] font-bold tracking-widest px-2 py-1 uppercase rounded">Trending</span>
        )}
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-xs text-gray-500 uppercase tracking-tight">{product.category}</p>
        </div>
        <p className="text-sm font-semibold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
