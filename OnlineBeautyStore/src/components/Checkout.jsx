import React, { useState, useEffect } from 'react';
import './Checkout.css';

const Checkout = ({ cart, cartTotal, onBackToStore, onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nepal',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: ''
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4); // Show confirmation
    }, 3000);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    return cartTotal > 2000 ? 0 : 200; // Free shipping over NPR 2000
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.13; // 13% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
        <span className="step-number">1</span>
        <span className="step-label">Shipping</span>
      </div>
      <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
        <span className="step-number">2</span>
        <span className="step-label">Payment</span>
      </div>
      <div className={`step-line ${currentStep >= 3 ? 'active' : ''}`}></div>
      <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
        <span className="step-number">3</span>
        <span className="step-label">Review</span>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="summary-items">
        {cart.map(item => (
          <div key={item.id} className="summary-item">
            <div className="summary-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="summary-item-details">
              <h4>{item.name}</h4>
              <p>Qty: {item.quantity}</p>
              <span className="summary-item-price">NPR {item.price}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="summary-totals">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>NPR {calculateSubtotal().toFixed(0)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>{calculateShipping() === 0 ? 'Free' : `NPR ${calculateShipping()}`}</span>
        </div>
        <div className="summary-row">
          <span>Tax:</span>
          <span>NPR {calculateTax().toFixed(0)}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>NPR {calculateTotal().toFixed(0)}</span>
        </div>
      </div>
    </div>
  );

  const renderShippingForm = () => (
    <div className="checkout-form">
      <h3>Shipping Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group full-width">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="Nepal">Nepal</option>
            <option value="India">India</option>
            <option value="Bhutan">Bhutan</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="checkout-form">
      <h3>Payment Information</h3>
      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={handleInputChange}
          />
          <span className="payment-icon">💳</span>
          <span>Credit/Debit Card</span>
        </label>
        <label className="payment-method">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={handleInputChange}
          />
          <span className="payment-icon">💰</span>
          <span>Cash on Delivery</span>
        </label>
      </div>
      
      {formData.paymentMethod === 'card' && (
        <div className="card-form">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cardCvv"
                value={formData.cardCvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="John Doe"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderReview = () => (
    <div className="checkout-form">
      <h3>Review Your Order</h3>
      <div className="review-section">
        <h4>Shipping Information</h4>
        <div className="review-info">
          <p><strong>{formData.firstName} {formData.lastName}</strong></p>
          <p>{formData.address}</p>
          <p>{formData.city}, {formData.postalCode}</p>
          <p>{formData.country}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
        </div>
      </div>
      
      <div className="review-section">
        <h4>Payment Method</h4>
        <div className="review-info">
          <p>
            {formData.paymentMethod === 'card' 
              ? `💳 Credit/Debit Card ending in ${formData.cardNumber.slice(-4)}`
              : '💰 Cash on Delivery'
            }
          </p>
        </div>
      </div>
      
      <div className="review-section">
        <h4>Order Items</h4>
        <div className="review-items">
          {cart.map(item => (
            <div key={item.id} className="review-item">
              <img src={item.image} alt={item.name} />
              <div className="review-item-details">
                <h5>{item.name}</h5>
                <p>Qty: {item.quantity}</p>
                <span>NPR {item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="confirmation">
      <div className="confirmation-icon">✅</div>
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order has been successfully placed.</p>
      <div className="order-details">
        <h4>Order Details</h4>
        <p><strong>Order ID:</strong> #BS{Math.floor(Math.random() * 1000000)}</p>
        <p><strong>Total Amount:</strong> NPR {calculateTotal().toFixed(0)}</p>
        <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
      </div>
      <div className="confirmation-actions">
        <button className="btn-primary" onClick={onOrderComplete}>
          Continue Shopping
        </button>
        <button className="btn-secondary" onClick={() => window.print()}>
          Print Receipt
        </button>
      </div>
    </div>
  );

  if (currentStep === 4) {
    return (
      <div className={`checkout-page ${isVisible ? 'animate-in' : ''}`}>
        {renderConfirmation()}
      </div>
    );
  }

  return (
    <div className={`checkout-page ${isVisible ? 'animate-in' : ''}`}>
      <div className="checkout-header">
        <button className="back-btn" onClick={onBackToStore}>
          ← Back to Store
        </button>
        <h1>Checkout</h1>
      </div>

      {renderStepIndicator()}

      <div className="checkout-content">
        <div className="checkout-main">
          {currentStep === 1 && renderShippingForm()}
          {currentStep === 2 && renderPaymentForm()}
          {currentStep === 3 && renderReview()}
        </div>

        <div className="checkout-sidebar">
          {renderOrderSummary()}
        </div>
      </div>

      <div className="checkout-actions">
        {currentStep > 1 && (
          <button className="btn-secondary" onClick={prevStep}>
            ← Previous
          </button>
        )}
        
        {currentStep < 3 ? (
          <button className="btn-primary" onClick={nextStep}>
            Continue →
          </button>
        ) : (
          <button 
            className={`btn-primary ${isProcessing ? 'loading' : ''}`}
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout; 