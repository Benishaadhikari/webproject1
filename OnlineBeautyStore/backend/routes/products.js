import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
  getBrands,
  getCategories,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('category').isIn(['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Tools', 'Bath & Body'])
    .withMessage('Invalid category'),
  body('countInStock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
];

const validateReview = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').notEmpty().withMessage('Comment is required'),
];

// @route   GET /api/products
router.get('/', getProducts);

// @route   GET /api/products/top
router.get('/top', getTopProducts);

// @route   GET /api/products/brands
router.get('/brands', getBrands);

// @route   GET /api/products/categories
router.get('/categories', getCategories);

// @route   GET /api/products/category/:category
router.get('/category/:category', getProductsByCategory);

// @route   GET /api/products/:id
router.get('/:id', getProductById);

// @route   POST /api/products/:id/reviews
router.post('/:id/reviews', protect, validateReview, createProductReview);

// @route   POST /api/products
router.post('/', protect, admin, validateProduct, createProduct);

// @route   PUT /api/products/:id
router.put('/:id', protect, admin, validateProduct, updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', protect, admin, deleteProduct);

export default router; 