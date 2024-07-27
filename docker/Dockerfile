# Build the application
FROM node:lts-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json with correct ownership
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code with correct ownership
COPY --chown=node:node . .

# Ensure the required directories exist with correct permissions
RUN mkdir -p /app/logs /app/coverage && chown -R node:node /app

# Switch to a non-root user
USER node

# Run the server
CMD ["node", "src/server.ts"]