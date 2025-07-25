import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase';
import { AppError } from '../middleware/errorHandler';

/**
 * Validate employee ID against the sales_agents table
 * @route   POST /api/auth/validate
 * @access  Public
 */
export const validateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.body;
    
    // Query the sales_agents table for the employee ID
    const { data, error } = await supabase
      .from('sales_agents')
      .select('id, name, employee_id')
      .eq('employee_id', employeeId)
      .single();
    
    // Handle database query error
    if (error) {
      console.error('Supabase error:', error);
      return next(new AppError('Database error during authentication', 500));
    }
    
    // If no agent found with the provided employee ID
    if (!data) {
      return next(new AppError('Invalid employee ID', 401));
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
  } catch (error) {
    console.error('Authentication error:', error);
    return next(new AppError('Server error during authentication', 500));
  }
};