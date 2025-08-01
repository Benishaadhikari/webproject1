import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Store from './components/Store'

function App() {
  const [currentView, setCurrentView] = useState('store') // 'store', 'login', 'signup', 'dashboard'
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check for token on app load
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }
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
      case 'store':
      default:
        return <Store onLogin={switchToLogin} onSignup={switchToSignup} />
    }
  }

  return (
    <div className="App">
      {renderView()}
    </div>
  )
}

export default App
