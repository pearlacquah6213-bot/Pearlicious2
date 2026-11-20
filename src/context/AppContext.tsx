import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  Order, 
  Customer, 
  Supplier, 
  Coupon, 
  Review, 
  InventoryLog, 
  Role 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_SUPPLIERS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_COUPONS, 
  INITIAL_REVIEWS, 
  INITIAL_INVENTORY_LOGS 
} from '../data/mockData';

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  customers: Customer[];
  suppliers: Supplier[];
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  inventoryLogs: InventoryLog[];
  appliedCoupon: Coupon | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('CUSTOMER');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Persistent storage or initial state
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aura_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('aura_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('aura_suppliers');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLIERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('aura_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('aura_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>(() => {
    const saved = localStorage.getItem('aura_inventory_logs');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY_LOGS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Sync to LocalStorage
  useEffect(() => { localStorage.setItem('aura_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('aura_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('aura_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('aura_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('aura_customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('aura_suppliers', JSON.stringify(suppliers)); }, [suppliers]);
  useEffect(() => { localStorage.setItem('aura_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('aura_reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem('aura_inventory_logs', JSON.stringify(inventoryLogs)); }, [inventoryLogs]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProduct, ...prev]);
    
    // Log inventory
    const newLog: InventoryLog = {
      id: `inv-${Date.now()}`,
      productId: newId,
      productName: newProduct.name,
      type: 'Restock',
      quantityChange: newProduct.stock,
      previousStock: 0,
      newStock: newProduct.stock,
      date: new Date().toISOString(),
      performedBy: role === 'SUPER_ADMIN' ? 'Super Admin' : 'Staff'
    };
    setInventoryLogs((prev) => [newLog, ...prev]);
    showToast(`Perfume "${newProduct.name}" added successfully!`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          return updated;
        }
        return p;
      })
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find(p => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Perfume "${prod?.name || id}" deleted successfully.`);
  };

  const addToCart = (product: Product, selectedSize: string, quantity = 1) => {
    const sizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
    const price = sizeObj ? sizeObj.price : product.price;
    const cartItemId = `${product.id}-${selectedSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { id: cartItemId, productId: product.id, product, selectedSize, price, quantity }];
      }
    });
    showToast(`Added ${product.name} (${selectedSize}) to your bag.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => {
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `AURA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock and add inventory logs
    orderData.items.forEach((item) => {
      setProducts((prevProds) =>
        prevProds.map((p) => {
          if (p.id === item.productId) {
            const newStock = Math.max(0, p.stock - item.quantity);
            // Also update size stock
            const updatedSizes = p.sizes.map(s => s.size === item.selectedSize ? { ...s, stock: Math.max(0, s.stock - item.quantity) } : s);
            return { ...p, stock: newStock, sizes: updatedSizes };
          }
          return p;
        })
      );

      // Inventory log
      const invLog: InventoryLog = {
        id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        productId: item.productId,
        productName: item.productName,
        type: 'Sale',
        quantityChange: -item.quantity,
        previousStock: 0, // approximate
        newStock: 0,
        date: new Date().toISOString(),
        performedBy: orderData.customerName
      };
      setInventoryLogs((prev) => [invLog, ...prev]);
    });

    // Update customer stats
    setCustomers((prevCusts) => {
      const existing = prevCusts.find((c) => c.email.toLowerCase() === orderData.customerEmail.toLowerCase());
      if (existing) {
        return prevCusts.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                ordersCount: c.ordersCount + 1,
                totalSpent: c.totalSpent + orderData.totalAmount,
                loyaltyPoints: c.loyaltyPoints + Math.floor(orderData.totalAmount / 10)
              }
            : c
        );
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone,
          region: orderData.region,
          ordersCount: 1,
          totalSpent: orderData.totalAmount,
          loyaltyPoints: Math.floor(orderData.totalAmount / 10),
          createdAt: new Date().toISOString().split('T')[0]
        };
        return [newCust, ...prevCusts];
      }
    });

    clearCart();
    showToast(`Order ${orderNumber} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    showToast(`Order status updated to ${status}.`);
  };

  const addSupplier = (supplierData: Omit<Supplier, 'id'>) => {
    const newSup: Supplier = {
      ...supplierData,
      id: `sup-${Date.now()}`
    };
    setSuppliers((prev) => [newSup, ...prev]);
    showToast('Supplier added successfully.');
  };

  const updateSupplier = (id: string, fields: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...fields } : s)));
    showToast('Supplier updated.');
  };

  const deleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    showToast('Supplier removed.');
  };

  const addCoupon = (couponData: Omit<Coupon, 'id'>) => {
    const newC: Coupon = {
      ...couponData,
      id: `coup-${Date.now()}`
    };
    setCoupons((prev) => [newC, ...prev]);
    showToast('Coupon created successfully.');
  };

  const toggleCoupon = (id: string) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)));
    showToast('Coupon status updated.');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Coupon deleted.');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your review has been published.');
  };

  const applyCouponCode = (code: string) => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (subtotal < found.minSpend) {
      return { success: false, message: `Minimum spend of GH₵${found.minSpend} required for this coupon.` };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Coupon applied: ${found.discountPercent}% off!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        customers,
        suppliers,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        coupons,
        addCoupon,
        toggleCoupon,
        deleteCoupon,
        reviews,
        addReview,
        inventoryLogs,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        toasts,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
