import express from 'express';
import { createSalesActivity, updateSalesActivity } from '../controllers/activity.controller';
import { validateRequest } from '../middleware/validateRequest';
import { body, param } from 'express-validator';

const router = express.Router();

/**
 * @route   POST /api/activities/create
 * @desc    Create a new sales activity record
 * @access  Private
 */
router.post(
  '/create',
  [
    body('salesAgentId')
      .notEmpty()
      .withMessage('Sales agent ID is required')
      .isInt()
      .withMessage('Sales agent ID must be an integer'),
    
    body('customerCode')
      .notEmpty()
      .withMessage('Customer code is required')
      .isInt()
      .withMessage('Customer code must be an integer'),
    
    body('shopRating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Shop rating must be between 1 and 5'),
    
    body('lineAdded')
      .notEmpty()
      .withMessage('Line added status is required')
      .isBoolean()
      .withMessage('Line added must be a boolean'),
    
    body('meetingComment')
      .optional()
      .isString()
      .withMessage('Meeting comment must be a string'),
    
    body('latitude')
      .optional()
      .isNumeric()
      .withMessage('Latitude must be a number'),
    
    body('longitude')
      .optional()
      .isNumeric()
      .withMessage('Longitude must be a number'),
    
    body('createdByAgentId')
      .notEmpty()
      .withMessage('Created by agent ID is required')
      .isInt()
      .withMessage('Created by agent ID must be an integer')
  ],
  validateRequest,
  createSalesActivity
);

/**
 * @route   PUT /api/activities/update/:id
 * @desc    Update an existing sales activity record
 * @access  Private
 */
router.put(
  '/update/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('Activity ID is required')
      .isInt()
      .withMessage('Activity ID must be an integer'),
    
    body('salesAgentId')
      .optional()
      .isInt()
      .withMessage('Sales agent ID must be an integer'),
    
    body('customerCode')
      .optional()
      .isInt()
      .withMessage('Customer code must be an integer'),
    
    body('shopRating')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Shop rating must be between 1 and 5'),
    
    body('lineAdded')
      .optional()
      .isBoolean()
      .withMessage('Line added must be a boolean'),
    
    body('meetingComment')
      .optional()
      .isString()
      .withMessage('Meeting comment must be a string'),
    
    body('latitude')
      .optional()
      .isNumeric()
      .withMessage('Latitude must be a number'),
    
    body('longitude')
      .optional()
      .isNumeric()
      .withMessage('Longitude must be a number'),
    
    body('updatedByAgentId')
      .notEmpty()
      .withMessage('Updated by agent ID is required')
      .isInt()
      .withMessage('Updated by agent ID must be an integer')
  ],
  validateRequest,
  updateSalesActivity
);

export default router;
