# Menggunakan image Node.js sebagai base
FROM node:18.20.4

# Set working directory
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstal dependensi
RUN yarn install

# Menyalin semua file ke dalam container
COPY . .

# Membangun aplikasi TypeScript
RUN yarn run build

# Menjalankan aplikasi
CMD ["node", "dist/index.js"]
