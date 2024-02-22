#!/usr/bin/env bash

yarn build:app:docker
rm -rf /var/www/html/*
cp -a build/* /var/www/html

sed -i '/\[::\]:80/d' /etc/nginx/sites-enabled/default

echo "Starting Nginx..."
nginx -g "daemon off;"
