# Deployment Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- A Supabase account with a configured database
- A hosting platform (e.g., Vercel, Netlify, or any cloud provider)

## Environment Variables

Before deploying, make sure to set the following environment variables:

### Frontend (.env file in client directory)

```
VITE_API_URL=https://your-backend-url.com/api
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Backend (.env file in server directory)

```
PORT=3002
NODE_ENV=production
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_KEY=your-supabase-service-key
CORS_ORIGIN=https://your-frontend-url.com
```

## Deployment Steps

### 1. Build the Frontend

```bash
cd client
npm run build
```

This will create a `dist` folder with the production-ready frontend files.

### 2. Deploy the Frontend

#### Option A: Deploy to Vercel

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd client
   vercel --prod
   ```

#### Option B: Deploy to Netlify

1. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   cd client
   netlify deploy --prod
   ```

### 3. Deploy the Backend

#### Option A: Deploy to Heroku

1. Install the Heroku CLI and log in:
   ```bash
   heroku login
   ```

2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set PORT=3002
   heroku config:set NODE_ENV=production
   heroku config:set SUPABASE_URL=https://your-supabase-url.supabase.co
   heroku config:set SUPABASE_SERVICE_KEY=your-supabase-service-key
   heroku config:set CORS_ORIGIN=https://your-frontend-url.com
   ```

4. Deploy:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### Option B: Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following build command:
   ```
   cd server && npm install
   ```
4. Set the start command:
   ```
   cd server && npm start
   ```
5. Add environment variables in the Render dashboard

### 4. Update CORS Settings

Make sure to update the CORS settings in your backend to allow requests from your frontend URL.

### 5. Test the Deployment

After deployment, test the application by:

1. Visiting the frontend URL
2. Trying to log in with a valid employee ID
3. Creating a new sales activity
4. Creating a new customer contact
5. Viewing the dashboard and charts

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the `CORS_ORIGIN` environment variable is set correctly in the backend.

2. **Database Connection Issues**: Verify that the Supabase URL and keys are correct in both frontend and backend environment variables.

3. **API Endpoint Issues**: Make sure the `VITE_API_URL` in the frontend points to the correct backend URL.

### Logs and Monitoring

- Check the logs of your hosting platform for any errors
- Use Supabase dashboard to monitor database queries
- Implement logging in your application for better debugging

## Scaling Considerations

- Consider using a CDN for static assets
- Implement caching strategies for better performance
- Monitor database performance and optimize queries if needed
- Set up monitoring and alerting for your application
