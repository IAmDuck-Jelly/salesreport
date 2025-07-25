"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';
// Validate Supabase credentials
if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Please check your .env file.');
    process.exit(1);
}
// Create Supabase client
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Test connection
const testConnection = async () => {
    try {
        const { data, error } = await exports.supabase.from('sales_agents').select('count()', { count: 'exact' });
        if (error) {
            throw error;
        }
        console.log('Successfully connected to Supabase database.');
        return true;
    }
    catch (error) {
        console.error('Failed to connect to Supabase database:', error);
        return false;
    }
};
exports.testConnection = testConnection;
//# sourceMappingURL=supabase.js.map