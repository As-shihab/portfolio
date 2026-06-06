#!/bin/bash
set -e

echo "Building Angular application..."
cd frontend
npm install
npm run vercel-build
echo "Build completed successfully!"