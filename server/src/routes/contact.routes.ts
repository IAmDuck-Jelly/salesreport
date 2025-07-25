import express from 'express';
import { createCustomerContact, updateCustomerContact } from '../controllers/contact.controller';
import { validateRequest } from '../middleware/validateRequest';
import { body, param } from 'express-validator';

const router = express.Router();

/**
 * @route   POST /api/contacts/create
 * @desc    Create a new customer contact record
 * @access  Private
 */
router.post(
  '/create',
  [
    body('customerCode')
      .notEmpty()
      .withMessage('Customer code is required')
      .isInt()
      .withMessage('Customer code must be an integer'),
    
    body('contactName')
      .notEmpty()
      .withMessage('Contact name is required')
      .isString()
      .withMessage('Contact name must be a string')
      .trim(),
    
    body('position')
      .optional()
      .isString()
      .withMessage('Position must be a string')
      .trim(),
    
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    
    body('phoneNumber')
      .optional()
      .isString()
      .withMessage('Phone number must be a string')
      .trim(),
    
    body('createdByAgentId')
      .notEmpty()
      .withMessage('Created by agent ID is required')
      .isInt()
      .withMessage('Created by agent ID must be an integer')
  ],
  validateRequest,
  createCustomerContact
);

/**
 * @route   PUT /api/contacts/update/:id
 * @desc    Update an existing customer contact record
 * @access  Private
 */
router.put(
  '/update/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('Contact ID is required')
      .isInt()
      .withMessage('Contact ID must be an integer'),
    
    body('customerCode')
      .optional()
      .isInt()
      .withMessage('Customer code must be an integer'),
    
    body('contactName')
      .optional()
      .isString()
      .withMessage('Contact name must be a string')
      .trim(),
    
    body('position')
      .optional()
      .isString()
      .withMessage('Position must be a string')
      .trim(),
    
    body('rating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    
    body('phoneNumber')
      .optional()
      .isString()
      .withMessage('Phone number must be a string')
      .trim(),
    
    body('updatedByAgentId')
      .notEmpty()
      .withMessage('Updated by agent ID is required')
      .isInt()
      .withMessage('Updated by agent ID must be an integer')
  ],
  validateRequest,
  updateCustomerContact
);

export default router;
