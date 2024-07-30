# Build the application
FROM node:lts-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json with correct ownership
COPY --chown=node:node package*.json ./

# Install dependencies and create logs and coverage directories
RUN npm ci && \
    mkdir -p /app/logs /app/coverage && \
    chown -R node:node /app

# Copy the rest of the application code with correct ownership
COPY --chown=node:node . .

# Switch to a non-root user
USER node

# Run the server
CMD ["node", "src/server.ts"]