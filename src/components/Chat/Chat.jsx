import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AlertCircle, MessageSquare, Send, X } from 'lucide-react';
import './Chat.css';

function Chat() {
  // App state
  const [state, setState] = useState({
    activeChatId: "welcome",
    userQuery: "",
    fetchingResponse: false,
    operationFault: null,
    displayFaultDialog: false,
    conversationArchive: [
      {
        id: "welcome",
        subject: "Welcome",
        snippet: "Hello! I'm your agricultural assistant.",
        chronology: new Date(),
        dialogueSequence: [
          {
            id: "welcome-message",
            participant: "assistant",
            utterance: "Hello! I'm your agricultural assistant. How can I help you today with farming, crops, or agricultural practices?"
          }
        ]
      }
    ]
  });

  const dialogScrollContainerRef = useRef(null);

  // Helper functions
  const chronologyFormatter = (date) => {
    return new Date(date).toLocaleDateString();
  };

  // Action functions
  const initiateNewConversation = () => {
    const freshConversationId = "convo-" + Date.now().toString();
    setState(prevState => ({
      ...prevState,
      conversationArchive: [
        {
          id: freshConversationId,
          subject: "New Discussion",
          snippet: "Start a new agricultural consultation...",
          chronology: new Date(),
          dialogueSequence: [
            {
              id: "welcome-message",
              participant: "assistant",
              utterance: "Hello! I'm your agricultural assistant. How can I help you today with farming, crops, or agricultural practices?"
            }
          ]
        },
        ...prevState.conversationArchive
      ],
      activeChatId: freshConversationId
    }));
  };

  const selectDialogue = (dialogueId) => {
    setState(prevState => ({
      ...prevState,
      activeChatId: dialogueId
    }));
  };

  const captureInputModification = (e) => {
    setState(prevState => ({
      ...prevState,
      userQuery: e.target.value
    }));
  };

  const processCommunicationRequest = async (e) => {
    e.preventDefault();
    
    if (state.userQuery.trim() === '') return;
    
    // Get active chat's messages
    const currentDialogue = state.conversationArchive.find(convo => convo.id === state.activeChatId);
    if (!currentDialogue) return;
    
    // Add user message
    const humanContribution = {
      id: `human-${Date.now()}`,
      participant: "user",
      utterance: state.userQuery
    };
    
    const extendedDialogueSequence = [...currentDialogue.dialogueSequence, humanContribution];
    
    setState(prevState => ({
      ...prevState,
      conversationArchive: prevState.conversationArchive.map(convo => {
        if (convo.id === state.activeChatId) {
          return {
            ...convo,
            dialogueSequence: extendedDialogueSequence,
            snippet: state.userQuery.substring(0, 50) + "..."
          };
        }
        return convo;
      }),
      userQuery: '',
      fetchingResponse: true
    }));
    
    try {
      // Send request to server
      const apiResponse = await axios.post('http://localhost:8000/chat', {
        message: state.userQuery
      });
      
      // Add AI response
      const artificialContribution = {
        id: `ai-${Date.now()}`,
        participant: "assistant",
        utterance: apiResponse.data.response
      };
      
      setState(prevState => ({
        ...prevState,
        conversationArchive: prevState.conversationArchive.map(convo => {
          if (convo.id === state.activeChatId) {
            return {
              ...convo,
              dialogueSequence: [...extendedDialogueSequence, artificialContribution],
              snippet: artificialContribution.utterance.substring(0, 50) + "..."
            };
          }
          return convo;
        }),
        fetchingResponse: false
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const systemFaultNotification = {
        id: `fault-${Date.now()}`,
        participant: "assistant",
        utterance: "Sorry, something went wrong. Please try again."
      };
      
      setState(prevState => ({
        ...prevState,
        conversationArchive: prevState.conversationArchive.map(convo => {
          if (convo.id === state.activeChatId) {
            return {
              ...convo,
              dialogueSequence: [...extendedDialogueSequence, systemFaultNotification],
              snippet: systemFaultNotification.utterance.substring(0, 50) + "..."
            };
          }
          return convo;
        }),
        fetchingResponse: false,
        operationFault: error.message || "An error occurred while communicating with the AI assistant.",
        displayFaultDialog: true
      }));
    }
  };

  const dismissFaultNotification = () => {
    setState(prevState => ({
      ...prevState,
      displayFaultDialog: false
    }));
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (dialogScrollContainerRef.current) {
      dialogScrollContainerRef.current.scrollTop = dialogScrollContainerRef.current.scrollHeight;
    }
  };

  // Scroll when messages change or when the active chat changes
  useEffect(() => {
    // Use a longer timeout to ensure DOM is fully rendered
    const scrollTimer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(scrollTimer);
  }, [state.conversationArchive, state.activeChatId]);
  
  // Scroll on component mount
  useEffect(() => {
    // Initial scroll with a delay
    const initialScrollTimer = setTimeout(scrollToBottom, 300);
    
    // Add a second scroll attempt with a longer delay
    const backupScrollTimer = setTimeout(scrollToBottom, 800);
    
    return () => {
      clearTimeout(initialScrollTimer);
      clearTimeout(backupScrollTimer);
    };
  }, []);
  
  // Get active chat
  const currentDialogue = state.conversationArchive.find(convo => convo.id === state.activeChatId);

  return (
    <div className="dialogue_ecosystem">
      {/* Chat Container */}
      <div className="discourse_vessel">
        {/* Messages */}
        <div className="utterance_repository" ref={dialogScrollContainerRef}>
          {currentDialogue && currentDialogue.dialogueSequence.map(message => {
            let messageStyleVariant = 'synthetic_contribution';
            if (message.participant === 'user') {
              messageStyleVariant = 'human_contribution';
            } else if (message.utterance.includes('Sorry, something went wrong')) {
              messageStyleVariant = 'fault_notification';
            }
            
            return (
              <div className="verbal_exchange_unit" key={message.id}>
                <div className={`communication_parcel ${messageStyleVariant}`}>
                  <div className="parcel_identification">
                    {message.participant !== 'user' && <MessageSquare size={16} />}
                    <span className="contributor_designation">{message.participant === 'user' ? 'You' : 'AgriChat'}</span>
                  </div>
                  <p className="textual_substance">{message.utterance}</p>
                </div>
              </div>
            );
          })}
          
          {state.fetchingResponse && (
            <div className="verbal_exchange_unit">
              <div className="computation_signifier">
                <div className="parcel_identification">
                  <MessageSquare size={16} />
                  <span className="contributor_designation">AgriChat</span>
                </div>
                <div className="cognitive_animation">
                  <div className="thought_indication"></div>
                  <div className="thought_indication"></div>
                  <div className="thought_indication"></div>
                  <span style={{ marginLeft: '8px', fontSize: '14px' }}>Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form className="communication_submission_interface" onSubmit={processCommunicationRequest}>
          <div className="text_entry_enclosure">
            <input
              type="text"
              className="query_input_field"
              placeholder="Ask about crops or farming..."
              value={state.userQuery}
              onChange={captureInputModification}
            />
            <button
              type="submit"
              className="transmission_trigger"
              disabled={state.userQuery.trim() === ''}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      {/* Error Popup */}
      {state.displayFaultDialog && (
        <div className="fault_notification_veil">
          <div className="fault_notification_container">
            <div className="fault_banner">
              <div className="fault_designation">
                <AlertCircle size={20} />
                <h3 className="fault_title_text">Error</h3>
              </div>
              <button className="dismissal_control" onClick={dismissFaultNotification}>
                <X size={20} />
              </button>
            </div>
            <div className="fault_description">
              {state.operationFault}
            </div>
            <div className="fault_response_options">
              <button className="acknowledgment_control" onClick={dismissFaultNotification}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;