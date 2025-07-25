import express from 'express';
import { validateEmployee } from '../controllers/auth.controller';
import { validateRequest } from '../middleware/validateRequest';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @route   POST /api/auth/validate
 * @desc    Validate employee ID
 * @access  Public
 */
router.post(
  '/validate',
  [
    body('employeeId')
      .notEmpty()
      .withMessage('Employee ID is required')
      .isString()
      .withMessage('Employee ID must be a string')
      .trim()
  ],
  validateRequest,
  validateEmployee
);

export default router;