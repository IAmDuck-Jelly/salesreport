import React, { createContext, useState, useContext, ReactNode } from 'react';

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

interface ChatContextType {
  messages: Message[];
  addSystemMessage: (content: string, inputType?: InputType, options?: MessageOption[]) => void;
  addUserMessage: (content: string) => void;
  addErrorMessage: (content: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addSystemMessage = (content: string, inputType?: InputType, options?: MessageOption[]) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
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
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addErrorMessage = (content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
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