# Sales Report App - Frontend

A React-based frontend application for sales agents to log their shop visits, record customer contacts, and track sales activities through a chat-based interface.

## Features

- **Chat-based Data Entry**: Intuitive conversational interface for sales agents to log their activities
- **Location Tracking**: Automatic capture of GPS coordinates for each visit
- **Shop Autocomplete**: Smart search functionality for quickly finding customer locations
- **Customer Contact Management**: Record and manage contacts at each location
- **Phone Number Handling**: Automatic management of phone numbers in the database
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack

- React 18 with TypeScript
- Vite build tool
- React Router for navigation
- Context API for state management
- Supabase JavaScript client for database operations
- React Hook Form for form management
- Axios for HTTP requests

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Supabase account with a configured database

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sales-report-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=http://localhost:3002/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
VITE_DEVELOPMENT_MODE=true
```

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── chat/          # Chat interface components
│   ├── form/          # Form components
│   └── common/        # Common UI components
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── services/          # API service functions
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## API Integration

This frontend communicates with the backend API for:
- User authentication
- Customer data retrieval
- Sales activity creation and updates
- Contact management
- Phone number handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License. 