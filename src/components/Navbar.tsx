import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  ShieldAlert, 
  User, 
  Menu, 
  X, 
  Sparkles,
  PhoneCall,
  LayoutDashboard
} from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { 
    role, 
    setRole, 
    currentView, 
    setCurrentView, 
    cart, 
    wishlist, 
    searchQuery, 
    setSearchQuery,
    setSelectedCategoryFilter 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentView !== 'shop') {
      setCurrentView('shop');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-amber-500/20 text-zinc-100">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-zinc-950 text-xs font-semibold py-1.5 px-4 text-center tracking-wider flex items-center justify-center gap-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>PEARLICIOUS2 LUXURY PERFUMES • TEL: 0591593157 • FREE DELIVERY ACROSS ALL 16 REGIONS FOR ORDERS OVER GH₵1,000</span>
        <a 
          href="https://wa.me/233591593157?text=Hello%20Pearlicious2,%20I%20would%20like%20to%20inquire%20about%20your%20perfumes."
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1 bg-zinc-950 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] hover:bg-zinc-900 transition-colors"
        >
          <PhoneCall className="w-3 h-3" /> WhatsApp: 0591593157
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-zinc-950 text-xl">P2</span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              PEARLICIOUS2
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-amber-500/80 font-medium">
              Luxury Perfumery • 0591593157
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
          <button 
            onClick={() => { setCurrentView('home'); setSelectedCategoryFilter('All'); }}
            className={`transition-colors hover:text-amber-400 ${currentView === 'home' ? 'text-amber-400 underline underline-offset-8' : 'text-zinc-300'}`}
          >
            Home
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('All'); }}
            className={`transition-colors hover:text-amber-400 ${currentView === 'shop' ? 'text-amber-400 underline underline-offset-8' : 'text-zinc-300'}`}
          >
            Shop All
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('Arabic Perfumes'); }}
            className="transition-colors hover:text-amber-400 text-zinc-300"
          >
            Arabic Scents
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('Luxury Perfumes'); }}
            className="transition-colors hover:text-amber-400 text-zinc-300"
          >
            Luxury
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('Perfume Oils'); }}
            className="transition-colors hover:text-amber-400 text-zinc-300"
          >
            Perfume Oils
          </button>
          <button 
            onClick={() => { setCurrentView('about'); }}
            className={`transition-colors hover:text-amber-400 ${currentView === 'about' ? 'text-amber-400 underline underline-offset-8' : 'text-zinc-300'}`}
          >
            About Us
          </button>
          <button 
            onClick={() => { setCurrentView('contact'); }}
            className={`transition-colors hover:text-amber-400 ${currentView === 'contact' ? 'text-amber-400 underline underline-offset-8' : 'text-zinc-300'}`}
          >
            Contact
          </button>
        </nav>

        {/* Search Bar & Action Icons */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search perfumes, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-full pl-9 pr-4 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 w-52 lg:w-64 transition-all"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          </form>

          {/* Wishlist Button */}
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="relative p-2 rounded-full hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-amber-400"
            title="Wishlist & Orders"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button 
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-zinc-900 transition-colors text-zinc-300 hover:text-amber-400"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2 bg-zinc-900 border border-amber-500/40 px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 hover:bg-zinc-800 transition-colors"
              title="Switch User Role"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Role: {role.replace('_', ' ')}</span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1 text-zinc-400 font-semibold uppercase tracking-wider text-[10px] border-b border-zinc-800 mb-1">
                  Switch Active Role
                </div>
                <button
                  onClick={() => { setRole('CUSTOMER'); setCurrentView('home'); setIsRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 hover:bg-zinc-800 flex items-center justify-between ${role === 'CUSTOMER' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
                >
                  <span>Customer View</span>
                  {role === 'CUSTOMER' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                </button>
                <button
                  onClick={() => { setRole('STAFF'); setCurrentView('admin'); setIsRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 hover:bg-zinc-800 flex items-center justify-between ${role === 'STAFF' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
                >
                  <span>Staff Portal</span>
                  {role === 'STAFF' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                </button>
                <button
                  onClick={() => { setRole('SUPER_ADMIN'); setCurrentView('admin'); setIsRoleDropdownOpen(false); }}
                  className={`w-full text-left px-3 py-2 hover:bg-zinc-800 flex items-center justify-between ${role === 'SUPER_ADMIN' ? 'text-amber-400 font-bold' : 'text-zinc-300'}`}
                >
                  <span>Super Admin Suite</span>
                  {role === 'SUPER_ADMIN' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                </button>
              </div>
            )}
          </div>

          {/* Admin Toggle Shortcut */}
          {(role === 'SUPER_ADMIN' || role === 'STAFF') && (
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                currentView === 'admin' 
                  ? 'bg-amber-500 text-zinc-950' 
                  : 'bg-zinc-900 border border-amber-500/40 text-amber-400 hover:bg-zinc-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{currentView === 'admin' ? 'Exit Admin' : 'Admin Dashboard'}</span>
            </button>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-amber-400"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 px-4 pt-3 pb-6 flex flex-col gap-3 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="text"
              placeholder="Search perfumes, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-100 w-full focus:outline-none focus:border-amber-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
          </form>
          <button 
            onClick={() => { setCurrentView('home'); setSelectedCategoryFilter('All'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            Home
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('All'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            Shop All Perfumes
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('Arabic Perfumes'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            Arabic Perfumes
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('Luxury Perfumes'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            Luxury Perfumes
          </button>
          <button 
            onClick={() => { setCurrentView('shop'); setSelectedCategoryFilter('Perfume Oils'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            Perfume Oils
          </button>
          <button 
            onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            Customer Dashboard & Orders
          </button>
          {(role === 'SUPER_ADMIN' || role === 'STAFF') && (
            <button 
              onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }}
              className="text-left py-2 font-medium text-amber-400 border-b border-zinc-900 flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" /> Admin Dashboard Suite
            </button>
          )}
          <button 
            onClick={() => { setCurrentView('about'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium border-b border-zinc-900 hover:text-amber-400"
          >
            About Us
          </button>
          <button 
            onClick={() => { setCurrentView('contact'); setIsMobileMenuOpen(false); }}
            className="text-left py-2 font-medium hover:text-amber-400"
          >
            Contact & WhatsApp: 0591593157
          </button>
        </div>
      )}
    </header>
  );
};
