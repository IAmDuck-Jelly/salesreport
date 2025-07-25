import { Request, Response, NextFunction } from 'express';
/**
 * Manage phone number (add if not exists)
 * @route   POST /api/phone/manage
 * @access  Private
 */
export declare const managePhoneNumber: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
