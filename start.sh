#!/bin/bash
# SeeServeSupport — start development server
# Opens automatically in your default browser

cd "$(dirname "$0")"

echo ""
echo "  SeeServeSupport"
echo "  Starting dev server..."
echo ""

# Open browser after a short delay
(sleep 2 && open http://localhost:5174) &

npm run dev -- --port 5174
