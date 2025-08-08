import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('/api/products?limit=8&sort=rating');
        setFeaturedProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    { name: 'Electronics', icon: '📱', color: '#ff6b6b' },
    { name: 'Clothing', icon: '👕', color: '#4ecdc4' },
    { name: 'Books', icon: '📚', color: '#45b7d1' },
    { name: 'Home & Garden', icon: '🏠', color: '#96ceb4' },
    { name: 'Sports', icon: '⚽', color: '#feca57' },
    { name: 'Toys', icon: '🧸', color: '#ff9ff3' },
    { name: 'Health', icon: '💊', color: '#54a0ff' },
    { name: 'Beauty', icon: '💄', color: '#ff9ff3' }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < Math.floor(rating) ? 'star filled' : 'star'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to Amazon Clone</h1>
            <p>Discover amazing products at unbeatable prices</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Shop Now <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link to="/products" className="view-all">
              View All <FaArrowRight />
            </Link>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img
                      src={product.images[0] || '/placeholder-product.jpg'}
                      alt={product.title}
                      onError={(e) => {
                        e.target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-rating">
                      {renderStars(product.rating)}
                      <span className="rating-text">
                        ({product.numReviews} reviews)
                      </span>
                    </div>
                    <div className="product-price">
                      ${product.price.toFixed(2)}
                    </div>
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3>No products available</h3>
              <p>Check back later for amazing products!</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy for all items</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure payment methods</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round the clock customer support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 