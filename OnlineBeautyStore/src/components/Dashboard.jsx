import { useState } from 'react';
import './Dashboard.css';
import logoImg from '../assets/image/Floral Perfume.jpg';
import LipstickImg from '../assets/image/Lip Gloss Set.jpg';
import FoundationImg from '../assets/image/Pro Foundation.jpg';
import EyeshadowImg from '../assets/image/Eyeshadow palette.jpg';
import FacewashImg from '../assets/image/Facewash.jpg';
import MascaraImg from '../assets/image/Mascara Volume Plus.jpg';
import RareBeautyImg from '../assets/image/Rare Beauty Kind Words Matte Lipstick & Liner.jpg';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    { title: 'Total Sales', value: '₹1,24,500', change: '+12%', icon: '💰' },
    { title: 'Orders', value: '156', change: '+8%', icon: '📦' },
    { title: 'Customers', value: '2,340', change: '+15%', icon: '👥' },
    { title: 'Products', value: '89', change: '+5%', icon: '💄' }
  ];

  const recentOrders = [
    { id: '#1234', customer: 'Sarah Johnson', product: 'Lipstick Set', amount: '₹899', status: 'Delivered' },
    { id: '#1235', customer: 'Emma Davis', product: 'Foundation', amount: '₹1,499', status: 'Shipped' },
    { id: '#1236', customer: 'Maria Garcia', product: 'Eyeshadow Palette', amount: '₹1,799', status: 'Processing' },
    { id: '#1237', customer: 'Lisa Chen', product: 'Skincare Bundle', amount: '₹1,299', status: 'Delivered' }
  ];

  const products = [
    { id: 1, name: 'Matte Lipstick', category: 'Lips', price: '₹899', stock: 45, image: LipstickImg, imageName: 'Lip Gloss Set.jpg' },
    { id: 2, name: 'Foundation', category: 'Face', price: '₹1,499', stock: 32, image: FoundationImg, imageName: 'Pro Foundation.jpg' },
    { id: 3, name: 'Eyeshadow Palette', category: 'Eyes', price: '₹1,799', stock: 18, image: EyeshadowImg, imageName: 'Eyeshadow palette.jpg' },
    { id: 4, name: 'Skincare Set', category: 'Skincare', price: '₹1,299', stock: 25, image: FacewashImg, imageName: 'Facewash.jpg' },
    { id: 5, name: 'Mascara Volume Plus', category: 'Eyes', price: '₹1,099', stock: 20, image: MascaraImg, imageName: 'Mascara Volume Plus.jpg' },
    { id: 6, name: 'Rare Beauty Kind Words Matte Lipstick & Liner', category: 'Lips', price: '₹1,599', stock: 15, image: RareBeautyImg, imageName: 'Rare Beauty Kind Words Matte Lipstick & Liner.jpg' },
    { id: 7, name: 'Floral Perfume', category: 'Fragrance', price: '₹1,299', stock: 10, image: logoImg, imageName: 'Floral Perfume.jpg' }
  ];

  const renderOverview = () => (
    <div className="dashboard-content">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <span className="stat-change positive">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Recent Orders</h3>
          <div className="orders-list">
            {recentOrders.map((order, index) => (
              <div key={index} className="order-item">
                <div className="order-info">
                  <span className="order-id">{order.id}</span>
                  <span className="customer-name">{order.customer}</span>
                  <span className="product-name">{order.product}</span>
                </div>
                <div className="order-details">
                  <span className="amount">{order.amount}</span>
                  <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Top Products</h3>
          <div className="products-list">
            {products.slice(0, 4).map((product, index) => (
              <div key={product.id} className="product-item">
                <div className="product-icon">
                  <img src={product.image} alt={product.name} style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '8px', marginRight: '8px' }} />
                </div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>{product.category}</p>
                  <p style={{ fontSize: '0.7rem', color: '#888' }}>{product.imageName}</p>
                </div>
                <div className="product-details">
                  <span className="price">{product.price}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Product Management</h2>
        <button className="btn-primary">Add New Product</button>
      </div>
      
      <div className="products-table">
        <div className="table-header">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>
        {products.map(product => (
          <div key={product.id} className="table-row">
            <div className="product-cell">
              <span className="product-icon">
                <img src={product.image} alt={product.name} style={{ height: '32px', width: '32px', objectFit: 'cover', borderRadius: '6px', marginRight: '6px' }} />
              </span>
              <span>{product.name}</span>
              <span style={{ fontSize: '0.7rem', color: '#888', marginLeft: '6px' }}>{product.imageName}</span>
            </div>
            <span>{product.category}</span>
            <span>{product.price}</span>
            <span className={product.stock < 20 ? 'low-stock' : ''}>{product.stock}</span>
            <div className="actions">
              <button className="btn-edit">Edit</button>
              <button className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Order Management</h2>
        <div className="order-filters">
          <select defaultValue="all">
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
      
      <div className="orders-table">
        <div className="table-header">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Product</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>
        {recentOrders.map((order, index) => (
          <div key={index} className="table-row">
            <span>{order.id}</span>
            <span>{order.customer}</span>
            <span>{order.product}</span>
            <span>{order.amount}</span>
            <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
            <div className="actions">
              <button className="btn-view">View</button>
              <button className="btn-edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="dashboard-content">
      <div className="content-header">
        <h2>Customer Management</h2>
        <button className="btn-primary">Add Customer</button>
      </div>
      
      <div className="customers-grid">
        {[
          { name: 'Sarah Johnson', email: 'sarah@email.com', orders: 12, total: '₹4,500' },
          { name: 'Emma Davis', email: 'emma@email.com', orders: 8, total: '₹3,200' },
          { name: 'Maria Garcia', email: 'maria@email.com', orders: 15, total: '₹6,700' },
          { name: 'Lisa Chen', email: 'lisa@email.com', orders: 6, total: '₹2,800' }
        ].map((customer, index) => (
          <div key={index} className="customer-card">
            <div className="customer-avatar">👤</div>
            <div className="customer-info">
              <h4>{customer.name}</h4>
              <p>{customer.email}</p>
              <div className="customer-stats">
                <span>{customer.orders} orders</span>
                <span>{customer.total} spent</span>
              </div>
            </div>
            <div className="customer-actions">
              <button className="btn-view">View</button>
              <button className="btn-edit">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'customers':
        return renderCustomers();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Beauty Store</h2>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            💄 Products
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button 
            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            👥 Customers
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <header className="dashboard-header">
          <div className="header-left">
            <img src={logoImg} alt="Logo" style={{ height: '48px', marginRight: '16px', borderRadius: '8px' }} />
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-avatar">👤</span>
              <span className="user-name">Admin User</span>
            </div>
          </div>
        </header>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 