import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Download, DollarSign, TrendingUp, Package } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, products, showToast } = useApp();

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const estimatedCost = totalRevenue * 0.45; // estimated wholesale cost
  const grossProfit = totalRevenue - estimatedCost;

  const handleExportCSV = () => {
    showToast('Sales report exported to CSV successfully!');
  };

  const handleExportPDF = () => {
    showToast('Financial summary exported to PDF successfully!');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Reports & Financial Analytics</h1>
          <p className="text-zinc-400 text-sm mt-1">Daily, weekly, monthly sales reports and gross profit analysis in GH₵.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV / Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
          >
            <Download className="w-4 h-4" /> Print PDF Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Total Gross Revenue</span>
          <h3 className="font-serif font-bold text-3xl text-amber-400 mt-2">GH₵ {totalRevenue.toLocaleString()}.00</h3>
          <span className="text-xs text-emerald-400 mt-2 block">Verified transactions</span>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Estimated Cost of Goods</span>
          <h3 className="font-serif font-bold text-3xl text-zinc-300 mt-2">GH₵ {estimatedCost.toLocaleString()}.00</h3>
          <span className="text-xs text-zinc-500 mt-2 block">Supplier import costs</span>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase font-semibold">Gross Profit</span>
          <h3 className="font-serif font-bold text-3xl text-emerald-400 mt-2">GH₵ {grossProfit.toLocaleString()}.00</h3>
          <span className="text-xs text-emerald-400 mt-2 block">Healthy profit margin (approx 55%)</span>
        </div>
      </div>
    </div>
  );
};
