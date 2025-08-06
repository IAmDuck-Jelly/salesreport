"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const validateRequest_1 = require("../middleware/validateRequest");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
/**
 * @route   GET /api/customers/search
 * @desc    Search customers by name (for autocomplete)
 * @access  Public
 */
router.get('/search', [
    (0, express_validator_1.query)('query')
        .notEmpty()
        .withMessage('Search query is required')
        .isString()
        .withMessage('Search query must be a string')
        .isLength({ min: 3 })
        .withMessage('Search query must be at least 3 characters')
        .trim(),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be between 1 and 50')
        .toInt()
], validateRequest_1.validateRequest, customer_controller_1.searchCustomers);
/**
 * @route   POST /api/customers/create
 * @desc    Create a new customer
 * @access  Private
 */
router.post('/create', [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Customer name is required')
        .isString()
        .withMessage('Customer name must be a string')
        .trim(),
    (0, express_validator_1.body)('email')
        .optional()
        .isEmail()
        .withMessage('Email must be a valid email address')
        .trim(),
    (0, express_validator_1.body)('address')
        .optional()
        .isString()
        .withMessage('Address must be a string')
        .trim()
], validateRequest_1.validateRequest, customer_controller_1.createCustomer);
exports.default = router;
//# sourceMappingURL=customer.routes.js.map