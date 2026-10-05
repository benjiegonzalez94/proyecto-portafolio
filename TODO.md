# 📋 Roadmap & Tareas del Proyecto (TODO)

Este archivo lleva el estado de las tareas para que tú y futuros agentes continúen sin perder contexto y ahorren tokens.

---

## 🚀 Estado General
- [x] Análisis inicial de la base de código y definición de arquitectura de bajo costo ($0).
- [x] Documentación centralizada (`ARCHITECTURE.md` y `TODO.md`).
- [x] Instalación de `@supabase/supabase-js`.
- [x] Configuración del cliente Supabase con soporte de datos fallback (`src/lib/supabase.ts`).
- [x] Creación del script SQL (`supabase/schema.sql`) para inicializar tablas en Supabase con los perfiles iniciales (Benjie & Nahomi).
- [x] Creación de la página Hub / Selector de perfiles en la raíz (`/`).
- [x] Implementación de la ruta dinámica para cada perfil (`/[slug].astro` -> `/benjie` y `/nahomi`).
- [x] Creación de la interfaz del Panel de Administración (`/admin`).
- [x] Conexión de variables de entorno de Supabase (`.env` con URL y Anon Key).
- [x] Ejecución del script `supabase/schema.sql` y migración automatizada vía API/Node (`scripts/apply-schema.mjs`).
- [x] Inserción de proyectos, experiencias y servicios iniciales para Benjie y Nahomi en Supabase (`scripts/seed-data.mjs`).
- [x] Creación de repositorio en GitHub y sincronización de ramas `main` y `develop` (Git Flow).
- [x] Conexión y despliegue continuo en Vercel (Sitio publicado en internet).
- [x] Fase 1 UX/UI: Integración de Stack Tecnológico categorizado para TI y Diseño.
- [x] Fase 1 UX/UI: Botón flotante y directo de WhatsApp con mensaje personalizado.
- [x] Fase 1 UX/UI: Tarjetas visuales de proyectos con imágenes SVG optimizadas.
- [ ] Fase 2: Configurar Supabase Storage para carga de imágenes desde el panel administrativo.
- [ ] Fase 3: Proteger el acceso al panel `/admin` con autenticación (Supabase Auth).
