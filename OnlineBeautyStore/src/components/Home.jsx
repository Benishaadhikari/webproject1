import React from 'react';
import './Home.css';
import { productImages } from '../assets/productImages';

const Home = ({ onLogin, onSignup, onProceedToStore }) => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Matte Lipstick Collection',
      price: 899,
      originalPrice: 1299,
      image: productImages.lipstick,
      rating: 4.8,
      reviews: 156,
      description: 'Long-lasting matte finish in 12 stunning shades'
    },
    {
      id: 2,
      name: 'Pro Foundation',
      price: 1499,
      originalPrice: 1899,
      image: productImages.foundation,
      rating: 4.9,
      reviews: 203,
      description: 'Full coverage foundation with SPF 30'
    },
    {
      id: 3,
      name: 'Eyeshadow Palette',
      price: 1799,
      originalPrice: 2199,
      image: productImages.eyeshadow,
      rating: 4.7,
      reviews: 89,
      description: '18 highly pigmented shades for endless looks'
    },
    {
      id: 4,
      name: 'Rare Beauty Lipstick',
      price: 1599,
      originalPrice: 1999,
      image: productImages.rareBeautyLipstick,
      rating: 4.9,
      reviews: 210,
      description: 'Creamy matte lipstick and liner set'
    }
  ];

  const categories = [
    { id: 'lips', name: 'Lips', icon: '💄', description: 'Lipsticks, glosses & liners' },
    { id: 'eyes', name: 'Eyes', icon: '👁️', description: 'Eyeshadows, mascaras & liners' },
    { id: 'face', name: 'Face', icon: '🎨', description: 'Foundations, concealers & powders' },
    { id: 'skincare', name: 'Skincare', icon: '🧴', description: 'Serums, moisturizers & cleansers' },
    { id: 'fragrance', name: 'Fragrance', icon: '🌸', description: 'Perfumes & body mists' }
  ];

  const benefits = [
    { icon: '✨', title: 'Premium Quality', description: 'Curated selection of high-end beauty products' },
    { icon: '🚚', title: 'Free Shipping', description: 'Free delivery on orders over NPR 2000' },
    { icon: '🔄', title: 'Easy Returns', description: '30-day return policy for your peace of mind' },
    { icon: '💎', title: 'Authentic Products', description: '100% genuine products with warranty' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Amazing quality products! The lipstick collection is absolutely stunning. Highly recommended!',
      avatar: '👩‍🦰'
    },
    {
      name: 'Anjali Patel',
      rating: 5,
      comment: 'Fast delivery and authentic products. Love their customer service!',
      avatar: '👩‍🦱'
    },
    {
      name: 'Meera Singh',
      rating: 5,
      comment: 'Best beauty store I\'ve found online. Great prices and excellent quality!',
      avatar: '👩‍🦳'
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Your <span className="highlight">Beauty</span>
            </h1>
            <p className="hero-subtitle">
              Explore our curated collection of premium beauty products. From makeup to skincare, 
              we have everything you need to enhance your natural beauty.
            </p>
            <div className="hero-actions">
              <button className="btn-primary hero-btn" onClick={onProceedToStore}>
                Shop Now
              </button>
              <button className="btn-secondary hero-btn" onClick={onSignup}>
                Join Beauty Club
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-products">
              <img src={productImages.lipstick} alt="Lipstick" className="floating-product" />
              <img src={productImages.foundation} alt="Foundation" className="floating-product" />
              <img src={productImages.eyeshadow} alt="Eyeshadow" className="floating-product" />
            </div>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="beauty-elements">
            <span className="beauty-element">💄</span>
            <span className="beauty-element">✨</span>
            <span className="beauty-element">🌸</span>
            <span className="beauty-element">💎</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <div key={product.id} className="featured-product">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
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
                </div>
              </div>
            ))}
          </div>
          <div className="featured-actions">
            <button className="btn-primary" onClick={onProceedToStore}>
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Choose BeautyStore?</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
                  </div>
                </div>
                <p className="testimonial-comment">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Beauty Routine?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers and discover your perfect beauty products today.
            </p>
            <div className="cta-actions">
              <button className="btn-primary" onClick={onProceedToStore}>
                Start Shopping
              </button>
              <button className="btn-secondary" onClick={onSignup}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title">BeautyStore</h3>
              <p className="footer-description">
                Your Beauty, Our Passion. Discover premium beauty products for every style.
              </p>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Quick Links</h4>
              <ul className="footer-links">
                <li><button onClick={onProceedToStore}>Shop Products</button></li>
                <li><button onClick={onSignup}>Sign Up</button></li>
                <li><button onClick={onLogin}>Login</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4 className="footer-subtitle">Contact</h4>
              <ul className="footer-links">
                <li>📧 hello@beautystore.com</li>
                <li>📞 +977-1-2345678</li>
                <li>📍 Kathmandu, Nepal</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 BeautyStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 