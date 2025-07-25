import express from 'express';
import { managePhoneNumber } from '../controllers/phone.controller';
import { validateRequest } from '../middleware/validateRequest';
import { body } from 'express-validator';

const router = express.Router();

/**
 * @route   POST /api/phone/manage
 * @desc    Manage phone number (add if not exists)
 * @access  Private
 */
router.post(
  '/manage',
  [
    body('customerCode')
      .notEmpty()
      .withMessage('Customer code is required')
      .isInt()
      .withMessage('Customer code must be an integer'),
    
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .isString()
      .withMessage('Phone number must be a string')
      .trim()
  ],
  validateRequest,
  managePhoneNumber
);

export default router;