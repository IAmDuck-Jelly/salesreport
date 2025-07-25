# Sales Report Application

A web application for sales agents to log their shop visits, record customer contacts, and track sales activities through a chat-based interface.

## Features

- **Chat-based Data Entry**: Intuitive conversational interface for sales agents to log their activities
- **Location Tracking**: Automatic capture of GPS coordinates for each visit
- **Shop Autocomplete**: Smart search functionality for quickly finding customer locations
- **Customer Contact Management**: Record and manage contacts at each location
- **Phone Number Handling**: Automatic management of phone numbers in the database
- **Audit Trail**: Complete tracking of who created and updated each record
- **Data Visualization**: Dashboard with charts and reports for sales activities
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack

### Frontend
- React with TypeScript
- Vite build tool
- React Router for navigation
- Context API for state management
- Supabase JavaScript client for database operations

### Backend
- Node.js with Express
- TypeScript
- Supabase for database operations
- Express-validator for input validation
- CORS for cross-origin resource sharing
- Morgan for HTTP request logging
- Helmet for security headers

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Supabase account with a configured database

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sales-report-app
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

## Configuration

### Environment Variables

Create `.env` files in both `client` and `server` directories with the following variables:

**client/.env:**
```
VITE_API_URL=http://localhost:3002/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**server/.env:**
```
PORT=3002
NODE_ENV=development
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-service-key
CORS_ORIGIN=http://localhost:5173
```

## Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

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

## Database Schema

The application uses a PostgreSQL database hosted on Supabase with the following key tables:

- `sales_agents` - Information about sales agents
- `customer` - Customer/shop information
- `sales_daily_activities` - Daily sales activities
- `customer_contacts` - Contacts at customer locations
- `phone` - Phone numbers for contacts

For detailed schema information, see `example/schema.txt`.

## Testing

To test the application functionality:

1. Ensure both frontend and backend servers are running
2. Navigate to `http://localhost:5173` in your browser
3. Use employee ID "EMP001" to log in (if you've created this agent in your database)
4. Complete the chat-based form to create sales activities and customer contacts

## Deployment

For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Project Structure

```
sales-report-app/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service functions
│   │   └── types/              # TypeScript type definitions
│   └── ...
│
├── server/                     # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Express middleware
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   └── utils/              # Utility functions
│   └── ...
│
├── example/
│   └── schema.txt              # Database schema
│
├── README.md                   # This file
└── DEPLOYMENT.md               # Deployment guide
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on the GitHub repository or contact the development team.
