# bluehome-blog

## Configuración de producción

La aplicación está desplegada bajo la subruta `/blog`, por lo que se utiliza `basePath` para que todas las rutas, APIs y assets se resuelvan correctamente desde esa ruta.

La variable `NEXTAUTH_URL` debe incluir la subruta `/blog` para que NextAuth genere correctamente las URLs de autenticación y redirección.

### next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blog",
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;
