import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Custom validator for ObjectId
export const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Custom validator for price range
export const validatePriceRange = (min, max) => {
  return (value) => {
    const price = parseFloat(value);
    if (isNaN(price) || price < min || price > max) {
      throw new Error(`Price must be between ${min} and ${max}`);
    }
    return true;
  };
};

// Custom validator for date range
export const validateDateRange = (startDate, endDate) => {
  return (value) => {
    const date = new Date(value);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (date < start || date > end) {
      throw new Error(`Date must be between ${startDate} and ${endDate}`);
    }
    return true;
  };
};

// Sanitize search query
export const sanitizeSearchQuery = (query) => {
  return query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Validate pagination parameters
export const validatePagination = (page, limit) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  
  if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
    throw new Error('Invalid pagination parameters');
  }
  
  return { page: pageNum, limit: limitNum };
}; 