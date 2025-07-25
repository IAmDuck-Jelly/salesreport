"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerContact = void 0;
const supabase_1 = require("../services/supabase");
const errorHandler_1 = require("../middleware/errorHandler");
/**
 * Create a new customer contact record
 * @route   POST /api/contacts/create
 * @access  Private
 */
const createCustomerContact = async (req, res, next) => {
    try {
        const { customerCode, contactName, position, rating, phoneNumber, createdByAgentId } = req.body;
        // Prepare data for insertion
        const contactData = {
            customer_code: customerCode,
            contact_name: contactName,
            position,
            rating,
            phone_number: phoneNumber,
            created_by_agent_id: createdByAgentId,
            updated_by_agent_id: createdByAgentId // Initially same as created_by
        };
        // Start a transaction to handle both contact creation and phone number logic
        const { data: contact, error: contactError } = await supabase_1.supabase
            .from('customer_contacts')
            .insert([contactData])
            .select('id')
            .single();
        // Handle database error
        if (contactError) {
            console.error('Supabase error (contact creation):', contactError);
            return next(new errorHandler_1.AppError('Database error during contact creation', 500));
        }
        // Handle phone number logic if provided
        let phoneAdded = false;
        if (phoneNumber) {
            // Check if phone number already exists for this customer
            const { data: existingPhone, error: phoneCheckError } = await supabase_1.supabase
                .from('phone')
                .select('id')
                .eq('customer_code', customerCode)
                .eq('phone_number', phoneNumber)
                .single();
            if (phoneCheckError && phoneCheckError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
                console.error('Supabase error (phone check):', phoneCheckError);
                // Continue despite error in phone check
            }
            // If phone doesn't exist, add it
            if (!existingPhone) {
                const { error: phoneInsertError } = await supabase_1.supabase
                    .from('phone')
                    .insert([{
                        customer_code: customerCode,
                        phone_number: phoneNumber
                    }]);
                if (phoneInsertError) {
                    console.error('Supabase error (phone insert):', phoneInsertError);
                    // Continue despite error in phone insert
                }
                else {
                    phoneAdded = true;
                }
            }
        }
        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Customer contact created successfully',
            contactId: contact?.id,
            phoneAdded
        });
    }
    catch (error) {
        console.error('Contact creation error:', error);
        return next(new errorHandler_1.AppError('Server error during contact creation', 500));
    }
};
exports.createCustomerContact = createCustomerContact;
//# sourceMappingURL=contact.controller.js.map