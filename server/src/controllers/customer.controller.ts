import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase';
import { AppError } from '../middleware/errorHandler';

/**
 * Search customers by name for autocomplete
 * @route   GET /api/customers/search
 * @access  Public
 */
export const searchCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.query as string;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Query the customer table for matching names
    const { data, error } = await supabase
      .from('customer')
      .select('code, name')
      .ilike('name', `%${query}%`)
      .order('name', { ascending: true })
      .limit(limit);
    
    // Handle database query error
    if (error) {
      console.error('Supabase error:', error);
      return next(new AppError('Database error during customer search', 500));
    }
    
    // Return the matching customers
    return res.status(200).json({
      success: true,
      customers: data || []
    });
  } catch (error) {
    console.error('Customer search error:', error);
    return next(new AppError('Server error during customer search', 500));
  }
};

/**
 * Create a new customer
 * @route   POST /api/customers/create
 * @access  Private
 */
export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, address } = req.body;
    
    // Check if customer with this name already exists
    const { data: existingCustomer, error: checkError } = await supabase
      .from('customer')
      .select('code, name')
      .eq('name', name)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Supabase error checking existing customer:', checkError);
      return next(new AppError('Database error checking existing customer', 500));
    }
    
    // If customer already exists, return the existing customer
    if (existingCustomer) {
      return res.status(200).json({
        success: true,
        message: 'Customer already exists',
        customer: existingCustomer
      });
    }
    
    // Create new customer with default email if not provided
    const customerData = {
      name: name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`, // Default email
      address: address || null
    };
    
    const { data: newCustomer, error: createError } = await supabase
      .from('customer')
      .insert([customerData])
      .select('code, name')
      .single();
    
    // Handle database error
    if (createError) {
      console.error('Supabase error creating customer:', createError);
      return next(new AppError('Database error during customer creation', 500));
    }
    
    // Return success response with the new customer
    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      customer: newCustomer
    });
  } catch (error) {
    console.error('Customer creation error:', error);
    return next(new AppError('Server error during customer creation', 500));
  }
};