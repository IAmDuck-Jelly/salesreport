import React, { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import { useFormContext } from '../../context/FormContext';

const InputArea: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addUserMessage } = useChat();
  const { currentStep, handleUserInput } = useFormContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    addUserMessage(inputValue);
    handleUserInput(inputValue);
    setInputValue('');
  };

  // Render different input types based on the current step
  const renderInput = () => {
    switch (currentStep) {
      case 2: // Shop rating (1-5)
        return (
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button"
                className="btn btn-rating"
                onClick={() => {
                  addUserMessage(num.toString());
                  handleUserInput(num.toString());
                  setInputValue('');
                }}
              >
                {num}
              </button>
            ))}
          </div>
        );
      
      case 5: // Contact rating (1-5)
        return (
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button"
                className="btn btn-rating"
                onClick={() => {
                  addUserMessage(num.toString());
                  handleUserInput(num.toString());
                  setInputValue('');
                }}
              >
                {num}
              </button>
            ))}
          </div>
        );
      
      case 6: // Phone number obtained (Yes/No)
      case 8: // Line account added (Yes/No)
        return (
          <div className="boolean-input">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                addUserMessage('Yes');
                handleUserInput('Yes');
                setInputValue('');
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                addUserMessage('No');
                handleUserInput('No');
                setInputValue('');
              }}
            >
              No
            </button>
          </div>
        );
      
      default: // Text input
        return (
          <div className="text-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your answer..."
              className="form-control"
            />
            <button 
              type="submit" 
              disabled={!inputValue.trim()}
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
        );
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      {renderInput()}
    </form>
  );
};

export default InputArea;
