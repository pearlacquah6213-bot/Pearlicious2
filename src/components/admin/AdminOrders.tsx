import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { Search, Printer, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useApp();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses: OrderStatus[] = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded'];

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.region.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePrintInvoice = (orderId: string) => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Order Management</h1>
          <p className="text-zinc-400 text-sm mt-1">Review orders, update fulfillment statuses, and manage deliveries across Ghana.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-zinc-100 focus:outline-none focus:border-amber-500 w-60"
          />
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            statusFilter === 'All' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          All Orders ({orders.length})
        </button>
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === st ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800">
            <h3 className="font-serif text-xl font-bold text-zinc-300">No Orders Found</h3>
            <p className="text-xs text-zinc-500 mt-1">No orders match the selected status filter.</p>
          </div>
        ) : (
          filteredOrders.map((ord) => (
            <div key={ord.id} className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-base text-amber-400">Order #{ord.orderNumber}</span>
                    <span className="text-xs text-zinc-500">• {new Date(ord.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1">
                    Customer: <b className="text-zinc-100">{ord.customerName}</b> ({ord.customerPhone}) • Destination: {ord.city}, {ord.region}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                    className="bg-zinc-950 border border-amber-500/40 text-amber-300 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-amber-500"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => handlePrintInvoice(ord.id)}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                    title="Print Invoice"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-2xl border border-zinc-800">
                    <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif font-bold text-xs text-zinc-200 line-clamp-1">{item.productName}</h4>
                      <span className="text-[11px] text-zinc-400">Size: {item.selectedSize} × {item.quantity}</span>
                      <span className="text-xs font-bold text-amber-400 block">GH₵ {item.price * item.quantity}.00</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
                <div>
                  <span className="font-semibold text-zinc-300">Payment:</span> {ord.paymentMethod} ({ord.paymentStatus}) • Ref: {ord.paymentReference || 'N/A'}
                </div>
                <div className="text-right">
                  <span className="text-zinc-300 font-semibold">Total: </span>
                  <span className="font-serif font-bold text-amber-400 text-base">GH₵ {ord.totalAmount}.00</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
