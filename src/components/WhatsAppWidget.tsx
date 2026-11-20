import React from 'react';
import { PhoneCall } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  return (
    <a
      href="https://wa.me/233591593157?text=Hello%20Pearlicious2,%20I%20would%20like%20to%20inquire%20about%20your%20perfumes."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group animate-bounce"
      title="Chat on WhatsApp: 0591593157"
    >
      <PhoneCall className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        WhatsApp: 0591593157
      </span>
    </a>
  );
};
