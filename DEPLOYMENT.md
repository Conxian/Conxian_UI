# Community Deployment Guide

This document covers everything needed to deploy and operate the Conxian UI in production.

## Requirements

| Dependency | Version |
|-----------|---------|
| Node.js | ≥20.19.0 |
| pnpm | 10.17.1 |
| HTTPS | Required (wallet interactions need secure context) |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CORE_API_URL` | **Yes** | Hiro API endpoint. Use `https://api.mainnet.hiro.so` for mainnet, `https://api.testnet.hiro.so` for testnet. |
| `NEXT_PUBLIC_GATEWAY_URL` | **Yes** | Conxian Gateway URL (e.g., `https://gateway.conxian.org`) |
| `NEXT_PUBLIC_VAULT_URL` | **Yes** | Conxian Vault URL (e.g., `https://vault.conxian.org`) |
| `NEXT_PUBLIC_NEXUS_URL` | **Yes** | Conxian Nexus URL (e.g., `https://nexus.conxian.org`) |
| `NEXT_PUBLIC_CONXIAN_API_KEY` | No | API key for gateway intent execution |
| `PORT` | No | Port for the static server (default: 10000) |

## Deployment Options

### Render (One-Click)

This repository includes a [`render.yaml`](./render.yaml) Blueprint configuration:

1. From your Render dashboard, click **New → Blueprint**
2. Connect this repository
3. Render auto-detects `render.yaml` and configures the service
4. Set production environment variables in the Render dashboard

**Render environment variables to configure:**
- `NEXT_PUBLIC_CORE_API_URL` — change to `https://api.mainnet.hiro.so` for production
- `NEXT_PUBLIC_GATEWAY_URL` — your gateway endpoint
- `NEXT_PUBLIC_VAULT_URL` — your vault endpoint
- `NEXT_PUBLIC_NEXUS_URL` — your nexus endpoint

### Vercel

1. Import the repository into Vercel
2. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `corepack enable && corepack prepare pnpm@10.17.1 --activate && pnpm install --frozen-lockfile && pnpm build`
   - **Output Directory**: `out`
   - **Install Command**: `corepack enable && corepack prepare pnpm@10.17.1 --activate && pnpm install --frozen-lockfile`
3. Set all required environment variables in the Vercel project settings

### Netlify

1. Import the repository into Netlify
2. Configure:
   - **Build Command**: `corepack enable && corepack prepare pnpm@10.17.1 --activate && pnpm install --frozen-lockfile && pnpm build`
   - **Publish Directory**: `out`
3. Set all required environment variables in the Netlify site settings
4. Add a `netlify.toml` or configure redirects for SPA fallback:
   ```
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Self-Hosted (Static Files)

The application builds to a static export in the `out/` directory.

```bash
# Install dependencies
corepack enable
corepack prepare pnpm@10.17.1 --activate
pnpm install --frozen-lockfile

# Set environment variables and build
NEXT_PUBLIC_CORE_API_URL=https://api.mainnet.hiro.so \
NEXT_PUBLIC_GATEWAY_URL=https://gateway.conxian.org \
NEXT_PUBLIC_VAULT_URL=https://vault.conxian.org \
NEXT_PUBLIC_NEXUS_URL=https://nexus.conxian.org \
pnpm build

# Serve the static output
pnpm start
# Or use any static file server:
# npx serve out -p 10000 -s
```

#### nginx Example

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    root /path/to/conxian_ui/out;
    index index.html;

    # SPA fallback — all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
}
```

## Post-Deployment Verification

After deploying, verify the following:

- [ ] All routes render correctly: `/`, `/swap`, `/pools`, `/tokens`, `/governance`, `/overview`, `/launch`, `/positions`, `/shielded`, `/network`, `/sandbox`, `/sdk`, `/contracts`, `/router`, `/add-liquidity`, `/tx`
- [ ] Wallet connection works (click "Connect Wallet" in the header)
- [ ] Swap page loads and displays token selectors
- [ ] Pools page fetches and displays pool data from the configured Hiro API
- [ ] Dashboard shows TVL, vaults, and APY metrics
- [ ] HTTPS is enforced (wallet interactions require secure context)

## Operational Notes

- **Static export**: The app is built as a fully static site. No server-side rendering at runtime.
- **SPA routing**: All page routes are client-side. Your server must serve `index.html` for all paths.
- **API calls**: All blockchain data comes from the configured Hiro API (`NEXT_PUBLIC_CORE_API_URL`). No backend server is required.
- **CORS**: The Hiro API must allow cross-origin requests from your deployment domain. Public Hiro endpoints support this by default.
- **Environment variables**: All `NEXT_PUBLIC_*` variables are baked into the static build. Changing them requires a rebuild.
