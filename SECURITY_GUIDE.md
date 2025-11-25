# Guía de Seguridad - Prevención de Vulnerabilidades

## 🔒 Índice
1. [OWASP Top 10 - 2024](#owasp-top-10)
2. [Inyección de Código](#inyección-de-código)
3. [Autenticación y Autorización](#autenticación-y-autorización)
4. [Manejo de Datos Sensibles](#manejo-de-datos-sensibles)
5. [Seguridad en APIs](#seguridad-en-apis)
6. [Seguridad Frontend](#seguridad-frontend)
7. [Seguridad en Dependencias](#seguridad-en-dependencias)
8. [Logging y Monitoreo](#logging-y-monitoreo)
9. [Checklist de Seguridad](#checklist-de-seguridad)

---

## OWASP Top 10

### 1. Broken Access Control
### 2. Cryptographic Failures
### 3. Injection
### 4. Insecure Design
### 5. Security Misconfiguration
### 6. Vulnerable and Outdated Components
### 7. Identification and Authentication Failures
### 8. Software and Data Integrity Failures
### 9. Security Logging and Monitoring Failures
### 10. Server-Side Request Forgery (SSRF)

---

## Inyección de Código

### SQL Injection

#### ❌ VULNERABLE
```python
# Python
username = request.form['username']
query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# Ataque: username = "admin' OR '1'='1"
# Query resultante: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
```

```javascript
// JavaScript/Node.js
const username = req.body.username;
const query = `SELECT * FROM users WHERE username = '${username}'`;
db.query(query);
```

```java
// Java
String username = request.getParameter("username");
String query = "SELECT * FROM users WHERE username = '" + username + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

#### ✅ SEGURO

**Python:**
```python
# Usando parametrización
username = request.form['username']
query = "SELECT * FROM users WHERE username = ?"
cursor.execute(query, (username,))

# Con SQLAlchemy (ORM)
from sqlalchemy import select
stmt = select(User).where(User.username == username)
result = session.execute(stmt)

# Con Django ORM
User.objects.filter(username=username)
```

**JavaScript:**
```javascript
// Node.js con biblioteca apropiada
const username = req.body.username;

// Con mysql2
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE username = ?',
  [username]
);

// Con Sequelize (ORM)
const user = await User.findOne({
  where: { username: username }
});

// Con Prisma
const user = await prisma.user.findUnique({
  where: { username: username }
});
```

**Java:**
```java
// Usando PreparedStatement
String username = request.getParameter("username");
String query = "SELECT * FROM users WHERE username = ?";
PreparedStatement pstmt = connection.prepareStatement(query);
pstmt.setString(1, username);
ResultSet rs = pstmt.executeQuery();
```

### NoSQL Injection

#### ❌ VULNERABLE
```javascript
// MongoDB
const username = req.body.username;
const password = req.body.password;

// Ataque: {username: {$ne: null}, password: {$ne: null}}
db.collection('users').findOne({
  username: username,
  password: password
});
```

#### ✅ SEGURO
```javascript
// Validar tipos de datos
const username = String(req.body.username);
const password = String(req.body.password);

// Sanitizar entrada
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[^\w\s-]/gi, '');
};

db.collection('users').findOne({
  username: sanitizeString(username),
  password: hashedPassword
});

// Mejor aún: usar Mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});
```

### Command Injection

#### ❌ VULNERABLE
```python
# Python
import os
filename = request.form['filename']
os.system(f"cat {filename}")  # Ataque: "file.txt; rm -rf /"

# Subprocess sin protección
import subprocess
subprocess.call(f"ping {user_input}", shell=True)
```

```javascript
// Node.js
const { exec } = require('child_process');
const filename = req.body.filename;
exec(`cat ${filename}`);  // Vulnerable
```

#### ✅ SEGURO
```python
# Python - Usar subprocess con array de argumentos
import subprocess
import shlex

filename = request.form['filename']

# Opción 1: Sin shell
subprocess.run(["cat", filename], check=True)

# Opción 2: Sanitizar con shlex
safe_filename = shlex.quote(filename)
subprocess.run(f"cat {safe_filename}", shell=True, check=True)

# Opción 3: Validar whitelist
import os
import re

def is_safe_filename(filename):
    # Solo alfanuméricos, guiones, puntos
    return bool(re.match(r'^[\w\-\.]+$', filename))

if is_safe_filename(filename) and os.path.exists(filename):
    subprocess.run(["cat", filename], check=True)
else:
    raise ValueError("Invalid filename")
```

```javascript
// Node.js
const { execFile } = require('child_process');
const filename = req.body.filename;

// Usar execFile sin shell
execFile('cat', [filename], (error, stdout, stderr) => {
  if (error) throw error;
  console.log(stdout);
});

// O validar input
function isValidFilename(filename) {
  return /^[\w\-\.]+$/.test(filename);
}

if (isValidFilename(filename)) {
  execFile('cat', [filename]);
}
```

### Path Traversal

#### ❌ VULNERABLE
```python
# Python
filename = request.args.get('file')
# Ataque: file=../../../../etc/passwd
with open(f"/var/www/uploads/{filename}", 'r') as f:
    content = f.read()
```

```javascript
// Node.js
const filename = req.query.file;
// Ataque: file=../../../../etc/passwd
const content = fs.readFileSync(`/var/www/uploads/${filename}`);
```

#### ✅ SEGURO
```python
# Python
import os
from pathlib import Path

def safe_read_file(filename, base_dir="/var/www/uploads"):
    # Normalizar y validar path
    base_path = Path(base_dir).resolve()
    file_path = (base_path / filename).resolve()

    # Verificar que está dentro del directorio permitido
    if not file_path.is_relative_to(base_path):
        raise ValueError("Invalid file path")

    # Verificar que existe y es archivo
    if not file_path.is_file():
        raise FileNotFoundError("File not found")

    with open(file_path, 'r') as f:
        return f.read()

# Uso
filename = request.args.get('file')
content = safe_read_file(filename)
```

```javascript
// Node.js
const path = require('path');
const fs = require('fs');

function safeReadFile(filename, baseDir = '/var/www/uploads') {
  // Resolver paths absolutos
  const basePath = path.resolve(baseDir);
  const filePath = path.resolve(basePath, filename);

  // Verificar que está dentro del directorio permitido
  if (!filePath.startsWith(basePath)) {
    throw new Error('Invalid file path');
  }

  // Verificar que existe
  if (!fs.existsSync(filePath)) {
    throw new Error('File not found');
  }

  return fs.readFileSync(filePath, 'utf8');
}

// Uso
const filename = req.query.file;
const content = safeReadFile(filename);
```

---

## Autenticación y Autorización

### Almacenamiento de Contraseñas

#### ❌ VULNERABLE
```python
# Plaintext
password = request.form['password']
user.password = password  # NUNCA

# MD5/SHA1 (no son suficientes)
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()  # INSEGURO
```

#### ✅ SEGURO
```python
# Python - bcrypt
import bcrypt

# Hashear contraseña
password = request.form['password']
salt = bcrypt.gensalt(rounds=12)  # Más rounds = más seguro pero más lento
hashed = bcrypt.hashpw(password.encode('utf-8'), salt)

# Guardar en BD
user.password_hash = hashed

# Verificar contraseña
def verify_password(stored_hash, password_attempt):
    return bcrypt.checkpw(
        password_attempt.encode('utf-8'),
        stored_hash
    )

# Alternativa: Argon2 (recomendado por OWASP)
from argon2 import PasswordHasher

ph = PasswordHasher()
hash = ph.hash(password)
# Verificar
try:
    ph.verify(hash, password_attempt)
    # Contraseña correcta
except:
    # Contraseña incorrecta
    pass
```

```javascript
// Node.js - bcrypt
const bcrypt = require('bcrypt');

// Hashear contraseña
const saltRounds = 12;
const password = req.body.password;
const hash = await bcrypt.hash(password, saltRounds);

// Guardar en BD
user.passwordHash = hash;

// Verificar contraseña
const isValid = await bcrypt.compare(passwordAttempt, user.passwordHash);
```

### JWT (JSON Web Tokens)

#### ❌ VULNERABLE
```javascript
// No verificar signature
const token = req.headers.authorization;
const decoded = jwt.decode(token);  // PELIGROSO: no verifica
const userId = decoded.userId;

// Usar algoritmo 'none'
const token = jwt.sign({ userId: 123 }, null, { algorithm: 'none' });

// Secret débil
const token = jwt.sign({ userId: 123 }, 'secret');
```

#### ✅ SEGURO
```javascript
const jwt = require('jsonwebtoken');

// Generar secret fuerte (guardar en env var)
// openssl rand -base64 32
const JWT_SECRET = process.env.JWT_SECRET;

// Crear token
const token = jwt.sign(
  {
    userId: user.id,
    role: user.role
  },
  JWT_SECRET,
  {
    algorithm: 'HS256',
    expiresIn: '1h',  // Token expira en 1 hora
    issuer: 'your-app',
    audience: 'your-app-users'
  }
);

// Verificar token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'your-app',
      audience: 'your-app-users'
    });
    return decoded;
  } catch (error) {
    // Token inválido, expirado, etc.
    throw new Error('Invalid token');
  }
}

// Middleware de autenticación
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Uso
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});
```

### Autorización (RBAC - Role-Based Access Control)

```python
# Python/Flask
from functools import wraps
from flask import abort

def require_role(*roles):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not hasattr(g, 'user'):
                abort(401)  # No autenticado

            if g.user.role not in roles:
                abort(403)  # No autorizado

            return f(*args, **kwargs)
        return decorated_function
    return decorator

# Uso
@app.route('/admin/users')
@require_role('admin', 'superadmin')
def list_users():
    return jsonify(users)

# Verificación a nivel de recurso
@app.route('/api/posts/<int:post_id>', methods=['DELETE'])
@require_auth
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)

    # Verificar que el usuario es dueño o admin
    if post.author_id != g.user.id and g.user.role != 'admin':
        abort(403)

    post.delete()
    return '', 204
```

```javascript
// Node.js/Express
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

// Uso
app.get('/admin/users', requireRole('admin', 'superadmin'), (req, res) => {
  res.json({ users });
});

// Verificación a nivel de recurso
app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  // Verificar ownership o rol de admin
  if (post.authorId !== req.user.userId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  await post.delete();
  res.status(204).send();
});
```

### Rate Limiting

```javascript
// Node.js - Express Rate Limit
const rateLimit = require('express-rate-limit');

// Rate limit general
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests por ventana
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Rate limit estricto para login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Solo 5 intentos de login en 15 min
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later'
});

app.post('/api/login', loginLimiter, loginHandler);
```

```python
# Python/Flask - Flask-Limiter
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Límite específico para endpoint
@app.route("/api/login", methods=["POST"])
@limiter.limit("5 per 15 minutes")
def login():
    pass
```

---

## Manejo de Datos Sensibles

### Variables de Entorno

#### ❌ VULNERABLE
```python
# Hardcoded en código
API_KEY = "sk-1234567890abcdef"
DATABASE_URL = "postgresql://user:pass@localhost/db"
```

#### ✅ SEGURO

**Estructura de archivos:**
```
project/
├── .env.example          # Template sin valores reales
├── .env                  # Local (en .gitignore)
├── .gitignore           # DEBE incluir .env
└── config.py            # Carga variables de entorno
```

**.env.example:**
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# API Keys
OPENAI_API_KEY=your_key_here
STRIPE_SECRET_KEY=your_key_here

# JWT
JWT_SECRET=your_secret_here

# Environment
ENVIRONMENT=development
DEBUG=true
```

**.gitignore:**
```
.env
.env.local
.env.*.local
*.key
*.pem
credentials.json
secrets/
config/secrets.yml
```

**Python - Cargar variables:**
```python
# config.py
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Database
    DATABASE_URL = os.getenv('DATABASE_URL')
    if not DATABASE_URL:
        raise ValueError("DATABASE_URL must be set")

    # API Keys
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')

    # JWT
    JWT_SECRET = os.getenv('JWT_SECRET')

    # Environment
    ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
    DEBUG = os.getenv('DEBUG', 'false').lower() == 'true'

    @classmethod
    def validate(cls):
        """Valida que todas las variables requeridas estén presentes"""
        required = ['DATABASE_URL', 'JWT_SECRET']
        missing = [var for var in required if not getattr(cls, var)]
        if missing:
            raise ValueError(f"Missing required env vars: {', '.join(missing)}")

# Validar al inicio
Config.validate()
```

**JavaScript/Node.js:**
```javascript
// config.js
require('dotenv').config();

const config = {
  database: {
    url: process.env.DATABASE_URL,
  },
  api: {
    openai: process.env.OPENAI_API_KEY,
    stripe: process.env.STRIPE_SECRET_KEY,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  environment: process.env.ENVIRONMENT || 'development',
  debug: process.env.DEBUG === 'true',
};

// Validar variables requeridas
function validateConfig() {
  const required = ['DATABASE_URL', 'JWT_SECRET'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(', ')}`);
  }
}

validateConfig();

module.exports = config;
```

### Encriptación de Datos

```python
# Python - Encriptar datos sensibles en BD
from cryptography.fernet import Fernet
import base64
import os

class DataEncryption:
    def __init__(self):
        # Cargar key desde env (generar con: Fernet.generate_key())
        key = os.getenv('ENCRYPTION_KEY').encode()
        self.cipher = Fernet(key)

    def encrypt(self, data: str) -> str:
        """Encripta string y retorna base64"""
        encrypted = self.cipher.encrypt(data.encode())
        return base64.b64encode(encrypted).decode()

    def decrypt(self, encrypted_data: str) -> str:
        """Desencripta base64 string"""
        decoded = base64.b64decode(encrypted_data.encode())
        decrypted = self.cipher.decrypt(decoded)
        return decrypted.decode()

# Uso
encryptor = DataEncryption()

# Guardar
user.ssn_encrypted = encryptor.encrypt(ssn)

# Leer
ssn = encryptor.decrypt(user.ssn_encrypted)
```

### Logging Seguro

#### ❌ VULNERABLE
```python
# Loggear información sensible
logger.info(f"User login: {username} with password {password}")
logger.debug(f"API Key: {api_key}")
logger.error(f"Card number: {credit_card}")
```

#### ✅ SEGURO
```python
import logging
import re

class SecureLogger:
    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def sanitize(self, message: str) -> str:
        """Remueve información sensible de logs"""
        # Máscaras para diferentes tipos de datos
        patterns = {
            # Credit cards
            r'\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b': 'XXXX-XXXX-XXXX-XXXX',
            # Emails (parcial)
            r'\b([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b': r'\1***@\2',
            # API keys (pattern común)
            r'\b(sk-|pk-)[a-zA-Z0-9]{32,}\b': 'API_KEY_REDACTED',
            # Passwords (en URLs)
            r'password[=:]\s*[^\s&]+': 'password=REDACTED',
        }

        sanitized = message
        for pattern, replacement in patterns.items():
            sanitized = re.sub(pattern, replacement, sanitized)

        return sanitized

    def info(self, message: str):
        self.logger.info(self.sanitize(message))

    def error(self, message: str):
        self.logger.error(self.sanitize(message))

    def debug(self, message: str):
        self.logger.debug(self.sanitize(message))

# Uso
logger = SecureLogger()
logger.info(f"User login: {username}")  # OK
logger.debug(f"Processing payment for card {card_number}")  # Será sanitizado
```

---

## Seguridad en APIs

### CORS (Cross-Origin Resource Sharing)

#### ❌ VULNERABLE
```javascript
// Permitir todos los orígenes
app.use(cors({
  origin: '*',  // PELIGROSO
  credentials: true
}));
```

#### ✅ SEGURO
```javascript
const cors = require('cors');

// Whitelist de orígenes permitidos
const allowedOrigins = [
  'https://yourdomain.com',
  'https://app.yourdomain.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : null
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Input Validation

```javascript
// Node.js - Express Validator
const { body, validationResult } = require('express-validator');

app.post('/api/users',
  // Validaciones
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be valid email'),

  body('age')
    .isInt({ min: 18, max: 120 })
    .withMessage('Age must be between 18 and 120'),

  body('username')
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be alphanumeric'),

  body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),

  // Handler
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Procesar request
    createUser(req.body);
  }
);
```

```python
# Python - Pydantic
from pydantic import BaseModel, EmailStr, validator
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    age: int
    username: str
    password: str

    @validator('age')
    def validate_age(cls, v):
        if v < 18 or v > 120:
            raise ValueError('Age must be between 18 and 120')
        return v

    @validator('username')
    def validate_username(cls, v):
        if not v.isalnum() and '_' not in v:
            raise ValueError('Username must be alphanumeric')
        if len(v) < 3 or len(v) > 20:
            raise ValueError('Username must be 3-20 characters')
        return v

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain number')
        return v

# Uso en FastAPI
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.post("/api/users")
async def create_user(user: UserCreate):
    # Pydantic valida automáticamente
    # Si hay errores, FastAPI retorna 422
    return {"message": "User created", "email": user.email}
```

### Security Headers

```javascript
// Node.js - Helmet
const helmet = require('helmet');

app.use(helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  // HSTS
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  // Otros headers
  referrerPolicy: { policy: 'no-referrer' },
  noSniff: true,
  xssFilter: true,
  frameguard: { action: 'deny' }
}));
```

---

## Seguridad Frontend

### XSS (Cross-Site Scripting)

#### ❌ VULNERABLE
```javascript
// React
function UserProfile({ userName }) {
  return <div dangerouslySetInnerHTML={{__html: userName}} />;
}

// Vanilla JS
element.innerHTML = userInput;

// jQuery
$('#content').html(userInput);
```

#### ✅ SEGURO
```javascript
// React - Escape automático
function UserProfile({ userName }) {
  return <div>{userName}</div>;  // React escapa automáticamente
}

// Si REALMENTE necesitas HTML, sanitiza primero
import DOMPurify from 'dompurify';

function RichTextDisplay({ htmlContent }) {
  const clean = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href']
  });

  return <div dangerouslySetInnerHTML={{__html: clean}} />;
}

// Vanilla JS
element.textContent = userInput;  // Seguro

// O sanitizar
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

### CSRF (Cross-Site Request Forgery)

```javascript
// Node.js - csurf
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  // Pasar token a template
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  // Token es verificado automáticamente
  res.send('Data processed');
});
```

```html
<!-- HTML Form -->
<form method="POST" action="/process">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  <button type="submit">Submit</button>
</form>

<!-- JavaScript/Fetch -->
<script>
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  fetch('/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify(data)
  });
</script>
```

---

## Seguridad en Dependencias

### Auditoría Regular

```bash
# Node.js
npm audit
npm audit fix

# Python
pip-audit
safety check

# O con Poetry
poetry show --outdated
```

### Dependabot / Renovate

**`.github/dependabot.yml`:**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "security-team"
    labels:
      - "dependencies"
      - "security"

  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
```

### Lock Files

```bash
# Node.js - Usar package-lock.json
npm ci  # En CI/CD, instala exactamente lo del lock file

# Python - Usar requirements.txt con versiones específicas
pip freeze > requirements.txt

# O usar Poetry/Pipenv que manejan lock files
poetry lock
pipenv lock
```

---

## Logging y Monitoreo

### Logging de Eventos de Seguridad

```python
import logging
from datetime import datetime

security_logger = logging.getLogger('security')

def log_security_event(event_type, user_id, details, severity='INFO'):
    """Log eventos de seguridad para auditoría"""
    security_logger.log(
        getattr(logging, severity),
        f"SECURITY_EVENT | "
        f"type={event_type} | "
        f"user_id={user_id} | "
        f"timestamp={datetime.utcnow().isoformat()} | "
        f"details={details}"
    )

# Ejemplos de uso
log_security_event('LOGIN_SUCCESS', user.id, {'ip': request.remote_addr})
log_security_event('LOGIN_FAILED', username, {'ip': request.remote_addr, 'reason': 'invalid_password'}, 'WARNING')
log_security_event('PERMISSION_DENIED', user.id, {'resource': '/admin', 'action': 'DELETE'}, 'WARNING')
log_security_event('SUSPICIOUS_ACTIVITY', user.id, {'reason': 'multiple_failed_logins'}, 'ERROR')
```

### Monitoreo de Seguridad

**Eventos a Monitorear:**
- ✓ Intentos fallidos de login
- ✓ Cambios en permisos/roles
- ✓ Acceso a recursos sensibles
- ✓ Cambios en configuración de seguridad
- ✓ Errores de autenticación/autorización
- ✓ Rate limiting triggers
- ✓ Patrones inusuales de acceso

---

## Checklist de Seguridad

### Pre-Deployment

- [ ] Todas las dependencias están actualizadas
- [ ] Audit de dependencias pasa sin vulnerabilidades críticas
- [ ] No hay secrets hardcoded en código
- [ ] Variables de entorno configuradas correctamente
- [ ] DEBUG mode deshabilitado en producción
- [ ] HTTPS configurado y forzado
- [ ] Security headers configurados (CSP, HSTS, etc.)
- [ ] CORS configurado apropiadamente
- [ ] Rate limiting implementado
- [ ] Logging de seguridad configurado
- [ ] Backups configurados y testeados

### Input Validation

- [ ] Todo input externo es validado
- [ ] Validación es whitelist, no blacklist
- [ ] Queries usan parametrización (no string concatenation)
- [ ] File uploads tienen validación de tipo y tamaño
- [ ] Path traversal está prevenido

### Autenticación/Autorización

- [ ] Contraseñas hasheadas con algoritmo moderno (bcrypt/Argon2)
- [ ] JWT tokens tienen expiración
- [ ] Tokens son verificados correctamente
- [ ] CSRF protection implementada
- [ ] Session timeout configurado
- [ ] Rate limiting en endpoints de login
- [ ] MFA disponible (si aplica)
- [ ] Autorización verificada en cada endpoint

### Datos Sensibles

- [ ] Datos sensibles encriptados en tránsito (HTTPS)
- [ ] Datos sensibles encriptados en reposo
- [ ] No se loggea información sensible
- [ ] Backups están encriptados
- [ ] Keys de encriptación rotadas regularmente

### APIs

- [ ] Validación de input en todos los endpoints
- [ ] Rate limiting configurado
- [ ] Autenticación requerida donde apropiado
- [ ] Autorización verificada
- [ ] Error messages no exponen información interna
- [ ] API versioning implementado

---

## Respuesta a Incidentes

### Plan de Acción

1. **Detectar**: Monitoring y alertas
2. **Contener**: Aislar sistema afectado
3. **Erradicar**: Remover amenaza
4. **Recuperar**: Restaurar servicio
5. **Aprender**: Post-mortem y mejoras

### Contactos de Emergencia

```
Security Team Lead: security@example.com
On-Call Engineer: +1-xxx-xxx-xxxx
Infrastructure: infra@example.com
```

---

## Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

**Última actualización:** 2025-11-25
