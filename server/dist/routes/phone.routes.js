"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phone_controller_1 = require("../controllers/phone.controller");
const validateRequest_1 = require("../middleware/validateRequest");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
/**
 * @route   POST /api/phone/manage
 * @desc    Manage phone number (add if not exists)
 * @access  Private
 */
router.post('/manage', [
    (0, express_validator_1.body)('customerCode')
        .notEmpty()
        .withMessage('Customer code is required')
        .isInt()
        .withMessage('Customer code must be an integer'),
    (0, express_validator_1.body)('phoneNumber')
        .notEmpty()
        .withMessage('Phone number is required')
        .isString()
        .withMessage('Phone number must be a string')
        .trim()
], validateRequest_1.validateRequest, phone_controller_1.managePhoneNumber);
exports.default = router;
//# sourceMappingURL=phone.routes.js.map