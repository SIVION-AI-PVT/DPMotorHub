# Cloudflare Pages Hosting Configuration & Deployment Guide

This project (**DP MotorHub**) has been configured for direct deployment to **Cloudflare Pages**.

---

## Configuration Files Added

1. **`public/_redirects`**: Configures single-page application (SPA) client-side routing so deep paths like `/shop`, `/about`, `/contact`, and `/product/:id` return `index.html` (200 status) instead of a 404 error.
2. **`public/_headers`**: Enforces production security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and long-term immutable caching for static assets in Cloudflare's global edge network.
3. **`wrangler.toml`**: Cloudflare Pages / Workers deployment manifest.
4. **`package.json`**: Updated build and deployment scripts.

---

## Method 1: Deploying via Wrangler CLI (Command Line)

### Step 1: Log in to your Cloudflare Account
Run the following command in your terminal:
```bash
npx wrangler login
```
*This opens your browser to authorize Wrangler with your Cloudflare account.*

### Step 2: Deploy to Cloudflare Pages
Run:
```bash
npm run deploy
```
*Or manually:*
```bash
npx wrangler pages deploy dist --project-name=dpmotorhub
```

Your site will immediately deploy to a live URL such as `https://dpmotorhub.pages.dev`.

---

## Method 2: Automatic Git Deployment (Cloudflare Dashboard)

If your project is pushed to GitHub or GitLab:

1. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository (`DPMotorHub`).
4. Configure the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

Cloudflare will automatically build and publish your website on every git push!

---

## Quick Reference Commands

| Action | Command |
|---|---|
| Local Development | `npm run dev` |
| Production Build | `npm run build` |
| Deploy to Cloudflare | `npm run deploy` |
