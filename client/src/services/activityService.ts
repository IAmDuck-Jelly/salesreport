import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

if (!API_BASE_URL) {
  throw new Error('Missing API URL. Please check your .env file.');
}

interface SalesActivityData {
  salesAgentId: number;
  customerCode: number;
  shopRating?: number;
  lineAdded: boolean;
  meetingComment?: string;
  latitude?: number;
  longitude?: number;
  createdByAgentId: number;
}

interface CustomerData {
  name: string;
  email?: string;
  address?: string;
}

interface Customer {
  code: number;
  name: string;
}

/**
 * Create a new customer
 * @param customerData - The customer data to create
 * @returns Promise with the response from the server
 */
export const createCustomer = async (customerData: CustomerData): Promise<{ success: boolean; customer?: Customer; error?: string }> => {
  try {
    console.log('ActivityService: Creating customer with data:', customerData);
    
    const response = await axios.post(
      `${API_BASE_URL}/customers/create`,
      customerData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('ActivityService: Customer creation response:', response.data);
    
    return {
      success: true,
      customer: response.data.customer,
    };
  } catch (error) {
    console.error('ActivityService: Error creating customer:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('ActivityService: Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'An error occurred while creating the customer',
      };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
};

/**
 * Submit sales activity data to the server
 * @param activityData - The sales activity data to submit
 * @returns Promise with the response from the server
 */
export const submitSalesActivity = async (activityData: SalesActivityData) => {
  try {
    console.log('ActivityService: Making API call to:', `${API_BASE_URL}/activities/create`);
    console.log('ActivityService: Data being sent:', activityData);
    
    const response = await axios.post(
      `${API_BASE_URL}/activities/create`,
      activityData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('ActivityService: Response received:', response.data);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('ActivityService: Error submitting sales activity:', error);
    
    if (axios.isAxiosError(error)) {
      console.error('ActivityService: Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'An error occurred while submitting the activity',
      };
    }
    
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
};
