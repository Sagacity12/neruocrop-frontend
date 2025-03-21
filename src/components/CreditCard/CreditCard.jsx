import React from 'react';
import { Check } from 'lucide-react';

const CreditCard = ({ card, isDefault }) => {
  // Determine card type logo
  const getCardLogo = () => {
    // Check first digit of card number
    const firstDigit = card.last4.charAt(0);
    
    if (firstDigit === '4') {
      return 'VISA';
    } else if (firstDigit === '5') {
      return 'VISA';
    } else if (firstDigit === '3') {
      return 'AMEX';
    } else {
      return 'CARD';
    }
  };

  // Get random card color based on card id
  const getCardColor = () => {
    const colors = [
      'linear-gradient(135deg, #2c3e50, #34495e)',
      'linear-gradient(135deg, #2980b9, #2c3e50)',
      'linear-gradient(135deg, #8e44ad, #2c3e50)',
      'linear-gradient(135deg, #2c3e50, #7f8c8d)'
    ];
    
    return isDefault 
      ? 'linear-gradient(135deg, #27ae60, #2ecc71)' 
      : colors[card.id % colors.length];
  };

  return (
    <div 
      className="credit-card" 
      style={{ background: getCardColor() }}
    >
      <div className="card-content">
        <div className="card-top">
          <div className="card-chip"></div>
          <div className="card-logo">{getCardLogo()}</div>
        </div>
        
        <div className="card-number">
          •••• •••• •••• {card.last4}
        </div>
        
        <div className="card-details">
          <div className="card-holder">
            <div className="label">Card Holder</div>
            <div className="value">{card.name}</div>
          </div>
          <div className="card-expires">
            <div className="label">Expires</div>
            <div className="value">{card.expiry}</div>
          </div>
        </div>
        
        {isDefault && (
          <div className="card-default-badge">
            <Check size={12} /> Default
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCard;