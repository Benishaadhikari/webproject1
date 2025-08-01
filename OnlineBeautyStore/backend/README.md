# BeautyStore Backend API

A comprehensive RESTful API for BeautyStore, an online beauty store built with Node.js, Express, and MongoDB.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: CRUD operations for beauty products with categories, brands, and specifications
- **Order Processing**: Complete order lifecycle from creation to delivery
- **Review System**: Product reviews and ratings
- **Wishlist Management**: User wishlist functionality
- **Search & Filtering**: Advanced product search with multiple filters
- **Admin Dashboard**: Admin-only endpoints for store management
- **Security**: Input validation, rate limiting, and security headers
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Security**: helmet, cors, express-rate-limit
- **Logging**: morgan

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)
- `GET /api/auth/users` - Get all users (Admin only)
- `DELETE /api/auth/users/:id` - Delete user (Admin only)

### Products
- `GET /api/products` - Get all products with pagination and filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `POST /api/products/:id/reviews` - Add product review (Protected)
- `GET /api/products/top` - Get top rated products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/brands` - Get all brands
- `GET /api/products/categories` - Get all categories

### Orders
- `POST /api/orders` - Create new order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/pay` - Update order to paid (Protected)
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/stats` - Get order statistics (Admin only)

### Users
- `POST /api/users/wishlist` - Add product to wishlist (Protected)
- `DELETE /api/users/wishlist/:productId` - Remove product from wishlist (Protected)
- `GET /api/users/wishlist` - Get user wishlist (Protected)
- `GET /api/users/stats` - Get user statistics (Protected)

## Data Models

### User
- name, email, password, phone
- address (street, city, state, zipCode, country)
- isAdmin (boolean)
- wishlist (array of product IDs)
- timestamps

### Product
- name, description, image, brand, category
- price, countInStock, discount
- rating, numReviews, reviews (sub-schema)
- tags, specifications (size, weight, ingredients, skinType, benefits)
- isActive (boolean)
- timestamps

### Order
- user (reference), orderItems (array)
- shippingAddress, paymentMethod, paymentResult
- itemsPrice, taxPrice, shippingPrice, totalPrice
- isPaid, paidAt, isDelivered, deliveredAt
- status (Pending, Processing, Shipped, Delivered, Cancelled)
- trackingNumber, notes
- timestamps

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Registration**: Users register with email and password
2. **Login**: Users login and receive a JWT token
3. **Protected Routes**: Include the token in the Authorization header:
   ```
   Authorization: Bearer <token>
   ```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Applied to all `/api/` routes

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/beauty_store
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   - Copy `config.env` to `.env`
   - Update the values as needed

3. **Start MongoDB**:
   - Ensure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud service)

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Seed the database** (optional):
   ```bash
   # Import sample data
   npm run data:import
   
   # Destroy sample data
   npm run data:destroy
   ```

## Sample Data

The seeder includes:
- 2 users (1 admin, 1 regular user)
- 9 beauty products across different categories
- Products include images matching your frontend assets

## API Testing

You can test the API using tools like:
- Postman
- Insomnia
- curl commands

### Example API calls:

**Register a new user**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456",
    "phone": "1234567890"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
```

**Get products**:
```bash
curl http://localhost:5000/api/products
```

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using express-validator
- **Rate Limiting**: Prevents abuse of the API
- **CORS**: Configured for cross-origin requests
- **Helmet**: Security headers for protection
- **Error Handling**: Proper error responses without exposing sensitive information

## Development

### Project Structure
```
backend/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   └── users.js
├── utils/
│   ├── validation.js
│   └── seeder.js
├── server.js
├── package.json
└── config.env
```

### Adding New Features

1. **New Model**: Create in `models/` directory
2. **New Controller**: Create in `controllers/` directory
3. **New Routes**: Create in `routes/` directory
4. **Update server.js**: Add the new route

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure MongoDB Atlas or production MongoDB
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
6. Consider using PM2 for process management

## License

This project is licensed under the ISC License. 