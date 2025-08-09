# 📱 Amazon Clone Mobile App

A React Native mobile application for the Amazon Clone e-commerce platform. This app provides a native mobile experience with all the core features of the web application.

## ✨ Features

### 🛍️ Shopping Features
- **Product Browsing**: Browse products with beautiful grid layout
- **Product Search**: Real-time search with suggestions
- **Category Filtering**: Browse products by category
- **Product Details**: Detailed product view with images, reviews, and descriptions
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders and track order history

### 👤 User Features
- **User Authentication**: Register, login, and profile management
- **Profile Management**: Update user information and preferences
- **Order Tracking**: View order status and history
- **Favorites**: Save favorite products (coming soon)

### 🎨 UI/UX Features
- **Modern Design**: Amazon-inspired design with orange theme
- **Responsive Layout**: Optimized for different screen sizes
- **Smooth Animations**: Fluid transitions and interactions
- **Dark Mode Support**: Automatic theme adaptation
- **Offline Support**: Basic offline functionality

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **React Native Paper** - Material Design components
- **Axios** - HTTP client for API calls
- **AsyncStorage** - Local data persistence
- **Expo Vector Icons** - Icon library
- **React Native Toast Message** - User notifications

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android development)
- **Android SDK** (for Android development)
- **Backend Server** (your Amazon Clone backend must be running)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd mobile-app
npm install
```

### 2. Configure Backend URL

Edit `src/services/api.js` and update the `BASE_URL`:

```javascript
// For Android Emulator:
const BASE_URL = 'http://10.0.2.2:5000/api';

// For iOS Simulator:
// const BASE_URL = 'http://localhost:5000/api';

// For Physical Device (replace with your computer's IP):
// const BASE_URL = 'http://192.168.1.100:5000/api';
```

### 3. Start the Development Server

```bash
npm start
```

### 4. Run on Android

```bash
npm run android
```

Or scan the QR code with the Expo Go app on your Android device.

## 📱 App Structure

```
mobile-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ProductCard.js   # Product display component
│   │   └── CategoryCard.js  # Category display component
│   ├── context/             # React Context providers
│   │   ├── AuthContext.js   # Authentication state
│   │   └── CartContext.js   # Shopping cart state
│   ├── screens/             # App screens
│   │   ├── LoginScreen.js   # User login
│   │   ├── RegisterScreen.js # User registration
│   │   ├── HomeScreen.js    # Main home screen
│   │   ├── ProductDetailScreen.js # Product details
│   │   ├── CartScreen.js    # Shopping cart
│   │   ├── OrdersScreen.js  # Order history
│   │   ├── ProfileScreen.js # User profile
│   │   ├── SearchScreen.js  # Product search
│   │   └── CategoryScreen.js # Category products
│   └── services/            # API services
│       └── api.js          # HTTP client and API calls
├── App.js                   # Main app component
├── app.json                 # Expo configuration
└── package.json             # Dependencies
```

## 🎯 Key Features Implementation

### Authentication Flow
- JWT token-based authentication
- Automatic token refresh
- Secure token storage with AsyncStorage
- Login/Register screens with validation

### Shopping Cart
- Real-time cart updates
- Quantity management
- Cart persistence across app sessions
- Checkout process

### Product Management
- Product grid with lazy loading
- Search functionality with debouncing
- Category filtering
- Product details with reviews

### Order Management
- Order placement
- Order history
- Order status tracking
- Order details view

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
EXPO_PUBLIC_APP_NAME=Amazon Clone
```

### API Configuration

The app communicates with your backend API. Make sure your backend is running and accessible from the mobile device/emulator.

## 📱 Platform Support

- **Android**: Full support (tested on Android 8+)
- **iOS**: Full support (tested on iOS 12+)
- **Web**: Limited support (basic functionality)

## 🚀 Deployment

### Building for Production

```bash
# Build for Android
expo build:android

# Build for iOS
expo build:ios
```

### Publishing to Stores

1. **Google Play Store**:
   ```bash
   expo build:android --release-channel production
   ```

2. **Apple App Store**:
   ```bash
   expo build:ios --release-channel production
   ```

## 🔍 Troubleshooting

### Common Issues

1. **Backend Connection Issues**:
   - Ensure your backend server is running
   - Check the API URL configuration
   - Verify network connectivity

2. **Android Emulator Issues**:
   - Use `10.0.2.2` instead of `localhost` for backend URL
   - Ensure Android Studio and SDK are properly installed

3. **iOS Simulator Issues**:
   - Use `localhost` for backend URL
   - Ensure Xcode is properly installed

4. **Physical Device Issues**:
   - Use your computer's IP address for backend URL
   - Ensure device and computer are on the same network

### Debug Mode

Enable debug mode by shaking the device or pressing `Cmd+D` (iOS) or `Cmd+M` (Android) in the simulator.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Expo team for the development platform
- React Navigation team for navigation
- All open-source contributors

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yuvaraj-dudukuru/amazon_clone/issues) page
2. Create a new issue with detailed description
3. Contact: your-email@example.com

---

**Happy Mobile Development! 📱🚀**
