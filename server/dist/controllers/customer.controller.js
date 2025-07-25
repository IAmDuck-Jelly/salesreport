"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCustomers = void 0;
const supabase_1 = require("../services/supabase");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Search customers by name for autocomplete
 * @route   GET /api/customers/search
 * @access  Public
 */
const searchCustomers = async (req, res, next) => {
    try {
        const query = req.query.query;
        const limit = parseInt(req.query.limit) || 10;
        // Query the customer table for matching names
        const { data, error } = await supabase_1.supabase
            .from('customer')
            .select('code, name')
            .ilike('name', `%${query}%`)
            .order('name', { ascending: true })
            .limit(limit);
        // Handle database query error
        if (error) {
            console.error('Supabase error:', error);
            return next(new errorHandler_1.AppError('Database error during customer search', 500));
        }
        // Return the matching customers
        return res.status(200).json({
            success: true,
            customers: data || []
        });
    }
    catch (error) {
        console.error('Customer search error:', error);
        return next(new errorHandler_1.AppError('Server error during customer search', 500));
    }
};
exports.searchCustomers = searchCustomers;
//# sourceMappingURL=customer.controller.js.map