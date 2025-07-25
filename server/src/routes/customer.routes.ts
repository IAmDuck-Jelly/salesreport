import express from 'express';
import { searchCustomers } from '../controllers/customer.controller';
import { validateRequest } from '../middleware/validateRequest';
import { query } from 'express-validator';

const router = express.Router();

/**
 * @route   GET /api/customers/search
 * @desc    Search customers by name (for autocomplete)
 * @access  Public
 */
router.get(
  '/search',
  [
    query('query')
      .notEmpty()
      .withMessage('Search query is required')
      .isString()
      .withMessage('Search query must be a string')
      .isLength({ min: 3 })
      .withMessage('Search query must be at least 3 characters')
      .trim(),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50')
      .toInt()
  ],
  validateRequest,
  searchCustomers
);

export default router;