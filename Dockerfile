# Stage 1: Build stage
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn install --only=production

COPY . .
RUN yarn run build

# Stage 2: Production stage
FROM node:18-alpine
WORKDIR /app

# Install Google Chrome
RUN apk add --no-cache \
    chromium

COPY --from=builder /app/src/renderer ./dist/renderer
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/deploy ./deploy

# Set Chrome as default path
ENV CHROME_BIN=/usr/bin/chromium-browser

CMD ["node", "dist/index.js"]
