const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, [
  body('shippingAddress.street').notEmpty().withMessage('Street address is required'),
  body('shippingAddress.city').notEmpty().withMessage('City is required'),
  body('shippingAddress.state').notEmpty().withMessage('State is required'),
  body('shippingAddress.zipCode').notEmpty().withMessage('Zip code is required'),
  body('shippingAddress.country').notEmpty().withMessage('Country is required'),
  body('paymentMethod').isIn(['Credit Card', 'Debit Card', 'PayPal', 'Cash on Delivery']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: 'items.product',
        select: 'title price stock isActive'
      });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate items and check stock
    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = item.product;
      
      if (!product || !product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${product ? product.title : 'Unknown'} is no longer available`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available for ${product.title}`
        });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;

      // Update product stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -item.quantity }
      });
    }

    // Calculate shipping and tax (simplified)
    const shippingPrice = totalAmount > 50 ? 0 : 10; // Free shipping over $50
    const taxPrice = totalAmount * 0.1; // 10% tax
    const finalTotal = totalAmount + shippingPrice + taxPrice;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      totalAmount: finalTotal,
      shippingPrice,
      taxPrice
    });

    // Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    // Populate order details
    await order.populate({
      path: 'items.product',
      select: 'title price images'
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: 'items.product',
        select: 'title price images'
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: req.user._id });

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate({
        path: 'items.product',
        select: 'title price images'
      })
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.paymentId || 'dummy_payment_id',
      status: 'completed',
      update_time: new Date().toISOString(),
      email_address: req.user.email
    };

    const updatedOrder = await order.save();

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/orders/:id/deliver
// @desc    Update order to delivered (Admin/Seller only)
// @access  Private
router.put('/:id/deliver', protect, authorize('admin', 'seller'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    order.orderStatus = 'Delivered';

    const updatedOrder = await order.save();

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order delivery error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin/Seller only)
// @access  Private
router.put('/:id/status', protect, authorize('admin', 'seller'), [
  body('status').isIn(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']).withMessage('Invalid order status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = status;
    
    if (status === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      data: updatedOrder
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/orders/seller/orders
// @desc    Get seller's orders (Seller only)
// @access  Private
router.get('/seller/orders', protect, authorize('seller', 'admin'), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get products by seller
    const sellerProducts = await Product.find({ seller: req.user._id }).select('_id');
    const productIds = sellerProducts.map(product => product._id);

    // Get orders containing seller's products
    const orders = await Order.find({
      'items.product': { $in: productIds }
    })
      .populate({
        path: 'items.product',
        select: 'title price images seller'
      })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Filter orders to only include seller's products
    const filteredOrders = orders.map(order => {
      const sellerItems = order.items.filter(item => 
        item.product && item.product.seller.toString() === req.user._id.toString()
      );
      
      if (sellerItems.length > 0) {
        return {
          ...order.toObject(),
          items: sellerItems,
          totalAmount: sellerItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
      }
      return null;
    }).filter(order => order !== null);

    const total = await Order.countDocuments({
      'items.product': { $in: productIds }
    });

    res.json({
      success: true,
      data: filteredOrders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get seller orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router; 