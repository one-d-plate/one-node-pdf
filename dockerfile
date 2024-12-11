# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the source code and build the application
COPY . .
RUN yarn run build

# Stage 2: Run
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the build output and production dependencies
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN yarn install --production

# Start the application
CMD ["node", "dist/index.js"]
