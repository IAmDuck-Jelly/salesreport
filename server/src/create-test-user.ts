import { supabase } from './services/supabase';

async function createTestUser() {
  try {
    // Insert a test user
    const { data, error } = await supabase
      .from('sales_agents')
      .insert([
        { 
          name: 'Test User', 
          employee_id: 'EMP001' 
        }
      ])
      .select();

    if (error) {
      console.error('Error creating test user:', error);
      return;
    }

    console.log('Test user created successfully:', data);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
createTestUser();
