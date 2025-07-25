"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const validateRequest_1 = require("../middleware/validateRequest");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
/**
 * @route   POST /api/auth/validate
 * @desc    Validate employee ID
 * @access  Public
 */
router.post('/validate', [
    (0, express_validator_1.body)('employeeId')
        .notEmpty()
        .withMessage('Employee ID is required')
        .isString()
        .withMessage('Employee ID must be a string')
        .trim()
], validateRequest_1.validateRequest, auth_controller_1.validateEmployee);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map