# Deployment Guide

This guide covers deploying the College Admissions Analysis Dashboard to various platforms.

## Vercel Deployment (Recommended)

### Automatic Deployment
1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
3. **Deploy**: Vercel will automatically detect Next.js and deploy with zero configuration

### Manual Deployment
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts to configure your deployment
\`\`\`

### Environment Variables
If you need to add environment variables for production:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add any required variables

## Other Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder (if using static export) or connect your Git repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Docker Deployment
\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

### Static Export (Optional)
To generate a static version:
\`\`\`bash
# Add to next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

# Build static version
npm run build
\`\`\`

## Performance Optimization

The current `next.config.mjs` includes:
- ESLint and TypeScript error ignoring for faster builds
- Unoptimized images for compatibility
- Standard Next.js optimizations

For production, consider:
- Enabling image optimization if using Vercel
- Adding compression middleware
- Implementing caching strategies for data processing scripts

## Data Pipeline in Production

### Option 1: Pre-built Data
- Run Python scripts locally
- Commit generated JSON files
- Deploy with static data

### Option 2: API Integration
- Create API routes in `app/api/`
- Connect to external data sources
- Implement caching for performance

### Option 3: Serverless Functions
- Use Vercel Functions or similar
- Process data on-demand
- Cache results in database or CDN

## Monitoring and Analytics

The project includes Vercel Analytics by default. For additional monitoring:
- Add error tracking (Sentry, Bugsnag)
- Implement custom analytics
- Monitor performance metrics
- Set up uptime monitoring

## Security Considerations

- Validate all data inputs
- Implement rate limiting for APIs
- Use HTTPS in production
- Sanitize user inputs if adding interactive features
- Keep dependencies updated

## Troubleshooting

### Build Errors
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Run `npm run build` locally first

### Data Issues
- Ensure Python scripts have run successfully
- Check that JSON files are properly formatted
- Validate data using `scripts/data_validator.py`

### Performance Issues
- Optimize chart rendering with React.memo
- Implement data pagination for large datasets
- Use loading states and skeleton components
- Consider server-side rendering for SEO
