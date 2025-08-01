import express from 'express';
import { body } from 'express-validator';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const orderValidation = [
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('orderItems.*.name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required'),
  body('orderItems.*.qty')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('orderItems.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('orderItems.*.image')
    .trim()
    .notEmpty()
    .withMessage('Product image is required'),
  body('orderItems.*.product')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  body('shippingAddress.address')
    .trim()
    .notEmpty()
    .withMessage('Shipping address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.postalCode')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required'),
  body('shippingAddress.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('paymentMethod')
    .isIn(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery'])
    .withMessage('Please select a valid payment method'),
  body('itemsPrice')
    .isFloat({ min: 0 })
    .withMessage('Items price must be a positive number'),
  body('taxPrice')
    .isFloat({ min: 0 })
    .withMessage('Tax price must be a positive number'),
  body('shippingPrice')
    .isFloat({ min: 0 })
    .withMessage('Shipping price must be a positive number'),
  body('totalPrice')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number')
];

const orderStatusValidation = [
  body('status')
    .optional()
    .isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
    .withMessage('Please select a valid status'),
  body('trackingNumber')
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage('Tracking number must be at least 3 characters'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
];

// Protected routes
router.route('/')
  .post(protect, orderValidation, addOrderItems);

router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/cancel')
  .put(protect, cancelOrder);

// Admin routes
router.route('/')
  .get(protect, admin, getOrders);

router.route('/stats')
  .get(protect, admin, getOrderStats);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

router.route('/:id/status')
  .put(protect, admin, orderStatusValidation, updateOrderStatus);

export default router; 