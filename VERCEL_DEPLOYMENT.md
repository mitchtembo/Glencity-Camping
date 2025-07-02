# Glencity Camping Deployment Guide

## Vercel Deployment Instructions

### Prerequisites
1. GitHub repository with your code
2. Vercel account (sign up at vercel.com)
3. Backend deployed on Render (or another service)

### Step 1: Prepare Your Repository
Your repository should include:
- ✅ `vercel.json` configuration file (created)
- ✅ `package.json` with build scripts
- ✅ Environment variable configuration

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI
1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **glencity-camping**
   - Directory: **./** (current directory)
   - Override settings? **N**

#### Option B: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the following settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Configure Environment Variables
In your Vercel project dashboard:

1. Go to Settings → Environment Variables
2. Add the following variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://glencity-camping.onrender.com` (or your backend URL)
   - **Environment**: Production

### Step 4: Domain Configuration (Optional)
- Vercel will provide a default domain like `glencity-camping.vercel.app`
- You can add a custom domain in Settings → Domains

### Step 5: Automatic Deployments
- Vercel will automatically deploy on every push to your main branch
- Pull requests will create preview deployments

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify build command works locally: `npm run build`

2. **API Connection Issues**
   - Verify `VITE_API_URL` environment variable is set
   - Check CORS settings on your backend
   - Ensure backend is deployed and accessible

3. **Routing Issues**
   - `vercel.json` includes SPA routing configuration
   - All routes will fallback to `index.html`

### Environment Variables Reference:
- `VITE_API_URL`: Backend API URL (required for production)

## Post-Deployment Checklist
- [ ] Frontend deployed successfully
- [ ] Environment variables configured
- [ ] API connection working
- [ ] All routes accessible
- [ ] Authentication flow working
- [ ] Booking system functional

## Performance Optimization
Your Vercel deployment includes:
- Static file serving
- Global CDN
- Automatic HTTPS
- Gzip compression
- Image optimization (if using Vercel Image component)
