import { Request, Response, NextFunction } from 'express';
/**
 * Create a new sales activity record
 * @route   POST /api/activities/create
 * @access  Private
 */
export declare const createSalesActivity: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Update an existing sales activity record
 * @route   PUT /api/activities/update/:id
 * @access  Private
 */
export declare const updateSalesActivity: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
