import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useFormContext } from '../../context/FormContext';
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
  
  const { addUserMessage } = useChat();
  const { handleUserInput, selectCustomer } = useFormContext();
  
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
    // Removed handleUserInput call since selectCustomer now handles step advancement
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length < 3) return;
    
    // If no suggestion selected but input provided
    addUserMessage(inputValue);
    handleUserInput(inputValue);
    
    setInputValue('');
    setSelectedSuggestion(null);
  };

  return (
    <div className="shop-autocomplete">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter shop name (min 3 characters)"
          autoComplete="off"
          className="form-control"
        />
        <button 
          type="submit" 
          disabled={inputValue.trim().length < 3 || isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Loading...' : 'Submit'}
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
    </div>
  );
};

export default ShopAutocomplete;
