#!/usr/bin/env bash

# Setup 
echo "Γ🍕 - Initializing application"
sh ./scripts/init.sh

# Start node application
echo "Γ🍕 - Application initialized, starting the server"
NODE_DEBUG=server NODE_ENV=stage node .
