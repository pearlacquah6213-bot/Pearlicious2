import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl border text-sm backdrop-blur-md transition-all duration-300 animate-slide-up ${
            toast.type === 'success'
              ? 'bg-zinc-900/95 border-amber-500/50 text-amber-100'
              : toast.type === 'error'
              ? 'bg-red-950/95 border-red-500/50 text-red-100'
              : 'bg-zinc-900/95 border-zinc-700 text-zinc-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400 shrink-0" />}
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
