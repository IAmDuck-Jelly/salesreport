import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useFormContext } from '../../context/FormContext';
import MessageBubble from './MessageBubble';
import InputArea from './InputArea';
import ShopAutocomplete from '../form/ShopAutocomplete';
import LocationCapture from '../form/LocationCapture';

const ChatPage: React.FC = () => {
  const { messages } = useChat();
  const { currentStep, startForm } = useFormContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Start the form when the component mounts
  useEffect(() => {
    if (currentStep === 0) {
      startForm();
    }
  }, [currentStep]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Render the appropriate input component based on the current step
  const renderInputComponent = () => {
    switch (currentStep) {
      case 1: // Shop selection
        return <ShopAutocomplete />;
      case 2: // Shop rating
        return <InputArea />;
      case 3: // Contact name
      case 4: // Contact position
      case 5: // Contact rating
      case 6: // Phone number obtained
      case 7: // Contact phone
      case 8: // Line account added
      case 9: // Meeting comments
        return <InputArea />;
      case 10: // Submit report and capture location
        return <LocationCapture />;
      case 11: // Form submission in progress
        return (
          <div className="form-submission">
            <p>Submitting your report...</p>
          </div>
        );
      default:
        return <InputArea />;
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Sales Report</h2>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          New Report
        </button>
      </div>
      
      <div className="chat-container">
        <div className="messages-area">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} id="messages-end"></div>
        </div>
        
        <div className="input-area-container">
          {renderInputComponent()}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
