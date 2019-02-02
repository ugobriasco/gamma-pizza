#!/usr/bin/env bash

# Create .data directories
mkdir -p .data/carts
mkdir -p .data/orders
mkdir -p .data/users
mkdir -p .data/tokens
mkdir -p .https

# Get ssl keys if not exiting
if [ ! -f ./.https/cert.pem ] || [ ! -f ./.https/key.pem ]; then
   echo "No ssl certification found."
   sh ./scripts/get-ssl-certificates.sh
fi
