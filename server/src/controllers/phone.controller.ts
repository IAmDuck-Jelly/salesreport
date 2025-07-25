import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase';
import { AppError } from '../middleware/errorHandler';

/**
 * Manage phone number (add if not exists)
 * @route   POST /api/phone/manage
 * @access  Private
 */
export const managePhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerCode, phoneNumber } = req.body;
    
    // Check if phone number already exists for this customer
    const { data: existingPhone, error: phoneCheckError } = await supabase
      .from('phone')
      .select('id')
      .eq('customer_code', customerCode)
      .eq('phone_number', phoneNumber)
      .single();
    
    if (phoneCheckError && phoneCheckError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Supabase error (phone check):', phoneCheckError);
      return next(new AppError('Database error during phone number check', 500));
    }
    
    // If phone already exists, return success with no changes
    if (existingPhone) {
      return res.status(200).json({
        success: true,
        message: 'Phone number already exists for this customer',
        phoneId: existingPhone.id,
        added: false
      });
    }
    
    // If phone doesn't exist, add it
    const { data: newPhone, error: phoneInsertError } = await supabase
      .from('phone')
      .insert([{
        customer_code: customerCode,
        phone_number: phoneNumber
      }])
      .select('id')
      .single();
    
    if (phoneInsertError) {
      console.error('Supabase error (phone insert):', phoneInsertError);
      return next(new AppError('Database error during phone number creation', 500));
    }
    
    // Return success response
    return res.status(201).json({
      success: true,
      message: 'Phone number added successfully',
      phoneId: newPhone?.id,
      added: true
    });
  } catch (error) {
    console.error('Phone management error:', error);
    return next(new AppError('Server error during phone number management', 500));
  }
};