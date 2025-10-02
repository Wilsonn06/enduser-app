# Gunakan versi LTS yang sesuai dengan dependency (React Router butuh >=20)
FROM node:20

# Set direktori kerja di container
WORKDIR /app

# Copy package.json dulu untuk memanfaatkan cache Docker
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Expose port (sesuai index.js Express kamu, biasanya 3000 atau 8080)
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "index.js"]
