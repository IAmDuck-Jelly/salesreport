import React, { useState, useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';
import SalesChart from './SalesChart';
import './reporting.css';

interface SalesActivity {
  id: number;
  activity_date: string;
  sales_agent_id: number;
  customer_code: number;
  shop_rating: number | null;
  line_added: boolean;
  meeting_comment: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
  created_by_agent_id: number;
  updated_by_agent_id: number;
}

interface CustomerContact {
  id: number;
  customer_code: number;
  contact_name: string;
  position: string | null;
  rating: number | null;
  phone_number: string | null;
  created_at: string;
  updated_at: string;
  created_by_agent_id: number;
  updated_by_agent_id: number;
}

const Dashboard: React.FC = () => {
  const [salesActivities, setSalesActivities] = useState<SalesActivity[]>([]);
  const [customerContacts, setCustomerContacts] = useState<CustomerContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch sales activities
        const { data: activities, error: activitiesError } = await supabase
          .from('sales_daily_activities')
          .select('*')
          .order('activity_date', { ascending: false })
          .limit(10);

        if (activitiesError) {
          throw new Error(activitiesError.message);
        }

        setSalesActivities(activities || []);

        // Fetch customer contacts
        const { data: contacts, error: contactsError } = await supabase
          .from('customer_contacts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (contactsError) {
          throw new Error(contactsError.message);
        }

        setCustomerContacts(contacts || []);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Sales Report Dashboard</h1>
      
      <div className="dashboard-section">
        <SalesChart />
      </div>
      
      <div className="dashboard-section">
        <h2>Recent Sales Activities</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Agent ID</th>
              <th>Customer Code</th>
              <th>Rating</th>
              <th>Line Added</th>
            </tr>
          </thead>
          <tbody>
            {salesActivities.map(activity => (
              <tr key={activity.id}>
                <td>{new Date(activity.activity_date).toLocaleDateString()}</td>
                <td>{activity.sales_agent_id}</td>
                <td>{activity.customer_code}</td>
                <td>{activity.shop_rating || 'N/A'}</td>
                <td>{activity.line_added ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="dashboard-section">
        <h2>Recent Customer Contacts</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Customer Code</th>
              <th>Position</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {customerContacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.contact_name}</td>
                <td>{contact.customer_code}</td>
                <td>{contact.position || 'N/A'}</td>
                <td>{contact.rating || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
