import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import Chat from '../Chat/Chat';
import './FloatingChatButton.css';

const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleChatPanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="chat_interaction_cluster">
      {isExpanded ? (
        <div className="discourse_expansion_panel">
          <div className="dialogue_module_header">
            <h3 className="dialogue_title">AgriChat Assistant</h3>
            <button 
              className="discourse_dismissal_trigger" 
              onClick={toggleChatPanel}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          <div className="dialogue_module_body">
            <Chat />
          </div>
        </div>
      ) : null}
      
      
<button 
  className={`initiate_discourse_trigger ${isExpanded ? 'elevated_state' : ''}`} 
  onClick={toggleChatPanel}
  aria-label="Chat with AgriChat Assistant"
>
  {isExpanded ? (
    <X size={12} /> 
  ) : (
    <MessageSquare size={24} />
    
  )}
</button>
    </div>
  );
};

export default FloatingChatButton;