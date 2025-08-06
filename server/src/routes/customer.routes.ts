import express from 'express';
import { searchCustomers, createCustomer } from '../controllers/customer.controller';
import { validateRequest } from '../middleware/validateRequest';
import { query, body } from 'express-validator';

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

/**
 * @route   POST /api/customers/create
 * @desc    Create a new customer
 * @access  Private
 */
router.post(
  '/create',
  [
    body('name')
      .notEmpty()
      .withMessage('Customer name is required')
      .isString()
      .withMessage('Customer name must be a string')
      .trim(),
    body('email')
      .optional()
      .isEmail()
      .withMessage('Email must be a valid email address')
      .trim(),
    body('address')
      .optional()
      .isString()
      .withMessage('Address must be a string')
      .trim()
  ],
  validateRequest,
  createCustomer
);

export default router;