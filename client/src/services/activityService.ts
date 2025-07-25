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

/**
 * Submit sales activity data to the server
 * @param activityData - The sales activity data to submit
 * @returns Promise with the response from the server
 */
export const submitSalesActivity = async (activityData: SalesActivityData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/activities/create`,
      activityData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error submitting sales activity:', error);
    
    if (axios.isAxiosError(error)) {
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
