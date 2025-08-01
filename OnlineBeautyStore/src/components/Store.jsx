import { useState } from 'react';
import './Store.css';
import { productImages } from '../assets/productImages';

const Store = ({ onLogin, onSignup }) => {
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
            <h1>Beauty Store</h1>
            <p>Your Beauty, Our Passion</p>
          </div>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          
          <div className="header-actions">
            <button className="btn-secondary" onClick={onLogin}>Login</button>
            <button className="btn-primary" onClick={onSignup}>Sign Up</button>
            <button className="cart-btn" onClick={() => document.getElementById('cart-sidebar').classList.add('open')}>
              🛒 <span className="cart-count">{cartCount}</span>
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
                   <span className="current-price">₹{product.price}</span>
                   {product.originalPrice > product.price && (
                     <span className="original-price">₹{product.originalPrice}</span>
                   )}
                 </div>
                
                <button
                  className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                  onClick={() => product.inStock && addToCart(product)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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
                    <span className="product-emoji">{item.image}</span>
                  </div>
                                     <div className="cart-item-info">
                     <h4>{item.name}</h4>
                     <p>₹{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
                             <div className="cart-footer">
                 <div className="cart-total">
                   <span>Total:</span>
                   <span className="total-amount">₹{cartTotal.toFixed(0)}</span>
                 </div>
                <button className="btn-primary checkout-btn">
                  Proceed to Checkout
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