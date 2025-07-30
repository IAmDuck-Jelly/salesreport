import { Request, Response, NextFunction } from 'express';
/**
 * Forward sales activity data to webhook
 * @route   POST /api/activities/webhook
 * @access  Private
 */
export declare const forwardToWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
/**
 * Create a new sales activity record (legacy - direct to Supabase)
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
