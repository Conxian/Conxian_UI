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

## Production Deployment (conxian.org)

The official production environment is hosted on Render and serves the `conxian.org` domain.

### Render Configuration (Production)

- **Service Name**: `conxian-ui-prod`
- **Environment**: Node
- **Plan**: Free (or Starter for higher availability)
- **Build Command**: `corepack enable && corepack prepare pnpm@10.17.1 --activate && NPM_CONFIG_PRODUCTION=false pnpm install --frozen-lockfile && pnpm build`
- **Start Command**: `corepack enable && corepack prepare pnpm@10.17.1 --activate && pnpm start`

**Production Environment Variables:**
- `NEXT_PUBLIC_CORE_API_URL`: `https://api.mainnet.hiro.so`
- `NEXT_PUBLIC_GATEWAY_URL`: `https://gateway.conxian.org`
- `NEXT_PUBLIC_VAULT_URL`: `https://vault.conxian.org`
- `NEXT_PUBLIC_NEXUS_URL`: `https://nexus.conxian.org`

## Deployment Options

### Render (One-Click)

This repository includes a [`render.yaml`](./render.yaml) Blueprint configuration:

1. From your Render dashboard, click **New → Blueprint**
2. Connect this repository
3. Render auto-detects `render.yaml` and configures the service
4. Set production environment variables in the Render dashboard

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
```

## Post-Deployment Verification

After deploying, verify the following:

- [ ] All routes render correctly: `/`, `/swap`, `/pools`, `/tokens`, `/governance`, `/overview`, `/launch`, `/positions`, `/shielded`, `/network`, `/sandbox`, `/sdk`, `/contracts`, `/router`, `/add-liquidity`, `/tx`
- [ ] Wallet connection works (click "Connect Wallet" in the header)
- [ ] Swap page loads and displays token selectors
- [ ] Pools page fetches and displays pool data from the configured Hiro API
- [ ] Dashboard shows TVL, vaults, and APY metrics
- [ ] HTTPS is enforced (wallet interactions require secure context)
