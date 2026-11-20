import React from 'react';
import { useApp } from '../../context/AppContext';
import { GHANA_REGIONS } from '../../types';
import { Truck, MapPin, CheckCircle2, Clock } from 'lucide-react';

export const AdminDeliveries: React.FC = () => {
  const { orders } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-zinc-900 pb-6">
        <h1 className="font-serif text-3xl font-bold">Delivery Management (16 Regions)</h1>
        <p className="text-zinc-400 text-sm mt-1">Track dispatches and regional delivery performance across Ghana.</p>
      </div>

      {/* Regions Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GHANA_REGIONS.map((reg) => {
          const regionOrders = orders.filter((o) => o.region === reg);
          return (
            <div key={reg} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <span className="text-[11px] font-bold text-amber-500 uppercase">{reg}</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-serif font-bold text-zinc-100">{regionOrders.length}</span>
                <Truck className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs text-zinc-500 block">Active dispatches</span>
            </div>
          );
        })}
      </div>

      {/* Active Dispatches List */}
      <div className="pt-6">
        <h3 className="font-serif text-xl font-bold mb-4">Active Dispatches & Personnel</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Order #</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Region & City</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4">Assigned Personnel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-zinc-800/50">
                  <td className="p-4 font-serif font-bold text-amber-400">{o.orderNumber}</td>
                  <td className="p-4 font-medium text-zinc-100">{o.customerName}</td>
                  <td className="p-4 text-xs text-zinc-400">{o.city}, {o.region}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400">
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-zinc-300 font-medium">
                    {o.deliveryPersonnel || 'Kofi Dispatch GH (Unassigned)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
