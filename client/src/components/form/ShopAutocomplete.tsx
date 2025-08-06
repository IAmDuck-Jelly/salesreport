import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useFormContext } from '../../context/FormContext';
import { createCustomer } from '../../services/activityService';
import axios from 'axios';
import { useDebounce } from '../../hooks/useDebounce';

interface Customer {
  code: number;
  name: string;
}

const ShopAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addUserMessage, addErrorMessage } = useChat();
  const { selectCustomer } = useFormContext();
  
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      setIsLoading(true);
      axios.get(`${import.meta.env.VITE_API_URL}/customers/search?query=${encodeURIComponent(debouncedSearchTerm)}`)
        .then(response => {
          setSuggestions(response.data.customers || []);
          setShowSuggestions(response.data.customers?.length > 0);
        })
        .catch(error => {
          console.error('Error searching customers:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedSearchTerm]);

  const handleSelectShop = (customer: Customer) => {
    setInputValue(customer.name);
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestion(customer.code);
    
    addUserMessage(customer.name);
    selectCustomer(customer.code, customer.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length < 3) return;
    
    setIsSubmitting(true);
    
    try {
      // If a suggestion was selected, use that customer
      if (selectedSuggestion !== null) {
        const selectedCustomer = suggestions.find(c => c.code === selectedSuggestion);
        if (selectedCustomer) {
          addUserMessage(selectedCustomer.name);
          selectCustomer(selectedCustomer.code, selectedCustomer.name);
        }
      } else {
        // No suggestion selected, create a new customer
        addUserMessage(inputValue);
        
        const result = await createCustomer({ name: inputValue.trim() });
        
        if (result.success && result.customer) {
          // Successfully created new customer, proceed with form
          selectCustomer(result.customer.code, result.customer.name);
        } else {
          // Error creating customer
          addErrorMessage(result.error || 'Failed to create new customer. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }
      
      // Clear form
      setInputValue('');
      setSelectedSuggestion(null);
      setSuggestions([]);
      setShowSuggestions(false);
      
    } catch (error) {
      console.error('Error handling shop submission:', error);
      addErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="shop-autocomplete">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedSuggestion(null); // Clear selection when typing
          }}
          placeholder="Enter shop name (min 3 characters)"
          autoComplete="off"
          className="form-control"
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          disabled={inputValue.trim().length < 3 || isLoading || isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Creating...' : isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      
      {showSuggestions && (
        <ul className="suggestions-list">
          {suggestions.map(customer => (
            <li 
              key={customer.code}
              onClick={() => handleSelectShop(customer)}
              className={selectedSuggestion === customer.code ? 'selected' : ''}
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
      
      {inputValue.trim().length >= 3 && !showSuggestions && !isLoading && (
        <div className="new-customer-hint">
          <small>Press Submit to create a new customer: "{inputValue}"</small>
        </div>
      )}
    </div>
  );
};

export default ShopAutocomplete;
