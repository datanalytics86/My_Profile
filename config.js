// ===== CONFIGURACIÓN DE GOOGLE SHEETS =====
//
// INSTRUCCIONES DE CONFIGURACIÓN:
// ================================
// 1. Crea un nuevo Google Sheet en https://sheets.google.com
// 2. Crea las siguientes hojas (tabs) con las columnas especificadas:
//
//    HOJA "Perfil" - Columnas:
//    | nombre | descripcion_es | descripcion_en | titulos_es | titulos_en | anos_experiencia |
//    - titulos_es/en: separados por "|" (ej: "Consultor|Analista|Ingeniero")
//
//    HOJA "Experiencia" - Columnas:
//    | titulo_es | titulo_en | empresa | fecha_es | fecha_en | proyecto_es | proyecto_en | descripcion_es | descripcion_en | tecnologias |
//    - descripcion_es/en: items separados por "|"
//    - tecnologias: separadas por ","
//
//    HOJA "Contacto" - Columnas:
//    | email | telefono | ubicacion | linkedin |
//
// 3. Ve a Archivo > Compartir > Publicar en la web
// 4. Selecciona "Documento completo" y formato "Página web"
// 5. Haz clic en "Publicar"
// 6. Copia el ID de tu hoja desde la URL (entre /d/ y /edit)
// 7. Pega el ID abajo en GOOGLE_SHEET_ID

const CONFIG = {
    // Reemplaza con el ID de tu Google Sheet
    // Ejemplo: si tu URL es https://docs.google.com/spreadsheets/d/1ABC123xyz/edit
    // El ID es: 1ABC123xyz
    GOOGLE_SHEET_ID: '',

    // Nombres de las hojas (tabs) en tu Google Sheet
    SHEETS: {
        PROFILE: 'Perfil',
        EXPERIENCE: 'Experiencia',
        SKILLS: 'Habilidades',
        PROJECTS: 'Proyectos',
        EDUCATION: 'Educacion',
        CONTACT: 'Contacto'
    },

    // Intervalo de actualización (en minutos) - 0 para solo al cargar
    REFRESH_INTERVAL: 0,

    // Usar caché local (localStorage)
    USE_CACHE: true,
    CACHE_DURATION: 60 // minutos
};

// No modificar esta línea
window.SITE_CONFIG = CONFIG;
