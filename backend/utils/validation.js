import { validationResult } from 'express-validator';

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

// Custom validation for MongoDB ObjectId
export const isValidObjectId = (value) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(value);
};

// Custom validation for price range
export const isValidPriceRange = (minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    return parseFloat(minPrice) <= parseFloat(maxPrice);
  }
  return true;
};

// Custom validation for date range
export const isValidDateRange = (startDate, endDate) => {
  if (startDate && endDate) {
    return new Date(startDate) <= new Date(endDate);
  }
  return true;
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
    return false;
  }
  
  return { page: pageNum, limit: limitNum };
}; 