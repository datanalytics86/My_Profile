# My Profile - CV Online Profesional

Un portfolio/CV online moderno, interactivo y completamente responsivo construido con HTML5, CSS3 y JavaScript vanilla.

## Caracteristicas

- **Diseno Moderno**: Interfaz elegante con tema oscuro y efectos visuales atractivos
- **Totalmente Responsivo**: Se adapta perfectamente a cualquier dispositivo (desktop, tablet, movil)
- **Interactivo**: Animaciones suaves, efecto de escritura, filtros de proyectos y mas
- **Secciones Completas**:
  - Hero con presentacion personal
  - Sobre Mi con estadisticas animadas
  - Experiencia profesional (timeline)
  - Habilidades tecnicas y blandas
  - Proyectos destacados con filtros
  - Educacion y certificaciones
  - Formulario de contacto
- **Optimizado**: Codigo limpio y optimizado para SEO

## Estructura del Proyecto

```
My_Profile/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos CSS con variables
├── script.js       # Funcionalidades JavaScript
└── README.md       # Documentacion
```

## Como Personalizar

### 1. Informacion Personal (index.html)

Busca y reemplaza los siguientes datos:

```html
<!-- Nombre -->
<h1 class="hero-name">Tu Nombre</h1>

<!-- Descripcion -->
<p class="hero-description">Tu descripcion profesional...</p>

<!-- Links de redes sociales -->
<a href="https://linkedin.com/in/tuperfil">LinkedIn</a>
<a href="https://github.com/tuusuario">GitHub</a>

<!-- Email y telefono -->
<a href="mailto:tucorreo@email.com">tucorreo@email.com</a>
<a href="tel:+1234567890">+1 234 567 890</a>
```

### 2. Experiencia Laboral

Edita la seccion `#experiencia` con tus trabajos:

```html
<div class="timeline-item">
    <div class="timeline-content">
        <h3 class="job-title">Tu Puesto</h3>
        <span class="job-company">@ Tu Empresa</span>
        <p class="job-date">2022 - Presente</p>
        <ul class="job-description">
            <li>Tus logros y responsabilidades</li>
        </ul>
    </div>
</div>
```

### 3. Habilidades

Modifica los niveles de habilidad (0-100):

```html
<div class="skill-item" data-skill="85">
    <span class="skill-name">JavaScript</span>
</div>
```

### 4. Proyectos

Actualiza la seccion `#proyectos` con tus proyectos:

```html
<article class="project-card" data-category="web">
    <h3 class="project-title">Nombre del Proyecto</h3>
    <p class="project-description">Descripcion...</p>
</article>
```

### 5. Educacion y Certificaciones

Personaliza tu formacion en la seccion `#educacion`.

### 6. Titulos del Efecto de Escritura (script.js)

```javascript
const titles = [
    'Desarrollador Full Stack',
    'Tu Especialidad',
    'Otro Titulo'
];
```

### 7. Foto de Perfil

Reemplaza el placeholder por tu imagen:

```html
<!-- En lugar de -->
<div class="profile-placeholder">...</div>

<!-- Usa -->
<img src="tu-foto.jpg" alt="Tu Nombre" class="profile-image">
```

### 8. Colores (styles.css)

Personaliza los colores en las variables CSS:

```css
:root {
    --primary-color: #6366f1;    /* Color principal */
    --secondary-color: #10b981;  /* Color secundario */
    --bg-primary: #0f172a;       /* Fondo oscuro */
}
```

## Despliegue

### GitHub Pages

1. Sube el repositorio a GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Tu CV estara disponible en `https://tuusuario.github.io/My_Profile`

### Netlify / Vercel

Simplemente conecta tu repositorio y despliega automaticamente.

## Tecnologias Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animaciones)
- JavaScript ES6+ (Vanilla)
- Font Awesome (iconos)
- Google Fonts (Inter, Fira Code)

## Licencia

Este proyecto es de uso libre. Personaliza y usa como desees.

---

Desarrollado con dedicacion para potenciar tu presencia profesional online.
