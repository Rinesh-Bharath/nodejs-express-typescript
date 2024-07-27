# Stage 1: Select your base image to start with
FROM node:lts-alpine AS builder

## Create app directory
## Specify the "working directory" for the rest of the stage
## this is the location where you will be inside the container
WORKDIR /app

## A wildcard is used to ensure both package.json AND package-lock.json are copied
## copying packages first helps take advantage of docker layers
COPY package*.json ./

# Stage 2: Install app dependencies
## If you are building your code for production
## RUN npm ci --only=production
RUN npm ci

## Copy the rest of the application code
COPY . .

# Ensure the required directories exists
RUN mkdir -p /app/logs /app/coverage

## Make sure the container is not running as root
USER node

# Stage 3: Run the server
CMD ["node", "src/server.ts"]