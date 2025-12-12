# Política de QA/QC

Este documento define los controles mínimos de calidad para el repositorio.

## Checklist de revisión de código
- [ ] Cambios alineados con el propósito del proyecto y documentados en `CHANGELOG.md`.
- [ ] Formateo verificado con `black --check`.
- [ ] Lint completado con `ruff check` sin errores.
- [ ] Pruebas ejecutadas con `pytest --cov=src --cov-report=term-missing --cov-fail-under=90`.
      - En entornos sin `pytest-cov` disponible (por restricciones de red), ejecutar `pytest` y documentar la limitación.
- [ ] Documentación (README y comentarios) actualizada cuando aplica.
- [ ] Nombres de funciones y variables claros y autoexplicativos.
- [ ] Se evitan dependencias no utilizadas o duplicadas.

## Flujo de contribución
1. Crear rama descriptiva desde `main`.
2. Implementar cambios con cobertura mínima del 90%.
3. Ejecutar comandos de calidad localmente (black, ruff, pytest).
4. Abrir PR con resumen de cambios y resultados de pruebas.
5. Revisión por al menos una persona independiente antes del merge.

## Versionado y releases
- Se sigue versionado semántico (MAJOR.MINOR.PATCH).
- Cada release debe actualizar `CHANGELOG.md` con notas claras.

## Gestión de dependencias
- Versiones fijas en `requirements.txt`.
- Ejecutar `pip install -r requirements.txt` para ambientes reproducibles.
