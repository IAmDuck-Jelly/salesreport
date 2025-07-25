import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { useFormContext } from '../../context/FormContext';

const ContactForm: React.FC = () => {
  const { addUserMessage, addErrorMessage } = useChat();
  const { formState, handleUserInput } = useFormContext();
  
  const [name, setName] = useState(formState.contact.name || '');
  const [position, setPosition] = useState(formState.contact.position || '');
  const [rating, setRating] = useState(formState.contact.rating?.toString() || '');
  const [phoneNumber, setPhoneNumber] = useState(formState.contact.phoneNumber || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields based on current step
    if (formState.currentStep === 3 && !name.trim()) {
      addErrorMessage('Contact name is required');
      return;
    }
    
    if (formState.currentStep === 5 && (!rating || isNaN(parseInt(rating)) || parseInt(rating) < 1 || parseInt(rating) > 5)) {
      addErrorMessage('Please enter a rating between 1 and 5');
      return;
    }
    
    // Handle input based on current step
    switch (formState.currentStep) {
      case 3: // Contact name
        addUserMessage(name);
        handleUserInput(name);
        break;
      case 4: // Contact position
        addUserMessage(position || 'Not provided');
        handleUserInput(position);
        break;
      case 5: // Contact rating
        addUserMessage(rating);
        handleUserInput(parseInt(rating));
        break;
      case 7: // Contact phone number
        addUserMessage(phoneNumber || 'Not provided');
        handleUserInput(phoneNumber);
        break;
      default:
        addErrorMessage('Unknown form step');
        return;
    }
  };

  const renderInput = () => {
    switch (formState.currentStep) {
      case 3: // Contact name
        return (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter contact name"
            className="form-control"
          />
        );
      
      case 4: // Contact position
        return (
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Enter contact position"
            className="form-control"
          />
        );
      
      case 5: // Contact rating
        return (
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button"
                className={`btn btn-rating ${rating === num.toString() ? 'selected' : ''}`}
                onClick={() => setRating(num.toString())}
              >
                {num}
              </button>
            ))}
          </div>
        );
      
      case 7: // Contact phone number
        return (
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="form-control"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {renderInput()}
      <button 
        type="submit" 
        className="btn btn-primary"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
