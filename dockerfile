# Stage 1: Build
FROM node:18.20.4 AS builder

# Set working directory
WORKDIR /app

# Menyalin package.json
COPY package*.json ./

# Menginstal dependensi
RUN yarn install

# Menyalin semua file ke dalam container
COPY . .

# Membangun aplikasi TypeScript
RUN yarn run build

# Stage 2: Run
FROM node:18.20.4

# Set working directory
WORKDIR /app

# Menyalin hasil build dari stage sebelumnya
COPY --from=builder /app/dist ./dist

# Menyalin package.json dan yarn.lock untuk runtime
COPY package*.json ./

# Menginstal dependensi produksi
RUN yarn install --production

# Menjalankan aplikasi
CMD ["node", "dist/index.js"]
