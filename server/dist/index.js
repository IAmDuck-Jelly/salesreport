"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const activity_routes_1 = __importDefault(require("./routes/activity.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const phone_routes_1 = __importDefault(require("./routes/phone.routes"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 3002; // Changed from 3001 to 3002
// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://192.168.1.37:5173',
    'http://sreport.uptowntrading.co.th',
    'https://sreport.uptowntrading.co.th',
    'https://salesteam-three.vercel.app',
    'https://salesreport.vercel.app'
];
// Middleware
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/customers', customer_routes_1.default);
app.use('/api/activities', activity_routes_1.default);
app.use('/api/contacts', contact_routes_1.default);
app.use('/api/phone', phone_routes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`CORS enabled for origins: ${allowedOrigins.join(', ')}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map