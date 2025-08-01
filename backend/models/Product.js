import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  brand: {
    type: String,
    required: [true, 'Please add a brand']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'Skincare',
      'Makeup',
      'Haircare',
      'Fragrance',
      'Tools',
      'Bath & Body',
      'Men\'s Grooming'
    ]
  },
  subcategory: {
    type: String,
    required: [true, 'Please add a subcategory']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  ingredients: [{
    type: String
  }],
  howToUse: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be positive']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price must be positive']
  },
  discount: {
    type: Number,
    min: [0, 'Discount must be positive'],
    max: [100, 'Discount cannot exceed 100%'],
    default: 0
  },
  countInStock: {
    type: Number,
    required: [true, 'Please add stock count'],
    min: [0, 'Stock count must be positive'],
    default: 0
  },
  weight: {
    type: Number,
    required: [true, 'Please add weight in grams']
  },
  size: {
    type: String,
    required: [true, 'Please add size']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isCrueltyFree: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date
  },
  ratings: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

// Calculate average rating
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.ratings = 0;
    this.numReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.ratings = totalRating / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
};

export default mongoose.model('Product', productSchema); 