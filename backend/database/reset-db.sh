#!/bin/bash

echo "🧨 Removing old containers and volumes..."
docker-compose down -v

echo "🔨 Building and starting fresh containers in background..."
docker-compose up --build -d

echo "✅ Done! Containers are running. You can check logs with:"
echo "   docker-compose logs -f"
