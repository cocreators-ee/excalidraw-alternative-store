#!/usr/bin/env bash

echo "Building application..."
yarn build:app:docker

echo "Publishing build results..."
rm -rf /var/www/html/*
cp -a build/* /var/www/html

echo "Starting Nginx..."
sed -i '/\[::\]:80/d' /etc/nginx/sites-enabled/default
nginx -g "daemon off;"
