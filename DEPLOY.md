# 🚀 Guía de Deploy - QAQC Framework

## Solución al Error "npm run build exited with 1"

Este error está **resuelto**. Los cambios incluyen:

1. ✅ Configuración de fuente Inter con fallback
2. ✅ Script de build actualizado para incluir Prisma
3. ✅ Archivo `vercel.json` creado
4. ✅ Archivo `.vercelignore` para optimizar deploy

---

## 📋 Pasos para Deploy en Vercel

### 1. Push de Cambios a GitHub

Estos archivos ya están listos y deben estar en tu repo:
- `vercel.json` - Configuración de Vercel
- `.vercelignore` - Archivos a ignorar
- `package.json` - Scripts de build actualizados
- `src/app/layout.tsx` - Fuente con fallback

### 2. Configurar Base de Datos en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Click en **"Storage"** en el menú lateral
3. Click en **"Create Database"** → **"Postgres"**
4. Nombra la base de datos: `qaqc-production`
5. Selecciona región (recomendado: cerca de tus usuarios)
6. Click **"Create"**
7. **Copia la URL** de conexión que aparece

### 3. Configurar Variables de Entorno

En tu proyecto de Vercel, ve a **Settings** → **Environment Variables** y agrega:

```bash
# Database (la URL que copiaste de Vercel Postgres)
DATABASE_URL=postgresql://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb

# NextAuth - Genera el secret con: openssl rand -base64 32
NEXTAUTH_URL=https://tu-proyecto.vercel.app
NEXTAUTH_SECRET=tu-secret-super-largo-y-aleatorio-aqui

# App
NEXT_PUBLIC_APP_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_APP_NAME=QAQC Framework

# Admin (opcional, para crear usuario admin)
ADMIN_EMAIL=admin@tudominio.com
ADMIN_PASSWORD=TuPasswordSeguro123!
```

**⚠️ IMPORTANTE:**
- Para `NEXTAUTH_SECRET`, genera uno seguro:
  ```bash
  openssl rand -base64 32
  ```
- Reemplaza `tu-proyecto` con tu dominio real de Vercel
- Marca todas como **Production**, **Preview**, y **Development**

### 4. Re-deploy

Una vez configuradas las variables:

1. Ve a **Deployments**
2. Click en los **"..."** del último deployment
3. Click **"Redeploy"**
4. Selecciona **"Use existing Build Cache"** ❌ (desactivado)
5. Click **"Redeploy"**

### 5. Ejecutar Migraciones (Solo Primera Vez)

Después del primer deploy exitoso:

**Opción A: Desde Vercel CLI**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link proyecto
vercel link

# Ejecutar migraciones
vercel env pull .env.production
npx prisma migrate deploy
```

**Opción B: Desde Vercel Dashboard**
1. Ve a **Settings** → **Functions**
2. Agrega función serverless para migraciones (ver abajo)

---

## 🔧 Troubleshooting

### Error: "next/font failed to fetch"
✅ **Resuelto** - El layout.tsx ahora tiene fallback a fuentes del sistema

### Error: "Prisma Client not generated"
✅ **Resuelto** - El script build ahora incluye `prisma generate`

### Error: "DATABASE_URL is not set"
⚠️ **Acción requerida:** Configura la variable DATABASE_URL en Vercel (ver paso 3)

### Error: "Cannot find module '@prisma/client'"
```bash
# En Vercel, esto se resuelve automáticamente
# Localmente, ejecuta:
npm install
npx prisma generate
```

### Error de Build pero Deploy exitoso después de segundos intento
✅ **Normal** - Vercel a veces tarda en sincronizar variables de entorno

---

## 📊 Verificar Deploy Exitoso

1. Abre tu URL: `https://tu-proyecto.vercel.app`
2. Deberías ver la landing page con animaciones
3. Prueba el dark mode (toggle en la esquina superior)
4. Prueba el command palette (presiona `⌘K` o `Ctrl+K`)
5. Visita `/admin` para ver el panel de administración

---

## 🔐 Seguridad Post-Deploy

- [ ] Cambia el `NEXTAUTH_SECRET` a uno generado
- [ ] Configura dominio personalizado (opcional)
- [ ] Habilita HTTPS (automático en Vercel)
- [ ] Configura CSP headers (ya incluido en `next.config.js`)
- [ ] Revisa logs de error en Vercel Dashboard

---

## 🎯 Próximos Pasos

1. **Configurar Autenticación**: Implementa NextAuth con proveedores
2. **Crear Usuario Admin**: Usa Prisma Studio o seed script
3. **Personalizar Contenido**: Edita las páginas desde `/admin`
4. **Configurar Analytics**: Vercel Analytics (gratis)
5. **Dominio Personalizado**: Settings → Domains

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs en Vercel Dashboard → Deployments → [tu-deploy] → Build Logs
2. Verifica que todas las variables de entorno estén configuradas
3. Revisa este archivo para soluciones comunes

**¿Todo funcionando?** 🎉
Ahora tu app está en producción con:
- ✅ UI/UX de clase mundial
- ✅ Dark mode
- ✅ Animaciones con Framer Motion
- ✅ Command Palette
- ✅ Admin Panel
- ✅ Base de datos PostgreSQL
- ✅ Headers de seguridad
- ✅ Optimizaciones de Next.js 14
