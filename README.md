# Perfil profesional – Nicolás Andrade

Landing page estática para destacar el perfil ejecutivo de Nicolás Andrade Socías, desplegable en Vercel.

## Características

- Diseño profesional y minimalista
- Soporte bilingüe (Español/Inglés)
- Panel de administración (CMS local)
- Formulario de contacto funcional
- Integración con Google Sheets (opcional)
- Google Analytics integrado
- Responsive design

## Vista previa local

```bash
python -m http.server 8000
```

Abre `http://localhost:8000` en el navegador.

## Edición rápida sin código (CMS local)

1. Abre `admin.html` en el navegador (misma carpeta del proyecto o desplegado en Vercel).
2. Inicia sesión con las credenciales configuradas
3. Ajusta textos (hero, resumen, métricas, CTA) o pega los JSON de habilidades, logros y proyectos.
4. Ejecuta el **healthcheck QA/QC** para validar formatos.
5. Guarda los cambios o exporta un respaldo (`admin-backup.json`).

---

## Despliegue en Producción (Vercel)

### Paso 1: Variables de Entorno

En el dashboard de Vercel, configura las siguientes variables de entorno:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `EMAIL_SERVICE` | Servicio de email (resend o sendgrid) | `resend` |
| `RESEND_API_KEY` | API Key de Resend | `re_xxxx...` |
| `CONTACT_EMAIL` | Email destino para mensajes | `tu@email.com` |
| `FROM_EMAIL` | Email remitente verificado | `contacto@tudominio.com` |
| `ADMIN_USERNAME` | Usuario del panel admin | `admin` |
| `ADMIN_PASSWORD_HASH` | Hash SHA256 de la contraseña | (ver abajo) |
| `SITE_URL` | URL del sitio | `https://tudominio.com` |

### Paso 2: Generar Hash de Contraseña

```bash
# En terminal:
node -e "console.log(require('crypto').createHash('sha256').update('TU_PASSWORD_AQUI').digest('hex'))"
```

### Paso 3: Configurar Email (Resend)

1. Crea una cuenta en [resend.com](https://resend.com)
2. Verifica tu dominio
3. Copia la API Key a `RESEND_API_KEY`

### Paso 4: Configurar Google Analytics

1. Crea una propiedad en [Google Analytics 4](https://analytics.google.com)
2. Copia tu ID de medición (formato `G-XXXXXXXXXX`)
3. Reemplaza `G-XXXXXXXXXX` en `index.html` líneas 15 y 20

### Paso 5: Google Sheets (Opcional)

Para gestionar contenido desde Google Sheets:

1. Crea un Google Sheet con las pestañas: Profile, Experience, Skills, Projects, Education, Contact
2. Publica el sheet: Archivo → Compartir → Publicar en web → Publicar
3. Copia el ID del sheet (entre `/d/` y `/edit` en la URL)
4. Agrega el ID en `config.js`:
   ```javascript
   GOOGLE_SHEET_ID: 'tu-sheet-id-aqui'
   ```

---

## Checklist de Deployment

### Antes de Producción

- [ ] Variables de entorno configuradas en Vercel
- [ ] Email de contacto verificado en Resend/SendGrid
- [ ] Google Analytics ID actualizado en `index.html`
- [ ] Password hash generado y configurado
- [ ] Contenido revisado y actualizado
- [ ] Probar formulario de contacto
- [ ] Probar login del admin panel

### Post-Deployment

- [ ] Verificar que el formulario envía emails
- [ ] Verificar tracking de Google Analytics
- [ ] Probar en móvil
- [ ] Verificar página 404 personalizada
- [ ] Configurar dominio personalizado (opcional)

---

## Estructura del Proyecto

```
├── index.html          # Página principal
├── admin.html          # Panel de administración
├── 404.html            # Página de error personalizada
├── styles.css          # Estilos principales
├── script.js           # Lógica del frontend
├── config.js           # Configuración de Google Sheets
├── sheets-loader.js    # Cargador de datos desde Sheets
├── vercel.json         # Configuración de Vercel
├── .env.example        # Plantilla de variables de entorno
├── api/
│   ├── contact.js      # API para formulario de contacto
│   └── auth.js         # API para autenticación admin
└── assets/
    ├── data/           # Datos JSON locales
    ├── css/            # Estilos adicionales
    └── docs/           # CV y documentos
```

## Seguridad

- Las credenciales del admin se validan via API
- Rate limiting en formulario de contacto (3 req/min)
- Rate limiting en login (5 intentos, luego bloqueo 15 min)
- Headers de seguridad configurados (X-Frame-Options, XSS, etc.)
- Validación y sanitización de inputs

## Soporte

Para reportar problemas o sugerir mejoras, crea un issue en el repositorio.
