# My_Profile

Repositorio base para definir y mantener un perfil profesional reproducible con buenas prácticas de QA/QC. Incluye estructura inicial en Python, flujos de linting y pruebas automatizadas con CI en GitHub Actions.

## Requisitos
- Python 3.10+
- `pip` y `venv` disponibles en el sistema.

## Instalación
```bash
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
```

## Uso
El módulo principal se encuentra en `src/my_profile/profile.py`. Incluye utilidades para modelar perfiles profesionales y generar resúmenes legibles.

Ejemplo mínimo:
```python
from my_profile.profile import Profile

perfil = Profile(
    nombre="Ada Lovelace",
    rol="Pionera de la programación",
    habilidades=["Matemática", "Algoritmos", "Documentación"],
    ubicacion="Londres, Reino Unido",
)

print(perfil.resumen())
```

## Comandos de calidad
Todos los comandos deben ejecutarse desde la raíz del repositorio con el entorno virtual activado:
```bash
# Formateo (solo verificación)
black --check src tests

# Lint rápido
ruff check src tests

# Pruebas con cobertura mínima del 90%
pytest --cov=src --cov-report=term-missing --cov-fail-under=90
```

## Flujo de CI
El workflow en `.github/workflows/ci.yml` ejecuta `ruff`, `black --check` y `pytest` en cada push/PR. Si alguna verificación falla, el pipeline marca el build como fallido.

## Estándares de QA/QC
- **Versionado**: versión inicial 0.1.0, manteniendo versionado semántico.
- **Revisión de código**: toda contribución debe pasar por revisión con checklist de estilo, cobertura y documentación.
- **Documentación**: mantener este README y el changelog actualizados en cada cambio relevante.
- **Pruebas**: cobertura mínima 90% para merges a ramas principales.

## Estructura del proyecto
```
.
├── .github/workflows/ci.yml   # CI con lint + pruebas
├── docs/QA_QC_POLICY.md       # Lineamientos de QA/QC y checklist
├── src/my_profile/            # Código fuente
├── tests/                     # Pruebas automatizadas
├── requirements.txt           # Dependencias con versiones fijas
├── pyproject.toml             # Configuración de herramientas
├── CHANGELOG.md               # Registro de cambios
└── README.md                  # Esta guía
```

## Cómo contribuir
Consulta `docs/QA_QC_POLICY.md` para conocer los criterios de revisión, formato de commits y requerimientos de pruebas.
