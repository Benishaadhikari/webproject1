import { useState } from 'react';
import './Store.css';
import { productImages } from '../assets/productImages';

const Store = ({ onLogin, onSignup, onError404, onProceedToCheckout }) => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const categories = [
    { id: 'all', name: 'All Products', icon: '✨' },
    { id: 'lips', name: 'Lips', icon: '💄' },
    { id: 'eyes', name: 'Eyes', icon: '👁️' },
    { id: 'face', name: 'Face', icon: '🎨' },
    { id: 'skincare', name: 'Skincare', icon: '🧴' },
    { id: 'fragrance', name: 'Fragrance', icon: '🌸' }
  ];

  const products = [
    {
      id: 1,
      name: 'Matte Lipstick Collection',
      category: 'lips',
      price: 899,
      originalPrice: 1299,
      image: productImages.lipstick,
      rating: 4.8,
      reviews: 156,
      description: 'Long-lasting matte finish in 12 stunning shades',
      inStock: true
    },
    {
      id: 2,
      name: 'Pro Foundation',
      category: 'face',
      price: 1499,
      originalPrice: 1899,
      image: productImages.foundation,
      rating: 4.9,
      reviews: 203,
      description: 'Full coverage foundation with SPF 30',
      inStock: true
    },
    {
      id: 3,
      name: 'Eyeshadow Palette',
      category: 'eyes',
      price: 1799,
      originalPrice: 2199,
      image: productImages.eyeshadow,
      rating: 4.7,
      reviews: 89,
      description: '18 highly pigmented shades for endless looks',
      inStock: true
    },
    {
      id: 4,
      name: 'Hydrating Serum',
      category: 'skincare',
      price: 1299,
      originalPrice: 1599,
      image: productImages.serum,
      rating: 4.6,
      reviews: 134,
      description: 'Deeply hydrating with hyaluronic acid',
      inStock: false
    },
    {
      id: 5,
      name: 'Floral Perfume',
      category: 'fragrance',
      price: 1899,
      originalPrice: 2299,
      image: productImages.perfume,
      rating: 4.5,
      reviews: 67,
      description: 'Elegant floral fragrance for everyday wear',
      inStock: true
    },
    {
      id: 6,
      name: 'Lip Gloss Set',
      category: 'lips',
      price: 699,
      originalPrice: 899,
      image: productImages.gloss,
      rating: 4.4,
      reviews: 98,
      description: '6 glossy shades with vitamin E',
      inStock: true
    },
    {
      id: 7,
      name: 'Mascara Volume Plus',
      category: 'eyes',
      price: 799,
      originalPrice: 999,
      image: productImages.mascara,
      rating: 4.6,
      reviews: 112,
      description: 'Volumizing mascara for dramatic lashes',
      inStock: true
    },
    {
      id: 8,
      name: 'BB Cream',
      category: 'face',
      price: 999,
      originalPrice: 1299,
      image: productImages.bbcream,
      rating: 4.5,
      reviews: 87,
      description: 'All-in-one BB cream with SPF 25',
      inStock: true
    },
    {
      id: 9,
      name: 'Face Wash',
      category: 'skincare',
      price: 599,
      originalPrice: 799,
      image: productImages.facewash,
      rating: 4.7,
      reviews: 203,
      description: 'Gentle daily cleanser for all skin types',
      inStock: true
    },
    {
      id: 10,
      name: 'Body Mist',
      category: 'fragrance',
      price: 899,
      originalPrice: 1199,
      image: productImages.bodymist,
      rating: 4.3,
      reviews: 76,
      description: 'Light body mist for fresh fragrance',
      inStock: true
    },
    {
      id: 11,
      name: 'Rare Beauty Kind Words Matte Lipstick & Liner',
      category: 'lips',
      price: 1599,
      originalPrice: 1999,
      image: productImages.rareBeautyLipstick,
      rating: 4.9,
      reviews: 210,
      description: 'Creamy matte lipstick and liner set in 10 flattering shades. Comfortable, long-wear formula by Rare Beauty.',
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setIsAddingToCart(true);
    
    // Simulate loading time for adding to cart
    setTimeout(() => {
      // Simulate occasional network error
      if (Math.random() < 0.1) { // 10% chance of error
        onError404("Network error! Please check your connection and try again.");
        setIsAddingToCart(false);
        return;
      }
      
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setIsAddingToCart(false);
    }, 500);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      // Simulate occasional checkout error
      if (Math.random() < 0.15) { // 15% chance of error
        onError404("Checkout failed! Please try again or contact support.");
        setIsCheckingOut(false);
        return;
      }
      
      // Navigate to checkout page
      if (onProceedToCheckout) {
        onProceedToCheckout(cart, cartTotal);
      }
      setIsCheckingOut(false);
    }, 1500);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <div className="store">
      {/* Header */}
      <header className="store-header">
        <div className="header-content">
          <div className="logo">
            <h1>BeautyStore</h1>
            <p>Your Beauty, Our Passion</p>
          </div>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchTerm.trim() === '') {
                  onError404("Please enter a search term to find products!");
                }
              }}
            />
            <button 
              className="search-btn"
              onClick={() => {
                if (searchTerm.trim() === '') {
                  onError404("Please enter a search term to find products!");
                }
              }}
            >
              🔍
            </button>
          </div>
          
          <div className="header-actions">
            <button className="btn-secondary" onClick={onLogin}>Login</button>
            <button className="btn-primary" onClick={onSignup}>Sign Up</button>
            <button className="cart-btn" onClick={() => document.getElementById('cart-sidebar').classList.add('open')}>
              🛒 <span className="cart-count">{cartCount}</span>
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("This is a test error message. The page you're looking for doesn't exist!")}
              style={{ fontSize: '0.8rem', padding: '8px 12px' }}
              title="Test Error Popup"
            >
              Test Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Oops! This link is broken. Please use the navigation menu above.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Broken Link"
            >
              Broken Link
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Product not found! This item may have been removed or is temporarily unavailable.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Product Not Found"
            >
              Product Not Found
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Access denied! Please log in to view this page.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Access Denied"
            >
              Access Denied
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("This page is under maintenance. Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Maintenance"
            >
              Maintenance
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("This page is temporarily unavailable. Please try again in a few minutes.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Temporarily Unavailable"
            >
              Temporarily Unavailable
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Page not found! The page you're looking for doesn't exist.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Page Not Found"
            >
              Page Not Found
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Access forbidden! You don't have permission to view this page.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Forbidden"
            >
              Forbidden
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Too many requests! Please wait a moment before trying again.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Too Many Requests"
            >
              Too Many Requests
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Internal server error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Internal Server Error"
            >
              Server Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Bad gateway! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Bad Gateway"
            >
              Bad Gateway
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Service unavailable! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Service Unavailable"
            >
              Service Unavailable
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Gateway timeout! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Gateway Timeout"
            >
              Gateway Timeout
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Network error! Please check your connection and try again.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Network Error"
            >
              Network Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection timeout! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Timeout"
            >
              Connection Timeout
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("DNS error! Please check your internet connection.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test DNS Error"
            >
              DNS Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("SSL certificate error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test SSL Error"
            >
              SSL Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Certificate error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Certificate Error"
            >
              Certificate Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Proxy error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Proxy Error"
            >
              Proxy Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Firewall error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Firewall Error"
            >
              Firewall Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Rate limit exceeded! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Rate Limit Error"
            >
              Rate Limit Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Quota exceeded! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Quota Exceeded"
            >
              Quota Exceeded
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Bandwidth exceeded! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Bandwidth Exceeded"
            >
              Bandwidth Exceeded
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Storage exceeded! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Storage Exceeded"
            >
              Storage Exceeded
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Database error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Database Error"
            >
              Database Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Cache error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Cache Error"
            >
              Cache Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Memory error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Memory Error"
            >
              Memory Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("CPU error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test CPU Error"
            >
              CPU Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Disk error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Disk Error"
            >
              Disk Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("File error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test File Error"
            >
              File Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Permission error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Permission Error"
            >
              Permission Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Timeout error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Timeout Error"
            >
              Timeout Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection refused! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Refused"
            >
              Connection Refused
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection reset! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Reset"
            >
              Connection Reset
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection dropped! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Dropped"
            >
              Connection Dropped
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection lost! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Lost"
            >
              Connection Lost
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection failed! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Failed"
            >
              Connection Failed
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection error! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Error"
            >
              Connection Error
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => onError404("Connection timeout! Please try again later.")}
              style={{ fontSize: '0.8rem', padding: '8px 12px', marginLeft: '5px' }}
              title="Test Connection Timeout"
            >
              Connection Timeout
            </button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <nav className="categories-nav">
        <div className="categories-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="store-main">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img className="product-img" src={product.image} alt={product.name} />
                {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
                {product.originalPrice > product.price && (
                  <div className="sale-badge">SALE</div>
                )}
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-rating">
                  <span className="stars">{renderStars(product.rating)}</span>
                  <span className="rating-text">({product.reviews} reviews)</span>
                </div>
                
                                 <div className="product-price">
                   <span className="current-price">NPR {product.price}</span>
                   {product.originalPrice > product.price && (
                     <span className="original-price">NPR {product.originalPrice}</span>
                   )}
                 </div>
                
                                 <button
                   className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''} ${isAddingToCart ? 'loading' : ''}`}
                   onClick={() => {
                     if (!product.inStock) {
                       onError404("Sorry! This product is currently out of stock. Please check back later.");
                     } else {
                       addToCart(product);
                     }
                   }}
                   disabled={isAddingToCart}
                 >
                   {product.inStock ? (isAddingToCart ? 'Adding...' : 'Add to Cart') : 'Out of Stock'}
                 </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      <div id="cart-sidebar" className="cart-sidebar">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button 
            className="close-cart"
            onClick={() => document.getElementById('cart-sidebar').classList.remove('open')}
          >
            ✕
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon">🛒</span>
              <p>Your cart is empty</p>
              <button 
                className="btn-primary"
                onClick={() => document.getElementById('cart-sidebar').classList.remove('open')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} className="cart-product-img" />
                  </div>
                                     <div className="cart-item-info">
                     <h4>{item.name}</h4>
                     <p className="cart-item-price">NPR {item.price}</p>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))}
              
                             <div className="cart-footer">
                 <div className="cart-total">
                   <span>Total:</span>
                   <span className="total-amount">NPR {cartTotal.toFixed(0)}</span>
                 </div>
                                 <button 
                   className={`btn-primary checkout-btn ${isCheckingOut ? 'loading' : ''}`}
                   onClick={() => {
                     if (cart.length === 0) {
                       onError404("Your cart is empty! Please add some products before checkout.");
                     } else {
                       handleCheckout();
                     }
                   }}
                   disabled={isCheckingOut}
                 >
                   {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                 </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      <div 
        className="cart-overlay"
        onClick={() => document.getElementById('cart-sidebar').classList.remove('open')}
      ></div>
    </div>
  );
};

export default Store; 