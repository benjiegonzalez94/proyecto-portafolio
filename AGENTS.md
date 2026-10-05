# Reglas Permanentes del Proyecto (Portafolios Web)

## 🤖 1. Principio de Máxima Automatización
- **Cero trabajo manual para el usuario**: El usuario no debe tener que copiar y pegar código SQL, crear tablas manualmente en interfaces web o hacer configuraciones tediosas a mano cuando un agente pueda automatizarlo.
- **Gestión de Base de Datos y Supabase**: Siempre que se requieran nuevas tablas, campos, migraciones o consultas, el agente debe gestionarlas directamente a través de scripts de migración automáticos (`scripts/`), MCP o llamadas a la API de Supabase.
- **Entorno y Secretos**: El agente asistirá al usuario solicitando solo los datos estrictamente necesarios (como tokens/keys) y se encargará de escribir los archivos `.env`, ejecutar scripts y verificar la conectividad.

## 💬 2. Idioma y Comunicación
- Toda la comunicación, explicaciones, planes y documentación orientada al usuario se redactan en **Español**.
- Código, nombres de variables y commits en inglés estándar según las mejores prácticas.

## 🪙 3. Economía de Tokens y Continuidad
- Consultar siempre `ARCHITECTURE.md` y `TODO.md` al inicio de cada sesión para no releer archivos innecesarios.
- Mantener ambos archivos actualizados al terminar cualquier hito.
