"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("../controllers/contact.controller");
const validateRequest_1 = require("../middleware/validateRequest");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
/**
 * @route   POST /api/contacts/create
 * @desc    Create a new customer contact record
 * @access  Private
 */
router.post('/create', [
    (0, express_validator_1.body)('customerCode')
        .notEmpty()
        .withMessage('Customer code is required')
        .isInt()
        .withMessage('Customer code must be an integer'),
    (0, express_validator_1.body)('contactName')
        .notEmpty()
        .withMessage('Contact name is required')
        .isString()
        .withMessage('Contact name must be a string')
        .trim(),
    (0, express_validator_1.body)('position')
        .optional()
        .isString()
        .withMessage('Position must be a string')
        .trim(),
    (0, express_validator_1.body)('rating')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
    (0, express_validator_1.body)('phoneNumber')
        .optional()
        .isString()
        .withMessage('Phone number must be a string')
        .trim(),
    (0, express_validator_1.body)('createdByAgentId')
        .notEmpty()
        .withMessage('Created by agent ID is required')
        .isInt()
        .withMessage('Created by agent ID must be an integer')
], validateRequest_1.validateRequest, contact_controller_1.createCustomerContact);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map