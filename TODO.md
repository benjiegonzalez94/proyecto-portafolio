# 📋 Roadmap & Tareas del Proyecto (TODO) - Portfolio Builder SaaS

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
- [x] Creación de la interfaz base del Panel de Administración (`/admin`).
- [x] Conexión de variables de entorno de Supabase (`.env` con URL y Anon Key).
- [x] Ejecución del script `supabase/schema.sql` y migración automatizada vía API/Node (`scripts/apply-schema.mjs`).
- [x] Inserción de proyectos, experiencias y servicios iniciales para Benjie y Nahomi en Supabase (`scripts/seed-data.mjs`).
- [x] Creación de repositorio en GitHub y sincronización de ramas `main` y `develop` (Git Flow).
- [x] Conexión y despliegue continuo en Vercel (Sitio publicado en internet).
- [x] Fase 1 UX/UI: Integración de Stack Tecnológico categorizado para TI y Diseño.
- [x] Fase 1 UX/UI: Botón flotante y directo de WhatsApp con mensaje personalizado.
- [x] Fase 1 UX/UI: Tarjetas visuales de proyectos con imágenes SVG optimizadas.

---

## 🛠️ Fase 2: Plataforma Multi-Tenant, Auth & Supabase Storage
- [x] **Fase 2.1 - Migración de Base de Datos & RLS**:
  - [x] Agregar columnas `user_id` (FK `auth.users`) y `template_id` a la tabla `profiles`.
  - [x] Crear el bucket de Storage `portfolio-media` en Supabase con políticas públicas de lectura y autenticadas de escritura.
  - [x] Actualizar políticas RLS para vincular cada perfil a su `user_id` en `profiles`, `projects`, `experiences`, `services`.
- [x] **Fase 2.2 - Supabase Auth & Gestión de Sesión**:
  - [x] Crear página de Login (`/login`) con correo y contraseña.
  - [x] Vincular cuentas para Benjie y Nahomi para administrar sus respectivos portafolios.
  - [x] Proteger `/admin` para requerir sesión activa y cargar automáticamente el perfil asociado al usuario autenticado.
  - [x] Permitir cerrar sesión desde la barra superior de `/admin`.
- [x] **Fase 2.3 - Supabase Storage en `/admin`**:
  - [x] Agregar selector de imágenes con previsualización para avatar de perfil y proyectos.
  - [x] Implementar subida binaria a `portfolio-media` y asignación automática de URL pública al guardar.
- [x] **Fase 2.4 - Sistema de Plantillas Visuales (Templates)**:
  - [x] Definir plantillas: `tech-minimal`, `creative-visual` y `modern-gradient`.
  - [x] Integrar selector interactivo de plantilla en `/admin`.
  - [x] Adaptar `/[slug].astro` para aplicar dinámicamente estilos y distribución según la plantilla activa.
- [x] **Fase 2.5 - Onboarding & Generador de Portafolios (`/crear`)**:
  - [x] Crear página `/crear` con asistente paso a paso:
    1. Datos personales básicos (Nombre, Especialidad/Rol, Slug único).
    2. Selección de plantilla visual con previsualización.
    3. Credenciales de acceso (Email + Contraseña).
  - [x] Auto-generación de registros iniciales (semilla con proyectos y servicios de muestra) y redirección inmediata a `/admin` para empezar a editar.
- [x] **Fase 2.6 - Landing / Hub (`/`) como vitrina del Portfolio Builder**:
  - [x] Añadir botón prominente "Crea tu Portafolio Gratis" y botón "Iniciar Sesión".
  - [x] Sección de portafolios destacados y características de la plataforma.

