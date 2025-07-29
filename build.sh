#!/bin/bash

echo "🚀 Building blog assets..."

# Install dependencies
echo "📦 Installing dependencies..."
bundle install
npm install

# Build JavaScript
echo "🔨 Building JavaScript..."
npm run build

# Generate embeddings
echo "🤖 Generating embeddings for AI search..."
npm run generate-embeddings

# Build Jekyll site
echo "🏗️ Building Jekyll site..."
bundle exec jekyll build

echo "✅ Build complete!"
echo "📁 Site built to _site/"