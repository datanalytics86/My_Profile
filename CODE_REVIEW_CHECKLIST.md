# Code Review Checklist

## 🎯 Propósito
Esta checklist guía el proceso de revisión de código para asegurar calidad, seguridad y mantenibilidad.

---

## 📝 Pre-Review (Autor del PR)

Antes de solicitar revisión, verifica:

### Build & Tests
- [ ] El código compila sin errores ni warnings
- [ ] Todos los tests existentes pasan
- [ ] Nuevos tests agregados para nuevas funcionalidades
- [ ] Tests agregados para bug fixes
- [ ] Cobertura de tests cumple el estándar (>80%)
- [ ] Tests son significativos, no solo para coverage

### Code Quality
- [ ] Linter pasa sin errores
- [ ] Formatter aplicado (black, prettier, etc.)
- [ ] No hay código comentado innecesario
- [ ] No hay TODOs sin issue asociado
- [ ] No hay console.log / print / debug statements
- [ ] Variables de debug removidas

### Documentation
- [ ] README actualizado si hay cambios en setup/uso
- [ ] Docstrings/JSDoc agregados a funciones públicas
- [ ] Comentarios agregados para lógica compleja
- [ ] CHANGELOG actualizado (si aplica)
- [ ] API docs actualizadas (si hay cambios en APIs)

### Git
- [ ] Commits son atómicos y lógicos
- [ ] Commit messages siguen convenciones
- [ ] Branch actualizado con base branch
- [ ] No hay conflictos de merge
- [ ] PR description es clara y completa

---

## 🔍 Durante Review (Reviewer)

### 1. Funcionalidad

#### Correctitud
- [ ] El código hace lo que dice hacer
- [ ] La implementación es correcta
- [ ] Los edge cases están considerados
- [ ] Los errores se manejan apropiadamente
- [ ] Input validation es suficiente y correcta

#### Lógica de Negocio
- [ ] La lógica de negocio es correcta
- [ ] No hay hardcoded business rules que deberían ser configurables
- [ ] Los cálculos son precisos
- [ ] Las validaciones de negocio están implementadas

#### Testing
- [ ] Los tests son comprensibles
- [ ] Los tests verifican el comportamiento esperado
- [ ] Los tests cubren happy path
- [ ] Los tests cubren error cases
- [ ] Los tests cubren edge cases
- [ ] Los mocks/stubs son apropiados
- [ ] No hay tests flaky

---

### 2. Diseño y Arquitectura

#### Diseño General
- [ ] El diseño sigue los patrones del proyecto
- [ ] El código está en el lugar correcto
- [ ] La solución no es over-engineered
- [ ] La abstracción es apropiada
- [ ] Separación de concerns es clara

#### SOLID Principles
- [ ] **S**ingle Responsibility: Cada clase/función tiene una responsabilidad
- [ ] **O**pen/Closed: Abierto para extensión, cerrado para modificación
- [ ] **L**iskov Substitution: Subtipos son substituibles por tipos base
- [ ] **I**nterface Segregation: Interfaces son específicas y pequeñas
- [ ] **D**ependency Inversion: Depende de abstracciones, no de concretos

#### Reusabilidad
- [ ] No hay código duplicado (DRY)
- [ ] Funcionalidad común está extraída
- [ ] Componentes son reusables donde tiene sentido

---

### 3. Legibilidad y Mantenibilidad

#### Nombres
- [ ] Variables tienen nombres descriptivos
- [ ] Funciones tienen nombres que describen lo que hacen
- [ ] Clases tienen nombres que describen su responsabilidad
- [ ] Nombres evitan abreviaciones confusas
- [ ] Nombres son consistentes con el código existente

#### Estructura
- [ ] Funciones son pequeñas (<50 líneas idealmente)
- [ ] Funciones hacen una cosa
- [ ] Nivel de abstracción es consistente
- [ ] Anidamiento no es excesivo (<4 niveles)
- [ ] Código está bien organizado

#### Complejidad
- [ ] Complejidad ciclomática es aceptable (<10)
- [ ] Lógica compleja está explicada con comentarios
- [ ] Condiciones complejas están simplificadas o extraídas
- [ ] No hay "código clever" innecesario

#### Comentarios
- [ ] Comentarios explican "por qué", no "qué"
- [ ] No hay comentarios obsoletos
- [ ] Lógica compleja tiene comentarios explicativos
- [ ] No hay comentarios obvios

---

### 4. Seguridad

#### Validación de Input
- [ ] Todo input externo es validado
- [ ] Validación es whitelist, no blacklist
- [ ] Tipos de datos son verificados
- [ ] Rangos y límites son verificados
- [ ] Formato es validado (regex, etc.)

#### Inyección
- [ ] No hay SQL injection (usar prepared statements)
- [ ] No hay NoSQL injection
- [ ] No hay command injection
- [ ] No hay code injection
- [ ] No hay path traversal
- [ ] Input en queries está sanitizado/parametrizado

#### XSS (Cross-Site Scripting)
- [ ] Output está escapado apropiadamente
- [ ] HTML insertado está sanitizado
- [ ] No hay eval() o equivalente con input de usuario
- [ ] Content Security Policy considerado

#### Autenticación y Autorización
- [ ] Autenticación es verificada antes de operaciones sensibles
- [ ] Autorización (permisos) es verificada
- [ ] Tokens son validados correctamente
- [ ] Sesiones tienen timeout apropiado
- [ ] No hay hardcoded credentials

#### Datos Sensibles
- [ ] No hay passwords/API keys en código
- [ ] Datos sensibles usan variables de entorno
- [ ] Datos sensibles no se loggean
- [ ] Datos sensibles están encriptados en BD
- [ ] Comunicación usa HTTPS/TLS

#### Dependencias
- [ ] No hay vulnerabilidades conocidas en dependencias
- [ ] Dependencias están actualizadas
- [ ] Solo dependencias necesarias están incluidas

#### Otras Consideraciones
- [ ] Rate limiting en endpoints sensibles
- [ ] CSRF protection donde aplica
- [ ] CORS configurado apropiadamente
- [ ] Headers de seguridad configurados
- [ ] Error messages no exponen información sensible

---

### 5. Performance

#### Algoritmos y Estructuras de Datos
- [ ] Algoritmos son eficientes para el caso de uso
- [ ] Estructuras de datos son apropiadas
- [ ] Complejidad temporal es aceptable
- [ ] Complejidad espacial es aceptable

#### Base de Datos
- [ ] No hay N+1 queries
- [ ] Queries están optimizadas
- [ ] Índices apropiados están en lugar
- [ ] No hay SELECT * innecesarios
- [ ] Pagination para resultados grandes

#### Caching
- [ ] Caching es usado donde apropiado
- [ ] Cache invalidation es correcta
- [ ] TTL de cache es apropiado

#### Memory
- [ ] No hay memory leaks obvios
- [ ] Recursos son liberados apropiadamente
- [ ] Streams grandes se procesan en chunks
- [ ] No hay cargas completas innecesarias en memoria

#### Network
- [ ] Requests están batcheados donde posible
- [ ] Compression está habilitada
- [ ] Timeouts están configurados
- [ ] Retry logic es apropiada

---

### 6. Error Handling

#### Manejo General
- [ ] Errores son capturados apropiadamente
- [ ] Errores no son silenciados sin razón
- [ ] Recovery de errores es apropiado
- [ ] Errores son loggeados con contexto suficiente

#### Mensajes de Error
- [ ] Mensajes son claros y útiles
- [ ] Mensajes no exponen información sensible
- [ ] Mensajes son user-friendly en UI
- [ ] Códigos de error son consistentes

#### Logging
- [ ] Logging level es apropiado (DEBUG, INFO, ERROR)
- [ ] Logs incluyen contexto suficiente
- [ ] No se loggea información sensible
- [ ] Logs excesivos no afectan performance

---

### 7. Configuración

#### Environment
- [ ] Configuración viene de environment/config files
- [ ] No hay magic numbers hardcoded
- [ ] Configuración por ambiente es clara
- [ ] Defaults son sensibles

#### Features Flags
- [ ] Feature flags usados para cambios grandes
- [ ] Feature flags tienen plan de remoción
- [ ] Estado de flags está documentado

---

### 8. Compatibilidad

#### Backwards Compatibility
- [ ] API changes son backwards compatible o versionados
- [ ] Database migrations son reversibles
- [ ] Breaking changes están documentados
- [ ] Deprecation warnings agregados antes de remover

#### Browser/Platform
- [ ] Funciona en browsers/plataformas target
- [ ] Polyfills agregados si necesario
- [ ] Graceful degradation considerada

---

### 9. Accesibilidad (para UI)

- [ ] Semantic HTML usado
- [ ] ARIA labels donde apropiado
- [ ] Keyboard navigation funciona
- [ ] Contraste de colores es suficiente
- [ ] Screen readers considerados

---

### 10. Internacionalización (si aplica)

- [ ] Strings user-facing están externalizados
- [ ] Formatos de fecha/número son localizables
- [ ] Timezone handling es correcto
- [ ] RTL languages considerados

---

## 🚩 Red Flags

Detener y discutir si encuentras:

### Crítico
- ❌ Vulnerabilidades de seguridad
- ❌ Data loss potencial
- ❌ Breaking changes no documentados
- ❌ Credentials hardcoded
- ❌ SQL injection o similar

### Importante
- ⚠️ Performance degradation significativa
- ⚠️ Violaciones mayores de arquitectura
- ⚠️ Falta de tests para funcionalidad crítica
- ⚠️ Código extremadamente complejo sin justificación
- ⚠️ Dependencias con vulnerabilidades conocidas

### Considerar
- 💭 Over-engineering
- 💭 Código duplicado significativo
- 💭 Falta de documentación en código complejo
- 💭 Naming inconsistente
- 💭 Tests flaky

---

## 💬 Feedback Guidelines

### Para Reviewer

#### Ser Constructivo
```
❌ "Este código es terrible"
✅ "Considera refactorizar esta función para mejorar legibilidad"

❌ "No funciona"
✅ "Encontré un edge case: cuando X es null, la función lanza error"

❌ "Cambia esto"
✅ "Sugiero usar Strategy pattern aquí para reducir complejidad"
```

#### Categorizar Feedback
- **MUST**: Debe cambiarse antes de merge
- **SHOULD**: Recomendado, pero no blocker
- **NITS**: Preferencias menores, opcional
- **QUESTION**: Pidiendo clarificación

#### Ejemplos
```markdown
**MUST**: Este endpoint no valida autenticación, permitiendo acceso no autorizado

**SHOULD**: Considera extraer esta lógica a una función helper para mejorar reusabilidad

**NITS**: Typo en el nombre de variable "usr" → "user"

**QUESTION**: ¿Por qué elegiste este algoritmo sobre alternativa X?
```

### Para Autor

#### Responder Constructivamente
- Agradecer feedback
- Hacer preguntas si no está claro
- Explicar decisiones cuando necesario
- Marcar comentarios como resueltos después de address

#### Comunicar Cambios
```markdown
✅ Fixed: Agregado input validation
✅ Refactored: Extraído lógica a helper function
💬 Explained: Elegí este approach porque...
❓ Need clarification: ¿Podrías elaborar sobre...?
```

---

## 📊 Métricas de Review

Track para mejorar proceso:

- **Time to First Review**: ¿Cuánto tarda primer review?
- **Review Cycles**: ¿Cuántos rounds de feedback?
- **Issues Found**: ¿Cuántos bugs encontrados en review?
- **Post-Merge Bugs**: ¿Cuántos bugs escapan a producción?

---

## ✅ Approval Criteria

Aprobar solo cuando:

1. ✅ Todos los checks de CI/CD pasan
2. ✅ Todos los comentarios MUST están addressed
3. ✅ No hay security concerns sin resolver
4. ✅ Tests son suficientes y pasan
5. ✅ Documentación está actualizada
6. ✅ Código cumple estándares del proyecto

---

## 🎓 Resources

- [Google's Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Best Practices for Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)

---

**Última actualización:** 2025-11-25
