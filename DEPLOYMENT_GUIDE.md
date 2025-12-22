# Step-by-Step Deployment Guide

This guide explains how to deploy your application with the **Backend on a Subdomain** (e.g., `api.example.com`) and the **Frontend on the Main Domain** (e.g., `example.com`).

---

## Part 1: Backend Deployment (api.example.com)

### 1. Upload Backend Code
1.  Upload the contents of the `backend/` folder to your server.
2.  **Recommended Path:** Place it outside the public root if possible, e.g., `/var/www/backend`.
3.  **Document Root:** Point your subdomain `api.example.com` to the `/backend/public` folder.

### 2. File Permissions
Ensure the web server (e.g., Nginx, Apache) has write permissions for:
*   `backend/storage` (and all subfolders)
*   `backend/bootstrap/cache`

### 3. Run the Installer
1.  Open your browser and visit: `http://api.example.com`
2.  You will be automatically redirected to the **Installation Wizard**.
3.  **Step 1: Welcome:** Click Start.
4.  **Step 2: Requirements:** Ensure all server checks pass (PHP 8.2+, Extensions).
5.  **Step 3: Database & Domain Config:**
    *   **Database:** Enter your MySQL/MariaDB credentials.
    *   **App URL (Backend):** Enter `http://api.example.com` (or https).
    *   **Frontend URL:** Enter `http://example.com` (or https).
    *   *Note: Entering these correctly is crucial for CORS and Cookies to work.*
6.  **Step 4: Admin Account:** Create your first Super Admin user.
7.  **Step 5: Finish:** The installer will write your `.env` file and run migrations automatically.

---

## Part 2: Frontend Deployment (example.com)

Once the backend is installed and running, you need to build the frontend to communicate with it.

### 1. Configure Environment
On your **local machine** (where you have the source code):
1.  Create a file named `.env` in the project root (next to `package.json`), or edit it if it exists.
2.  Add the backend API URL:
    ```env
    VITE_API_BASE_URL=http://api.example.com/api
    ```
    *(Make sure to use https if your server has SSL)*

### 2. Build the Frontend
Run the build command in your terminal:
```bash
npm run build
```
This will create a `dist/` folder in your project root containing static HTML, CSS, and JS files.

### 3. Upload Frontend
1.  Upload the **contents** of the `dist/` folder to the public root of your main domain (`example.com`).
    *   Usually `/public_html` or `/var/www/html`.
2.  Ensure `index.html` is at the root of your domain.

### 4. Handling Routes (Important!)
Since this is a Single Page Application (SPA), you need to redirect all requests to `index.html` so React can handle routing (e.g., `/about`, `/login`).

**For Apache (.htaccess):**
Create an `.htaccess` file in your frontend root:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**For Nginx:**
Update your site configuration:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Part 3: Verification

1.  Visit `http://example.com`.
2.  You should see the homepage.
3.  Go to the **Login** page.
4.  Try logging in with the Admin account you created during the backend installation.
5.  If successful, the backend and frontend are correctly communicating!

---

## Troubleshooting

*   **CORS Errors:** Check the `backend/.env` file on your server. Ensure `CORS_ALLOWED_ORIGINS` includes your frontend URL (e.g., `http://example.com`).
*   **404 on Refresh:** Ensure you added the `.htaccess` or Nginx rewrite rule for the frontend.
*   **Database Error:** Check `backend/.env` DB credentials.
