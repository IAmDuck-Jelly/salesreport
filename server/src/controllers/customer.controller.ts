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