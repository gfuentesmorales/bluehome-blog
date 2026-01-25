# Usa Node 20, compatible con Next.js 16
FROM node:20-slim

# Carpeta de trabajo
WORKDIR /app

# Instalar OpenSSL y certificados de CA
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copiar package.json y package-lock.json primero para cachear npm install
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Build de Next.js en modo producción
RUN npm run build

# Exponer el puerto que Next.js usa internamente
EXPOSE 3000

# Arrancar Next.js en producción
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
