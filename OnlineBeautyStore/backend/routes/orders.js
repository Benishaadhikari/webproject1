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
  getOrderStats,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateOrder = [
  body('orderItems').isArray({ min: 1 }).withMessage('Order must have at least one item'),
  body('orderItems.*.name').notEmpty().withMessage('Product name is required'),
  body('orderItems.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('orderItems.*.price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('shippingAddress.address').notEmpty().withMessage('Shipping address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.postalCode').notEmpty().withMessage('Postal code is required'),
  body('shippingAddress.country').notEmpty().withMessage('Country is required'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  body('itemsPrice').isFloat({ min: 0 }).withMessage('Items price must be a positive number'),
  body('taxPrice').isFloat({ min: 0 }).withMessage('Tax price must be a positive number'),
  body('shippingPrice').isFloat({ min: 0 }).withMessage('Shipping price must be a positive number'),
  body('totalPrice').isFloat({ min: 0 }).withMessage('Total price must be a positive number'),
];

const validatePayment = [
  body('id').notEmpty().withMessage('Payment ID is required'),
  body('status').notEmpty().withMessage('Payment status is required'),
  body('update_time').notEmpty().withMessage('Update time is required'),
  body('payer.email_address').isEmail().withMessage('Valid email address is required'),
];

const validateStatusUpdate = [
  body('status').isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])
    .withMessage('Invalid status'),
];

// @route   POST /api/orders
router.post('/', protect, validateOrder, addOrderItems);

// @route   GET /api/orders/myorders
router.get('/myorders', protect, getMyOrders);

// @route   GET /api/orders/stats
router.get('/stats', protect, admin, getOrderStats);

// @route   GET /api/orders
router.get('/', protect, admin, getOrders);

// @route   GET /api/orders/:id
router.get('/:id', protect, getOrderById);

// @route   PUT /api/orders/:id/pay
router.put('/:id/pay', protect, validatePayment, updateOrderToPaid);

// @route   PUT /api/orders/:id/deliver
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, admin, validateStatusUpdate, updateOrderStatus);

// @route   PUT /api/orders/:id/cancel
router.put('/:id/cancel', protect, cancelOrder);

export default router; 