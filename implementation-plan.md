# Sales Report App Implementation Plan

## Overview

This document outlines the implementation plan for a sales report application with a chat-based interface. The application will allow sales agents to log their shop visits, record customer contacts, and track sales activities.

## Project Structure

```
sales-report-app/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static assets
│   │   ├── components/         # React components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── chat/           # Chat interface components
│   │   │   ├── form/           # Form input components
│   │   │   └── common/         # Shared components
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service functions
│   │   ├── types/              # TypeScript type definitions
│   │   ├── utils/              # Utility functions
│   │   ├── App.tsx             # Main App component
│   │   ├── main.tsx            # Entry point
│   │   └── vite-env.d.ts       # Vite type declarations
│   ├── .env                    # Environment variables
│   ├── index.html              # HTML entry point
│   ├── package.json            # Frontend dependencies
│   ├── tsconfig.json           # TypeScript configuration
│   └── vite.config.ts          # Vite configuration
│
├── server/                     # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Data models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   ├── config.ts           # Configuration
│   │   └── index.ts            # Entry point
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── tsconfig.json           # TypeScript configuration
│
└── README.md                   # Project documentation
```

## Implementation Phases

### Phase 1: Project Setup and Authentication

#### 1.1 Frontend Setup

1. Initialize React project with Vite
   ```bash
   npm create vite@latest client -- --template react-ts
   cd client
   npm install
   ```

2. Install required dependencies
   ```bash
   npm install react-router-dom axios react-hook-form yup @hookform/resolvers
   ```

3. Set up environment variables
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Create basic project structure (folders and files)

#### 1.2 Backend Setup

1. Initialize Node.js project
   ```bash
   mkdir server
   cd server
   npm init -y
   ```

2. Install required dependencies
   ```bash
   npm install express cors dotenv @supabase/supabase-js express-validator
   npm install -D typescript ts-node @types/express @types/cors nodemon
   ```

3. Set up TypeScript configuration
   ```bash
   npx tsc --init
   ```

4. Create basic project structure (folders and files)

5. Set up environment variables
   ```
   PORT=3000
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   ```

#### 1.3 Authentication Implementation

1. Create Supabase client configuration in backend
   ```typescript
   // server/src/services/supabase.ts
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.SUPABASE_URL!;
   const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
   
   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

2. Implement authentication controller and route
   ```typescript
   // server/src/controllers/auth.controller.ts
   import { Request, Response } from 'express';
   import { supabase } from '../services/supabase';

   export const validateEmployee = async (req: Request, res: Response) => {
     const { employeeId } = req.body;
     
     try {
       const { data, error } = await supabase
         .from('sales_agents')
         .select('id, name, employee_id')
         .eq('employee_id', employeeId)
         .single();
       
       if (error || !data) {
         return res.status(401).json({ 
           success: false, 
           message: 'Invalid employee ID' 
         });
       }
       
       return res.status(200).json({
         success: true,
         agent: {
           id: data.id,
           name: data.name,
           employeeId: data.employee_id
         }
       });
     } catch (error) {
       console.error('Authentication error:', error);
       return res.status(500).json({ 
         success: false, 
         message: 'Server error during authentication' 
       });
     }
   };
   ```

3. Create authentication context in frontend
   ```typescript
   // client/src/context/AuthContext.tsx
   import React, { createContext, useState, useContext, useEffect } from 'react';
   import axios from 'axios';

   interface Agent {
     id: number;
     name: string;
     employeeId: string;
   }

   interface AuthContextType {
     agent: Agent | null;
     isAuthenticated: boolean;
     isLoading: boolean;
     login: (employeeId: string) => Promise<boolean>;
     logout: () => void;
   }

   const AuthContext = createContext<AuthContextType | undefined>(undefined);

   export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [agent, setAgent] = useState<Agent | null>(null);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
       // Check for stored agent on mount
       const storedAgent = localStorage.getItem('agent');
       if (storedAgent) {
         setAgent(JSON.parse(storedAgent));
       }
       setIsLoading(false);
     }, []);

     const login = async (employeeId: string): Promise<boolean> => {
       try {
         setIsLoading(true);
         const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/validate`, { employeeId });
         
         if (response.data.success) {
           setAgent(response.data.agent);
           localStorage.setItem('agent', JSON.stringify(response.data.agent));
           return true;
         }
         return false;
       } catch (error) {
         console.error('Login error:', error);
         return false;
       } finally {
         setIsLoading(false);
       }
     };

     const logout = () => {
       setAgent(null);
       localStorage.removeItem('agent');
     };

     return (
       <AuthContext.Provider value={{ 
         agent, 
         isAuthenticated: !!agent, 
         isLoading, 
         login, 
         logout 
       }}>
         {children}
       </AuthContext.Provider>
     );
   };

   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (context === undefined) {
       throw new Error('useAuth must be used within an AuthProvider');
     }
     return context;
   };
   ```

4. Create login component
   ```typescript
   // client/src/components/auth/LoginForm.tsx
   import React, { useState } from 'react';
   import { useAuth } from '../../context/AuthContext';

   const LoginForm: React.FC = () => {
     const [employeeId, setEmployeeId] = useState('');
     const [error, setError] = useState('');
     const { login, isLoading } = useAuth();

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setError('');
       
       if (!employeeId.trim()) {
         setError('Employee ID is required');
         return;
       }
       
       const success = await login(employeeId);
       if (!success) {
         setError('Invalid employee ID. Please try again.');
       }
     };

     return (
       <div className="login-form">
         <h2>Sales Agent Login</h2>
         <form onSubmit={handleSubmit}>
           <div className="form-group">
             <label htmlFor="employeeId">Employee ID</label>
             <input
               type="text"
               id="employeeId"
               value={employeeId}
               onChange={(e) => setEmployeeId(e.target.value)}
               disabled={isLoading}
             />
           </div>
           {error && <div className="error-message">{error}</div>}
           <button type="submit" disabled={isLoading}>
             {isLoading ? 'Logging in...' : 'Login'}
           </button>
         </form>
       </div>
     );
   };

   export default LoginForm;
   ```

### Phase 2: Core Chat Interface

#### 2.1 Chat Interface Components

1. Create message types
   ```typescript
   // client/src/types/chat.ts
   export type MessageType = 'system' | 'user' | 'error';
   export type InputType = 'text' | 'select' | 'number' | 'boolean' | 'phone';

   export interface MessageOption {
     value: any;
     label: string;
   }

   export interface Message {
     id: string;
     type: MessageType;
     content: string;
     timestamp: Date;
     inputType?: InputType;
     options?: MessageOption[];
   }
   ```

2. Create chat context
   ```typescript
   // client/src/context/ChatContext.tsx
   import React, { createContext, useState, useContext } from 'react';
   import { Message, InputType, MessageOption } from '../types/chat';
   import { v4 as uuidv4 } from 'uuid';

   interface ChatContextType {
     messages: Message[];
     addSystemMessage: (content: string, inputType?: InputType, options?: MessageOption[]) => void;
     addUserMessage: (content: string) => void;
     addErrorMessage: (content: string) => void;
     clearMessages: () => void;
   }

   const ChatContext = createContext<ChatContextType | undefined>(undefined);

   export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [messages, setMessages] = useState<Message[]>([]);

     const addSystemMessage = (content: string, inputType?: InputType, options?: MessageOption[]) => {
       const newMessage: Message = {
         id: uuidv4(),
         type: 'system',
         content,
         timestamp: new Date(),
         inputType,
         options
       };
       setMessages(prev => [...prev, newMessage]);
     };

     const addUserMessage = (content: string) => {
       const newMessage: Message = {
         id: uuidv4(),
         type: 'user',
         content,
         timestamp: new Date()
       };
       setMessages(prev => [...prev, newMessage]);
     };

     const addErrorMessage = (content: string) => {
       const newMessage: Message = {
         id: uuidv4(),
         type: 'error',
         content,
         timestamp: new Date()
       };
       setMessages(prev => [...prev, newMessage]);
     };

     const clearMessages = () => {
       setMessages([]);
     };

     return (
       <ChatContext.Provider value={{ 
         messages, 
         addSystemMessage, 
         addUserMessage, 
         addErrorMessage, 
         clearMessages 
       }}>
         {children}
       </ChatContext.Provider>
     );
   };

   export const useChat = () => {
     const context = useContext(ChatContext);
     if (context === undefined) {
       throw new Error('useChat must be used within a ChatProvider');
     }
     return context;
   };
   ```

3. Create chat container component
   ```typescript
   // client/src/components/chat/ChatContainer.tsx
   import React, { useRef, useEffect } from 'react';
   import { useChat } from '../../context/ChatContext';
   import MessageBubble from './MessageBubble';
   import InputArea from './InputArea';

   const ChatContainer: React.FC = () => {
     const { messages } = useChat();
     const messagesEndRef = useRef<HTMLDivElement>(null);

     // Auto-scroll to bottom when messages change
     useEffect(() => {
       messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
     }, [messages]);

     return (
       <div className="chat-container">
         <div className="messages-area">
           {messages.map(message => (
             <MessageBubble key={message.id} message={message} />
           ))}
           <div ref={messagesEndRef} />
         </div>
         <InputArea />
       </div>
     );
   };

   export default ChatContainer;
   ```

4. Create message bubble component
   ```typescript
   // client/src/components/chat/MessageBubble.tsx
   import React from 'react';
   import { Message } from '../../types/chat';

   interface MessageBubbleProps {
     message: Message;
   }

   const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
     const { type, content } = message;
     
     return (
       <div className={`message-bubble ${type}`}>
         <div className="message-content">{content}</div>
         <div className="message-timestamp">
           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
         </div>
       </div>
     );
   };

   export default MessageBubble;
   ```

5. Create input area component
   ```typescript
   // client/src/components/chat/InputArea.tsx
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

     return (
       <form className="input-area" onSubmit={handleSubmit}>
         <input
           type="text"
           value={inputValue}
           onChange={(e) => setInputValue(e.target.value)}
           placeholder="Type your answer..."
           disabled={!currentStep}
         />
         <button type="submit" disabled={!inputValue.trim() || !currentStep}>
           Send
         </button>
       </form>
     );
   };

   export default InputArea;
   ```

#### 2.2 Form Steps Manager

1. Create form context and state
   ```typescript
   // client/src/context/FormContext.tsx
   import React, { createContext, useState, useContext, useEffect } from 'react';
   import { useChat } from './ChatContext';
   import { useAuth } from './AuthContext';

   interface FormState {
     currentStep: number;
     salesAgentId: number | null;
     customerCode: number | null;
     customerName: string;
     shopRating: number | null;
     lineAdded: boolean;
     meetingComment: string | null;
     location: {
       latitude: number | null;
       longitude: number | null;
       captured: boolean;
     };
     contact: {
       name: string | null;
       position: string | null;
       rating: number | null;
       phoneNumber: string | null;
     };
   }

   interface FormContextType {
     formState: FormState;
     currentStep: number;
     startForm: () => void;
     handleUserInput: (input: any) => void;
     resetForm: () => void;
     captureLocation: (lat: number, lng: number) => void;
   }

   const initialFormState: FormState = {
     currentStep: 0,
     salesAgentId: null,
     customerCode: null,
     customerName: '',
     shopRating: null,
     lineAdded: false,
     meetingComment: null,
     location: {
       latitude: null,
       longitude: null,
       captured: false
     },
     contact: {
       name: null,
       position: null,
       rating: null,
       phoneNumber: null
     }
   };

   const FormContext = createContext<FormContextType | undefined>(undefined);

   export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [formState, setFormState] = useState<FormState>(initialFormState);
     const { addSystemMessage, addErrorMessage } = useChat();
     const { agent } = useAuth();

     // Reset form when agent changes
     useEffect(() => {
       if (agent) {
         setFormState(prev => ({
           ...initialFormState,
           salesAgentId: agent.id
         }));
       } else {
         resetForm();
       }
     }, [agent]);

     const startForm = () => {
       if (!agent) {
         addErrorMessage('You must be logged in to start a form.');
         return;
       }

       setFormState(prev => ({
         ...prev,
         currentStep: 1,
         salesAgentId: agent.id
       }));

       // Start the conversation
       addSystemMessage('Which shop did you visit today?', 'text');
     };

     const handleUserInput = (input: any) => {
       // Handle different steps based on currentStep
       switch (formState.currentStep) {
         case 1: // Shop selection
           // This would be handled by the shop autocomplete component
           // For now, just move to next step
           setFormState(prev => ({
             ...prev,
             customerName: input,
             currentStep: prev.currentStep + 1
           }));
           addSystemMessage('How would you rate this shop on a scale of 1-5?', 'number');
           break;
         
         case 2: // Shop rating
           const rating = parseInt(input);
           if (isNaN(rating) || rating < 1 || rating > 5) {
             addErrorMessage('Please enter a rating between 1 and 5.');
             return;
           }
           
           setFormState(prev => ({
             ...prev,
             shopRating: rating,
             currentStep: prev.currentStep + 1
           }));
           addSystemMessage('Did you add a new product line to this shop?', 'boolean');
           break;
         
         // Additional cases for other steps...
         
         default:
           addErrorMessage('Unknown form step.');
       }
     };

     const resetForm = () => {
       setFormState(initialFormState);
     };

     const captureLocation = (latitude: number, longitude: number) => {
       setFormState(prev => ({
         ...prev,
         location: {
           latitude,
           longitude,
           captured: true
         }
       }));
     };

     return (
       <FormContext.Provider value={{ 
         formState, 
         currentStep: formState.currentStep,
         startForm, 
         handleUserInput, 
         resetForm,
         captureLocation
       }}>
         {children}
       </FormContext.Provider>
     );
   };

   export const useFormContext = () => {
     const context = useContext(FormContext);
     if (context === undefined) {
       throw new Error('useFormContext must be used within a FormProvider');
     }
     return context;
   };
   ```

### Phase 3: Key Features

#### 3.1 Shop Autocomplete

1. Create customer search service
   ```typescript
   // client/src/services/customerService.ts
   import axios from 'axios';

   interface Customer {
     code: number;
     name: string;
   }

   export const searchCustomers = async (query: string): Promise<Customer[]> => {
     try {
       const response = await axios.get(
         `${import.meta.env.VITE_API_URL}/customers/search?query=${encodeURIComponent(query)}`
       );
       return response.data.customers;
     } catch (error) {
       console.error('Error searching customers:', error);
       return [];
     }
   };
   ```

2. Create shop autocomplete component
   ```typescript
   // client/src/components/form/ShopAutocomplete.tsx
   import React, { useState, useEffect, useRef } from 'react';
   import { useChat } from '../../context/ChatContext';
   import { useFormContext } from '../../context/FormContext';
   import { searchCustomers } from '../../services/customerService';
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
     
     const { addUserMessage } = useChat();
     const { formState, handleUserInput } = useFormContext();
     
     const debouncedSearchTerm = useDebounce(inputValue, 300);
     const inputRef = useRef<HTMLInputElement>(null);

     useEffect(() => {
       if (debouncedSearchTerm.length >= 3) {
         setIsLoading(true);
         searchCustomers(debouncedSearchTerm)
           .then(results => {
             setSuggestions(results);
             setShowSuggestions(results.length > 0);
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
       
       addUserMessage(customer.name);
       
       // Update form state with selected customer
       handleUserInput({
         customerCode: customer.code,
         customerName: customer.name
       });
     };

     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       if (inputValue.trim().length < 3) return;
       
       // If no suggestion selected but input provided
       addUserMessage(inputValue);
       handleUserInput({
         customerName: inputValue
       });
       
       setInputValue('');
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
           />
           <button type="submit" disabled={inputValue.trim().length < 3 || isLoading}>
             {isLoading ? 'Loading...' : 'Submit'}
           </button>
         </form>
         
         {showSuggestions && (
           <ul className="suggestions-list">
             {suggestions.map(customer => (
               <li 
                 key={customer.code}
                 onClick={() => handleSelectShop(customer)}
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
   ```

3. Create debounce hook
   ```typescript
   // client/src/hooks/useDebounce.ts
   import { useState, useEffect } from 'react';

   export function useDebounce<T>(value: T, delay: number): T {
     const [debouncedValue, setDebouncedValue] = useState<T>(value);

     useEffect(() => {
       const handler = setTimeout(() => {
         setDebouncedValue(value);
       }, delay);

       return () => {
         clearTimeout(handler);
       };
     }, [value, delay]);

     return debouncedValue;
   }
   ```

#### 3.2 Geolocation Capture

1. Create geolocation hook
   ```typescript
   // client/src/hooks/useGeolocation.ts
   import { useState, useEffect } from 'react';

   interface GeolocationState {
     latitude: number | null;
     longitude: number | null;
     error: string | null;
     isLoading: boolean;
   }

   export const useGeolocation = () => {
     const [state, setState] = useState<GeolocationState>({
       latitude: null,
       longitude: null,
       error: null,
       isLoading: false
     });

     const getLocation = () => {
       if (!navigator.geolocation) {
         setState(prev => ({
           ...prev,
           error: 'Geolocation is not supported by your browser'
         }));
         return;
       }

       setState(prev => ({ ...prev, isLoading: true }));

       navigator.geolocation.getCurrentPosition(
         (position) => {
           setState({
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             error: null,
             isLoading: false
           });
         },
         (error) => {
           setState({
             latitude: null,
             longitude: null,
             error: `Unable to retrieve your location: ${error.message}`,
             isLoading: false
           });
         },
         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
       );
     };

     return { ...state, getLocation };
   };
   ```

2. Create location capture component
   ```typescript
   // client/src/components/form/LocationCapture.tsx
   import React from 'react';
   import { useGeolocation } from '../../hooks/useGeolocation';
   import { useFormContext } from '../../context/FormContext';
   import { useChat } from '../../context/ChatContext';

   const LocationCapture: React.FC = () => {
     const { latitude, longitude, error, isLoading, getLocation } = useGeolocation();
     const { captureLocation } = useFormContext();
     const { addSystemMessage, addErrorMessage } = useChat();

     const handleCaptureLocation = () => {
       getLocation();
     };

     // When location is captured successfully
     React.useEffect(() => {
       if (latitude && longitude) {
         captureLocation(latitude, longitude);
         addSystemMessage(`Location captured successfully: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
       }
     }, [latitude, longitude, captureLocation, addSystemMessage]);

     // Handle errors
     React.useEffect(() => {
       if (error) {
         addErrorMessage(`Location error: ${error}`);
       }
     }, [error, addErrorMessage]);

     return (
       <div className="location-capture">
         <button 
           onClick={handleCaptureLocation} 
           disabled={isLoading}
           className="location-button"
         >
           {isLoading ? 'Getting Location...' : 'Share My Location'}
         </button>
         
         {latitude && longitude && (
           <div className="location-display">
             <p>Location captured:</p>
             <p>Latitude: {latitude.toFixed(6)}</p>
             <p>Longitude: {longitude.toFixed(6)}</p>
           </div>
         )}
         
         {error && (
           <div className="location-error">
             <p>{error}</p>
             <p>Please try again or enter your location manually.</p>
           </div>
         )}
       </div>
     );
   };

   export default LocationCapture;
   ```

### Phase 4: Backend Integration

#### 4.1 API Endpoints

1. Create customer search controller
   ```typescript
   // server/src/controllers/customer.controller.ts
   import { Request, Response } from 'express';
   import { supabase } from '../services/supabase';

   export const searchCustomers = async (req: Request, res: Response) => {
     const { query } = req.query;
     
     if (!query || typeof query !== 'string' || query.length < 3) {
       return res.status(400).json({ 
         success: false, 
         message: 'Search query must be at least 3 characters' 
       });
     }
     
     try {
       const { data, error } = await supabase
         .from('customer')
         .select('code, name')
         .ilike('name', `%${query}%`)
         .limit(10);
       
       if (error) {
         throw error;
       }
       
       return res.status(200).json({
         success: true,
         customers: data
       });
     } catch (error) {
       console.error('Customer search error:', error);
       return res.status(500).json({ 
         success: false, 
         message: 'Error searching customers' 
       });
     }
   };
   ```

2. Create sales activity controller
   ```typescript
   // server/src/controllers/activity.controller.ts
   import { Request, Response } from 'express';
   import { supabase } from '../services/supabase';

   export const createSalesActivity = async (req: Request, res: Response) => {
     const { 
       salesAgentId,
       customerCode,
       shopRating,
       lineAdded,
       meetingComment,
       latitude,
       longitude,
       createdByAgentId
     } = req.body;
     
     try {
       const { data, error } = await supabase
         .from('sales_daily_activities')
         .insert([
           { 
             sales_agent_id: salesAgentId,
             customer_code: customerCode,
             shop_rating: shopRating,
             line_added: lineAdded,
             meeting_comment: meetingComment,
             latitude,
             longitude,
             created_by_agent_id: createdByAgentId,
             updated_by_agent_id: createdByAgentId
           }
         ])
         .select('id')
         .single();
       
       if (error) {
         throw error;
       }
       
       return res.status(201).json({
         success: true,
         activityId: data.id
       });
     } catch (error) {
       console.error('Create sales activity error:', error);
       return res.status(500).json({ 
         success: false, 
         message: 'Error creating sales activity' 