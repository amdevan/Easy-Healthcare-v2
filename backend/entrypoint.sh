#!/bin/bash

# Exit on error
set -e

# Clear existing cache
echo "Clearing cache..."
php artisan optimize:clear

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Upgrade Filament (assets, etc.)
echo "Upgrading Filament..."
php artisan filament:upgrade

# Cache config and routes
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Link storage
echo "Linking storage..."
php artisan storage:link || true

# Fix permissions
echo "Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
