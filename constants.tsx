
import { Product } from './types';

export const BRAND_NAME = "ZYRAJO";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight Velvet Blazer',
    price: 249,
    category: 'Formal',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    colors: ['#000033', '#000000', '#4a0e0e'],
    fabrics: ['Velvet', 'Silk Blend', 'Linen'],
    description: 'Exquisite tailored blazer for high-end gala events.',
    trending: true,
    sustainabilityScore: 88
  },
  {
    id: '2',
    name: 'Sahara Linen Jumpsuit',
    price: 189,
    category: 'Casual',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    colors: ['#d2b48c', '#ffffff', '#556b2f'],
    fabrics: ['Eco-Linen', 'Organic Cotton'],
    description: 'Breathable, sustainable fashion for the modern explorer.',
    trending: true,
    sustainabilityScore: 96
  },
  {
    id: '3',
    name: 'Aether Knit Sweater',
    price: 120,
    category: 'Loungewear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
    colors: ['#f0f0f0', '#b0c4de', '#ffb6c1'],
    fabrics: ['Cashmere', 'Wool'],
    description: 'Cloud-like softness wrapped in timeless elegance.',
    trending: false,
    sustainabilityScore: 74
  },
  {
    id: '4',
    name: 'Crimson Silk Slip Dress',
    price: 310,
    category: 'Evening',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    colors: ['#990000', '#000000', '#f4c2c2'],
    fabrics: ['100% Mulberry Silk'],
    description: 'Fluid silhouette designed to turn heads.',
    trending: true,
    sustainabilityScore: 92
  }
];
