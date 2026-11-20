import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Tag, Plus, Trash2 } from 'lucide-react';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, toggleCoupon, deleteCoupon } = useApp();
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [minSpend, setMinSpend] = useState(300);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    addCoupon({
      code: code.toUpperCase(),
      discountPercent,
      minSpend,
      expiryDate: '2026-12-31',
      isActive: true
    });
    setCode('');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-zinc-900 pb-6">
        <h1 className="font-serif text-3xl font-bold">Coupons & Promotional Discounts</h1>
        <p className="text-zinc-400 text-sm mt-1">Create and manage discount codes for e-commerce customers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-4">
          <h3 className="font-serif font-bold text-lg text-amber-400">Create New Coupon</h3>
          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Coupon Code</label>
              <input
                type="text"
                placeholder="e.g. AURA25"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 uppercase focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Discount Percentage (%)</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Minimum Spend (GH₵)</label>
              <input
                type="number"
                value={minSpend}
                onChange={(e) => setMinSpend(Number(e.target.value))}
                required
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-xs transition-colors shadow-lg shadow-amber-500/20"
            >
              Publish Coupon
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-serif font-bold text-lg">Active Coupons</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Min Spend</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-800/50">
                    <td className="p-4 font-serif font-bold text-amber-400">{c.code}</td>
                    <td className="p-4 font-bold">{c.discountPercent}% OFF</td>
                    <td className="p-4">GH₵ {c.minSpend}.00</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleCoupon(c.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          c.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteCoupon(c.id)}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
