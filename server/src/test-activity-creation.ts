import { supabase } from './services/supabase';

async function testActivityCreation() {
  console.log('Testing activity creation with new Supabase configuration...');
  
  try {
    // First, let's check if we have any sales agents
    const { data: agents, error: agentsError } = await supabase
      .from('sales_agents')
      .select('id')
      .limit(1);
    
    if (agentsError) {
      console.error('Error fetching sales agents:', agentsError);
      return;
    }
    
    if (!agents || agents.length === 0) {
      console.log('No sales agents found. Creating a test agent...');
      const { data: newAgent, error: agentError } = await supabase
        .from('sales_agents')
        .insert([
          { 
            name: 'Test Agent for Activity', 
            employee_id: 'TEST_ACT_001' 
          }
        ])
        .select();
      
      if (agentError) {
        console.error('Error creating test agent:', agentError);
        return;
      }
      
      console.log('Test agent created:', newAgent);
    }
    
    // Check if we have any customers
    const { data: customers, error: customersError } = await supabase
      .from('customer')
      .select('code')
      .limit(1);
    
    if (customersError) {
      console.error('Error fetching customers:', customersError);
      return;
    }
    
    if (!customers || customers.length === 0) {
      console.log('No customers found. Creating a test customer...');
      const { data: newCustomer, error: customerError } = await supabase
        .from('customer')
        .insert([
          { 
            name: 'Test Customer for Activity',
            email: 'test@example.com',
            address: 'Test Address'
          }
        ])
        .select();
      
      if (customerError) {
        console.error('Error creating test customer:', customerError);
        return;
      }
      
      console.log('Test customer created:', newCustomer);
    }
    
    // Get a sales agent ID and customer code for testing
    const { data: testAgent, error: agentError } = await supabase
      .from('sales_agents')
      .select('id')
      .limit(1)
      .single();
    
    if (agentError || !testAgent) {
      console.error('Error getting test agent:', agentError);
      return;
    }
    
    const { data: testCustomer, error: customerError } = await supabase
      .from('customer')
      .select('code')
      .limit(1)
      .single();
    
    if (customerError || !testCustomer) {
      console.error('Error getting test customer:', customerError);
      return;
    }
    
    // Create a test activity
    console.log('Creating test sales activity...');
    const activityData = {
      sales_agent_id: testAgent.id,
      customer_code: testCustomer.code,
      shop_rating: 5,
      line_added: true,
      meeting_comment: 'Test activity created to verify Supabase configuration',
      latitude: 13.7563,
      longitude: 100.5018,
      created_by_agent_id: testAgent.id,
      updated_by_agent_id: testAgent.id
    };
    
    const { data: activity, error: activityError } = await supabase
      .from('sales_daily_activities')
      .insert([activityData])
      .select('id')
      .single();
    
    if (activityError) {
      console.error('❌ Error creating test activity:', activityError);
      return;
    }
    
    console.log('✅ Test activity created successfully!');
    console.log('Activity ID:', activity?.id);
    
    // Verify the activity was created
    const { data: verifyActivity, error: verifyError } = await supabase
      .from('sales_daily_activities')
      .select('*')
      .eq('id', activity?.id)
      .single();
    
    if (verifyError) {
      console.error('Error verifying activity:', verifyError);
      return;
    }
    
    console.log('✅ Activity verified in database:');
    console.log('Activity details:', {
      id: verifyActivity.id,
      sales_agent_id: verifyActivity.sales_agent_id,
      customer_code: verifyActivity.customer_code,
      shop_rating: verifyActivity.shop_rating,
      line_added: verifyActivity.line_added,
      meeting_comment: verifyActivity.meeting_comment,
      created_at: verifyActivity.created_at
    });
    
  } catch (error) {
    console.error('❌ Unexpected error during test:', error);
  }
}

// Run the test
testActivityCreation();
