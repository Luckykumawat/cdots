# Vercel deployment

Cdots is a product catalogue website prepared for Vercel. It runs standard Next.js on Vercel; Cloudflare D1 and R2 remain external storage services. ChatGPT login is replaced by browser username/password authentication for the owner.

## Deploy the public site

1. Use the existing GitHub repository: https://github.com/Luckykumawat/cdots (branch: main). Do not upload node_modules, .next, or any .env files.
2. In Vercel choose Add New > Project, import that repository, and select Next.js.
3. Use Node.js 22.x, install command `npm install`, build command `npm run build`, and leave Output Directory at its default.
4. Add the environment variables below under Settings > Environment Variables for Production (and Preview only if needed).
5. Deploy. Without database configuration the public site shows the bundled seed catalogue. Admin saving and uploads require storage setup below.
6. Open `/`, a published `/products/<slug>` link, and `/admin`. Use a private browser window for admin and close it to clear browser-cached Basic authentication.
7. Add your domain in Settings > Domains and follow the DNS records Vercel displays.

## Admin login

Set `ADMIN_USERNAME` (for example `owner`) and `ADMIN_PASSWORD` (at least 20 random characters). The browser prompts for these when visiting `/admin`. These are server-only secrets: never prefix them with NEXT_PUBLIC_. Vercel serves HTTPS. Configure Vercel Firewall rate limiting for `/admin` and `/api/admin/*` before publicly sharing the admin URL.

## Persistent catalogue

In your own Cloudflare account, create a D1 database. Run `database/schema.sql` in its SQL console. Set:

- `CLOUDFLARE_ACCOUNT_ID`: your Cloudflare account ID.
- `CLOUDFLARE_D1_DATABASE_ID`: the database ID.
- `CLOUDFLARE_API_TOKEN`: a token scoped to that account with D1 edit permissions.

The first successful admin save writes the bundled catalogue. Existing edits made on the Sites-hosted version are NOT automatically migrated: export the live catalogue and migrate the catalogue_state row before launch. Bundled assets are included; previously uploaded `/media` images require copying those objects to the chosen R2 bucket with the same keys.

This adapter uses D1's administrative REST API. Cloudflare's account API rate limits apply; for high traffic, replace it with a dedicated Worker gateway/production database adapter. Do not use this deployment as a high-volume service without that change.

## Image uploads

Create an R2 bucket and generate S3 credentials restricted to Object Read & Write for that bucket. Set `R2_BUCKET_NAME`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY`. Optionally set `R2_ENDPOINT` to the exact S3 endpoint shown in the R2 dashboard. The bucket can stay private: `/media/<key>` serves images through the website.

The website limits images to 3.5 MB to stay below Vercel's function request body limit. Existing public/assets images work without R2.

After changing environment variables, redeploy. See `.env.example` for the complete variable list. Never put credentials in Git or share them in chat.

## Local checks

Run `npm install`, then `npm run build`. For local admin/storage testing, copy `.env.example` to `.env.local` and fill it locally, then run `npm run dev`.

Build verification does not verify Cloudflare credentials, live data migration, DNS, or the deployed environment. Those require your account configuration.
