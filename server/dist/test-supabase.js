"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("./services/supabase");
async function testSupabaseConnection() {
    console.log('Testing Supabase connection...');
    try {
        // Test basic connection with a simple query
        console.log('Testing query to sales_agents table...');
        const { data, error } = await supabase_1.supabase
            .from('sales_agents')
            .select('id')
            .limit(1);
        if (error) {
            console.error('❌ Error querying sales_agents table:', error);
            return;
        }
        console.log('✅ Supabase connection successful!');
        console.log('✅ Query successful! Found', data?.length || 0, 'sales agents');
    }
    catch (error) {
        console.error('❌ Error during Supabase test:', error);
    }
}
// Run the test
testSupabaseConnection();
//# sourceMappingURL=test-supabase.js.map