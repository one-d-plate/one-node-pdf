# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies and build the application
RUN yarn install && yarn run build

# Stage 2: Run
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the build output and production dependencies
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN yarn install --production

# Expose the application port (if necessary, e.g., 3000)
# EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
