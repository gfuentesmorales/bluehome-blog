#!/bin/sh
set -e

echo "Descargando master..."
git pull origin master

echo "📦 Deteniendo contenedores antiguos..."
docker compose down

echo "🚀 Reconstruyendo e iniciando nueva versión..."

docker compose up -d --build
echo "✅ Despliegue completado correctamente."