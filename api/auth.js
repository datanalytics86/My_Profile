/**
 * API Endpoint: /api/auth
 * Maneja la autenticación del panel de administración
 * Compatible con Vercel Serverless Functions
 */

import crypto from 'crypto';

// Rate limiting para prevenir ataques de fuerza bruta
const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos

function checkLoginAttempts(ip) {
    const now = Date.now();
    const attempts = loginAttempts.get(ip);

    if (!attempts) {
        return { allowed: true, remaining: MAX_ATTEMPTS };
    }

    // Limpiar intentos antiguos
    if (now - attempts.lastAttempt > LOCKOUT_TIME) {
        loginAttempts.delete(ip);
        return { allowed: true, remaining: MAX_ATTEMPTS };
    }

    if (attempts.count >= MAX_ATTEMPTS) {
        const unlockTime = new Date(attempts.lastAttempt + LOCKOUT_TIME);
        return {
            allowed: false,
            remaining: 0,
            unlockAt: unlockTime.toISOString()
        };
    }

    return { allowed: true, remaining: MAX_ATTEMPTS - attempts.count };
}

function recordLoginAttempt(ip, success) {
    if (success) {
        loginAttempts.delete(ip);
        return;
    }

    const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 };
    attempts.count += 1;
    attempts.lastAttempt = Date.now();
    loginAttempts.set(ip, attempts);
}

// Hash de contraseña para comparación
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Generar token de sesión simple
function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

// Handler principal
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Método no permitido'
        });
    }

    const clientIP = req.headers['x-forwarded-for']?.split(',')[0] ||
                     req.headers['x-real-ip'] ||
                     'unknown';

    try {
        const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { action, username, password, token } = data;

        // Verificar rate limiting
        const rateCheck = checkLoginAttempts(clientIP);
        if (!rateCheck.allowed) {
            return res.status(429).json({
                success: false,
                error: `Demasiados intentos fallidos. Intenta después de ${rateCheck.unlockAt}`
            });
        }

        // Acción: Login
        if (action === 'login') {
            // Obtener credenciales de variables de entorno
            const validUsername = process.env.ADMIN_USERNAME || 'admin';
            const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

            // Si no hay hash configurado, usar fallback (solo desarrollo)
            let isValid = false;

            if (validPasswordHash) {
                // Producción: comparar con hash
                isValid = username === validUsername &&
                          hashPassword(password) === validPasswordHash;
            } else {
                // Desarrollo: usar credenciales por defecto (NO USAR EN PRODUCCIÓN)
                console.warn('ADMIN_PASSWORD_HASH no configurado - usando credenciales de desarrollo');
                isValid = username === 'nicolas' && password === 'andrade2025';
            }

            if (isValid) {
                recordLoginAttempt(clientIP, true);
                const sessionToken = generateToken();

                return res.status(200).json({
                    success: true,
                    token: sessionToken,
                    message: 'Autenticación exitosa'
                });
            } else {
                recordLoginAttempt(clientIP, false);
                const remaining = MAX_ATTEMPTS - (loginAttempts.get(clientIP)?.count || 0);

                return res.status(401).json({
                    success: false,
                    error: 'Credenciales incorrectas',
                    attemptsRemaining: remaining
                });
            }
        }

        // Acción: Verificar token (para futuras implementaciones)
        if (action === 'verify') {
            // Por ahora, la verificación se hace del lado del cliente
            // En producción, implementar JWT con firma
            return res.status(200).json({
                success: true,
                valid: !!token
            });
        }

        // Acción: Logout
        if (action === 'logout') {
            return res.status(200).json({
                success: true,
                message: 'Sesión cerrada'
            });
        }

        return res.status(400).json({
            success: false,
            error: 'Acción no válida'
        });

    } catch (error) {
        console.error('Error en /api/auth:', error);
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor'
        });
    }
}
