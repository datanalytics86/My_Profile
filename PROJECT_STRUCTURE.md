# Estructura de Proyectos Recomendada

## 📋 Tabla de Contenidos
1. [Node.js/TypeScript](#nodejs--typescript)
2. [Python](#python)
3. [React/Next.js](#react--nextjs)
4. [FastAPI/Django](#fastapi--django)
5. [Monorepo](#monorepo)
6. [Microservicios](#microservicios)

---

## Node.js / TypeScript

### Estructura Backend Express/Node

```
my-nodejs-app/
├── .github/                    # GitHub workflows y templates
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── cd.yml
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── src/                        # Código fuente
│   ├── config/                 # Configuración
│   │   ├── database.ts
│   │   ├── logger.ts
│   │   └── env.ts
│   │
│   ├── controllers/            # Controladores (lógica de rutas)
│   │   ├── user.controller.ts
│   │   └── auth.controller.ts
│   │
│   ├── services/               # Lógica de negocio
│   │   ├── user.service.ts
│   │   └── auth.service.ts
│   │
│   ├── models/                 # Modelos de datos
│   │   ├── user.model.ts
│   │   └── post.model.ts
│   │
│   ├── repositories/           # Capa de acceso a datos
│   │   ├── user.repository.ts
│   │   └── post.repository.ts
│   │
│   ├── middleware/             # Middleware de Express
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── routes/                 # Definición de rutas
│   │   ├── index.ts
│   │   ├── user.routes.ts
│   │   └── auth.routes.ts
│   │
│   ├── utils/                  # Utilidades
│   │   ├── logger.ts
│   │   ├── jwt.ts
│   │   └── validation.ts
│   │
│   ├── types/                  # Type definitions
│   │   ├── express.d.ts
│   │   └── models.ts
│   │
│   ├── constants/              # Constantes
│   │   └── index.ts
│   │
│   ├── app.ts                  # Configuración de Express
│   └── index.ts                # Entry point
│
├── tests/                      # Tests
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   └── api/
│   ├── e2e/
│   └── helpers/
│       └── setup.ts
│
├── docs/                       # Documentación
│   ├── api/
│   │   └── openapi.yaml
│   ├── architecture.md
│   └── setup.md
│
├── scripts/                    # Scripts de utilidad
│   ├── seed.ts
│   ├── migrate.ts
│   └── deploy.sh
│
├── dist/                       # Build output (gitignored)
├── coverage/                   # Coverage reports (gitignored)
├── logs/                       # Logs (gitignored)
│
├── .env.example                # Template de variables de entorno
├── .env                        # Variables locales (gitignored)
├── .gitignore
├── .eslintrc.js
├── .prettierrc.js
├── .editorconfig
├── tsconfig.json
├── tsconfig.build.json
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
├── LICENSE
├── CHANGELOG.md
├── Dockerfile
└── docker-compose.yml
```

---

## Python

### Estructura Python (FastAPI/Flask)

```
my-python-app/
├── .github/                    # GitHub workflows
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
│
├── src/                        # Código fuente
│   └── app/                    # Aplicación principal
│       ├── __init__.py
│       │
│       ├── api/                # API endpoints
│       │   ├── __init__.py
│       │   ├── deps.py         # Dependencies
│       │   └── v1/
│       │       ├── __init__.py
│       │       ├── endpoints/
│       │       │   ├── __init__.py
│       │       │   ├── users.py
│       │       │   └── auth.py
│       │       └── router.py
│       │
│       ├── core/               # Configuración y utilidades core
│       │   ├── __init__.py
│       │   ├── config.py
│       │   ├── security.py
│       │   └── logging.py
│       │
│       ├── models/             # Modelos de base de datos
│       │   ├── __init__.py
│       │   ├── user.py
│       │   └── post.py
│       │
│       ├── schemas/            # Pydantic schemas (DTOs)
│       │   ├── __init__.py
│       │   ├── user.py
│       │   └── post.py
│       │
│       ├── services/           # Lógica de negocio
│       │   ├── __init__.py
│       │   ├── user_service.py
│       │   └── auth_service.py
│       │
│       ├── repositories/       # Acceso a datos
│       │   ├── __init__.py
│       │   ├── base.py
│       │   ├── user_repository.py
│       │   └── post_repository.py
│       │
│       ├── db/                 # Database
│       │   ├── __init__.py
│       │   ├── base.py
│       │   ├── session.py
│       │   └── migrations/     # Alembic migrations
│       │
│       ├── utils/              # Utilidades
│       │   ├── __init__.py
│       │   └── helpers.py
│       │
│       ├── middleware/         # Middleware
│       │   ├── __init__.py
│       │   └── auth.py
│       │
│       └── main.py             # Entry point
│
├── tests/                      # Tests
│   ├── __init__.py
│   ├── conftest.py             # Pytest fixtures
│   ├── unit/
│   │   ├── __init__.py
│   │   ├── test_services/
│   │   └── test_utils/
│   ├── integration/
│   │   ├── __init__.py
│   │   └── test_api/
│   └── e2e/
│       └── __init__.py
│
├── docs/                       # Documentación
│   ├── api.md
│   └── setup.md
│
├── scripts/                    # Scripts
│   ├── seed.py
│   ├── migrate.py
│   └── deploy.sh
│
├── alembic/                    # Alembic migrations
│   ├── versions/
│   └── env.py
│
├── .env.example
├── .env                        # (gitignored)
├── .gitignore
├── .flake8
├── .pre-commit-config.yaml
├── pyproject.toml              # Project config
├── requirements.txt            # Dependencies
├── requirements-dev.txt        # Dev dependencies
├── pytest.ini
├── mypy.ini
├── README.md
├── LICENSE
├── Dockerfile
└── docker-compose.yml
```

---

## React / Next.js

### Estructura Frontend React/Next.js

```
my-react-app/
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── public/                     # Assets estáticos
│   ├── images/
│   ├── fonts/
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/                    # Next.js App Router (o pages/)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/             # Route groups
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── api/                # API routes
│   │       └── hello/
│   │
│   ├── components/             # Componentes React
│   │   ├── ui/                 # Componentes de UI básicos
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   │
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   │
│   │   └── features/           # Componentes específicos de features
│   │       ├── auth/
│   │       │   ├── LoginForm/
│   │       │   └── RegisterForm/
│   │       └── dashboard/
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── useFetch.ts
│   │
│   ├── context/                # React Context
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   │
│   ├── lib/                    # Bibliotecas y utilidades
│   │   ├── api/                # API clients
│   │   │   ├── client.ts
│   │   │   └── endpoints/
│   │   ├── utils/              # Utilidades
│   │   │   ├── format.ts
│   │   │   └── validation.ts
│   │   └── constants/
│   │
│   ├── store/                  # State management (Redux/Zustand)
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   └── userSlice.ts
│   │   └── middleware/
│   │
│   ├── styles/                 # Estilos globales
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── mixins.scss
│   │
│   ├── types/                  # TypeScript types
│   │   ├── api.ts
│   │   ├── models.ts
│   │   └── components.ts
│   │
│   └── middleware.ts           # Next.js middleware
│
├── tests/                      # Tests
│   ├── e2e/                    # Playwright/Cypress
│   │   └── auth.spec.ts
│   ├── integration/
│   └── setup.ts
│
├── .storybook/                 # Storybook config
│   ├── main.ts
│   └── preview.ts
│
├── .env.local.example
├── .env.local                  # (gitignored)
├── .gitignore
├── .eslintrc.js
├── .prettierrc.js
├── next.config.js
├── tsconfig.json
├── tailwind.config.js          # Si usas Tailwind
├── postcss.config.js
├── package.json
├── README.md
└── Dockerfile
```

---

## FastAPI / Django

### Estructura FastAPI Completa

```
my-fastapi-app/
├── app/
│   ├── __init__.py
│   │
│   ├── main.py                 # Entry point
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── api.py          # Router principal
│   │       └── endpoints/
│   │           ├── auth.py
│   │           ├── users.py
│   │           └── items.py
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── security.py
│   │   └── events.py
│   │
│   ├── db/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── session.py
│   │   └── init_db.py
│   │
│   ├── models/                 # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── item.py
│   │
│   ├── schemas/                # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── item.py
│   │
│   ├── crud/                   # CRUD operations
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── crud_user.py
│   │   └── crud_item.py
│   │
│   └── middleware/
│       └── __init__.py
│
├── alembic/
│   └── versions/
│
├── tests/
│   ├── conftest.py
│   ├── unit/
│   └── integration/
│
└── [otros archivos de config...]
```

### Estructura Django

```
my-django-app/
├── config/                     # Project settings
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── development.py
│   │   ├── production.py
│   │   └── testing.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── apps/                       # Django apps
│   ├── users/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py     # Django REST Framework
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── tests/
│   │   │   ├── test_models.py
│   │   │   └── test_views.py
│   │   └── migrations/
│   │
│   └── posts/
│       └── [similar structure]
│
├── core/                       # Core functionality
│   ├── __init__.py
│   ├── managers.py
│   ├── middleware.py
│   └── utils.py
│
├── static/                     # Static files
│   ├── css/
│   ├── js/
│   └── images/
│
├── media/                      # User uploads (gitignored)
│
├── templates/                  # Django templates
│   ├── base.html
│   └── [app templates]
│
├── tests/
│   └── [tests]
│
├── manage.py
├── requirements.txt
└── [otros archivos de config...]
```

---

## Monorepo

### Estructura Monorepo (Nx/Turborepo)

```
my-monorepo/
├── apps/                       # Aplicaciones
│   ├── web/                    # Frontend web
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── mobile/                 # App móvil
│   │   └── [estructura mobile]
│   │
│   ├── admin/                  # Admin panel
│   │   └── [estructura admin]
│   │
│   └── api/                    # Backend API
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                   # Paquetes compartidos
│   ├── ui/                     # Componentes UI compartidos
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                 # Configuración compartida
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── jest/
│   │
│   ├── types/                  # Types compartidos
│   │   ├── src/
│   │   │   ├── api.ts
│   │   │   └── models.ts
│   │   └── package.json
│   │
│   └── utils/                  # Utilidades compartidas
│       ├── src/
│       └── package.json
│
├── libs/                       # Bibliotecas internas
│   └── [bibliotecas]
│
├── tools/                      # Herramientas y scripts
│   ├── generators/
│   └── scripts/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── release.yml
│
├── docs/                       # Documentación
│   ├── architecture.md
│   └── contributing.md
│
├── package.json                # Root package.json
├── turbo.json                  # Turborepo config
├── nx.json                     # Nx config (si usas Nx)
├── pnpm-workspace.yaml         # PNPM workspaces
├── tsconfig.json               # Base TypeScript config
└── README.md
```

---

## Microservicios

### Estructura Microservicios

```
microservices-project/
├── services/
│   ├── auth-service/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── user-service/
│   │   └── [similar structure]
│   │
│   ├── order-service/
│   │   └── [similar structure]
│   │
│   └── notification-service/
│       └── [similar structure]
│
├── gateway/                    # API Gateway
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── shared/                     # Código compartido
│   ├── types/
│   ├── utils/
│   └── config/
│
├── infrastructure/             # Infraestructura como código
│   ├── kubernetes/
│   │   ├── auth-service/
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   └── [otros servicios]
│   │
│   ├── terraform/
│   │   ├── main.tf
│   │   └── variables.tf
│   │
│   └── docker-compose/
│       ├── docker-compose.yml
│       └── docker-compose.prod.yml
│
├── docs/
│   ├── architecture.md
│   ├── api/
│   │   ├── auth-service.md
│   │   └── [otros servicios]
│   └── deployment.md
│
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   └── test-all.sh
│
├── .github/
│   └── workflows/
│       ├── auth-service.yml
│       └── [otros servicios]
│
└── README.md
```

---

## Mejores Prácticas Generales

### 1. Archivos de Configuración

```
project-root/
├── .editorconfig              # Configuración del editor
├── .gitignore                 # Git ignore
├── .gitattributes             # Git attributes
├── .env.example               # Template de env vars
├── .dockerignore              # Docker ignore
├── .nvmrc                     # Node version
├── .prettierignore            # Prettier ignore
└── .eslintignore              # ESLint ignore
```

### 2. Directorio de Documentación

```
docs/
├── README.md                  # Índice de documentación
├── getting-started.md         # Guía de inicio
├── architecture/
│   ├── overview.md
│   ├── decisions/             # ADRs (Architecture Decision Records)
│   │   ├── 001-use-typescript.md
│   │   └── 002-database-choice.md
│   └── diagrams/
├── api/
│   ├── rest-api.md
│   ├── graphql-schema.md
│   └── openapi.yaml
├── deployment/
│   ├── local.md
│   ├── staging.md
│   └── production.md
└── contributing/
    ├── code-style.md
    ├── git-workflow.md
    └── testing.md
```

### 3. Scripts Comunes

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist build .next",
    "prepare": "husky install"
  }
}
```

### 4. Naming Conventions

**Archivos:**
- Componentes: `PascalCase.tsx` (UserProfile.tsx)
- Utilidades: `camelCase.ts` (formatDate.ts)
- Constantes: `UPPER_SNAKE_CASE.ts` (API_KEYS.ts)
- Tests: `*.test.ts` o `*.spec.ts`
- Tipos: `*.types.ts` o `*.d.ts`

**Directorios:**
- Kebab-case: `user-profile/`
- camelCase: `userProfile/`
- PascalCase para componentes: `UserProfile/`

### 5. Separación de Concerns

```
feature/
├── index.ts                   # Public API
├── Feature.tsx                # Component
├── Feature.test.tsx           # Tests
├── Feature.stories.tsx        # Storybook
├── Feature.module.css         # Styles
├── useFeature.ts              # Custom hooks
├── Feature.types.ts           # Types
└── Feature.utils.ts           # Utilities
```

---

## Templates de Archivos Importantes

### .gitignore

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/
.nyc_output

# Production
build/
dist/
.next/
out/

# Environment
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Python
__pycache__/
*.py[cod]
*$py.class
.Python
*.so
.venv/
venv/
ENV/

# Temporary
*.tmp
.cache/
```

### .editorconfig

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{js,jsx,ts,tsx,json,yml,yaml}]
indent_style = space
indent_size = 2

[*.{py}]
indent_style = space
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

---

**Última actualización:** 2025-11-25
