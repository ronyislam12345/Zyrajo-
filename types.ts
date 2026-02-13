
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  colors: string[];
  fabrics: string[];
  description: string;
  trending?: boolean;
  sustainabilityScore?: number; // 0-100
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface UserPreferences {
  style: string;
  measurements: {
    height: number;
    weight: number;
    fitPreference: string;
  };
}
