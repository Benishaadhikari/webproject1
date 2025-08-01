import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Store from './components/Store'
import Checkout from './components/Checkout'
import LoadingScreen from './components/LoadingScreen'
import ErrorPopup from './components/ErrorPopup'

function App() {
  const [currentView, setCurrentView] = useState('store') // 'store', 'login', 'signup', 'dashboard', 'checkout'
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [checkoutData, setCheckoutData] = useState({ cart: [], cartTotal: 0 })
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading for 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  const switchToLogin = () => {
    setCurrentView('login')
  }

  const switchToSignup = () => {
    setCurrentView('signup')
  }

  const switchToStore = () => {
    setCurrentView('store')
  }

  const handleLogin = () => {
    // Simulate successful login and set token
    localStorage.setItem('auth_token', 'fake_token_' + Date.now());
    setIsAuthenticated(true)
    setCurrentView('dashboard')
  }

  const handleSignup = () => {
    // Simulate successful signup and set token
    localStorage.setItem('auth_token', 'fake_token_' + Date.now());
    setIsAuthenticated(true)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentView('store')
    localStorage.removeItem('auth_token');
  }

  const handleGoHome = () => {
    setCurrentView('store')
    setShowErrorPopup(false)
  }

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false)
  }

  const handleError404 = (message = '') => {
    setErrorMessage(message)
    setShowErrorPopup(true)
  }

  const handleProceedToCheckout = (cart, cartTotal) => {
    setCheckoutData({ cart, cartTotal })
    setCurrentView('checkout')
  }

  const handleOrderComplete = () => {
    setCurrentView('store')
    setCheckoutData({ cart: [], cartTotal: 0 })
  }

  const renderView = () => {
    if (currentView === 'dashboard' && !isAuthenticated) {
      // If not authenticated, redirect to login
      setCurrentView('login');
      return null;
    }
    switch (currentView) {
      case 'login':
        return <Login onSwitchToSignup={switchToSignup} onSwitchToStore={switchToStore} onLogin={handleLogin} />
      case 'signup':
        return <Signup onSwitchToLogin={switchToLogin} onSwitchToStore={switchToStore} onSignup={handleSignup} />
      case 'dashboard':
        return <Dashboard onLogout={handleLogout} />
      case 'checkout':
        return <Checkout 
          cart={checkoutData.cart} 
          cartTotal={checkoutData.cartTotal}
          onBackToStore={switchToStore}
          onOrderComplete={handleOrderComplete}
        />
      case 'store':
      default:
        return <Store onLogin={switchToLogin} onSignup={switchToSignup} onError404={handleError404} />
    }
  }

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {renderView()}
          <ErrorPopup 
            isVisible={showErrorPopup}
            message={errorMessage}
            onClose={handleCloseErrorPopup}
            onGoHome={handleGoHome}
          />
        </>
      )}
    </div>
  )
}

export default App
