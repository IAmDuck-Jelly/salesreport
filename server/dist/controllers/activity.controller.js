"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalesActivity = exports.createSalesActivity = void 0;
const supabase_1 = require("../services/supabase");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Create a new sales activity record
 * @route   POST /api/activities/create
 * @access  Private
 */
const createSalesActivity = async (req, res, next) => {
    try {
        const { salesAgentId, customerCode, shopRating, lineAdded, meetingComment, latitude, longitude, createdByAgentId } = req.body;
        // Prepare data for insertion
        const activityData = {
            sales_agent_id: salesAgentId,
            customer_code: customerCode,
            shop_rating: shopRating,
            line_added: lineAdded,
            meeting_comment: meetingComment,
            latitude: latitude,
            longitude: longitude,
            created_by_agent_id: createdByAgentId,
            updated_by_agent_id: createdByAgentId // Initially same as created_by
        };
        // Insert data into sales_daily_activities table
        const { data, error } = await supabase_1.supabase
            .from('sales_daily_activities')
            .insert([activityData])
            .select('id')
            .single();
        // Handle database error
        if (error) {
            console.error('Supabase error:', error);
            return next(new errorHandler_1.AppError('Database error during activity creation', 500));
        }
        // Return success response with the new activity ID
        return res.status(201).json({
            success: true,
            message: 'Sales activity created successfully',
            activityId: data?.id
        });
    }
    catch (error) {
        console.error('Activity creation error:', error);
        return next(new errorHandler_1.AppError('Server error during activity creation', 500));
    }
};
exports.createSalesActivity = createSalesActivity;
/**
 * Update an existing sales activity record
 * @route   PUT /api/activities/update/:id
 * @access  Private
 */
const updateSalesActivity = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { salesAgentId, customerCode, shopRating, lineAdded, meetingComment, latitude, longitude, updatedByAgentId } = req.body;
        // Prepare data for update
        const activityData = {
            sales_agent_id: salesAgentId,
            customer_code: customerCode,
            shop_rating: shopRating,
            line_added: lineAdded,
            meeting_comment: meetingComment,
            latitude: latitude,
            longitude: longitude,
            updated_by_agent_id: updatedByAgentId,
            updated_at: new Date().toISOString() // Update the timestamp
        };
        // Remove undefined fields
        Object.keys(activityData).forEach(key => {
            if (activityData[key] === undefined) {
                delete activityData[key];
            }
        });
        // Update data in sales_daily_activities table
        const { data, error } = await supabase_1.supabase
            .from('sales_daily_activities')
            .update(activityData)
            .eq('id', id)
            .select('id')
            .single();
        // Handle database error
        if (error) {
            console.error('Supabase error:', error);
            return next(new errorHandler_1.AppError('Database error during activity update', 500));
        }
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Sales activity updated successfully',
            activityId: data?.id
        });
    }
    catch (error) {
        console.error('Activity update error:', error);
        return next(new errorHandler_1.AppError('Server error during activity update', 500));
    }
};
exports.updateSalesActivity = updateSalesActivity;
//# sourceMappingURL=activity.controller.js.map