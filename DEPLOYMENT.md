# ElixirLabs UI Deployment Guide

## Quick Deploy to Vercel

1. **Prerequisites**:
   - GitHub account
   - Vercel account (free)
   - Code pushed to GitHub

2. **Deploy**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - No other configuration needed
   - Click "Deploy"

3. **Custom Domain** (Optional):
   - After deployment, go to Project Settings > Domains
   - Add `ui.elixirlabs.in`
   - Follow DNS configuration instructions

4. **Production URLs**:
   - Registry: `https://ui.elixirlabs.in/r/index.json`
   - Components: `https://ui.elixirlabs.in/r/[component-name].json`

## Environment Variables

No environment variables needed for basic setup!

## Automatic Deployments

Every push to `main` branch will auto-deploy to production.

## Build Process

The build command automatically:
1. Validates registry (`npm run validate:registry`)
2. Builds registry (`npm run build:registry`)
3. Builds Next.js app (`next build`)

Total build time: ~2-3 minutes
