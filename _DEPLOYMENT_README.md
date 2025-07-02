# glencity-camping

## Deployment Instructions

This project is configured for Vercel deployment with the following settings:

### Build Configuration
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js Version: 18.x

### Environment Variables Required
- `VITE_API_URL`: Backend API URL

### Files Important for Deployment
- `vercel.json`: Vercel deployment configuration
- `package.json`: Build scripts and dependencies
- `vite.config.js`: Vite build configuration
- `.vercelignore`: Files to exclude from deployment

### Troubleshooting 404 Errors
If you encounter 404 errors on Vercel:

1. **Check Build Logs**: Ensure the build completes successfully
2. **Verify Routes**: All React Router routes should fallback to index.html
3. **Environment Variables**: Ensure VITE_API_URL is set in Vercel dashboard
4. **Static Assets**: Check that all assets are in the dist folder after build

### SPA Routing
This is a Single Page Application (SPA) using React Router. The vercel.json configuration ensures all routes fallback to index.html for client-side routing.
