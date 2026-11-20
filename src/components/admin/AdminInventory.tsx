import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Boxes, Truck, Plus, History } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { products, suppliers, inventoryLogs, addSupplier } = useApp();

  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [supName, setSupName] = useState('');
  const [supContact, setSupContact] = useState('');
  const [supPhone, setSupPhone] = useState('');
  const [supEmail, setSupEmail] = useState('');
  const [supAddress, setSupAddress] = useState('');

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supName || !supPhone) return;
    addSupplier({
      name: supName,
      contactPerson: supContact,
      phone: supPhone,
      email: supEmail,
      address: supAddress,
      suppliedBrands: ['Aura Prestige'],
      activeProductsCount: 2
    });
    setSupName('');
    setSupContact('');
    setSupPhone('');
    setSupEmail('');
    setSupAddress('');
    setIsSupplierModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Inventory & Suppliers</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage stock levels, supplier records, and automated inventory logs.</p>
        </div>

        <button
          onClick={() => setIsSupplierModalOpen(true)}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Truck className="w-4 h-4" /> Add Supplier
        </button>
      </div>

      {/* Suppliers Grid */}
      <div>
        <h3 className="font-serif text-xl font-bold mb-4">Supplier Directory</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suppliers.map((sup) => (
            <div key={sup.id} className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-amber-500">{sup.address}</span>
              <h4 className="font-serif font-bold text-zinc-100 text-base">{sup.name}</h4>
              <p className="text-xs text-zinc-400">Contact: {sup.contactPerson} ({sup.phone})</p>
              <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex justify-between">
                <span>Email: {sup.email}</span>
                <span className="text-amber-400 font-bold">{sup.activeProductsCount} products</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Logs */}
      <div className="pt-6">
        <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
          <History className="w-5 h-5 text-amber-400" /> Automated Inventory Audit Logs
        </h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Perfume</th>
                <th className="p-4">Action Type</th>
                <th className="p-4">Change</th>
                <th className="p-4">New Stock</th>
                <th className="p-4">Performed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {inventoryLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-800/50">
                  <td className="p-4 text-xs text-zinc-500">{new Date(log.date).toLocaleString()}</td>
                  <td className="p-4 font-serif font-bold text-zinc-100">{log.productName}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      log.type === 'Restock' ? 'bg-emerald-500/10 text-emerald-400' :
                      log.type === 'Sale' ? 'bg-sky-500/10 text-sky-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className={`p-4 font-bold ${log.quantityChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange}
                  </td>
                  <td className="p-4 font-bold text-zinc-100">{log.newStock}</td>
                  <td className="p-4 text-xs text-zinc-400">{log.performedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supplier Modal */}
      {isSupplierModalOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <h3 className="font-serif text-2xl font-bold mb-6">Add Perfume Supplier</h3>
            <form onSubmit={handleAddSupplier} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Supplier Company Name</label>
                <input
                  type="text"
                  value={supName}
                  onChange={(e) => setSupName(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Contact Person</label>
                <input
                  type="text"
                  value={supContact}
                  onChange={(e) => setSupContact(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={supPhone}
                  onChange={(e) => setSupPhone(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Email</label>
                <input
                  type="email"
                  value={supEmail}
                  onChange={(e) => setSupEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Address / Location</label>
                <input
                  type="text"
                  value={supAddress}
                  onChange={(e) => setSupAddress(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsSupplierModalOpen(false)}
                  className="w-1/2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold py-3 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-xs"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
