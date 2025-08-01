import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: '123456',
    phone: '1234567890',
    address: {
      street: '123 Admin St',
      city: 'Admin City',
      state: 'AS',
      zipCode: '12345',
      country: 'USA',
    },
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    phone: '0987654321',
    address: {
      street: '456 User Ave',
      city: 'User City',
      state: 'US',
      zipCode: '54321',
      country: 'USA',
    },
    isAdmin: false,
  },
];

const products = [
  {
    name: 'BB Cream Foundation',
    price: 29.99,
    description: 'Lightweight BB cream that provides coverage and skincare benefits',
    image: '/images/BB_Cream.jpg',
    brand: 'BeautyBrand',
    category: 'Makeup',
    countInStock: 50,
    numReviews: 12,
    rating: 4.5,
    tags: ['foundation', 'bb cream', 'lightweight'],
    specifications: {
      size: '30ml',
      weight: '30g',
      ingredients: ['Water', 'Glycerin', 'Titanium Dioxide'],
      skinType: ['All skin types'],
      benefits: ['Coverage', 'Hydration', 'SPF protection'],
    },
    discount: 0,
  },
  {
    name: 'Body Mist Fragrance',
    price: 24.99,
    description: 'Refreshing body mist with long-lasting fragrance',
    image: '/images/Body Mist.jpg',
    brand: 'FragranceCo',
    category: 'Fragrance',
    countInStock: 75,
    numReviews: 8,
    rating: 4.2,
    tags: ['fragrance', 'body mist', 'refreshing'],
    specifications: {
      size: '100ml',
      weight: '100g',
      ingredients: ['Alcohol', 'Fragrance', 'Water'],
      skinType: ['All skin types'],
      benefits: ['Long-lasting', 'Refreshing', 'Light scent'],
    },
    discount: 10,
  },
  {
    name: 'Eyeshadow Palette',
    price: 45.99,
    description: 'Professional eyeshadow palette with 18 highly pigmented shades',
    image: '/images/Eyeshadow palette.jpg',
    brand: 'MakeupPro',
    category: 'Makeup',
    countInStock: 30,
    numReviews: 25,
    rating: 4.8,
    tags: ['eyeshadow', 'palette', 'pigmented'],
    specifications: {
      size: '18 shades',
      weight: '200g',
      ingredients: ['Mica', 'Talc', 'Mineral Oil'],
      skinType: ['All skin types'],
      benefits: ['Highly pigmented', 'Long-lasting', 'Blendable'],
    },
    discount: 0,
  },
  {
    name: 'Gentle Face Wash',
    price: 19.99,
    description: 'Gentle daily face wash suitable for all skin types',
    image: '/images/Facewash.jpg',
    brand: 'SkincarePlus',
    category: 'Skincare',
    countInStock: 100,
    numReviews: 45,
    rating: 4.6,
    tags: ['face wash', 'gentle', 'daily'],
    specifications: {
      size: '150ml',
      weight: '150g',
      ingredients: ['Water', 'Glycerin', 'Aloe Vera'],
      skinType: ['All skin types', 'Sensitive'],
      benefits: ['Gentle cleansing', 'Hydrating', 'Non-irritating'],
    },
    discount: 5,
  },
  {
    name: 'Floral Perfume',
    price: 89.99,
    description: 'Luxury floral perfume with notes of rose and jasmine',
    image: '/images/Floral Perfume.jpg',
    brand: 'LuxuryScents',
    category: 'Fragrance',
    countInStock: 20,
    numReviews: 15,
    rating: 4.9,
    tags: ['perfume', 'floral', 'luxury'],
    specifications: {
      size: '50ml',
      weight: '50g',
      ingredients: ['Alcohol', 'Fragrance', 'Essential Oils'],
      skinType: ['All skin types'],
      benefits: ['Long-lasting', 'Luxury scent', 'Elegant'],
    },
    discount: 0,
  },
  {
    name: 'Lip Gloss Set',
    price: 34.99,
    description: 'Set of 6 beautiful lip glosses in various shades',
    image: '/images/Lip Gloss Set.jpg',
    brand: 'GlossyLips',
    category: 'Makeup',
    countInStock: 40,
    numReviews: 18,
    rating: 4.3,
    tags: ['lip gloss', 'set', 'shades'],
    specifications: {
      size: '6 x 5ml',
      weight: '30g',
      ingredients: ['Petroleum Jelly', 'Beeswax', 'Vitamin E'],
      skinType: ['All skin types'],
      benefits: ['Hydrating', 'Shiny finish', 'Non-sticky'],
    },
    discount: 15,
  },
  {
    name: 'Mascara Volume Plus',
    price: 27.99,
    description: 'Volumizing mascara that adds length and volume to lashes',
    image: '/images/Mascara Volume Plus.jpg',
    brand: 'LashPro',
    category: 'Makeup',
    countInStock: 60,
    numReviews: 32,
    rating: 4.7,
    tags: ['mascara', 'volume', 'length'],
    specifications: {
      size: '10ml',
      weight: '10g',
      ingredients: ['Water', 'Acrylic Polymer', 'Beeswax'],
      skinType: ['All skin types'],
      benefits: ['Volumizing', 'Lengthening', 'Smudge-proof'],
    },
    discount: 0,
  },
  {
    name: 'Professional Foundation',
    price: 39.99,
    description: 'Professional foundation with buildable coverage',
    image: '/images/Pro Foundation.jpg',
    brand: 'ProMakeup',
    category: 'Makeup',
    countInStock: 35,
    numReviews: 28,
    rating: 4.4,
    tags: ['foundation', 'professional', 'buildable'],
    specifications: {
      size: '30ml',
      weight: '30g',
      ingredients: ['Water', 'Titanium Dioxide', 'Iron Oxides'],
      skinType: ['All skin types'],
      benefits: ['Buildable coverage', 'Long-lasting', 'Natural finish'],
    },
    discount: 8,
  },
  {
    name: 'Rare Beauty Lipstick',
    price: 22.99,
    description: 'Matte lipstick with liner in beautiful shades',
    image: '/images/Rare Beauty Kind Words Matte Lipstick & Liner.jpg',
    brand: 'Rare Beauty',
    category: 'Makeup',
    countInStock: 25,
    numReviews: 20,
    rating: 4.6,
    tags: ['lipstick', 'matte', 'liner'],
    specifications: {
      size: '3.5g',
      weight: '3.5g',
      ingredients: ['Beeswax', 'Castor Oil', 'Pigments'],
      skinType: ['All skin types'],
      benefits: ['Matte finish', 'Long-lasting', 'Includes liner'],
    },
    discount: 0,
  },
];

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 