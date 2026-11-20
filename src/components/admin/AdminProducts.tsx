import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { Plus, Edit, Trash2, X, Search, Sparkles } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Aura Prestige');
  const [category, setCategory] = useState<ProductCategory>('Luxury Perfumes');
  const [price, setPrice] = useState(550);
  const [costPrice, setCostPrice] = useState(250);
  const [description, setDescription] = useState('');
  const [fragranceFamily, setFragranceFamily] = useState('Woody & Amber');
  const [stock, setStock] = useState(30);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);

  const openAddModal = () => {
    setEditingId(null);
    setName('');
    setBrand('Aura Prestige');
    setCategory('Luxury Perfumes');
    setPrice(550);
    setCostPrice(250);
    setDescription('');
    setFragranceFamily('Woody & Amber');
    setStock(30);
    setImage('https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800');
    setIsFeatured(false);
    setIsBestSeller(false);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(p.price);
    setCostPrice(p.costPrice || p.price * 0.5);
    setDescription(p.description);
    setFragranceFamily(p.fragranceFamily);
    setStock(p.stock);
    setImage(p.images[0]);
    setIsFeatured(p.isFeatured);
    setIsBestSeller(p.isBestSeller);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) return;

    const sizes = [
      { size: '50ml', price, costPrice, stock: Math.floor(stock * 0.6) },
      { size: '100ml', price: price * 1.4, costPrice: costPrice * 1.4, stock: Math.floor(stock * 0.4) }
    ];

    if (editingId) {
      updateProduct(editingId, {
        name,
        brand,
        category,
        price,
        costPrice,
        description,
        fragranceFamily,
        stock,
        sizes,
        images: [image],
        isFeatured,
        isBestSeller
      });
    } else {
      addProduct({
        name,
        brand,
        category,
        price,
        costPrice,
        sizes,
        description,
        topNotes: ['Bergamot', 'Saffron'],
        middleNotes: ['Rose', 'Jasmine'],
        baseNotes: ['Amber', 'Musk', 'Oud'],
        fragranceFamily,
        images: [image],
        stock,
        isFeatured,
        isBestSeller,
        isActive: true
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Product Management</h1>
          <p className="text-zinc-400 text-sm mt-1">Add, edit, and manage perfume catalog prices in GH₵ and inventory.</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" /> Add New Perfume
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold border-b border-zinc-800 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">Perfume</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (GH₵)</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Flags</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-serif font-bold text-zinc-100">{p.name}</h4>
                      <span className="text-xs text-amber-500 font-medium">{p.brand}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium">{p.category}</td>
                  <td className="p-4 font-bold text-amber-400">GH₵ {p.price}.00</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      p.stock > 20 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1.5">
                      {p.isFeatured && <span className="bg-sky-500/10 text-sky-400 text-[10px] px-2 py-0.5 rounded-md font-bold">Featured</span>}
                      {p.isBestSeller && <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded-md font-bold">Best Seller</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400 transition-colors"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Delete Product"
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-amber-400"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-2xl font-bold mb-6">
              {editingId ? 'Edit Perfume Product' : 'Add New Perfume Product'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Perfume Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Brand</label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Arabic Perfumes">Arabic Perfumes</option>
                    <option value="Luxury Perfumes">Luxury Perfumes</option>
                    <option value="Perfume Oils">Perfume Oils</option>
                    <option value="Body Sprays">Body Sprays</option>
                    <option value="Men's Perfumes">Men's Perfumes</option>
                    <option value="Women's Perfumes">Women's Perfumes</option>
                    <option value="Unisex Perfumes">Unisex Perfumes</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Fragrance Family</label>
                  <input
                    type="text"
                    value={fragranceFamily}
                    onChange={(e) => setFragranceFamily(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Price (GH₵)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Cost Price (GH₵)</label>
                  <input
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value))}
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    required
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  Featured on Homepage
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="accent-amber-500 w-4 h-4"
                  />
                  Mark as Best Seller
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-amber-500/20"
                >
                  {editingId ? 'Save Changes' : 'Publish Perfume Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
