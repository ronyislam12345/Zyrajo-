
import React, { useState } from 'react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'searching' | 'result'>('idle');

  if (!isOpen) return null;

  const handleTrack = () => {
    if (!orderId.trim()) return;
    setStatus('searching');
    setTimeout(() => setStatus('result'), 1500); // Simulated tracking
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[480px] bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 rounded-lg">
        {/* Header Bar */}
        <div className="h-1 bg-primary w-full"></div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-primary tracking-tight uppercase">Order Status</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {status === 'result' ? (
            <div className="animate-in slide-in-from-bottom-4 duration-300">
              <div className="bg-secondary rounded-lg p-6 mb-6 border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order Reference</p>
                    <p className="text-sm font-bold text-primary">#ZYR-{orderId || '8829'}</p>
                  </div>
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest">
                    Shipped
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
                  <p className="text-sm font-bold text-primary">October 24, 2025</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 px-1">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <p className="text-gray-600 font-medium">Order is in transit to your location.</p>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                  <p className="text-gray-400">Package left the fulfillment center.</p>
                </div>
              </div>

              <button 
                onClick={() => setStatus('idle')}
                className="w-full bg-primary text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md"
              >
                Track Another Order
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-gray-500 mb-2 leading-relaxed">Please enter your order ID and the email address used during purchase to track your package.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Order ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ZYR-123456"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-all rounded-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="yourname@example.com"
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3.5 text-sm focus:border-primary focus:bg-white focus:outline-none transition-all rounded-sm"
                  />
                </div>
              </div>

              <button 
                onClick={handleTrack}
                disabled={status === 'searching'}
                className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-black transition-all flex items-center justify-center shadow-lg active:scale-[0.98]"
              >
                {status === 'searching' ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
