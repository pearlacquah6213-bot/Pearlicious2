import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Mail, Phone, MapPin, Award } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { customers } = useApp();

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-zinc-900 pb-6">
        <h1 className="font-serif text-3xl font-bold">Customer Directory</h1>
        <p className="text-zinc-400 text-sm mt-1">View registered customers, purchase statistics, and loyalty points.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Contact Info</th>
              <th className="p-4">Region</th>
              <th className="p-4">Orders Count</th>
              <th className="p-4">Total Spent (GH₵)</th>
              <th className="p-4">Loyalty Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-800/50">
                <td className="p-4 font-serif font-bold text-zinc-100">{c.name}</td>
                <td className="p-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400" /> {c.email}</div>
                  <div className="flex items-center gap-1.5 mt-0.5"><Phone className="w-3.5 h-3.5 text-amber-400" /> {c.phone}</div>
                </td>
                <td className="p-4 text-xs">{c.region}</td>
                <td className="p-4 font-bold">{c.ordersCount} orders</td>
                <td className="p-4 font-bold text-amber-400">GH₵ {c.totalSpent.toLocaleString()}.00</td>
                <td className="p-4 font-bold text-emerald-400 flex items-center gap-1">
                  <Award className="w-4 h-4" /> {c.loyaltyPoints} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
