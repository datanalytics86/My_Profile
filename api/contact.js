/**
 * API Endpoint: /api/contact
 * Maneja el envío de mensajes del formulario de contacto
 * Compatible con Vercel Serverless Functions
 */

// Rate limiting simple (en memoria - para producción usar Redis)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 3; // máximo 3 requests por minuto por IP

function checkRateLimit(ip) {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    if (!rateLimit.has(ip)) {
        rateLimit.set(ip, []);
    }

    const requests = rateLimit.get(ip).filter(time => time > windowStart);
    rateLimit.set(ip, requests);

    if (requests.length >= MAX_REQUESTS) {
        return false;
    }

    requests.push(now);
    return true;
}

// Validación de campos
function validateInput(data) {
    const errors = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('El email no es válido');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }

    // Sanitización básica contra XSS
    if (data.message && /<script|javascript:|on\w+=/i.test(data.message)) {
        errors.push('El mensaje contiene contenido no permitido');
    }

    return errors;
}

// Sanitizar HTML
function sanitize(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Enviar email con Resend
async function sendWithResend(data) {
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
            to: process.env.CONTACT_EMAIL,
            subject: `[Portfolio] Nuevo mensaje de ${sanitize(data.name)}`,
            html: `
                <h2>Nuevo mensaje desde el portfolio</h2>
                <p><strong>Nombre:</strong> ${sanitize(data.name)}</p>
                <p><strong>Email:</strong> ${sanitize(data.email)}</p>
                <p><strong>Asunto:</strong> ${sanitize(data.subject || 'Sin asunto')}</p>
                <hr>
                <p><strong>Mensaje:</strong></p>
                <p>${sanitize(data.message).replace(/\n/g, '<br>')}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">
                    Enviado desde: ${process.env.SITE_URL || 'Portfolio'}<br>
                    Fecha: ${new Date().toLocaleString('es-CL')}
                </p>
            `,
            reply_to: data.email
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al enviar email');
    }

    return response.json();
}

// Enviar email con SendGrid
async function sendWithSendGrid(data) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{
                to: [{ email: process.env.CONTACT_EMAIL }]
            }],
            from: { email: process.env.FROM_EMAIL },
            reply_to: { email: data.email },
            subject: `[Portfolio] Nuevo mensaje de ${sanitize(data.name)}`,
            content: [{
                type: 'text/html',
                value: `
                    <h2>Nuevo mensaje desde el portfolio</h2>
                    <p><strong>Nombre:</strong> ${sanitize(data.name)}</p>
                    <p><strong>Email:</strong> ${sanitize(data.email)}</p>
                    <p><strong>Asunto:</strong> ${sanitize(data.subject || 'Sin asunto')}</p>
                    <hr>
                    <p><strong>Mensaje:</strong></p>
                    <p>${sanitize(data.message).replace(/\n/g, '<br>')}</p>
                `
            }]
        })
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Error al enviar email con SendGrid');
    }

    return { success: true };
}

// Handler principal
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Método no permitido'
        });
    }

    try {
        // Rate limiting
        const clientIP = req.headers['x-forwarded-for']?.split(',')[0] ||
                         req.headers['x-real-ip'] ||
                         'unknown';

        if (!checkRateLimit(clientIP)) {
            return res.status(429).json({
                success: false,
                error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.'
            });
        }

        // Parsear body
        const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        // Validar input
        const validationErrors = validateInput(data);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: validationErrors
            });
        }

        // Verificar configuración de email
        const emailService = process.env.EMAIL_SERVICE || 'resend';

        if (emailService === 'resend' && !process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY no configurada');
            return res.status(500).json({
                success: false,
                error: 'Servicio de email no configurado'
            });
        }

        if (emailService === 'sendgrid' && !process.env.SENDGRID_API_KEY) {
            console.error('SENDGRID_API_KEY no configurada');
            return res.status(500).json({
                success: false,
                error: 'Servicio de email no configurado'
            });
        }

        // Enviar email
        if (emailService === 'sendgrid') {
            await sendWithSendGrid(data);
        } else {
            await sendWithResend(data);
        }

        // Log para debugging (no en producción)
        if (process.env.NODE_ENV !== 'production') {
            console.log('Email enviado:', {
                from: data.email,
                subject: data.subject,
                timestamp: new Date().toISOString()
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Mensaje enviado correctamente'
        });

    } catch (error) {
        console.error('Error en /api/contact:', error);

        return res.status(500).json({
            success: false,
            error: 'Error al enviar el mensaje. Intenta más tarde.'
        });
    }
}
