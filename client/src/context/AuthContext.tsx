import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
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

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored agent on mount
    const storedAgent = localStorage.getItem('agent');
    if (storedAgent) {
      try {
        setAgent(JSON.parse(storedAgent));
      } catch (error) {
        console.error('Error parsing stored agent:', error);
        localStorage.removeItem('agent');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (employeeId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/validate`, { employeeId });
      
      if (response.data.success) {
        console.log('Auth response agent data:', response.data.agent);
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