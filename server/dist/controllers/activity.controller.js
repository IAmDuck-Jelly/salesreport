"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSalesActivity = exports.createSalesActivity = exports.forwardToWebhook = void 0;
const axios_1 = __importDefault(require("axios"));
const supabase_1 = require("../services/supabase");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Forward sales activity data to webhook
 * @route   POST /api/activities/webhook
 * @access  Private
 */
const forwardToWebhook = async (req, res, next) => {
    try {
        const activityData = req.body;
        console.log('Forwarding data to webhook:', activityData);
        // Forward data to the webhook
        const webhookResponse = await axios_1.default.post('https://n8n.masheduplab.com/webhook-test/9d9c745e-559a-472d-8369-0838bd201a3f', activityData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Webhook response:', webhookResponse.data);
        // Return success response
        return res.status(200).json({
            success: true,
            message: 'Data forwarded to webhook successfully',
            webhookResponse: webhookResponse.data
        });
    }
    catch (error) {
        console.error('Webhook forwarding error:', error);
        if (axios_1.default.isAxiosError(error)) {
            const axiosError = error;
            return next(new errorHandler_1.AppError(`Webhook error: ${axiosError.message}`, axiosError.response?.status || 500));
        }
        return next(new errorHandler_1.AppError('Server error during webhook forwarding', 500));
    }
};
exports.forwardToWebhook = forwardToWebhook;
/**
 * Create a new sales activity record (legacy - direct to Supabase)
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