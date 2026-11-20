import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Thank you! Your message has been sent to our VIP support team.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Get in Touch</span>
          <h1 className="font-serif text-4xl font-bold mt-2">Contact Aura Ghana</h1>
          <p className="text-zinc-400 text-sm mt-2">Our fragrance advisors are available to assist you with recommendations and order tracking.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8 bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800">
            <h3 className="font-serif text-2xl font-bold text-amber-400">Accra & Kumasi Boutiques</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-zinc-200">East Legon Flagship Boutique</h4>
                  <p className="text-sm text-zinc-400 mt-1">American House, Near Shell Filling Station, Accra</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-zinc-200">Kumasi Showroom</h4>
                  <p className="text-sm text-zinc-400 mt-1">Ahodwo Roundabout, Plot 14, Kumasi</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-zinc-200">WhatsApp VIP & Phone Support</h4>
                  <p className="text-sm text-amber-300 font-semibold mt-1">+233 24 456 7890 / +233 30 212 3456</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-zinc-200">Email Inquiries</h4>
                  <p className="text-sm text-zinc-400 mt-1">concierge@auraghana.com</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <a
                href="https://wa.me/233244567890?text=Hello%20Aura%20Ghana,%20I%20need%20assistance."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors"
              >
                Chat Instantly on WhatsApp VIP
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800">
            <h3 className="font-serif text-2xl font-bold mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Nana Yaw"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. nanayaw@gmail.com"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="How can we assist you with your perfume selection?"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-zinc-950 font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
