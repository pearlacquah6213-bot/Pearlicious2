import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './HomePage';
import { SlidersHorizontal, Search, RotateCcw } from 'lucide-react';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    setCurrentView, 
    setSelectedProductId, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategoryFilter,
    setSelectedCategoryFilter 
  } = useApp();

  const [selectedFragranceFamily, setSelectedFragranceFamily] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = [
    'All',
    'Arabic Perfumes',
    'Luxury Perfumes',
    'Perfume Oils',
    'Body Sprays',
    "Men's Perfumes",
    "Women's Perfumes",
    'Unisex Perfumes'
  ];

  const fragranceFamilies = ['All', 'Woody & Amber', 'Floral & Sweet', 'Oud & Leather', 'Fresh & Aquatic'];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) {
        return false;
      }
      if (selectedFragranceFamily !== 'All' && p.fragranceFamily !== selectedFragranceFamily) {
        return false;
      }
      const effectivePrice = p.discountPrice || p.price;
      if (effectivePrice > maxPrice) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesNotes = [...p.topNotes, ...p.middleNotes, ...p.baseNotes].some((n) => n.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesNotes) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });
  }, [products, selectedCategoryFilter, selectedFragranceFamily, maxPrice, searchQuery, sortBy]);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
  };

  const resetFilters = () => {
    setSelectedCategoryFilter('All');
    setSelectedFragranceFamily('All');
    setMaxPrice(1000);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Pearlicious2 Catalog</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mt-1 text-slate-900">Explore All Perfumes</h1>
            <p className="text-slate-600 text-sm mt-1">Discover luxury Arabian ouds, French extracts, and signature local favorites.</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-slate-500 font-semibold">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 text-slate-800 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:border-red-600 shadow-sm"
            >
              <option value="featured">Featured / Recommended</option>
              <option value="price-low">Price: Low to High (GH₵)</option>
              <option value="price-high">Price: High to Low (GH₵)</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-lg h-fit">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-serif font-bold text-red-600 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filter Catalog
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Categories</h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      selectedCategoryFilter === cat 
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Fragrance Family */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Fragrance Family</h4>
              <div className="space-y-1.5">
                {fragranceFamilies.map((fam) => (
                  <button
                    key={fam}
                    onClick={() => setSelectedFragranceFamily(fam)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      selectedFragranceFamily === fam 
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {fam}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-slate-700">Max Price</span>
                <span className="font-bold text-red-600">GH₵ {maxPrice}.00</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>GH₵ 100</span>
                <span>GH₵ 1,200+</span>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-slate-800">No Perfumes Found</h3>
                <p className="text-xs text-slate-500 mt-2">Try adjusting your category filters or search keywords.</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 bg-red-600 text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-red-700 shadow-md transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onProductClick={handleProductClick}
                    onAddToCart={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
