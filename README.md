# Sales Report Application

A comprehensive sales reporting system consisting of a React frontend and Node.js backend for sales agents to log their shop visits, record customer contacts, and track sales activities through a chat-based interface.

## 🏗️ Project Structure

This project is organized as a monorepo with separate repositories for frontend and backend:

- **📱 Frontend**: [sales-report-client](https://github.com/IAmDuck-Jelly/sales-report-client) - React/TypeScript application
- **🖥️ Backend**: [sales-report-server](https://github.com/IAmDuck-Jelly/sales-report-server) - Node.js/Express API server

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Supabase account with a configured database
- GitHub CLI (optional, for automated repository creation)

### Option 1: Automated Setup (Recommended)

1. **Create GitHub repositories**:
   ```bash
   ./create-github-repos.sh
   ```

2. **Clone the repositories**:
   ```bash
   git clone https://github.com/IAmDuck-Jelly/sales-report-client.git
   git clone https://github.com/IAmDuck-Jelly/sales-report-server.git
   ```

3. **Set up the backend**:
   ```bash
   cd sales-report-server
   npm install
   cp .env.example .env
   # Edit .env with your Supabase credentials
   npm run dev
   ```

4. **Set up the frontend**:
   ```bash
   cd ../sales-report-client
   npm install
   cp .env.example .env
   # Edit .env with your Supabase credentials
   npm run dev
   ```

### Option 2: Manual Setup

1. **Create repositories manually** on GitHub.com:
   - `sales-report-client` (public)
   - `sales-report-server` (public)

2. **Push the code** to each repository:
   ```bash
   # For client
   cd client
   git remote add origin https://github.com/IAmDuck-Jelly/sales-report-client.git
   git push -u origin main

   # For server
   cd ../server
   git remote add origin https://github.com/IAmDuck-Jelly/sales-report-server.git
   git push -u origin main
   ```

## 🔧 Configuration

### Backend Environment Variables

Create `server/.env`:
```env
PORT=3002
NODE_ENV=development
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-service-key
CORS_ORIGIN=http://localhost:5173
```

### Frontend Environment Variables

Create `client/.env`:
```env
VITE_API_URL=http://localhost:3002/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
VITE_DEVELOPMENT_MODE=true
```

## 🎯 Features

### Frontend Features
- **Chat-based Data Entry**: Intuitive conversational interface
- **Location Tracking**: Automatic GPS coordinate capture
- **Shop Autocomplete**: Smart search functionality
- **Customer Contact Management**: Record and manage contacts
- **Phone Number Handling**: Automatic phone number management
- **Responsive Design**: Works on desktop and mobile

### Backend Features
- **RESTful API**: Complete API for sales activities
- **Authentication**: Employee ID validation
- **Data Validation**: Comprehensive input validation
- **Database Integration**: Supabase integration
- **Error Handling**: Robust error handling and logging
- **Security**: Helmet.js and CORS configuration

## 📚 Documentation

- **Frontend Documentation**: See [client/README.md](client/README.md)
- **Backend Documentation**: See [server/README.md](server/README.md)
- **Database Schema**: See [database-schema.md](database-schema.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

## 🧪 Testing

1. **Start both servers**:
   ```bash
   # Terminal 1 - Backend
   cd sales-report-server
   npm run dev

   # Terminal 2 - Frontend
   cd sales-report-client
   npm run dev
   ```

2. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3002/api
   - Health Check: http://localhost:3002/api/health

3. **Test with employee ID**: `EMP001`

## 🗄️ Database Schema

The application uses Supabase (PostgreSQL) with these key tables:
- `sales_agents` - Sales agent information
- `customer` - Customer/shop information
- `sales_daily_activities` - Daily sales activities
- `customer_contacts` - Contacts at customer locations
- `phone` - Phone numbers for contacts

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/validate` - Validate employee ID

### Customers
- `GET /api/customers/search` - Search customers

### Sales Activities
- `POST /api/activities/create` - Create activity
- `PUT /api/activities/update/:id` - Update activity

### Customer Contacts
- `POST /api/contacts/create` - Create contact
- `PUT /api/contacts/update/:id` - Update contact

### Phone Numbers
- `POST /api/phone/manage` - Manage phone numbers

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel (Frontend)
- Railway/Heroku (Backend)
- Supabase (Database)

## 🤝 Contributing

1. Fork the repositories
2. Create feature branches
3. Make your changes
4. Submit pull requests

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue on the respective repository:
- [Frontend Issues](https://github.com/IAmDuck-Jelly/sales-report-client/issues)
- [Backend Issues](https://github.com/IAmDuck-Jelly/sales-report-server/issues)
