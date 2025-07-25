import { Request, Response, NextFunction } from 'express';
/**
 * Validate employee ID against the sales_agents table
 * @route   POST /api/auth/validate
 * @access  Public
 */
export declare const validateEmployee: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
