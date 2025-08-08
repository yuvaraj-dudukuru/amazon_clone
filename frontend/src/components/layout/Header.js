import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-logo">
              <Link to="/" onClick={closeMobileMenu}>
                <h1>Amazon Clone</h1>
              </Link>
            </div>

            <div className="header-search">
              <form onSubmit={handleSearch}>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>

            <div className="header-actions">
              <div className="header-cart">
                <Link to="/cart" onClick={closeMobileMenu}>
                  <FaShoppingCart />
                  <span className="cart-count">{getCartItemCount()}</span>
                </Link>
              </div>

              <div className="header-user">
                {isAuthenticated ? (
                  <div className="user-menu">
                    <button className="user-button">
                      <FaUser />
                      <span className="user-name">{user?.name}</span>
                    </button>
                    <div className="user-dropdown">
                      <Link to="/profile" onClick={closeMobileMenu}>Profile</Link>
                      <Link to="/orders" onClick={closeMobileMenu}>Orders</Link>
                      {user?.role === 'seller' && (
                        <Link to="/seller" onClick={closeMobileMenu}>Seller Dashboard</Link>
                      )}
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <div className="auth-buttons">
                    <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>
                      Register
                    </Link>
                  </div>
                )}
              </div>

              <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="header-nav">
        <div className="container">
          <ul className="nav-menu">
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/products" onClick={closeMobileMenu}>All Products</Link></li>
            <li><Link to="/products?category=Electronics" onClick={closeMobileMenu}>Electronics</Link></li>
            <li><Link to="/products?category=Clothing" onClick={closeMobileMenu}>Clothing</Link></li>
            <li><Link to="/products?category=Books" onClick={closeMobileMenu}>Books</Link></li>
            <li><Link to="/products?category=Home & Garden" onClick={closeMobileMenu}>Home & Garden</Link></li>
            <li><Link to="/products?category=Sports" onClick={closeMobileMenu}>Sports</Link></li>
            <li><Link to="/products?category=Toys" onClick={closeMobileMenu}>Toys</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-search">
            <form onSubmit={handleSearch}>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>

          <ul className="mobile-nav-menu">
            <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
            <li><Link to="/products" onClick={closeMobileMenu}>All Products</Link></li>
            <li><Link to="/products?category=Electronics" onClick={closeMobileMenu}>Electronics</Link></li>
            <li><Link to="/products?category=Clothing" onClick={closeMobileMenu}>Clothing</Link></li>
            <li><Link to="/products?category=Books" onClick={closeMobileMenu}>Books</Link></li>
            <li><Link to="/products?category=Home & Garden" onClick={closeMobileMenu}>Home & Garden</Link></li>
            <li><Link to="/products?category=Sports" onClick={closeMobileMenu}>Sports</Link></li>
            <li><Link to="/products?category=Toys" onClick={closeMobileMenu}>Toys</Link></li>
          </ul>

          <div className="mobile-user-actions">
            <Link to="/cart" className="mobile-cart" onClick={closeMobileMenu}>
              <FaShoppingCart />
              <span>Cart ({getCartItemCount()})</span>
            </Link>

            {isAuthenticated ? (
              <div className="mobile-user-menu">
                <div className="mobile-user-info">
                  <FaUser />
                  <span>{user?.name}</span>
                </div>
                <Link to="/profile" onClick={closeMobileMenu}>Profile</Link>
                <Link to="/orders" onClick={closeMobileMenu}>Orders</Link>
                {user?.role === 'seller' && (
                  <Link to="/seller" onClick={closeMobileMenu}>Seller Dashboard</Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={closeMobileMenu}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 