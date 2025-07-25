import { Request, Response, NextFunction } from 'express';
/**
 * Create a new customer contact record
 * @route   POST /api/contacts/create
 * @access  Private
 */
export declare const createCustomerContact: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Update an existing customer contact record
 * @route   PUT /api/contacts/update/:id
 * @access  Private
 */
export declare const updateCustomerContact: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
