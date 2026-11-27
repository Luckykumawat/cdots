# Cdots

Apps, websites and software by Lokesh Kumawat. A responsive product hub with individual product pages and an owner-only catalogue editor.

## Deploy on Vercel

Import [Luckykumawat/cdots](https://github.com/Luckykumawat/cdots), use the root directory, select Next.js and Node.js 22.x, and deploy branch `main`.

- Install: `npm ci`
- Build: `npm run build`
- Output directory: framework default

See [DEPLOY.md](DEPLOY.md) for admin credentials, persistent catalogue storage, image uploads, data migration and custom domains. [Environment variable template](.env.example).

Public pages work with the bundled catalogue before storage is configured. Admin saving needs Cloudflare D1; uploads need Cloudflare R2. Admin uses browser username/password authentication, replacing the Sites-specific ChatGPT login. Credentials stay server-side.

## Development

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run typecheck
```

The temporary Cdots mark is `public/assets/cdots-logo.svg`; the favicon is `public/assets/favicon.svg`. Replace both when the final logo is ready. The logo uses a monochrome circular dot motif inspired by the existing Dobal icon.

The `docs/screenshots` images show the earlier NexaWorks design and are retained as historical references. Existing hosted Sites data is not automatically migrated to this deployment; follow DEPLOY.md before switching production traffic.
