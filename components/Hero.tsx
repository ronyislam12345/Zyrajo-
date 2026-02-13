
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover filter brightness-75"
          poster="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-the-middle-of-the-street-34503-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <p className="text-sm uppercase tracking-[0.5em] mb-4 opacity-80 animate-fade-in">Experience the Future of Style</p>
        <h2 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">Define Your <br/> Unique Essence</h2>
        <div className="flex space-x-4">
          <button className="bg-white text-primary px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1">
            Shop Collection
          </button>
          <button className="border border-white text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
            Virtual Try-On
          </button>
        </div>
      </div>

      {/* Stats/Floating elements */}
      <div className="absolute bottom-12 left-12 hidden lg:block text-white/60 text-xs tracking-widest space-y-2">
        <p>LUMINA STUDIO 2.0</p>
        <p>SPRING / SUMMER 2025</p>
      </div>
      
      <div className="absolute bottom-12 right-12 flex space-x-6 items-center text-white/60">
        <div className="flex items-center space-x-2">
            <div className="w-12 h-[1px] bg-white/40"></div>
            <span className="text-xs tracking-tighter uppercase font-medium text-white">01 / 04</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
