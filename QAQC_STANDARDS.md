# Estándares de QAQC (Quality Assurance / Quality Control)

## 📋 Tabla de Contenidos
1. [Introducción](#introducción)
2. [Estándares de Código](#estándares-de-código)
3. [Seguridad](#seguridad)
4. [Testing](#testing)
5. [Documentación](#documentación)
6. [Git Workflow](#git-workflow)
7. [Code Review Checklist](#code-review-checklist)
8. [CI/CD](#cicd)

---

## Introducción

Este documento establece los estándares de calidad y las mejores prácticas para el desarrollo de software en este proyecto. Todos los contribuidores deben seguir estas guías para mantener la calidad, seguridad y mantenibilidad del código.

---

## Estándares de Código

### Principios Generales

#### 1. **Clean Code**
- Nombres descriptivos para variables, funciones y clases
- Funciones pequeñas y con una sola responsabilidad
- Evitar código duplicado (DRY - Don't Repeat Yourself)
- Mantener bajo acoplamiento y alta cohesión
- Código auto-documentado siempre que sea posible

#### 2. **Convenciones de Nomenclatura**

**Variables y Funciones:**
```python
# Python
user_name = "John"
def calculate_total_price():
    pass

# JavaScript/TypeScript
const userName = "John";
function calculateTotalPrice() {}

# Java/C#
String userName = "John";
public void calculateTotalPrice() {}
```

**Clases:**
```python
# Python
class UserAccount:
    pass

# JavaScript/TypeScript
class UserAccount {}

# Java/C#
public class UserAccount {}
```

**Constantes:**
```python
# Python
MAX_RETRY_ATTEMPTS = 3
API_BASE_URL = "https://api.example.com"

# JavaScript/TypeScript
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = "https://api.example.com";
```

#### 3. **Indentación y Formato**
- **Python**: 4 espacios
- **JavaScript/TypeScript**: 2 espacios
- **Java/C#**: 4 espacios
- Líneas no deben exceder 100-120 caracteres
- Usar formatters automáticos (black, prettier, etc.)

#### 4. **Comentarios**
- Comentar el "por qué", no el "qué"
- Evitar comentarios obvios
- Mantener comentarios actualizados
- Usar docstrings/JSDoc para funciones públicas

```python
# ❌ MAL
# Incrementa x en 1
x = x + 1

# ✅ BIEN
# Compensamos el índice base-0 para el usuario
x = x + 1
```

---

## Seguridad

### OWASP Top 10 - Prevención

#### 1. **Inyección (SQL, NoSQL, Command)**

**❌ VULNERABLE:**
```python
# SQL Injection
query = f"SELECT * FROM users WHERE username = '{username}'"
cursor.execute(query)

# Command Injection
os.system(f"ping {user_input}")
```

**✅ SEGURO:**
```python
# Usar prepared statements
query = "SELECT * FROM users WHERE username = ?"
cursor.execute(query, (username,))

# Validar y sanitizar input
import shlex
safe_input = shlex.quote(user_input)
subprocess.run(["ping", safe_input])
```

#### 2. **Autenticación Rota**

**✅ MEJORES PRÁCTICAS:**
- Usar bibliotecas establecidas (OAuth, JWT)
- Implementar MFA cuando sea posible
- Políticas de contraseñas fuertes
- Timeouts de sesión apropiados
- Rate limiting en endpoints de login

```python
# Ejemplo con hash seguro de contraseñas
from werkzeug.security import generate_password_hash, check_password_hash

# Guardar contraseña
hashed = generate_password_hash(password, method='pbkdf2:sha256')

# Verificar contraseña
check_password_hash(hashed, password_attempt)
```

#### 3. **XSS (Cross-Site Scripting)**

**❌ VULNERABLE:**
```javascript
// Directamente insertar HTML sin sanitizar
element.innerHTML = userInput;
```

**✅ SEGURO:**
```javascript
// Usar textContent o sanitizar
element.textContent = userInput;

// O usar biblioteca de sanitización
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

#### 4. **Exposición de Datos Sensibles**

**✅ MEJORES PRÁCTICAS:**
- Nunca hardcodear credenciales
- Usar variables de entorno
- Encriptar datos sensibles en tránsito (HTTPS) y reposo
- No loggear información sensible

```python
# ❌ MAL
api_key = "sk-1234567890abcdef"

# ✅ BIEN
import os
api_key = os.getenv("API_KEY")
```

#### 5. **Control de Acceso**

**✅ MEJORES PRÁCTICAS:**
```python
# Verificar permisos antes de operaciones sensibles
def delete_user(current_user, user_id):
    if not current_user.is_admin():
        raise PermissionError("Unauthorized")

    # Verificar que no se elimine a sí mismo
    if current_user.id == user_id:
        raise ValueError("Cannot delete own account")

    User.delete(user_id)
```

#### 6. **Configuración de Seguridad**

**Checklist:**
- [ ] Deshabilitar debug mode en producción
- [ ] Remover endpoints/rutas no usadas
- [ ] Configurar headers de seguridad (CSP, HSTS, X-Frame-Options)
- [ ] Mantener dependencias actualizadas
- [ ] Usar HTTPS exclusivamente
- [ ] Configurar CORS apropiadamente

#### 7. **Validación de Input**

**✅ MEJORES PRÁCTICAS:**
```python
from typing import Optional
import re

def validate_email(email: str) -> bool:
    """Valida formato de email"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def validate_age(age: int) -> bool:
    """Valida rango de edad"""
    return 0 < age < 150

def sanitize_filename(filename: str) -> str:
    """Remueve caracteres peligrosos de nombres de archivo"""
    return re.sub(r'[^\w\s.-]', '', filename)
```

#### 8. **Manejo de Secretos**

**Estructura recomendada:**
```
.env.example          # Template sin valores reales
.env                  # Local (en .gitignore)
.gitignore           # Debe incluir .env
```

**.gitignore:**
```
.env
.env.local
*.key
*.pem
credentials.json
secrets/
```

---

## Testing

### Estrategia de Testing

#### 1. **Pirámide de Testing**
```
     /\
    /  \  E2E Tests (10%)
   /----\
  / Unit \ Integration Tests (30%)
 /--------\
/   Unit   \ Unit Tests (60%)
```

#### 2. **Unit Tests**

**Principios:**
- Probar una unidad de código aislada
- Fast, Independent, Repeatable, Self-validating, Timely (FIRST)
- Cobertura mínima: 80%

**Ejemplo Python:**
```python
import unittest

class TestCalculator(unittest.TestCase):

    def setUp(self):
        self.calc = Calculator()

    def test_add_positive_numbers(self):
        result = self.calc.add(2, 3)
        self.assertEqual(result, 5)

    def test_add_negative_numbers(self):
        result = self.calc.add(-2, -3)
        self.assertEqual(result, -5)

    def test_divide_by_zero_raises_error(self):
        with self.assertRaises(ZeroDivisionError):
            self.calc.divide(5, 0)
```

**Ejemplo JavaScript:**
```javascript
describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('adds positive numbers correctly', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('throws error on division by zero', () => {
    expect(() => calc.divide(5, 0)).toThrow();
  });
});
```

#### 3. **Integration Tests**
- Probar interacciones entre componentes
- Probar API endpoints
- Probar interacciones con base de datos

#### 4. **E2E Tests**
- Probar flujos completos de usuario
- Usar herramientas como Selenium, Playwright, Cypress

#### 5. **Test Coverage**

**Objetivos:**
- Cobertura de líneas: >80%
- Cobertura de branches: >75%
- Cobertura de funciones: >90%

**Comando ejemplo:**
```bash
# Python
pytest --cov=src --cov-report=html

# JavaScript
npm test -- --coverage
```

---

## Documentación

### 1. **README.md**

**Debe incluir:**
```markdown
# Nombre del Proyecto

## Descripción
Breve descripción del proyecto

## Requisitos
- Python 3.9+
- Node.js 16+
- PostgreSQL 13+

## Instalación
```bash
# Pasos de instalación
```

## Uso
```bash
# Ejemplos de uso
```

## Testing
```bash
# Cómo ejecutar tests
```

## Contribución
Ver CONTRIBUTING.md

## Licencia
MIT
```

### 2. **Docstrings / JSDoc**

**Python:**
```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    Calcula el precio final después de aplicar descuento.

    Args:
        price: Precio original del producto
        discount_percent: Porcentaje de descuento (0-100)

    Returns:
        Precio final con descuento aplicado

    Raises:
        ValueError: Si discount_percent no está en rango 0-100

    Example:
        >>> calculate_discount(100, 20)
        80.0
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("Discount must be between 0 and 100")

    return price * (1 - discount_percent / 100)
```

**JavaScript/TypeScript:**
```javascript
/**
 * Calcula el precio final después de aplicar descuento
 *
 * @param {number} price - Precio original del producto
 * @param {number} discountPercent - Porcentaje de descuento (0-100)
 * @returns {number} Precio final con descuento aplicado
 * @throws {Error} Si discountPercent no está en rango 0-100
 *
 * @example
 * calculateDiscount(100, 20); // returns 80
 */
function calculateDiscount(price, discountPercent) {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error("Discount must be between 0 and 100");
    }

    return price * (1 - discountPercent / 100);
}
```

### 3. **API Documentation**

Usar herramientas como:
- **OpenAPI/Swagger** para REST APIs
- **GraphQL Schema** para GraphQL
- **AsyncAPI** para APIs asíncronas

---

## Git Workflow

### 1. **Branch Strategy**

```
main/master          # Producción
├── develop          # Desarrollo
│   ├── feature/xyz  # Nuevas funcionalidades
│   ├── bugfix/abc   # Corrección de bugs
│   └── hotfix/123   # Fixes urgentes
└── release/v1.0     # Preparación de release
```

### 2. **Naming Conventions**

```
feature/add-user-authentication
bugfix/fix-login-error
hotfix/security-patch-cve-2024
refactor/improve-database-queries
docs/update-api-documentation
test/add-unit-tests-user-service
```

### 3. **Commit Messages**

**Formato:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Tipos:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo, sin cambio de lógica
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Mantenimiento (deps, configs)

**Ejemplos:**
```
feat(auth): add JWT authentication

Implements JWT-based authentication with refresh tokens.
- Add login endpoint
- Add token validation middleware
- Add refresh token mechanism

Closes #123

---

fix(api): resolve race condition in user creation

The user creation endpoint had a race condition when multiple
requests arrived simultaneously. Added transaction locking.

Fixes #456
```

### 4. **Pull Request Template**

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## Checklist
- [ ] Tests agregados/actualizados
- [ ] Documentación actualizada
- [ ] Code review completado
- [ ] CI/CD passing
- [ ] No hay conflictos

## Testing
Describe cómo se probaron los cambios

## Screenshots (si aplica)
```

---

## Code Review Checklist

### Pre-Review (Autor)
- [ ] Código compila sin errores
- [ ] Todos los tests pasan
- [ ] Cobertura de tests cumple estándares (>80%)
- [ ] Linter pasa sin errores
- [ ] No hay código comentado innecesario
- [ ] No hay console.log / print statements de debug
- [ ] Documentación actualizada
- [ ] Commit messages son claros

### Durante Review (Reviewer)

#### Funcionalidad
- [ ] El código hace lo que dice que hace
- [ ] Edge cases están cubiertos
- [ ] Manejo de errores es apropiado
- [ ] Input validation es suficiente

#### Código
- [ ] Nombres son descriptivos y claros
- [ ] Funciones son pequeñas y enfocadas
- [ ] No hay código duplicado
- [ ] Complejidad ciclomática es aceptable (<10)
- [ ] Sigue principios SOLID

#### Seguridad
- [ ] No hay hardcoded secrets
- [ ] Input es validado y sanitizado
- [ ] No hay vulnerabilidades obvias (SQL injection, XSS, etc.)
- [ ] Autenticación/autorización apropiada
- [ ] Datos sensibles están encriptados

#### Performance
- [ ] No hay N+1 queries
- [ ] Caching apropiado
- [ ] No hay memory leaks potenciales
- [ ] Algoritmos son eficientes

#### Testing
- [ ] Tests son significativos
- [ ] Tests cubren casos felices y edge cases
- [ ] Tests son mantenibles
- [ ] Mock/Stub apropiado

#### Documentación
- [ ] Código está documentado
- [ ] README actualizado si necesario
- [ ] API docs actualizadas si necesario

---

## CI/CD

### Pipeline Recomendado

```yaml
# Ejemplo GitHub Actions
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Linter
        run: |
          npm run lint
          # o python -m flake8

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: |
          npm test
          # o pytest
      - name: Upload Coverage
        run: |
          npm run coverage
          # o pytest --cov

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Security Scan
        run: |
          npm audit
          # o safety check (Python)
          # o snyk test

  build:
    needs: [lint, test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: |
          npm run build
          # o docker build

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Production
        run: |
          # Deploy steps
```

### Pre-commit Hooks

```bash
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict

  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black

  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
```

---

## Métricas de Calidad

### Objetivos

| Métrica | Objetivo | Crítico |
|---------|----------|---------|
| Test Coverage | >80% | >60% |
| Code Complexity | <10 | <15 |
| Duplication | <3% | <5% |
| Security Issues | 0 | 0 críticos |
| Build Time | <5 min | <10 min |
| Bug Density | <5/KLOC | <10/KLOC |

### Herramientas Recomendadas

**Análisis de Código:**
- SonarQube / SonarCloud
- CodeClimate
- Codacy

**Seguridad:**
- Snyk
- OWASP Dependency-Check
- GitGuardian (secretos)

**Testing:**
- Jest (JavaScript)
- Pytest (Python)
- JUnit (Java)

**Coverage:**
- Istanbul/NYC (JavaScript)
- Coverage.py (Python)
- JaCoCo (Java)

---

## Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [The Twelve-Factor App](https://12factor.net/)

---

## Changelog

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2025-11-25 | Versión inicial del documento QAQC |

---

**Última actualización:** 2025-11-25
**Mantenedores:** Equipo de Desarrollo
