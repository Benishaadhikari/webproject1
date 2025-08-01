import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config({ path: './config.env' });

const sampleProducts = [
  {
    name: 'BB Cream Foundation',
    image: '/images/BB_Cream.jpg',
    brand: 'Beauty Essentials',
    category: 'Makeup',
    subcategory: 'Foundation',
    description: 'A lightweight BB cream that provides natural coverage while moisturizing your skin. Perfect for everyday wear.',
    ingredients: ['Water', 'Glycerin', 'Titanium Dioxide', 'Zinc Oxide', 'Aloe Vera'],
    howToUse: 'Apply evenly to clean skin using fingertips or a brush. Blend well for natural coverage.',
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    countInStock: 50,
    weight: 30,
    size: '30ml',
    isOrganic: true,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['foundation', 'bb cream', 'natural', 'moisturizing']
  },
  {
    name: 'Floral Body Mist',
    image: '/images/Body Mist.jpg',
    brand: 'Nature\'s Touch',
    category: 'Fragrance',
    subcategory: 'Body Mist',
    description: 'A refreshing floral body mist with notes of jasmine, rose, and vanilla. Light and long-lasting fragrance.',
    ingredients: ['Alcohol', 'Water', 'Fragrance', 'Glycerin', 'Jasmine Extract'],
    howToUse: 'Spray lightly on pulse points and body for a refreshing fragrance.',
    price: 18.99,
    originalPrice: 22.99,
    discount: 17,
    countInStock: 75,
    weight: 100,
    size: '100ml',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: true,
    tags: ['fragrance', 'body mist', 'floral', 'refreshing']
  },
  {
    name: 'Professional Eyeshadow Palette',
    image: '/images/Eyeshadow palette.jpg',
    brand: 'Pro Beauty',
    category: 'Makeup',
    subcategory: 'Eyeshadow',
    description: 'A professional 18-color eyeshadow palette with matte and shimmer finishes. Highly pigmented and long-lasting.',
    ingredients: ['Talc', 'Mica', 'Mineral Oil', 'Titanium Dioxide', 'Iron Oxides'],
    howToUse: 'Apply with a brush to eyelids. Use primer for longer wear. Blend colors for desired look.',
    price: 45.99,
    originalPrice: 59.99,
    discount: 23,
    countInStock: 30,
    weight: 25,
    size: '18 colors',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['eyeshadow', 'palette', 'professional', 'pigmented']
  },
  {
    name: 'Gentle Face Wash',
    image: '/images/Facewash.jpg',
    brand: 'Pure Skin',
    category: 'Skincare',
    subcategory: 'Cleanser',
    description: 'A gentle foaming face wash suitable for all skin types. Removes dirt and makeup without stripping natural oils.',
    ingredients: ['Water', 'Cocamidopropyl Betaine', 'Glycerin', 'Aloe Vera', 'Chamomile Extract'],
    howToUse: 'Wet face with lukewarm water. Apply a small amount and massage gently. Rinse thoroughly.',
    price: 16.99,
    originalPrice: 19.99,
    discount: 15,
    countInStock: 100,
    weight: 150,
    size: '150ml',
    isOrganic: true,
    isCrueltyFree: true,
    isVegan: true,
    tags: ['cleanser', 'face wash', 'gentle', 'all skin types']
  },
  {
    name: 'Luxury Perfume',
    image: '/images/Floral Perfume.jpg',
    brand: 'Luxe Fragrances',
    category: 'Fragrance',
    subcategory: 'Perfume',
    description: 'An elegant floral perfume with notes of peony, jasmine, and white musk. Sophisticated and long-lasting.',
    ingredients: ['Alcohol', 'Fragrance', 'Water', 'Benzyl Salicylate', 'Linalool'],
    howToUse: 'Apply to pulse points: wrists, neck, and behind ears. Reapply as needed.',
    price: 89.99,
    originalPrice: 120.00,
    discount: 25,
    countInStock: 25,
    weight: 50,
    size: '50ml',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['perfume', 'luxury', 'floral', 'long-lasting']
  },
  {
    name: 'Lip Gloss Set',
    image: '/images/Lip Gloss Set.jpg',
    brand: 'Glossy Lips',
    category: 'Makeup',
    subcategory: 'Lip Gloss',
    description: 'A set of 6 high-shine lip glosses in various shades. Non-sticky formula with vitamin E for hydration.',
    ingredients: ['Mineral Oil', 'Petrolatum', 'Vitamin E', 'Fragrance', 'Colorants'],
    howToUse: 'Apply directly to lips or over lipstick for extra shine. Reapply as needed.',
    price: 22.99,
    originalPrice: 29.99,
    discount: 23,
    countInStock: 40,
    weight: 15,
    size: '6 x 3ml',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['lip gloss', 'set', 'shiny', 'hydrating']
  },
  {
    name: 'Volume Plus Mascara',
    image: '/images/Mascara Volume Plus.jpg',
    brand: 'Lash Pro',
    category: 'Makeup',
    subcategory: 'Mascara',
    description: 'A volumizing mascara that adds dramatic volume and length to lashes. Smudge-proof and long-lasting.',
    ingredients: ['Water', 'Acrylic Acid', 'Glycerin', 'Beeswax', 'Iron Oxides'],
    howToUse: 'Apply from root to tip in upward strokes. Build layers for desired volume.',
    price: 28.99,
    originalPrice: 34.99,
    discount: 17,
    countInStock: 60,
    weight: 8,
    size: '8ml',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['mascara', 'volumizing', 'smudge-proof', 'dramatic']
  },
  {
    name: 'Professional Foundation',
    image: '/images/Pro Foundation.jpg',
    brand: 'Pro Beauty',
    category: 'Makeup',
    subcategory: 'Foundation',
    description: 'A professional-grade foundation with buildable coverage. Long-wearing and suitable for photography.',
    ingredients: ['Water', 'Silicone', 'Titanium Dioxide', 'Iron Oxides', 'Glycerin'],
    howToUse: 'Apply with brush or sponge. Build coverage as needed. Set with powder for longer wear.',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    countInStock: 35,
    weight: 30,
    size: '30ml',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['foundation', 'professional', 'buildable', 'long-wearing']
  },
  {
    name: 'Rare Beauty Matte Lipstick',
    image: '/images/Rare Beauty Kind Words Matte Lipstick & Liner.jpg',
    brand: 'Rare Beauty',
    category: 'Makeup',
    subcategory: 'Lipstick',
    description: 'A comfortable matte lipstick with a matching lip liner. Long-lasting color that doesn\'t dry out lips.',
    ingredients: ['Castor Oil', 'Beeswax', 'Vitamin E', 'Colorants', 'Fragrance'],
    howToUse: 'Line lips with liner first, then fill in with lipstick. Reapply as needed.',
    price: 24.99,
    originalPrice: 32.00,
    discount: 22,
    countInStock: 45,
    weight: 3.5,
    size: '3.5g',
    isOrganic: false,
    isCrueltyFree: true,
    isVegan: false,
    tags: ['lipstick', 'matte', 'comfortable', 'long-lasting']
  }
];

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@beautystore.com',
    password: 'admin123',
    phone: '1234567890',
    address: {
      street: '123 Admin Street',
      city: 'Admin City',
      state: 'AS',
      zipCode: '12345'
    },
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '9876543210',
    address: {
      street: '456 Customer Ave',
      city: 'Customer City',
      state: 'CS',
      zipCode: '54321'
    },
    isAdmin: false
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    
    // Create users
    const createdUsers = await User.insertMany(sampleUsers);
    const adminUser = createdUsers.find(user => user.isAdmin);
    
    // Add user reference to products
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      user: adminUser._id
    }));
    
    // Create products
    await Product.insertMany(productsWithUser);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await User.deleteMany();
    await Product.deleteMany();
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 