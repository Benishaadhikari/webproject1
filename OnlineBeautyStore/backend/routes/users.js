import express from 'express';
import { body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const validateWishlistItem = [
  body('productId').isMongoId().withMessage('Valid product ID is required'),
];

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (user.wishlist.includes(productId)) {
    res.status(400);
    throw new Error('Product already in wishlist');
  }

  user.wishlist.push(productId);
  await user.save();

  res.json({ message: 'Product added to wishlist' });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const user = await User.findById(req.user._id);

  const index = user.wishlist.indexOf(productId);
  if (index === -1) {
    res.status(404);
    throw new Error('Product not in wishlist');
  }

  user.wishlist.splice(index, 1);
  await user.save();

  res.json({ message: 'Product removed from wishlist' });
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
});

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
const getUserStats = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  // You can add more statistics here based on your needs
  const stats = {
    wishlistCount: user.wishlist.length,
    // Add more stats as needed
  };

  res.json(stats);
});

// Routes
router.post('/wishlist', protect, validateWishlistItem, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);
router.get('/wishlist', protect, getWishlist);
router.get('/stats', protect, getUserStats);

export default router; 