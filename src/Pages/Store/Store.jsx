import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Heart, ShoppingCart, RefreshCcw, Truck, CreditCard, Minus, Plus, X, ChevronDown, FoldersIcon } from 'lucide-react';
import './Store.css';
import Navbar from '../../components/Navbar/Navbar';

const Store = () => {
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('crops');
  const [cartItems, setCartItems] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  
  // List of countries for dropdown
  const countries = [
    { name: 'Togo', flag: '🇹🇬' },
    { name: 'Ghana', flag: '🇬🇭' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Kenya', flag: '🇰🇪' },
    { name: 'South Africa', flag: '🇿🇦' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'United Kingdom', flag: '🇬🇧' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'India', flag: '🇮🇳' },
  ];
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const selectCountry = (country) => {
    setSelectedCountry(country);
    setBillingAddress(`${country.flag} ${country.name}`); // Set the address to include flag and country name
    setShowCountryDropdown(false);
  };
  
  const categories = [
    {
      name: 'Crops',
      image: 'src/assets/vegetables.jpg',
      id: 'crops'
    },
    {
      name: 'Farm tools',
      image: 'src/assets/farmingtools2.jpg',
      id: 'tools'
    },
    {
      name: 'Seedlings',
      image: 'src/assets/seeedlings.jpg',
      id: 'seedlings'
    }
  ];

  const allProducts = [
    // Crops
    {
      id: 1,
      name: 'Onions (1kg)',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31',
      inStock: true,
      category: 'crops'
    },
    {
      id: 2,
      name: 'Carrots (1kg)',
      price: 10.00,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      inStock: true,
      category: 'crops'
    },
    {
      id: 3,
      name: 'Oranges (1kg)',
      price: 30.00,
      image: 'src/assets/oranges.jpg',
      inStock: true,
      category: 'crops'
    },
    {
      id: 4,
      name: 'Tomatoes (1kg)',
      price: 40.00,
      image: 'src/assets/tomatoes.jpg',
      inStock: true,
      category: 'crops'
    },
    // Farm Tools
    {
      id: 5,
      name: 'Garden Shovel',
      price: 25.00,
      image: 'src/assets/gardenshovel.jpg',
      inStock: true,
      category: 'tools'
    },
    {
      id: 6,
      name: 'Pruning Shears',
      price: 15.00,
      image: 'src/assets/shears.jpg',
      inStock: true,
      category: 'tools'
    },
    // Seedlings
    {
      id: 7,
      name: 'Tomato Seedlings',
      price: 5.00,
      image: 'src/assets/tomatoseedlings.jpg',
      inStock: true,
      category: 'seedlings'
    },
    {
      id: 8,
      name: 'Herb Seedlings',
      price: 4.00,
      image: 'src/assets/herbseedlings.jpg',
      inStock: true,
      category: 'seedlings'
    },
    {
      id: 9,
      name: 'Coconut Seedlings',
      price: 25.00,
      image: 'src/assets/coconutseedlings.jpg',
      inStock: true,
      category: 'seedlings'
    },
    {
      id: 10,
      name: 'Orange Seedlings',
      price: 25.00,
      image: 'src/assets/orange seedlings.jpg',
      inStock: true,
      category: 'seedlings'
    },
  ];

  const filteredProducts = allProducts.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCountryDropdown && !event.target.closest('.country-dropdown-container')) {
        setShowCountryDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  return (
    <div className="store-layout">
      <Navbar/>
      {/* Render the Sidebar component */}
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <main className='store-main'>
        <header className="store-header">
          {/* Header content */}
        </header>
        
        <section className="services-section">
          <div className="service-card">
            <div className="service-icon">
              <RefreshCcw size={24} />
            </div>
            <div className="service-info">
              <h3>Return Policy</h3>
              <p>Money Back Guarantee</p>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <Truck size={24} />
            </div>
            <div className="service-info">
              <h3>Free Shipping</h3>
              <p>On Orders Over 200 cedis</p>
            </div>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <CreditCard size={24} />
            </div>
            <div className="service-info">
              <h3>Payment</h3>
              <p>Secure Payment</p>
            </div>
          </div>
        </section>

        <section className="categories-section">
          <h2 className="categories-title">Latest Products</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'ring-2 ring-green-500' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="products-section">
          <h2 className="products-title">{selectedCategory.toUpperCase()}</h2>
          <div className="products-grid">
          {filteredProducts.map(product => (
  <div key={product.id} className="product-card">
    {product.inStock && (
      <span className="stock-tag">In Stock</span>
    )}
    <img src={product.image} alt={product.name} className="product-image" />
    <div className="product-info">
      <div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">GHS {product.price.toFixed(2)}</p>
      </div>
      <button 
        className="add-to-cart-button"
        onClick={() => addToCart(product)}
      >
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  </div>
))}
  
          </div>
        </section>

        <section className="banner-section">
          <div className="banner-content">
            <p className="banner-text">
              Shop your farm tools and organic fruits and vegetables from us
            </p>
          </div>
        </section>

        {/* Cart button placed at bottom right */}
        <button
          onClick={() => setShowCart(true)}
          className="cart-button"
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="cart-badge">
              {cartItems.length}
            </span>
          )}
        </button>

        {showCart && (
          <div className="shopping-cart">
            <div className="flex justify-between items-center mb-4">
              <h3 className="cart-header">Shopping Cart</h3>
              <button 
                className="text-gray-500 hover:text-gray-700" 
                onClick={() => setShowCart(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">GHS {item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-quantity">
                    <button 
                      className="quantity-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-button"
                      onClick={() => addToCart(item)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span>GHS {cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-button"
              onClick={() => {
                setShowCart(false);
                setShowPayment(true);
              }}
            >
              Proceed
            </button>
          </div>
        )}
{showPayment && (
  <div className="payment-modal">
    <div className="payment-form">
      <div className="flex justify-between items-center mb-4">
        <h2>PAY WITH CARD</h2>
        <button 
          className="text-gray-500 hover:text-gray-700" 
          onClick={() => setShowPayment(false)}
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="form-group">
        <label className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="example@gmail.com" />
      </div>
      
      <div className="form-group">
        <label className="form-label">Name on card</label>
        <div className="card-input-container">
          <input type="text" className="form-input" placeholder="John Smith" />
          <div className="card-logo"></div>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Card details</label>
        <input type="text" className="form-input" placeholder="1234 5678 9101" />
      </div>
      
      <div className="card-fields-container">
        <div className="form-group">
          <input type="text" className="form-input" placeholder="MM/YY" />
        </div>
        <div className="form-group">
          <input type="text" className="form-input" placeholder="CVC" />
        </div>
      </div>
      
      <div className="form-group">
  <label className="form-label">Billing Address</label>
  <div className="relative">
    <input 
      type="text" 
      className="address-input" 
      placeholder="Click to select country" 
      value={billingAddress}
      onChange={(e) => setBillingAddress(e.target.value)}
      onClick={() => setShowCountryDropdown(!showCountryDropdown)}
      readOnly
    />
          {showCountryDropdown && (
            <div className="country-dropdown absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-56 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.name}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => selectCountry(country)}
                >
                  <span className="mr-2">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <input type="text" className="address-input" placeholder="ADDRESS" />
      </div>
      
      <div className="save-info-container">
        <div className="flex items-center">
          <input type="checkbox" id="save-info" className="save-info-checkbox h-4 w-4 mr-2" />
          <label htmlFor="save-info" className="save-info-label">
            Securely save my information for one-click checkout
          </label>
        </div>
      </div>
      
      <button className="pay-button">
        PAY
      </button>
    </div>
  </div>
)}
      </main>
      </div>
    
    </div>
  );
};

export default Store;