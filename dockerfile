FROM ruby:3.1-alpine

# Install dependencies
RUN apk add --no-cache \
    build-base \
    gcc \
    cmake \
    git \
    nodejs \
    npm

# Set working directory
WORKDIR /srv/jekyll

# Copy Gemfile first for better caching
COPY Gemfile* ./

# Install bundler matching Gemfile.lock version
RUN gem install bundler:1.17.3 && \
    bundle config set --local path 'vendor/bundle' && \
    bundle install

# Copy the rest of the site
COPY . .

# Expose port
EXPOSE 4000
EXPOSE 35729

# Default command for development
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
