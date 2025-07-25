# Deployment Guide for Sales Report App

This guide provides instructions for deploying the Sales Report App to production environments. It covers both the React frontend and Node.js/Express backend deployment.

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Git
- Supabase account with database configured
- Hosting accounts (based on chosen deployment method)

## Environment Setup

### Production Environment Variables

#### Frontend (.env.production)
```
VITE_API_URL=https://your-api-domain.com/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Backend (.env)
```
PORT=3000
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
CORS_ORIGIN=https://your-frontend-domain.com
```

## Building the Application

### Frontend Build

1. Navigate to the frontend directory
   ```bash
   cd client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create production build
   ```bash
   npm run build
   ```
   This will generate optimized production files in the `dist` directory.

### Backend Build

1. Navigate to the backend directory
   ```bash
   cd server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build TypeScript files (if using TypeScript)
   ```bash
   npm run build
   ```
   This will compile TypeScript files to JavaScript in the `dist` directory.

## Deployment Options

### Option 1: Traditional Hosting

#### Backend Deployment (Node.js/Express)

**Using a VPS (Digital Ocean, AWS EC2, etc.)**

1. Set up a VPS with Ubuntu/Debian
   
2. Install Node.js and npm
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Install PM2 for process management
   ```bash
   npm install -g pm2
   ```

4. Clone the repository
   ```bash
   git clone <repository-url>
   cd sales-report-app/server
   ```

5. Install dependencies and build
   ```bash
   npm install
   npm run build
   ```

6. Set up environment variables
   ```bash
   cp .env.example .env
   nano .env
   # Add your production environment variables
   ```

7. Start the application with PM2
   ```bash
   pm2 start dist/index.js --name "sales-report-api"
   pm2 save
   pm2 startup
   ```

8. Set up Nginx as a reverse proxy
   ```bash
   sudo apt-get install nginx
   ```

9. Configure Nginx
   ```
   # /etc/nginx/sites-available/sales-report-api
   server {
       listen 80;
       server_name your-api-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

10. Enable the site and restart Nginx
    ```bash
    sudo ln -s /etc/nginx/sites-available/sales-report-api /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

11. Set up SSL with Let's Encrypt
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d your-api-domain.com
    ```

#### Frontend Deployment (React/Vite)

**Using a Static Site Hosting (Netlify, Vercel, etc.)**

1. Build the frontend
   ```bash
   cd client
   npm run build
   ```

2. Deploy to Netlify using the Netlify CLI
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. Or deploy to Vercel
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Option 2: Containerized Deployment (Docker)

#### Create Docker Files

1. Create a Dockerfile for the backend
   ```dockerfile
   # server/Dockerfile
   FROM node:16-alpine

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   EXPOSE 3000

   CMD ["node", "dist/index.js"]
   ```

2. Create a Dockerfile for the frontend
   ```dockerfile
   # client/Dockerfile
   FROM node:16-alpine as build

   WORKDIR /app

   COPY package*.json ./
   RUN npm install

   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf

   EXPOSE 80

   CMD ["nginx", "-g", "daemon off;"]
   ```

3. Create an nginx.conf file for the frontend
   ```
   # client/nginx.conf
   server {
       listen 80;
       root /usr/share/nginx/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location /api/ {
           proxy_pass http://backend:3000/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Create a docker-compose.yml file
   ```yaml
   # docker-compose.yml
   version: '3'

   services:
     backend:
       build: ./server
       container_name: sales-report-backend
       restart: always
       ports:
         - "3000:3000"
       env_file:
         - ./server/.env
       networks:
         - app-network

     frontend:
       build: ./client
       container_name: sales-report-frontend
       restart: always
       ports:
         - "80:80"
       depends_on:
         - backend
       networks:
         - app-network

   networks:
     app-network:
       driver: bridge
   ```

5. Build and run with Docker Compose
   ```bash
   docker-compose up -d
   ```

### Option 3: Cloud Platform Deployment

#### Deploy Backend to Heroku

1. Create a Procfile in the server directory
   ```
   web: node dist/index.js
   ```

2. Initialize a Git repository (if not already done)
   ```bash
   cd server
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Create a Heroku app and deploy
   ```bash
   heroku create sales-report-api
   git push heroku main
   ```

4. Set environment variables
   ```bash
   heroku config:set SUPABASE_URL=your_supabase_url
   heroku config:set SUPABASE_SERVICE_KEY=your_supabase_service_key
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

#### Deploy Frontend to Netlify/Vercel

1. Connect your GitHub repository to Netlify/Vercel
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables in the Netlify/Vercel dashboard
4. Deploy

## Post-Deployment Steps

### 1. Verify Deployment

- Test the API endpoints using tools like Postman
- Verify the frontend is correctly communicating with the backend
- Check that Supabase connections are working properly

### 2. Set Up Monitoring

#### Backend Monitoring

1. Install and configure monitoring tools
   ```bash
   npm install --save express-pino-logger pino-http
   ```

2. Set up application monitoring with services like:
   - New Relic
   - Datadog
   - Sentry

#### Frontend Monitoring

1. Set up error tracking with Sentry
   ```bash
   npm install @sentry/react @sentry/tracing
   ```

2. Configure in your main.tsx file
   ```typescript
   import * as Sentry from "@sentry/react";
   import { BrowserTracing } from "@sentry/tracing";

   Sentry.init({
     dsn: "your-sentry-dsn",
     integrations: [new BrowserTracing()],
     tracesSampleRate: 1.0,
   });
   ```

### 3. Set Up CI/CD Pipeline

#### GitHub Actions Example

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: |
          cd server
          npm install
      - name: Build
        run: |
          cd server
          npm run build
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: "sales-report-api"
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
          appdir: "server"

  deploy-frontend:
    runs-on: ubuntu-latest
    needs: deploy-backend
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: |
          cd client
          npm install
      - name: Build
        run: |
          cd client
          npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './client/dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### 4. Database Backups

Set up regular backups of your Supabase database:

1. Use Supabase's built-in backup features
2. Set up scheduled database exports
3. Store backups in secure cloud storage

### 5. Security Considerations

1. Enable HTTPS for all communications
2. Set up proper CORS configuration
3. Implement rate limiting for API endpoints
4. Use environment variables for sensitive information
5. Regularly update dependencies for security patches

## Troubleshooting Common Deployment Issues

### Backend Issues

1. **Connection Refused Errors**
   - Check if the server is running
   - Verify port configuration
   - Check firewall settings

2. **Database Connection Issues**
   - Verify Supabase credentials
   - Check network connectivity
   - Ensure IP allowlisting if required

3. **Memory/CPU Usage Problems**
   - Monitor resource usage
   - Consider scaling up the server
   - Optimize database queries

### Frontend Issues

1. **API Connection Problems**
   - Verify API URL configuration
   - Check CORS settings
   - Test API endpoints independently

2. **Build Failures**
   - Check for dependency issues
   - Verify environment variables
   - Review build logs for errors

3. **Performance Issues**
   - Analyze bundle size
   - Implement code splitting
   - Use performance monitoring tools

## Scaling Considerations

1. **Horizontal Scaling**
   - Deploy multiple backend instances
   - Use a load balancer
   - Implement session management

2. **Database Scaling**
   - Monitor database performance
   - Consider read replicas for heavy read operations
   - Implement caching strategies

3. **CDN Integration**
   - Use a CDN for static assets
   - Configure proper cache headers
   - Implement asset versioning

## Maintenance Procedures

1. **Regular Updates**
   - Schedule regular dependency updates
   - Test updates in staging environment
   - Document update procedures

2. **Backup and Recovery**
   - Regularly test backup restoration
   - Document recovery procedures
   - Set up monitoring for backup jobs

3. **Performance Monitoring**
   - Set up regular performance reviews
   - Monitor API response times
   - Track frontend load times

## Conclusion

This deployment guide provides a comprehensive approach to deploying the Sales Report App to production environments. By following these instructions, you can ensure a smooth, secure, and scalable deployment of both the frontend and backend components.

Remember to adapt these instructions to your specific hosting environment and organizational requirements. Always test deployments in a staging environment before applying to production.