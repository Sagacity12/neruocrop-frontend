import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { History, CreditCard, Tag } from 'lucide-react';
import './PaymentSettings.css';
import Sidebar from '../../components/Sidebar/Sidebar'; // Adjust the path as needed

function PaymentSettings() {
  const location = useLocation();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  // Sample initial payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      brand: 'VISA',
      number: '**** **** **** 4242',
      cardHolder: 'Group 25',
      expiry: '05/26',
      isDefault: true,
      className: ''
    },
    {
      id: 2,
      brand: 'MASTERCARD',
      number: '**** **** **** 5678',
      cardHolder: 'AgricSmart',
      expiry: '11/27',
      isDefault: false,
      className: 'mastercard'
    }
  ]);
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Scroll to the section based on the hash in the URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Handle removing a payment method
  const handleRemoveCard = (id) => {
    // Check if we're trying to remove the default card
    const cardToRemove = paymentMethods.find(method => method.id === id);
    if (cardToRemove.isDefault) {
      alert("You cannot remove your default payment method. Please set another card as default first.");
      return;
    }
    
    // Remove the card
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
  };

  // Handle setting a card as default
  const handleSetDefault = (id) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    setPaymentMethods(updatedMethods);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Format card number with asterisks for display
    const lastFour = cardNumber.slice(-4);
    const maskedNumber = `**** **** **** ${lastFour}`;
    
    // Create a new payment method object
    const newCard = {
      id: paymentMethods.length + 1,
      brand: cardNumber.startsWith('4') ? 'VISA' : 'MASTERCARD', // Simple logic to determine card type
      number: maskedNumber,
      cardHolder: cardName,
      expiry: expiryDate,
      isDefault: paymentMethods.length === 0, // Make default if it's the first card
      className: cardNumber.startsWith('4') ? '' : 'mastercard'
    };
    
    // Add the new card to the payment methods
    setPaymentMethods([...paymentMethods, newCard]);
    
    // Reset form and hide it
    setCardNumber('');
    setCardName('');
    setExpiryDate('');
    setCvv('');
    setShowPaymentForm(false);
    
    alert('Payment method added successfully!');
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <div className="payment-settings-container">
          <h1>Payment Settings</h1>
          
          <div className="payment-section" id="order-history">
            <div className="section-header">
              <History className="section-icon" />
              <h2>Order History</h2>
            </div>
            <div className="section-content">
              {/* Order history content */}
              <table className="order-history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample data - replace with your actual data */}
                  <tr>
                    <td>2025-03-15</td>
                    <td>#123456</td>
                    <td>Seedlings</td>
                    <td>GH₵ 250.00</td>
                    <td>Completed</td>
                  </tr>
                  <tr>
                    <td>2025-02-15</td>
                    <td>#123455</td>
                    <td>Fruits & Vegetables</td>
                    <td>GH₵ 150.00</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="payment-section" id="payment-method">
            <div className="section-header">
              <CreditCard className="section-icon" />
              <h2>Payment Method</h2>
            </div>
            <div className="section-content">
              {/* Payment method content */}
              <div className="saved-payment-methods">
                <h3>Saved Payment Methods</h3>
                
                {/* Cards container for side-by-side display */}
                <div className="payment-cards-container">
                  {paymentMethods.map(card => (
                    <div key={card.id} className={`payment-card ${card.className}`}>
                      <div className="card-brand">{card.brand}</div>
                      <div className="card-details">
                        <div className="card-chip"></div>
                        <div className="card-number">{card.number}</div>
                        <div className="card-info">
                          <div>
                            <div className="card-holder">Card Holder</div>
                            <div className="card-name">{card.cardHolder}</div>
                          </div>
                          <div>
                            <div className="card-expiry-label">Expires</div>
                            <div className="card-expiry">{card.expiry}</div>
                          </div>
                        </div>
                      </div>
                      <div className="card-actions">
                        {card.isDefault ? (
                          <button className="card-action-btn">Default</button>
                        ) : (
                          <button 
                            className="card-action-btn" 
                            onClick={() => handleSetDefault(card.id)}
                          >
                            Make Default
                          </button>
                        )}
                        <button 
                          className="card-action-btn card-delete-btn"
                          onClick={() => handleRemoveCard(card.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="add-payment-btn" 
                  onClick={() => setShowPaymentForm(!showPaymentForm)}
                >
                  {showPaymentForm ? '- Cancel' : '+ Add New Payment Method'}
                </button>
                
                {showPaymentForm && (
                  <div className="payment-form">
                    <h4>Add New Payment Method</h4>
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input 
                          type="text" 
                          id="cardNumber" 
                          className="form-control" 
                          placeholder="1234 5678 9012 3456" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="cardName">Cardholder Name</label>
                        <input 
                          type="text" 
                          id="cardName" 
                          className="form-control" 
                          placeholder="AgricSmart" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="expiryDate">Expiry Date</label>
                          <input 
                            type="text" 
                            id="expiryDate" 
                            className="form-control" 
                            placeholder="MM/YY" 
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label htmlFor="cvv">CVV</label>
                          <input 
                            type="text" 
                            id="cvv" 
                            className="form-control" 
                            placeholder="123" 
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <button type="submit" className="submit-payment-btn">
                        Add Payment Method
                      </button>
                      
                      <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={() => setShowPaymentForm(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="payment-section" id="redeem">
            <div className="section-header">
              <Tag className="section-icon" />
              <h2>Redeem</h2>
            </div>
            <div className="section-content">
              {/* Redeem content */}
              <div className="redeem-code-container">
                <h3>Redeem a Gift Code or Promo Code</h3>
                <div className="redeem-input-group">
                  <input 
                    type="text" 
                    className="redeem-code-input" 
                    placeholder="Enter your code" 
                  />
                  <button className="redeem-code-btn">Redeem</button>
                </div>
                <p className="redeem-instructions">
                  Enter your code exactly as it appears, including any hyphens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSettings;