"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use(errorHandler_1.errorHandler);
const port = 3001;
app.listen(port, () => {
    console.log(`Auth test server running on port ${port}`);
    console.log('Test the authentication endpoint with a POST request to http://localhost:3001/api/auth/validate');
    console.log('Include a JSON body with { "employeeId": "some_employee_id" }');
});
//# sourceMappingURL=test-auth.js.map