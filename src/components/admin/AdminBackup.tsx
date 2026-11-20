import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, Download, Upload, CheckCircle2, RefreshCw } from 'lucide-react';

export const AdminBackup: React.FC = () => {
  const { products, orders, customers, inventoryLogs, showToast } = useApp();
  const [lastBackupTime, setLastBackupTime] = useState<string>('');
  const [backupHistory, setBackupHistory] = useState<{ id: string; time: string; size: string }[]>([]);

  useEffect(() => {
    // Perform auto backup on load / change
    const snapshot = {
      timestamp: new Date().toISOString(),
      products,
      orders,
      customers,
      inventoryLogs
    };
    const backupJson = JSON.stringify(snapshot, null, 2);
    localStorage.setItem('pearlicious2_auto_backup', backupJson);
    const nowStr = new Date().toLocaleString();
    setLastBackupTime(nowStr);
    setBackupHistory((prev) => [
      { id: `bk-${Date.now()}`, time: nowStr, size: `${Math.round(backupJson.length / 1024)} KB` },
      ...prev.slice(0, 4)
    ]);
  }, [products, orders, customers]);

  const handleDownloadBackup = () => {
    const data = localStorage.getItem('pearlicious2_auto_backup') || '{}';
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pearlicious2-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('System auto-backup downloaded successfully.');
  };

  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.products && parsed.orders) {
          localStorage.setItem('aura_products', JSON.stringify(parsed.products));
          localStorage.setItem('aura_orders', JSON.stringify(parsed.orders));
          if (parsed.customers) localStorage.setItem('aura_customers', JSON.stringify(parsed.customers));
          showToast('System data restored successfully from backup! Refreshing...');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          showToast('Invalid backup file format.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse backup JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="border-b border-zinc-900 pb-6">
        <h1 className="font-serif text-3xl font-bold">System Auto-Backup & Recovery</h1>
        <p className="text-zinc-400 text-sm mt-1">Automatic real-time snapshots of Pearlicious2 database, products, and orders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Status Card */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">Auto-Backup Active</h3>
              <p className="text-xs text-emerald-400">Database is automatically backed up on every change</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-zinc-400 pt-4 border-t border-zinc-800">
            <div className="flex justify-between">
              <span>Last Snapshot Time:</span>
              <span className="text-zinc-200 font-medium">{lastBackupTime || 'Just now'}</span>
            </div>
            <div className="flex justify-between">
              <span>Products Tracked:</span>
              <span className="text-zinc-200 font-medium">{products.length} items</span>
            </div>
            <div className="flex justify-between">
              <span>Orders Tracked:</span>
              <span className="text-zinc-200 font-medium">{orders.length} orders</span>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={handleDownloadBackup}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" /> Download Backup JSON
            </button>
          </div>
        </div>

        {/* Restore Card */}
        <div className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-100">Restore System Data</h3>
              <p className="text-xs text-zinc-400">Upload a previously saved backup file to restore system state</p>
            </div>
          </div>

          <div className="pt-4">
            <label className="block w-full border-2 border-dashed border-zinc-700 hover:border-amber-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-zinc-950/50">
              <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <span className="text-xs font-bold text-zinc-200 block">Click to select backup JSON file</span>
              <span className="text-[10px] text-zinc-500 mt-1 block">Supports Pearlicious2 backup format</span>
              <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Snapshot History */}
      <div className="pt-6">
        <h3 className="font-serif text-xl font-bold mb-4">Recent Backup Snapshots</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Snapshot ID</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Size</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {backupHistory.map((b) => (
                <tr key={b.id} className="hover:bg-zinc-800/50">
                  <td className="p-4 font-mono text-xs text-amber-400">{b.id}</td>
                  <td className="p-4 text-xs">{b.time}</td>
                  <td className="p-4 text-xs">{b.size}</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400">
                      Auto-Saved
                    </span>
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
