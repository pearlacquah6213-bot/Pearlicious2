import React from 'react';
import { Sparkles, Award, ShieldCheck, Truck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Our Heritage</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold">About Aura Ghana</h1>
          <p className="text-zinc-400 text-base leading-relaxed max-w-2xl mx-auto">
            Bringing elite international perfumery and Arabian luxury extracts to connoisseurs across Ghana since 2024.
          </p>
        </div>

        <div className="relative h-96 rounded-3xl overflow-hidden border border-amber-500/30">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" 
            alt="Perfume Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center space-y-3">
            <Award className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-serif font-bold text-zinc-100">Uncompromising Quality</h3>
            <p className="text-xs text-zinc-400">Every bottle is sourced directly from master perfumers in Paris, Dubai, and Grasse.</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center space-y-3">
            <Truck className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-serif font-bold text-zinc-100">All 16 Regions Delivery</h3>
            <p className="text-xs text-zinc-400">Swift, secure door-to-door dispatch in Accra, Kumasi, Takoradi, Tamale, and beyond.</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center space-y-3">
            <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-serif font-bold text-zinc-100">Secure MoMo & Cards</h3>
            <p className="text-xs text-zinc-400">Seamless payment integration via MTN MoMo, Telecel Cash, AT Money, and Visa.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
