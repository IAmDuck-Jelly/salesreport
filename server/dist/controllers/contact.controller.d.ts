import { Request, Response, NextFunction } from 'express';
/**
 * Create a new customer contact record
 * @route   POST /api/contacts/create
 * @access  Private
 */
export declare const createCustomerContact: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
