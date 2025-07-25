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
exports.default = router;
//# sourceMappingURL=customer.routes.js.map