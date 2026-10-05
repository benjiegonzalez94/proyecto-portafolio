# Reglas Permanentes del Proyecto (Portafolios Web)

## 🤖 1. Principio de Máxima Automatización
- **Cero trabajo manual para el usuario**: El usuario no debe tener que copiar y pegar código SQL, crear tablas manualmente en interfaces web o hacer configuraciones tediosas a mano cuando un agente pueda automatizarlo.
- **Gestión de Base de Datos y Supabase**: Siempre que se requieran nuevas tablas, campos, migraciones o consultas, el agente debe gestionarlas directamente a través de scripts de migración automáticos (`scripts/`), MCP o llamadas a la API de Supabase.
- **Entorno y Secretos**: El agente asistirá al usuario solicitando solo los datos estrictamente necesarios (como tokens/keys) y se encargará de escribir los archivos `.env`, ejecutar scripts y verificar la conectividad.

## 🌿 2. Estrategia de Ramas (Git Flow)
- **`main`**: Rama de producción 100% estable. Todo push a esta rama desencadena el despliegue automático a producción (CI/CD en Vercel/Netlify).
- **`develop`**: Rama base para desarrollo e integración de nuevas características.
- **Ramas de trabajo**:
  - `feature/<nombre>`: Nuevas funcionalidades o mejoras (se originan desde `develop` y se fusionan a `develop`).
  - `fix/<nombre>` o `bugfix/<nombre>`: Correcciones durante el ciclo de desarrollo (se originan desde `develop` y se fusionan a `develop`).
  - `hotfix/<nombre>`: Reparaciones urgentes en producción (se originan desde `main`, se prueban y se fusionan tanto a `main` como a `develop`).
- **Commits semánticos**: Usar prefijos como `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.

## 💬 3. Idioma y Comunicación
- Toda la comunicación, explicaciones, planes y documentación orientada al usuario se redactan en **Español**.
- Código, nombres de variables y commits en inglés estándar según las mejores prácticas.

## 🪙 4. Economía de Tokens y Continuidad
- Consultar siempre `ARCHITECTURE.md` y `TODO.md` al inicio de cada sesión para no releer archivos innecesarios.
- Mantener ambos archivos actualizados al terminar cualquier hito.
