# Amazon Clone Backend API

A comprehensive Node.js/Express.js backend API for the Amazon Clone e-commerce application.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: CRUD operations for products with image uploads
- **Shopping Cart**: Full cart functionality with stock validation
- **Order Management**: Complete order lifecycle with status tracking
- **User Management**: User profiles and role management
- **Reviews & Ratings**: Product review system
- **File Uploads**: Image upload support with Multer
- **Security**: Input validation, rate limiting, and security headers

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**:
   - Copy `config.env` and update the values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/amazon-clone
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start MongoDB** (if using local MongoDB):
   ```bash
   mongod
   ```

4. **Run the server**:
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| GET | `/api/auth/me` | Get current user profile | Private |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/products` | Get all products (with filters) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create new product | Private (Seller/Admin) |
| PUT | `/api/products/:id` | Update product | Private (Owner/Admin) |
| DELETE | `/api/products/:id` | Delete product | Private (Owner/Admin) |
| POST | `/api/products/:id/reviews` | Add product review | Private |

### Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/cart` | Get user's cart | Private |
| POST | `/api/cart` | Add item to cart | Private |
| PUT | `/api/cart/:itemId` | Update cart item quantity | Private |
| DELETE | `/api/cart/:itemId` | Remove item from cart | Private |
| DELETE | `/api/cart` | Clear entire cart | Private |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/orders` | Create new order | Private |
| GET | `/api/orders` | Get user's orders | Private |
| GET | `/api/orders/:id` | Get single order | Private |
| PUT | `/api/orders/:id/pay` | Mark order as paid | Private |
| PUT | `/api/orders/:id/deliver` | Mark order as delivered | Private (Seller/Admin) |
| PUT | `/api/orders/:id/status` | Update order status | Private (Seller/Admin) |
| GET | `/api/orders/seller/orders` | Get seller's orders | Private (Seller/Admin) |

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Create Product
```bash
POST /api/products
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "title": "iPhone 13",
  "description": "Latest iPhone with amazing features",
  "price": 799.99,
  "category": "Electronics",
  "stock": 10,
  "tags": "smartphone, apple, ios",
  "images": [file1, file2]
}
```

### Add to Cart
```bash
POST /api/cart
Content-Type: application/json
Authorization: Bearer <token>

{
  "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "quantity": 2
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Prevents abuse with request rate limiting
- **CORS**: Configured for frontend communication
- **Helmet**: Security headers for protection
- **File Upload Validation**: Image type and size validation

## Database Models

### User
- Authentication fields (name, email, password)
- Role-based access (user, seller, admin)
- Profile information (phone, address)
- Timestamps

### Product
- Product details (title, description, price, category)
- Stock management
- Image URLs
- Seller reference
- Reviews and ratings
- Active/inactive status

### Cart
- User reference
- Cart items with product and quantity
- Total amount calculation
- Timestamps

### Order
- User and items reference
- Shipping address
- Payment information
- Order status tracking
- Timestamps

## Development

### File Structure
```
backend/
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── uploads/         # File uploads
├── config.env       # Environment variables
├── server.js        # Main server file
└── package.json     # Dependencies
```

### Adding New Features

1. Create model in `models/` directory
2. Add routes in `routes/` directory
3. Update `server.js` to include new routes
4. Add validation and error handling
5. Test with appropriate tools (Postman, etc.)

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong JWT secret
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Use environment variables for sensitive data
6. Consider using cloud storage for file uploads (AWS S3, Cloudinary)

## Testing

The API can be tested using:
- Postman
- Insomnia
- curl commands
- Frontend application

## Support

For issues and questions, please refer to the main project documentation or create an issue in the repository. 