import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import { useChat } from './ChatContext';
import { useAuth } from './AuthContext';
import { submitSalesActivity } from '../services/activityService';

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
  selectCustomer: (code: number, name: string) => void;
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

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const { addSystemMessage, addErrorMessage, clearMessages } = useChat();
  const { agent } = useAuth();

  // Reset form when agent changes
  useEffect(() => {
    if (agent) {
      setFormState({
        ...initialFormState,
        salesAgentId: agent.id
      });
    } else {
      resetForm();
    }
  }, [agent]);

  const startForm = useCallback(() => {
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
    addSystemMessage('Hi! To start filling activity report, start by filling shop name.', 'text');
  }, [agent, addErrorMessage, addSystemMessage]);

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
        addSystemMessage('How much would you rate this shop from 1-5 ?', 'number');
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
        addSystemMessage('Who did you speak to today?', 'text');
        break;
      
      case 3: // Contact person name
        setFormState(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            name: input
          },
          currentStep: prev.currentStep + 1
        }));
        addSystemMessage("What's his role at the shop?", 'text');
        break;
      
      case 4: // Contact person role
        setFormState(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            position: input
          },
          currentStep: prev.currentStep + 1
        }));
        addSystemMessage("How much would you rate their personality?", 'number');
        break;
      
      case 5: // Contact rating
        const contactRating = parseInt(input);
        if (isNaN(contactRating) || contactRating < 1 || contactRating > 5) {
          addErrorMessage('Please enter a rating between 1 and 5.');
          return;
        }
        
        setFormState(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            rating: contactRating
          },
          currentStep: prev.currentStep + 1
        }));
        addSystemMessage("Did you get the shop phone number?", 'boolean', [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
        ]);
        break;
      
      case 6: // Phone number obtained
        setFormState(prev => ({
          ...prev,
          currentStep: prev.currentStep + 1
        }));
        
        if (input === 'Yes' || input === true) {
          addSystemMessage("What's their phone number?", 'phone');
        } else {
          // Skip to next question
          setFormState(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
          }));
          addSystemMessage("Did they add our line account?", 'boolean', [
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' }
          ]);
        }
        break;
      
      case 7: // Phone number input
        setFormState(prev => ({
          ...prev,
          contact: {
            ...prev.contact,
            phoneNumber: input
          },
          currentStep: prev.currentStep + 1
        }));
        addSystemMessage("Did they add our line account?", 'boolean', [
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' }
          ]);
        break;
      
      case 8: // Line account added
        setFormState(prev => ({
          ...prev,
          lineAdded: input === 'Yes' || input === true,
          currentStep: prev.currentStep + 1
        }));
        addSystemMessage("Please note down what your interaction with them was today.", 'text');
        break;
      
      case 9: // Meeting comments
        setFormState(prev => ({
          ...prev,
          meetingComment: input,
          currentStep: prev.currentStep + 1
        }));
        addSystemMessage("Click 'Submit Report' to finalize your report. This will capture your location.", 'text');
        break;
      
      case 10: // Submit report and capture location
        // This step is handled by the location capture component
        // The location will be captured when the user clicks the submit button
        // After location is captured, we move to step 11 to submit the form data
        setFormState(prev => ({
          ...prev,
          currentStep: 11
        }));
        break;
      
      case 11: // Form completed and location captured, submit to server
        // Prepare data for submission
        const activityData: any = {
          salesAgentId: formState.salesAgentId || 0,
          customerCode: formState.customerCode || 0,
          lineAdded: formState.lineAdded,
          createdByAgentId: formState.salesAgentId || 0
        };
        
        // Add optional fields only if they have values
        if (formState.shopRating !== null) {
          activityData.shopRating = formState.shopRating;
        }
        
        if (formState.meetingComment) {
          activityData.meetingComment = formState.meetingComment;
        }
        
        if (formState.location.latitude !== null) {
          activityData.latitude = formState.location.latitude;
        }
        
        if (formState.location.longitude !== null) {
          activityData.longitude = formState.location.longitude;
        }
        
        // Submit data to server
        submitSalesActivity(activityData).then(result => {
          if (result.success) {
            addSystemMessage('Report submitted successfully! Thank you for your submission.', 'text');
            // Reset form after successful submission
            setTimeout(() => {
              resetForm();
            }, 3000);
          } else {
            addErrorMessage(`Error submitting report: ${result.error}`);
          }
        });
        break;
      
      default:
        addErrorMessage('Unknown form step.');
    }
  };

  const resetForm = () => {
    setFormState(initialFormState);
    clearMessages();
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

  const selectCustomer = (code: number, name: string) => {
    setFormState(prev => ({
      ...prev,
      customerCode: code,
      customerName: name,
      currentStep: prev.currentStep + 1
    }));
    
    // Add system message for the next step
    addSystemMessage('How much would you rate this shop from 1-5 ?', 'number');
  };

  return (
    <FormContext.Provider value={{ 
      formState, 
      currentStep: formState.currentStep,
      startForm, 
      handleUserInput, 
      resetForm,
      captureLocation,
      selectCustomer
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
