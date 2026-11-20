import { Product, Supplier, Order, Customer, Coupon, Review, InventoryLog } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Accra Gold Royal Elixir',
    brand: 'Aura Prestige',
    category: 'Luxury Perfumes',
    price: 650,
    costPrice: 320,
    discountPrice: 580,
    sizes: [
      { size: '50ml', price: 650, costPrice: 320, stock: 25 },
      { size: '100ml', price: 980, costPrice: 480, stock: 18 }
    ],
    description: 'A majestic blend of warm golden amber, saffron, and rich Madagascar vanilla, crafted for the discerning Ghanaian elite.',
    topNotes: ['Saffron', 'Bergamot', 'Nutmeg'],
    middleNotes: ['Rose', 'Oud Wood', 'Jasmine'],
    baseNotes: ['Amber', 'Vanilla', 'White Musk', 'Leather'],
    fragranceFamily: 'Woody & Amber',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 43,
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-2',
    name: 'Kumasi Royal Oud Intense',
    brand: 'Orient & Accra',
    category: 'Arabic Perfumes',
    price: 820,
    costPrice: 410,
    sizes: [
      { size: '30ml', price: 450, costPrice: 220, stock: 12 },
      { size: '100ml', price: 820, costPrice: 410, stock: 30 }
    ],
    description: 'An intoxicating oriental masterpiece featuring pure Cambodian oud, smoked frankincense, and dark rose petals.',
    topNotes: ['Incense', 'Raspberry', 'Apple'],
    middleNotes: ['Rose', 'Birch', 'Saffron'],
    baseNotes: ['Agarwood (Oud)', 'Amberwood', 'Benzoin'],
    fragranceFamily: 'Oud & Leather',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 42,
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-3',
    name: 'Volta Breeze Aquatic',
    brand: 'Coastal Scents',
    category: "Men's Perfumes",
    price: 420,
    costPrice: 190,
    sizes: [
      { size: '50ml', price: 420, costPrice: 190, stock: 15 },
      { size: '100ml', price: 620, costPrice: 280, stock: 22 }
    ],
    description: 'Crisp aquatic notes blended with zesty grapefruit and cedarwood, capturing the refreshing breeze of the Volta lake.',
    topNotes: ['Grapefruit', 'Sea Notes', 'Mandarin Orange'],
    middleNotes: ['Bay Leaf', 'Jasmine'],
    baseNotes: ['Guaiac Wood', 'Oakmoss', 'Patchouli', 'Ambergris'],
    fragranceFamily: 'Fresh & Aquatic',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 37,
    isFeatured: true,
    isBestSeller: false,
    isActive: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-4',
    name: 'Asantewaa Golden Nectar Oil',
    brand: 'Royal Essence GH',
    category: 'Perfume Oils',
    price: 280,
    costPrice: 110,
    discountPrice: 240,
    sizes: [
      { size: '30ml', price: 280, costPrice: 110, stock: 50 },
      { size: '50ml', price: 410, costPrice: 160, stock: 25 }
    ],
    description: 'Alcohol-free concentrated perfume oil with rich notes of Arabian jasmine, honeyed orchid, and golden sandalwood.',
    topNotes: ['Honey', 'Orange Blossom'],
    middleNotes: ['Jasmine', 'Orchid', 'Ylang-Ylang'],
    baseNotes: ['Sandalwood', 'Golden Amber', 'Musk'],
    fragranceFamily: 'Floral & Sweet',
    images: [
      'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 75,
    isFeatured: false,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-02-05'
  },
  {
    id: 'prod-5',
    name: 'Accra Night Velvet Femme',
    brand: 'Aura Prestige',
    category: "Women's Perfumes",
    price: 590,
    costPrice: 260,
    sizes: [
      { size: '50ml', price: 590, costPrice: 260, stock: 20 },
      { size: '100ml', price: 850, costPrice: 380, stock: 15 }
    ],
    description: 'An alluring feminine scent featuring sweet blackcurrant, blooming tuberose, and roasted tonka bean for glamorous Accra evenings.',
    topNotes: ['Blackcurrant', 'Pear', 'Pink Pepper'],
    middleNotes: ['Tuberose', 'Jasmine', 'Rose'],
    baseNotes: ['Tonka Bean', 'Vanilla', 'Patchouli', 'Cashmeran'],
    fragranceFamily: 'Floral & Sweet',
    images: [
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 35,
    isFeatured: true,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-6',
    name: 'Savannah Spice Unisex',
    brand: 'Orient & Accra',
    category: 'Unisex Perfumes',
    price: 510,
    costPrice: 230,
    sizes: [
      { size: '50ml', price: 510, costPrice: 230, stock: 18 },
      { size: '100ml', price: 740, costPrice: 340, stock: 22 }
    ],
    description: 'A vibrant harmony of cinnamon, cardamom, and rich tobacco leaf inspired by the rich cultural heritage of Northern Ghana.',
    topNotes: ['Cardamom', 'Cinnamon', 'Bergamot'],
    middleNotes: ['Tobacco Leaf', 'Clove', 'Lavender'],
    baseNotes: ['Vanilla', 'Tonka Bean', 'Cedarwood'],
    fragranceFamily: 'Woody & Amber',
    images: [
      'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 40,
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
    createdAt: '2026-02-12'
  },
  {
    id: 'prod-7',
    name: 'Ghana Sun Body Mist & Spray',
    brand: 'Coastal Scents',
    category: 'Body Sprays',
    price: 180,
    costPrice: 70,
    sizes: [
      { size: '100ml', price: 180, costPrice: 70, stock: 60 }
    ],
    description: 'Light, invigorating body spray infused with tropical mango, hibiscus flower, and coconut water.',
    topNotes: ['Mango', 'Coconut Water', 'Citrus'],
    middleNotes: ['Hibiscus', 'Frangipani'],
    baseNotes: ['Solar Musk', 'Vanilla Blossom'],
    fragranceFamily: 'Fresh & Aquatic',
    images: [
      'https://images.unsplash.com/photo-1523359346063-d879354c0ea5?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 60,
    isFeatured: false,
    isBestSeller: true,
    isActive: true,
    createdAt: '2026-02-15'
  },
  {
    id: 'prod-8',
    name: 'Dubai Royal Musk Attar',
    brand: 'Orient & Accra',
    category: 'Arabic Perfumes',
    price: 490,
    costPrice: 200,
    sizes: [
      { size: '30ml', price: 490, costPrice: 200, stock: 25 }
    ],
    description: 'Pure white musk infused with Arabian rose and delicate amber crystals for a long-lasting skin scent.',
    topNotes: ['White Musk', 'Lily of the Valley'],
    middleNotes: ['Damask Rose', 'Amber Crystals'],
    baseNotes: ['Sensual Musk', 'Sandalwood'],
    fragranceFamily: 'Floral & Sweet',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'
    ],
    stock: 25,
    isFeatured: false,
    isBestSeller: false,
    isActive: true,
    createdAt: '2026-02-18'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'Paris Luxury Fragrance Importers',
    contactPerson: 'Jean-Luc Dubois',
    email: 'imports@parisluxurygh.com',
    phone: '+233 30 212 3456',
    address: 'Airport Residential Area, Accra',
    suppliedBrands: ['Aura Prestige'],
    activeProductsCount: 3
  },
  {
    id: 'sup-2',
    name: 'Orient Essence Dubai Ltd',
    contactPerson: 'Fatima Al-Mansoor',
    email: 'sales@orientessence.ae',
    phone: '+233 30 245 7890',
    address: 'Osu Oxford Street, Accra',
    suppliedBrands: ['Orient & Accra'],
    activeProductsCount: 3
  },
  {
    id: 'sup-3',
    name: 'Coastal Botanicals & Oils',
    contactPerson: 'Kwame Mensah',
    email: 'kwame@coastalbotanicalsgh.com',
    phone: '+233 24 111 2233',
    address: 'Adum, Kumasi',
    suppliedBrands: ['Coastal Scents', 'Royal Essence GH'],
    activeProductsCount: 2
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'AURA-8492',
    customerId: 'cust-1',
    customerName: 'Abena Serwaa',
    customerEmail: 'abena.serwaa@gmail.com',
    customerPhone: '+233 24 456 7890',
    region: 'Greater Accra Region',
    city: 'East Legon',
    address: 'American House, Near Shell Filling Station',
    deliveryInstructions: 'Call before arrival. Leave with gatekeeper if not around.',
    items: [
      {
        productId: 'prod-1',
        productName: 'Accra Gold Royal Elixir',
        selectedSize: '50ml',
        price: 650,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'
      }
    ],
    subtotal: 650,
    discountAmount: 0,
    deliveryFee: 40,
    totalAmount: 690,
    status: 'Delivered',
    paymentMethod: 'MTN Mobile Money',
    paymentStatus: 'Success',
    paymentReference: 'MOMO-GH-9938210',
    deliveryPersonnel: 'Kofi Rider (Accra Central)',
    createdAt: '2026-03-01T10:30:00Z'
  },
  {
    id: 'ord-102',
    orderNumber: 'AURA-8493',
    customerId: 'cust-2',
    customerName: 'Yaw Osei Boateng',
    customerEmail: 'yaw.boateng@yahoo.com',
    customerPhone: '+233 20 987 6543',
    region: 'Ashanti Region',
    city: 'Kumasi',
    address: 'Ahodwo Roundabout, Plot 14',
    deliveryInstructions: 'Deliver to office reception.',
    items: [
      {
        productId: 'prod-2',
        productName: 'Kumasi Royal Oud Intense',
        selectedSize: '100ml',
        price: 820,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'
      },
      {
        productId: 'prod-3',
        productName: 'Volta Breeze Aquatic',
        selectedSize: '50ml',
        price: 420,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800'
      }
    ],
    subtotal: 1240,
    discountAmount: 50,
    deliveryFee: 60,
    totalAmount: 1250,
    status: 'Processing',
    paymentMethod: 'Telecel Cash',
    paymentStatus: 'Success',
    paymentReference: 'TCEL-GH-441092',
    deliveryPersonnel: 'Yaw Express Kumasi',
    createdAt: '2026-03-02T14:15:00Z'
  },
  {
    id: 'ord-103',
    orderNumber: 'AURA-8494',
    customerId: 'cust-3',
    customerName: 'Efia Ohenewaa',
    customerEmail: 'efia.ohene@gmail.com',
    customerPhone: '+233 54 333 2211',
    region: 'Greater Accra Region',
    city: 'Osu',
    address: 'Oxford Street, Near Koala Shopping Mall',
    deliveryInstructions: '',
    items: [
      {
        productId: 'prod-5',
        productName: 'Accra Night Velvet Femme',
        selectedSize: '50ml',
        price: 590,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800'
      }
    ],
    subtotal: 590,
    discountAmount: 0,
    deliveryFee: 30,
    totalAmount: 620,
    status: 'Pending',
    paymentMethod: 'Visa / Mastercard',
    paymentStatus: 'Success',
    paymentReference: 'VISA-GH-882190',
    createdAt: '2026-03-03T09:00:00Z'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Abena Serwaa',
    email: 'abena.serwaa@gmail.com',
    phone: '+233 24 456 7890',
    region: 'Greater Accra Region',
    ordersCount: 4,
    totalSpent: 2850,
    loyaltyPoints: 285,
    createdAt: '2025-11-10'
  },
  {
    id: 'cust-2',
    name: 'Yaw Osei Boateng',
    email: 'yaw.boateng@yahoo.com',
    phone: '+233 20 987 6543',
    region: 'Ashanti Region',
    ordersCount: 2,
    totalSpent: 1250,
    loyaltyPoints: 125,
    createdAt: '2025-12-05'
  },
  {
    id: 'cust-3',
    name: 'Efia Ohenewaa',
    email: 'efia.ohene@gmail.com',
    phone: '+233 54 333 2211',
    region: 'Greater Accra Region',
    ordersCount: 1,
    totalSpent: 620,
    loyaltyPoints: 62,
    createdAt: '2026-01-20'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'AURA10',
    discountPercent: 10,
    minSpend: 300,
    expiryDate: '2026-12-31',
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'GHANA20',
    discountPercent: 20,
    minSpend: 750,
    expiryDate: '2026-06-30',
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'WELCOME50',
    discountPercent: 15,
    minSpend: 200,
    expiryDate: '2026-12-31',
    isActive: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerName: 'Abena Serwaa',
    rating: 5,
    comment: 'Absolute masterpiece! The golden amber and oud notes stay on my clothes for over 24 hours. Worth every Cedi!',
    date: '2026-03-01'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    customerName: 'Yaw Osei Boateng',
    rating: 5,
    comment: 'Very rich oriental fragrance. Smells extremely expensive and gets compliments everywhere in Kumasi.',
    date: '2026-03-02'
  },
  {
    id: 'rev-3',
    productId: 'prod-4',
    customerName: 'Akosua Frimpong',
    rating: 4,
    comment: 'The perfume oil is so concentrated and gentle on the skin. Love the jasmine note.',
    date: '2026-02-28'
  }
];

export const INITIAL_INVENTORY_LOGS: InventoryLog[] = [
  {
    id: 'inv-1',
    productId: 'prod-1',
    productName: 'Accra Gold Royal Elixir',
    type: 'Restock',
    quantityChange: 50,
    previousStock: 0,
    newStock: 50,
    date: '2026-01-10T08:00:00Z',
    performedBy: 'Super Admin'
  },
  {
    id: 'inv-2',
    productId: 'prod-1',
    productName: 'Accra Gold Royal Elixir',
    type: 'Sale',
    quantityChange: -1,
    previousStock: 44,
    newStock: 43,
    date: '2026-03-01T10:30:00Z',
    performedBy: 'System (Checkout)'
  },
  {
    id: 'inv-3',
    productId: 'prod-2',
    productName: 'Kumasi Royal Oud Intense',
    type: 'Restock',
    quantityChange: 45,
    previousStock: 0,
    newStock: 45,
    date: '2026-01-15T09:00:00Z',
    performedBy: 'Super Admin'
  }
];
