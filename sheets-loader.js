// ===== GOOGLE SHEETS DATA LOADER =====
// Este módulo carga datos desde Google Sheets y actualiza la página

const SheetsLoader = {
    // Cache de datos
    cache: {},

    // Construir URL de Google Sheets
    buildSheetURL(sheetId, sheetName) {
        const encodedName = encodeURIComponent(sheetName);
        return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodedName}`;
    },

    // Parsear respuesta de Google Sheets
    parseSheetData(responseText) {
        // Google Sheets devuelve JSON envuelto en una función
        // Formato: google.visualization.Query.setResponse({...})
        const jsonString = responseText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/);
        if (!jsonString || !jsonString[1]) {
            throw new Error('No se pudo parsear la respuesta de Google Sheets');
        }

        const data = JSON.parse(jsonString[1]);
        const table = data.table;
        const headers = table.cols.map(col => col.label || '');
        const rows = table.rows.map(row => {
            const obj = {};
            row.c.forEach((cell, index) => {
                const header = headers[index];
                if (header) {
                    obj[header] = cell ? (cell.v !== null ? cell.v : '') : '';
                }
            });
            return obj;
        });

        return { headers, rows };
    },

    // Cargar datos de una hoja
    async loadSheet(sheetName) {
        const config = window.SITE_CONFIG;
        if (!config || !config.GOOGLE_SHEET_ID) {
            console.log('Google Sheets no configurado, usando datos por defecto');
            return null;
        }

        // Verificar caché
        if (config.USE_CACHE) {
            const cached = this.getFromCache(sheetName);
            if (cached) {
                console.log(`Usando datos en caché para: ${sheetName}`);
                return cached;
            }
        }

        try {
            const url = this.buildSheetURL(config.GOOGLE_SHEET_ID, sheetName);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const text = await response.text();
            const data = this.parseSheetData(text);

            // Guardar en caché
            if (config.USE_CACHE) {
                this.saveToCache(sheetName, data);
            }

            return data;
        } catch (error) {
            console.error(`Error cargando hoja "${sheetName}":`, error);
            return null;
        }
    },

    // Guardar en caché local
    saveToCache(key, data) {
        const cacheEntry = {
            data: data,
            timestamp: Date.now()
        };
        localStorage.setItem(`sheets_cache_${key}`, JSON.stringify(cacheEntry));
    },

    // Obtener de caché local
    getFromCache(key) {
        const config = window.SITE_CONFIG;
        const cached = localStorage.getItem(`sheets_cache_${key}`);

        if (!cached) return null;

        try {
            const entry = JSON.parse(cached);
            const age = (Date.now() - entry.timestamp) / 1000 / 60; // minutos

            if (age < config.CACHE_DURATION) {
                return entry.data;
            }
        } catch (e) {
            console.error('Error leyendo caché:', e);
        }

        return null;
    },

    // Limpiar caché
    clearCache() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('sheets_cache_'));
        keys.forEach(k => localStorage.removeItem(k));
        console.log('Caché de Sheets limpiado');
    },

    // ===== FUNCIONES DE ACTUALIZACIÓN DE UI =====

    // Actualizar perfil (hero section)
    updateProfile(data) {
        if (!data || !data.rows || data.rows.length === 0) return;

        const profile = data.rows[0];

        // Nombre
        const heroName = document.querySelector('.hero-name');
        if (heroName && profile.nombre) {
            heroName.textContent = profile.nombre;
        }

        // Descripción
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) {
            if (profile.descripcion_es) heroDesc.setAttribute('data-es', profile.descripcion_es);
            if (profile.descripcion_en) heroDesc.setAttribute('data-en', profile.descripcion_en);
            heroDesc.textContent = profile.descripcion_es || profile.descripcion_en;
        }

        // Títulos profesionales (para rotación)
        if (profile.titulos_es) {
            window.titlesFromSheets = {
                es: profile.titulos_es.split('|').map(t => t.trim()),
                en: profile.titulos_en ? profile.titulos_en.split('|').map(t => t.trim()) : []
            };
        }

        // Stats
        if (profile.anos_experiencia) {
            const statYears = document.querySelector('.stat-number[data-target]');
            if (statYears) {
                statYears.setAttribute('data-target', profile.anos_experiencia);
                statYears.textContent = profile.anos_experiencia;
            }
        }
    },

    // Actualizar "Sobre Mi"
    updateAbout(data) {
        if (!data || !data.rows) return;

        const aboutTexts = document.querySelectorAll('.sobre-mi-text p');
        data.rows.forEach((row, index) => {
            if (aboutTexts[index]) {
                if (row.texto_es) aboutTexts[index].setAttribute('data-es', row.texto_es);
                if (row.texto_en) aboutTexts[index].setAttribute('data-en', row.texto_en);
                aboutTexts[index].textContent = row.texto_es || row.texto_en;
            }
        });
    },

    // Sanitize text to prevent XSS
    sanitize(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    },

    // Actualizar experiencia
    updateExperience(data) {
        if (!data || !data.rows || data.rows.length === 0) return;

        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        // Limpiar experiencias existentes
        timeline.innerHTML = '';

        data.rows.forEach(job => {
            const s = this.sanitize.bind(this);
            const item = document.createElement('div');
            item.className = 'timeline-item';

            const descItems = (job.descripcion_es || job.descripcion_en || '').split('|')
                .map(d => `<li>${s(d.trim())}</li>`).join('');
            const techItems = (job.tecnologias || '').split(',')
                .map(t => `<span class="tech-tag">${s(t.trim())}</span>`).join('');

            item.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3 class="job-title" data-es="${s(job.titulo_es)}" data-en="${s(job.titulo_en)}">${s(job.titulo_es || job.titulo_en)}</h3>
                        <span class="job-company">@ ${s(job.empresa)}</span>
                    </div>
                    <p class="job-date">
                        <i class="far fa-calendar-alt"></i>
                        <span data-es="${s(job.fecha_es)}" data-en="${s(job.fecha_en)}">${s(job.fecha_es || job.fecha_en)}</span>
                    </p>
                    <p class="job-project" data-es="${s(job.proyecto_es)}" data-en="${s(job.proyecto_en)}">${s(job.proyecto_es || job.proyecto_en)}</p>
                    <ul class="job-description">${descItems}</ul>
                    <div class="job-technologies">${techItems}</div>
                </div>
            `;
            timeline.appendChild(item);
        });
    },

    // Actualizar información de contacto
    updateContact(data) {
        if (!data || !data.rows || data.rows.length === 0) return;

        const contact = data.rows[0];

        // Email
        const emailLink = document.querySelector('.contact-method[href^="mailto:"]');
        if (emailLink && contact.email) {
            emailLink.href = `mailto:${contact.email}`;
            emailLink.querySelector('span').textContent = contact.email;
        }

        // Teléfono
        const phoneLink = document.querySelector('.contact-method[href^="tel:"]');
        if (phoneLink && contact.telefono) {
            phoneLink.href = `tel:${contact.telefono.replace(/\s/g, '')}`;
            phoneLink.querySelector('span').textContent = contact.telefono;
        }

        // Ubicación
        const locationDiv = document.querySelector('.contact-method:not([href])');
        if (locationDiv && contact.ubicacion) {
            locationDiv.querySelector('span').textContent = contact.ubicacion;
        }

        // LinkedIn
        const linkedinLink = document.querySelector('.contact-social a[href*="linkedin"]');
        if (linkedinLink && contact.linkedin) {
            linkedinLink.href = contact.linkedin;
        }
    },

    // Cargar todos los datos
    async loadAllData() {
        const config = window.SITE_CONFIG;
        if (!config || !config.GOOGLE_SHEET_ID) {
            console.log('Google Sheets no está configurado');
            return;
        }

        console.log('Cargando datos desde Google Sheets...');

        try {
            // Cargar en paralelo
            const [profile, experience, contact] = await Promise.all([
                this.loadSheet(config.SHEETS.PROFILE),
                this.loadSheet(config.SHEETS.EXPERIENCE),
                this.loadSheet(config.SHEETS.CONTACT)
            ]);

            // Actualizar UI
            if (profile) this.updateProfile(profile);
            if (experience) this.updateExperience(experience);
            if (contact) this.updateContact(contact);

            // Re-aplicar idioma actual
            if (typeof updatePageLanguage === 'function') {
                updatePageLanguage();
            }

            console.log('Datos cargados correctamente');
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // With defer scripts, config.js is guaranteed to load before this
    if (window.SITE_CONFIG && window.SITE_CONFIG.GOOGLE_SHEET_ID) {
        SheetsLoader.loadAllData();
    }
});

// Exponer globalmente para debugging
window.SheetsLoader = SheetsLoader;
