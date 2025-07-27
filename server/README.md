# Sales Report App - Backend

A Node.js/Express backend server for the Sales Report App, providing API endpoints for sales agents to log their shop visits, record customer contacts, and track sales activities.

## Features

- **RESTful API**: Complete REST API for sales activities and customer management
- **Authentication**: Employee ID validation and session management
- **Data Validation**: Comprehensive input validation using express-validator
- **Database Integration**: Supabase integration for data persistence
- **Error Handling**: Robust error handling and logging
- **Security**: Helmet.js for security headers and CORS configuration

## Technology Stack

- Node.js with Express
- TypeScript
- Supabase for database operations
- Express-validator for input validation
- CORS for cross-origin resource sharing
- Morgan for HTTP request logging
- Helmet for security headers
- Winston for logging

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Supabase account with a configured database

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sales-report-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3002
NODE_ENV=development
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-service-key
CORS_ORIGIN=http://localhost:5173
```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will be available at `http://localhost:3002`

## Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## API Endpoints

### Authentication
- `POST /api/auth/validate` - Validate sales agent employee ID

### Customers
- `GET /api/customers/search` - Search customers by name

### Sales Activities
- `POST /api/activities/create` - Create new sales activity
- `PUT /api/activities/update/:id` - Update existing sales activity

### Customer Contacts
- `POST /api/contacts/create` - Create new customer contact
- `PUT /api/contacts/update/:id` - Update existing customer contact

### Phone Numbers
- `POST /api/phone/manage` - Manage phone numbers for contacts

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
src/
├── controllers/        # Route controllers
│   ├── auth.controller.ts
│   ├── customer.controller.ts
│   ├── activity.controller.ts
│   ├── contact.controller.ts
│   └── phone.controller.ts
├── middleware/         # Express middleware
│   ├── errorHandler.ts
│   └── validateRequest.ts
├── routes/            # API routes
│   ├── auth.routes.ts
│   ├── customer.routes.ts
│   ├── activity.routes.ts
│   ├── contact.routes.ts
│   └── phone.routes.ts
├── services/          # Business logic
│   └── supabase.ts
├── utils/             # Utility functions
└── index.ts           # Main application file
```

## Database Schema

The application uses a PostgreSQL database hosted on Supabase with the following key tables:

- `sales_agents` - Information about sales agents
- `customer` - Customer/shop information
- `sales_daily_activities` - Daily sales activities
- `customer_contacts` - Contacts at customer locations
- `phone` - Phone numbers for contacts

## Error Handling

The application includes comprehensive error handling:
- Input validation errors
- Database connection errors
- Authentication errors
- General server errors

## Security

- CORS configuration for cross-origin requests
- Helmet.js for security headers
- Input validation and sanitization
- Environment variable protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License. 