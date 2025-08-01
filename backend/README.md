# Beauty Store Backend API

A comprehensive REST API for an online beauty store built with Node.js, Express, and MongoDB.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: CRUD operations for beauty products with categories and filtering
- **Order Management**: Complete order lifecycle with payment and shipping tracking
- **Review System**: Product reviews and ratings
- **Wishlist**: User wishlist functionality
- **Admin Dashboard**: Statistics and management tools
- **Security**: Input validation, rate limiting, and security headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: bcryptjs, helmet, express-rate-limit
- **File Upload**: Multer

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/beauty_store
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |
| GET | `/api/auth/users` | Get all users | Admin |
| DELETE | `/api/auth/users/:id` | Delete user | Admin |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get product by ID | Public |
| GET | `/api/products/top` | Get top rated products | Public |
| GET | `/api/products/brands` | Get all brands | Public |
| GET | `/api/products/category/:category` | Get products by category | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/products/:id/reviews` | Add product review | Private |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create new order | Private |
| GET | `/api/orders/myorders` | Get user orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| PUT | `/api/orders/:id/pay` | Update order to paid | Private |
| PUT | `/api/orders/:id/cancel` | Cancel order | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/deliver` | Mark order as delivered | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |
| GET | `/api/orders/stats` | Get order statistics | Admin |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/wishlist` | Add to wishlist | Private |
| DELETE | `/api/users/wishlist/:productId` | Remove from wishlist | Private |
| GET | `/api/users/wishlist` | Get user wishlist | Private |
| GET | `/api/users/stats` | Get user statistics | Admin |

## Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  isAdmin: Boolean,
  wishlist: [Product IDs],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}
```

### Product
```javascript
{
  name: String,
  image: String,
  brand: String,
  category: String,
  subcategory: String,
  description: String,
  ingredients: [String],
  howToUse: String,
  price: Number,
  originalPrice: Number,
  discount: Number,
  countInStock: Number,
  weight: Number,
  size: String,
  isOrganic: Boolean,
  isCrueltyFree: Boolean,
  isVegan: Boolean,
  expiryDate: Date,
  ratings: Number,
  numReviews: Number,
  reviews: [Review],
  isActive: Boolean,
  tags: [String]
}
```

### Order
```javascript
{
  user: User ID,
  orderItems: [{
    name: String,
    qty: Number,
    image: String,
    price: Number,
    product: Product ID
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean,
  paidAt: Date,
  isDelivered: Boolean,
  deliveredAt: Date,
  status: String,
  trackingNumber: String,
  notes: String
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Applied to all API routes

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Security headers with helmet
- Rate limiting
- MongoDB injection protection

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/beauty_store |
| JWT_SECRET | JWT signing secret | Required |
| NODE_ENV | Environment mode | development |

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running in Production Mode
```bash
npm start
```

### API Testing

You can test the API using tools like:
- Postman
- Insomnia
- curl commands

Example curl command for login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License. 