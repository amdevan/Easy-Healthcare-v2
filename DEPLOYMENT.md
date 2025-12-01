Deployment

- Prerequisites: install Docker Desktop and ensure the daemon is running.

- Build and start:
  - `docker compose up -d --build`

- Frontend:
  - URL: `http://localhost:8081`
  - Served by Nginx, proxies `/api` to backend.

- Backend:
  - URL: `http://localhost:8080`
  - Laravel served by Apache (`backend/public`).

- First run:
  - Copy `backend/.env.example` to `backend/.env` and configure database and app settings.
  - Inside backend container: `docker compose exec backend php artisan key:generate`.
  - Run migrations: `docker compose exec backend php artisan migrate --force`.
  - Optional seeds: `docker compose exec backend php artisan db:seed --force`.

- Stop:
  - `docker compose down`

- Alternative hosting:
  - Frontend: any static host (Netlify, Vercel). Build with `npm run build` and deploy `dist/`.
  - Backend: PHP hosting with Apache/Nginx and PHP 8.2. Point document root to `backend/public` and run `composer install`.

Remote Access (HTTPS)

- DNS: create A records pointing your server IP
  - `yourdomain.com` → frontend
  - `api.yourdomain.com` → backend (optional; frontend already proxies `/api`)
- Configure compose labels: already set with `yourdomain.com` and `api.yourdomain.com`. Replace these with your actual domains.
- Start Traefik (auto TLS): `docker compose up -d --build` will run `traefik` on ports `80`/`443` and issue Let's Encrypt certs.
- Ensure ports `80` and `443` are open in the server firewall.
- Files:
  - Certificates are stored in `docker/traefik/letsencrypt/acme.json`. Traefik creates it automatically. If needed, create it and restrict permissions: `touch docker/traefik/letsencrypt/acme.json && chmod 600 docker/traefik/letsencrypt/acme.json`.

Notes
- Production build: frontend served by Nginx. Dev mode remains available at `http://localhost:3000/`.
- API routing: Nginx proxies `/api` from the frontend to the `backend` service; direct use of `api.yourdomain.com` is optional.
