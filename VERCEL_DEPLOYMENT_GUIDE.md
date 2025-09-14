# Vercel Deployment Guide for EMC Store

## Fixed Issues

✅ **Removed `output: 'standalone'`** from `next.config.js` (not compatible with Vercel)
✅ **Removed `build:export` script** from `package.json` (not needed for Vercel)
✅ **Added `generateStaticParams`** functions to dynamic routes:
   - `/app/artist/[slug]/page.tsx`
   - `/app/product/[id]/page.tsx`
✅ **Created `vercel.json`** configuration file
✅ **Cleaned up static-params.ts** (moved to page components)

## Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3. Environment Variables (Optional)

If you need environment variables, add them in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add variables from `.env.example` if needed

### 4. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed

## What Was Fixed

### Configuration Issues
- **Next.js Config**: Removed `output: 'standalone'` which conflicts with Vercel's build system
- **Package Scripts**: Removed `build:export` which is not needed for Vercel deployment

### Static Generation
- **Dynamic Routes**: Added proper `generateStaticParams` functions for:
  - Artist pages (`/artist/[slug]`)
  - Product pages (`/product/[id]`)

### Vercel Configuration
- **vercel.json**: Added proper configuration for Next.js deployment
- **Runtime**: Set to Node.js 18.x for optimal performance

## Troubleshooting

### If Build Still Fails:

1. **Check Build Logs** in Vercel dashboard
2. **Verify Dependencies** are properly installed
3. **Check TypeScript Errors** - all files should compile without errors
4. **Environment Variables** - ensure all required variables are set

### Common Issues:

- **Import Errors**: Make sure all imports use correct paths
- **Missing Dependencies**: Check if all packages are in `package.json`
- **TypeScript Errors**: Fix any type errors before deployment

## Success Indicators

✅ Build completes without errors
✅ All pages load correctly
✅ Static generation works for dynamic routes
✅ No console errors in browser
✅ All features work as expected

## Next Steps

1. Test all functionality after deployment
2. Set up custom domain if needed
3. Configure analytics and monitoring
4. Set up CI/CD for automatic deployments

Your EMC Store should now deploy successfully on Vercel! 🚀