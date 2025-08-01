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
  getBrands
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Product name must be between 3 and 100 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand is required'),
  body('category')
    .isIn(['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Tools', 'Bath & Body', 'Men\'s Grooming'])
    .withMessage('Please select a valid category'),
  body('subcategory')
    .trim()
    .notEmpty()
    .withMessage('Subcategory is required'),
  body('countInStock')
    .isInt({ min: 0 })
    .withMessage('Stock count must be a non-negative integer'),
  body('weight')
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),
  body('size')
    .trim()
    .notEmpty()
    .withMessage('Size is required'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image URL is required')
];

const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Comment must be between 10 and 500 characters')
];

// Public routes
router.get('/', getProducts);
router.get('/top', getTopProducts);
router.get('/brands', getBrands);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Protected routes
router.post('/:id/reviews', protect, reviewValidation, createProductReview);

// Admin routes
router.route('/')
  .post(protect, admin, productValidation, createProduct);

router.route('/:id')
  .put(protect, admin, productValidation, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router; 