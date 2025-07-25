"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_1 = require("./services/supabase");
async function createTestUser() {
    try {
        // Insert a test user
        const { data, error } = await supabase_1.supabase
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
    }
    catch (error) {
        console.error('Unexpected error:', error);
    }
}
// Run the function
createTestUser();
//# sourceMappingURL=create-test-user.js.map