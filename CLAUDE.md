# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Jekyll (Blog Engine)
```bash
# Install dependencies
bundle install

# Run development server locally
bundle exec jekyll serve --host 0.0.0.0 --livereload --force_polling --incremental

# Build the site
bundle exec jekyll build
```

### Docker Alternative
```bash
# Run with Docker Compose (recommended for consistent environment)
docker-compose up

# Build Docker image
docker build -t magudb-blog .
```

### Frontend Assets (Webpack)
```bash
# Install npm dependencies
npm install

# Build JavaScript assets
npm run build

# Release process
npm run release
```

## High-Level Architecture

This is a Jekyll-based personal blog with the following structure:

### Core Components
1. **Jekyll Static Site Generator**: Handles blog posts, pages, layouts, and content generation
   - Posts are in `_posts/` directory (Markdown files)
   - Drafts in `_drafts/`
   - Layouts and templates in `_layouts/` and `_includes/`
   - Uses Thinkspace v2 theme as base

2. **Frontend JavaScript**: Custom search functionality
   - Entry point: `_src/app.js`
   - Search module: `_src/components/search.js` - implements Fuse.js for client-side search
   - Service worker setup for offline functionality via Workbox

3. **Styling**: Sass/SCSS with Bourbon mixins
   - Main styles in `assets/scss/`
   - Compiled to compressed CSS

### Key Features
- **AI-Powered Vector Search**:
  - Semantic search using vector embeddings (when available)
  - Hybrid search combining vector similarity and keyword matching
  - Automatic fallback to Fuse.js keyword search
  - Powered by Xenova/all-MiniLM-L6-v2 transformer model
  - Works completely offline in the browser
  - Generate embeddings with: `npm run generate-embeddings`
- **Enhanced Client-side Search**:
  - Live search with debouncing (triggers after 2 characters)
  - Search result highlighting and relevance scoring
  - Search suggestions for failed searches
  - URL parameter support for shareable searches
- Service worker for offline support
- Disqus comments integration
- Google Analytics tracking
- Responsive design optimized for technical writing

### Deployment
- Hosted on GitHub Pages (CNAME: udbjorg.net)
- Main branch deploys automatically via GitHub Actions
- **Build Process**:
  1. `npm run build` - Builds JavaScript assets
  2. `npm run generate-embeddings` - Generates vector embeddings for AI search
  3. `bundle exec jekyll build` - Builds Jekyll site
- **Pre-commit Hook**: Automatically builds assets and generates embeddings when posts change
- **GitHub Actions**: Runs full build pipeline on push to master/main

### Important Configuration
- `_config.yml`: Main Jekyll configuration
- `webpack.config.js`: JavaScript bundling and service worker generation
- Ruby 3.1 Alpine Docker environment with specific bundler version (1.17.3)

## Notes
- The repository contains Go module cache in `pkg/` which appears to be unrelated to the main blog functionality
- Git status shows uncommitted changes to Gemfile.lock and a renamed post file