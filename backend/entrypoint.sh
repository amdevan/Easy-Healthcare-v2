#!/bin/bash

# Exit on error
set -e

# Function to run a command and continue even if it fails
run_safe() {
    "$@" || echo "Command failed: $@"
}

# Clear existing cache
echo "Clearing cache..."
run_safe php artisan optimize:clear

# Run migrations
echo "Running migrations..."
run_safe php artisan migrate --force

# Upgrade Filament (assets, etc.)
echo "Upgrading Filament..."
run_safe php artisan filament:upgrade

# Cache config and routes
echo "Caching configuration..."
run_safe php artisan config:cache
run_safe php artisan route:cache
run_safe php artisan view:cache
run_safe php artisan event:cache

# Link storage
echo "Linking storage..."
run_safe php artisan storage:link

# Fix permissions
echo "Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache

# Start Apache
echo "Starting Apache..."
exec apache2-foreground
