# Perfil profesional – Nicolás Andrade

Landing page estática para destacar el perfil ejecutivo de Nicolás Andrade Socías, desplegable en Vercel.

## Vista previa local

```bash
python -m http.server 8000
```

Abre `http://localhost:8000` en el navegador.

## Edición rápida sin código (CMS local)

1. Abre `admin.html` en el navegador (misma carpeta del proyecto o desplegado en Vercel).
2. Inicia sesión con:
   - **Usuario:** `nicolas`
   - **Contraseña:** `andrade2025`
3. Ajusta textos (hero, resumen, métricas, CTA) o pega los JSON de habilidades, logros y proyectos.
4. Guarda los cambios. Se almacenan en `localStorage` del navegador; si borras la caché, vuelves al contenido del repositorio.
5. Recarga `index.html` para ver los cambios aplicados.

## Despliegue en Vercel

El proyecto incluye `vercel.json` para servir el sitio como estático, con `index.html` como catch-all.
