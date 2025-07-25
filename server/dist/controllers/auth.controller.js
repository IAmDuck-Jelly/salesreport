"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const supabase_1 = require("../services/supabase");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Validate employee ID against the sales_agents table
 * @route   POST /api/auth/validate
 * @access  Public
 */
const validateEmployee = async (req, res, next) => {
    try {
        const { employeeId } = req.body;
        // Query the sales_agents table for the employee ID
        const { data, error } = await supabase_1.supabase
            .from('sales_agents')
            .select('id, name, employee_id')
            .eq('employee_id', employeeId)
            .single();
        // Handle database query error
        if (error) {
            console.error('Supabase error:', error);
            return next(new errorHandler_1.AppError('Database error during authentication', 500));
        }
        // If no agent found with the provided employee ID
        if (!data) {
            return next(new errorHandler_1.AppError('Invalid employee ID', 401));
        }
        // Return the agent data
        return res.status(200).json({
            success: true,
            agent: {
                id: data.id,
                name: data.name,
                employeeId: data.employee_id
            }
        });
    }
    catch (error) {
        console.error('Authentication error:', error);
        return next(new errorHandler_1.AppError('Server error during authentication', 500));
    }
};
exports.validateEmployee = validateEmployee;
//# sourceMappingURL=auth.controller.js.map