# 📱 Mobile App Setup Guide

This guide will help you set up and run the Amazon Clone mobile app on your Android device or emulator.

## 🚀 Quick Setup

### Prerequisites

1. **Node.js** (v14 or higher)
2. **npm** or **yarn**
3. **Expo CLI**: `npm install -g @expo/cli`
4. **Android Studio** (for Android development)
5. **Your backend server running** (the web version of Amazon Clone)

### Step 1: Install Dependencies

```bash
cd mobile-app
npm install
```

### Step 2: Configure Backend URL

Edit `src/services/api.js` and update the `BASE_URL` based on your setup:

```javascript
// For Android Emulator:
const BASE_URL = 'http://10.0.2.2:5000/api';

// For iOS Simulator:
// const BASE_URL = 'http://localhost:5000/api';

// For Physical Device (replace with your computer's IP):
// const BASE_URL = 'http://192.168.1.100:5000/api';
```

### Step 3: Start Your Backend Server

Make sure your Amazon Clone backend is running:

```bash
cd ../backend
npm run dev
```

### Step 4: Start the Mobile App

```bash
cd mobile-app
npm start
```

### Step 5: Run on Android

#### Option A: Using Expo Go App
1. Install "Expo Go" from Google Play Store
2. Scan the QR code shown in the terminal
3. The app will load on your device

#### Option B: Using Android Emulator
1. Open Android Studio
2. Start an Android emulator
3. Press `a` in the terminal to open on Android emulator

## 🔧 Configuration Details

### Backend URL Configuration

The mobile app needs to communicate with your backend server. The URL depends on how you're running the app:

| Platform | URL |
|----------|-----|
| Android Emulator | `http://10.0.2.2:5000/api` |
| iOS Simulator | `http://localhost:5000/api` |
| Physical Device | `http://YOUR_COMPUTER_IP:5000/api` |

### Finding Your Computer's IP Address

**Windows:**
```bash
ipconfig
```

**Mac/Linux:**
```bash
ifconfig
```

Look for your local IP address (usually starts with `192.168.` or `10.0.`)

## 📱 Testing the App

### 1. Authentication
- Register a new account
- Login with your credentials
- Test logout functionality

### 2. Product Browsing
- Browse products on the home screen
- Search for products
- Filter by categories
- View product details

### 3. Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Proceed to checkout

### 4. Orders
- Place an order
- View order history
- Track order status

## 🐛 Troubleshooting

### Common Issues

1. **"Network Error" or "Cannot connect to server"**
   - Ensure your backend server is running
   - Check the API URL in `src/services/api.js`
   - Verify network connectivity

2. **"Metro bundler" issues**
   - Clear cache: `npx expo start --clear`
   - Restart the development server

3. **Android Emulator issues**
   - Make sure Android Studio is properly installed
   - Verify that an emulator is running
   - Use `10.0.2.2` instead of `localhost` for backend URL

4. **Physical device issues**
   - Ensure device and computer are on the same network
   - Use your computer's IP address for backend URL
   - Check firewall settings

### Debug Mode

Enable debug mode by:
- **Android Emulator**: Press `Cmd+M` (Mac) or `Ctrl+M` (Windows)
- **Physical Device**: Shake the device
- **iOS Simulator**: Press `Cmd+D`

## 📱 Building for Production

### Create APK for Android

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android
```

### Create IPA for iOS

```bash
# Build for iOS
eas build --platform ios
```

## 🔐 Environment Variables

Create a `.env` file in the mobile-app directory:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:5000/api
EXPO_PUBLIC_APP_NAME=Amazon Clone
```

## 📋 Feature Checklist

- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Shopping cart functionality
- [ ] Order placement and tracking
- [ ] User profile management
- [ ] Category filtering
- [ ] Product reviews and ratings
- [ ] Responsive design
- [ ] Offline support (basic)

## 🆘 Getting Help

If you encounter issues:

1. Check the console for error messages
2. Verify your backend server is running
3. Test the API endpoints directly
4. Check the network configuration
5. Create an issue in the repository

## 🎉 Success!

Once everything is working, you should have:
- A fully functional mobile app
- Authentication working
- Product browsing and search
- Shopping cart functionality
- Order management
- Beautiful Amazon-inspired UI

Happy mobile development! 📱🚀
