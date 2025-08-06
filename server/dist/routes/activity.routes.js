"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activity_controller_1 = require("../controllers/activity.controller");
const validateRequest_1 = require("../middleware/validateRequest");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
/**
 * @route   POST /api/activities/create
 * @desc    Create a new sales activity record
 * @access  Private
 */
router.post('/create', [
    (0, express_validator_1.body)('salesAgentId')
        .notEmpty()
        .withMessage('Sales agent ID is required')
        .isInt()
        .withMessage('Sales agent ID must be an integer'),
    (0, express_validator_1.body)('customerCode')
        .notEmpty()
        .withMessage('Customer code is required')
        .isInt()
        .withMessage('Customer code must be an integer'),
    (0, express_validator_1.body)('shopRating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Shop rating must be between 1 and 5'),
    (0, express_validator_1.body)('lineAdded')
        .notEmpty()
        .withMessage('Line added status is required')
        .isBoolean()
        .withMessage('Line added must be a boolean'),
    (0, express_validator_1.body)('meetingComment')
        .optional()
        .isString()
        .withMessage('Meeting comment must be a string'),
    (0, express_validator_1.body)('latitude')
        .optional()
        .isNumeric()
        .withMessage('Latitude must be a number'),
    (0, express_validator_1.body)('longitude')
        .optional()
        .isNumeric()
        .withMessage('Longitude must be a number'),
    (0, express_validator_1.body)('createdByAgentId')
        .notEmpty()
        .withMessage('Created by agent ID is required')
        .isInt()
        .withMessage('Created by agent ID must be an integer')
], validateRequest_1.validateRequest, activity_controller_1.createSalesActivity);
/**
 * @route   PUT /api/activities/update/:id
 * @desc    Update an existing sales activity record
 * @access  Private
 */
router.put('/update/:id', [
    (0, express_validator_1.param)('id')
        .notEmpty()
        .withMessage('Activity ID is required')
        .isInt()
        .withMessage('Activity ID must be an integer'),
    (0, express_validator_1.body)('salesAgentId')
        .optional()
        .isInt()
        .withMessage('Sales agent ID must be an integer'),
    (0, express_validator_1.body)('customerCode')
        .optional()
        .isInt()
        .withMessage('Customer code must be an integer'),
    (0, express_validator_1.body)('shopRating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Shop rating must be between 1 and 5'),
    (0, express_validator_1.body)('lineAdded')
        .optional()
        .isBoolean()
        .withMessage('Line added must be a boolean'),
    (0, express_validator_1.body)('meetingComment')
        .optional()
        .isString()
        .withMessage('Meeting comment must be a string'),
    (0, express_validator_1.body)('latitude')
        .optional()
        .isNumeric()
        .withMessage('Latitude must be a number'),
    (0, express_validator_1.body)('longitude')
        .optional()
        .isNumeric()
        .withMessage('Longitude must be a number'),
    (0, express_validator_1.body)('updatedByAgentId')
        .notEmpty()
        .withMessage('Updated by agent ID is required')
        .isInt()
        .withMessage('Updated by agent ID must be an integer')
], validateRequest_1.validateRequest, activity_controller_1.updateSalesActivity);
exports.default = router;
//# sourceMappingURL=activity.routes.js.map