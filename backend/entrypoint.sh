#!/bin/bash

# Exit on error
set -e

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Cache config and routes
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Link storage
echo "Linking storage..."
php artisan storage:link || true

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
