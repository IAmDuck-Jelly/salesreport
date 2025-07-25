import express from 'express';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(errorHandler);

const port = 3001;

app.listen(port, () => {
  console.log(`Auth test server running on port ${port}`);
  console.log('Test the authentication endpoint with a POST request to http://localhost:3001/api/auth/validate');
  console.log('Include a JSON body with { "employeeId": "some_employee_id" }');
});