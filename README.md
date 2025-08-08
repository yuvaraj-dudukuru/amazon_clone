# 🛒 Amazon Clone - Full Stack E-commerce Platform

A modern, responsive e-commerce web application built with React.js, Node.js, Express.js, and MongoDB. This project replicates core Amazon functionality including user authentication, product management, shopping cart, and order processing.

## ✨ Features

### 🛍️ User Features
- **Product Browsing**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items, update quantities
- **User Authentication**: Register, login, and profile management
- **Order Management**: Place orders and track order history
- **Product Reviews**: Rate and review products
- **Responsive Design**: Works on desktop, tablet, and mobile

### 🏪 Seller Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage incoming orders
- **Dashboard**: Analytics and sales overview
- **Image Upload**: Upload product images

### 🔧 Technical Features
- **JWT Authentication**: Secure user sessions
- **RESTful API**: Clean, scalable backend architecture
- **File Upload**: Product image management
- **Real-time Updates**: Live cart and order updates
- **Search & Filtering**: Advanced product discovery
- **Payment Integration**: Ready for payment gateway integration

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - User notifications
- **React Icons** - Icon library
- **CSS3** - Custom styling with Amazon-like design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/amazon-clone.git
cd amazon-clone
```

### 2. Install Dependencies

```bash
# Install all dependencies (both frontend and backend)
npm run install-all
```

Or install them separately:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
```

Create `.env` file with the following content:

```env
PORT=5000
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/amazon-clone

# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/amazon-clone?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 4. Set Up MongoDB

#### Option A: Local MongoDB
1. Download and install MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. The application will automatically create the database

#### Option B: MongoDB Atlas (Recommended for beginners)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string and update the `MONGODB_URI` in `.env`

### 5. Run the Application

#### Development Mode (Both Frontend and Backend)
```bash
# From the root directory
npm run dev
```

#### Run Separately

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000 (shows available endpoints)

## 📁 Project Structure

```
amazon-clone/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & validation
│   ├── uploads/         # Product images
│   ├── .env            # Environment variables
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Static files
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── pages/      # Page components
│   │   └── App.js      # Main app component
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller only)
- `PUT /api/products/:id` - Update product (seller only)
- `DELETE /api/products/:id` - Delete product (seller only)
- `POST /api/products/:id/reviews` - Add product review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Mark order as paid
- `PUT /api/orders/:id/deliver` - Mark order as delivered
- `GET /api/orders/seller/orders` - Get seller orders

## 👥 User Roles

### Customer
- Browse products
- Add items to cart
- Place orders
- Write reviews
- Manage profile

### Seller
- All customer features
- Add/edit/delete products
- Manage orders
- View sales analytics

## 🎨 Customization

### Styling
The application uses custom CSS with an Amazon-like color scheme. You can customize the styling by modifying:
- `frontend/src/index.css` - Global styles
- `frontend/src/App.css` - App-specific styles
- Component-specific CSS files

### Configuration
- **Database**: Change MongoDB connection in `backend/.env`
- **Ports**: Modify PORT in `backend/.env` and proxy in `frontend/package.json`
- **JWT Secret**: Update JWT_SECRET in `backend/.env`

## 🚀 Deployment

### Frontend Deployment
- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `build` folder
- **Firebase**: Use Firebase Hosting

### Backend Deployment
- **Render**: Connect your GitHub repository
- **Railway**: Deploy directly from GitHub
- **Heroku**: Use Heroku CLI or GitHub integration

### Database Deployment
- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Supabase**: Alternative PostgreSQL option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB team for the database
- Express.js team for the web framework
- All open-source contributors

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/amazon-clone/issues) page
2. Create a new issue with detailed description
3. Contact: dudukuruyuvaraj55@gmail.com

---

**Happy Coding! 🚀** 
