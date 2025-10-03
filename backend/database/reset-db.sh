#!/bin/bash

echo "🧨 Stopping and removing old containers and volumes..."
docker-compose down -v

echo "🚀 Building and starting fresh containers..."
docker-compose up --build