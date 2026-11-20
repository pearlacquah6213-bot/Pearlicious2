import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Phone, Mail, MapPin, Send, ShieldCheck, Truck, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Successfully subscribed to Pearlicious2 VIP fragrance alerts!');
    setEmail('');
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-amber-500/20 pt-16 pb-12">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-amber-500/10">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-zinc-100">All 16 Regions Delivery</h4>
            <p className="text-xs text-zinc-400 mt-1">Fast, reliable dispatch across Greater Accra, Ashanti, Volta, and all regions.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-amber-500/10">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-zinc-100">100% Authentic Scents</h4>
            <p className="text-xs text-zinc-400 mt-1">Sourced directly from certified Parisian & Dubai perfume houses.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-900/40 border border-amber-500/10">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-zinc-100">Mobile Money & Cards</h4>
            <p className="text-xs text-zinc-400 mt-1">Secure checkout via MTN MoMo, Telecel Cash, AT Money, and Visa.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center">
              <span className="font-serif font-bold text-zinc-950 text-lg">P2</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-amber-400">
              PEARLICIOUS2
            </span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed mb-6">
            Ghana’s premier luxury perfume destination. Bringing exquisite Arabian ouds, French luxury extracts, and signature scents to your doorstep in Accra, Kumasi, Takoradi, and beyond.
          </p>
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/233591593157" 
              target="_blank" 
              rel="noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> WhatsApp / Tel: 0591593157
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-amber-400 font-bold mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => setCurrentView('home')} className="hover:text-amber-400 transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentView('shop')} className="hover:text-amber-400 transition-colors">Shop All Perfumes</button></li>
            <li><button onClick={() => setCurrentView('shop')} className="hover:text-amber-400 transition-colors">Arabic Perfumes</button></li>
            <li><button onClick={() => setCurrentView('shop')} className="hover:text-amber-400 transition-colors">Perfume Oils</button></li>
            <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-amber-400 transition-colors">Customer Dashboard</button></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="font-serif text-amber-400 font-bold mb-4">Customer Care</h4>
          <ul className="space-y-2.5 text-sm">
            <li><button onClick={() => setCurrentView('about')} className="hover:text-amber-400 transition-colors">About Our Brand</button></li>
            <li><button onClick={() => setCurrentView('contact')} className="hover:text-amber-400 transition-colors">Contact & Locations</button></li>
            <li><span className="text-zinc-500">Delivery Across 16 Regions</span></li>
            <li><span className="text-zinc-500">Return & Refund Policy</span></li>
            <li><span className="text-zinc-500">Privacy & Security</span></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-serif text-amber-400 font-bold mb-4">VIP Club Newsletter</h4>
          <p className="text-xs text-zinc-400 mb-3">Subscribe for exclusive releases, secret discount codes, and seasonal gifts.</p>
          <form onSubmit={handleNewsletter} className="flex flex-col gap-2">
            <input 
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-zinc-950 font-bold py-2 rounded-lg text-xs hover:from-amber-400 hover:to-yellow-500 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" /> Join VIP Club
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Pearlicious2 Perfumery & E-Commerce Platform. Tel: 0591593157. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span>MTN MoMo</span>
          <span>Telecel Cash</span>
          <span>AT Money</span>
          <span>Paystack Secured</span>
        </div>
      </div>
    </footer>
  );
};
