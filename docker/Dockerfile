# Stage 1: Select your base image to start with
FROM node:latest as builder

## Create app directory
## this is the location where you will be inside the container
WORKDIR /app

## A wildcard is used to ensure both package.json AND package-lock.json are copied
## copying packages first helps take advantage of docker layers
COPY package*.json ./

# Stage 2: Install app dependencies
## If you are building your code for production
## RUN npm ci --only=production
RUN npm ci

## Specify the "working directory" for the rest of the stage
WORKDIR /app

## Bundle app source
COPY . /app

## Allows port to be publicly available
EXPOSE 9229
EXPOSE 4020

## Make sure the container is not running as root
USER node

# Stage 3: Run the server
CMD ["npx", "nodemon", "--exec", "node", "--inspect=0.0.0.0:9229", "--require", "ts-node/register", "src/server.ts"]