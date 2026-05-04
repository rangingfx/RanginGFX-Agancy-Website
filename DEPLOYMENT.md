# Deployment Guide: GitHub -> Cloudflare Pages

This project is configured for **Direct Deployment** from GitHub to Cloudflare Pages.

## 1. Cloudflare Setup
- Create a **Pages** project in your Cloudflare Dashboard.
- Connect it to your GitHub Repository.
- Select the **Vite** framework preset or use:
  - **Build Command:** `npm run build`
  - **Build Output Directory:** `dist`

## 2. GitHub Secrets
To enable the **GitHub Actions** workflow (`.github/workflows/deploy.yml`), add the following secrets in your GitHub Repository settings (**Settings > Secrets and variables > Actions**):

| Secret Name | Description |
| ----------- | ----------- |
| `CLOUDFLARE_API_TOKEN` | Create a [Cloudflare API Token](https://dash.cloudflare.com/profile/api-tokens) with "Edit Cloudflare Pages" permissions. |
| `CLOUDFLARE_ACCOUNT_ID` | Found on your Cloudflare Dashboard URL or Overview page. |
| `AICC_API_KEY` | Your AI.CC API key for the chat assistant. |
| `VITE_FIREBASE_API_KEY` | Firebase Client API Key. |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Project Domain. |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID. |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket. |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging ID. |
| `VITE_FIREBASE_APP_ID` | Firebase App ID. |

## 3. Environment Variables (Cloudflare Dashboard)
Ensure you also add your **Environment Variables** in the Cloudflare Pages Dashboard under **Settings > Environment variables** for both "Production" and "Preview".

- `AICC_API_KEY`: (Required for the `functions` backend)
- `AICC_API_URL`: `https://api.ai.cc/v1`

## 4. Deploy
Simply push any change to the `main` branch, and GitHub Actions will automatically build and deploy your site to `ustadnk.workers.dev` (or your custom domain).
