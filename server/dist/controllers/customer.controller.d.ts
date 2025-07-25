import { Request, Response, NextFunction } from 'express';
/**
 * Search customers by name for autocomplete
 * @route   GET /api/customers/search
 * @access  Public
 */
export declare const searchCustomers: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
