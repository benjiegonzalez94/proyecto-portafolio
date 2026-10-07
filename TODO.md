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
- [x] **Fase 2.6 - Landing / Hub (`/`) como vitrina de Folio**:
  - [x] Rebranding oficial a **Folio** con identidad visual, badges y llamadas a la acción.
  - [x] Botones de acceso directo "Crea tu Portafolio Gratis" y "Iniciar Sesión".
  - [x] Vitrina de portafolios de ejemplo (Benjie TI & Nahomi Creativa).

---

## 🎨 Fase 3: Experiencia Folio, Preferencia de Tema & Vista Pública Impecable
- [x] **Identidad Oficial & Multi-tenant**:
  - [x] Nombre de marca fijado como **Folio**.
  - [x] Dashboard de Super Admin (`admin@portafolio.dev`) con métricas en tiempo real y directorio de usuarios registrados.
  - [x] Separación de accesos: Benjie (`benjiegonzalez94@gmail.com`) y Nahomi (`nahomimachuca@gmail.com`) gestionan sus respectivos perfiles.
  - [x] Título limpio de la pestaña establecido como `Folio` (removido texto concatenado redundante).
  - [x] Favicon oficial de **Folio** en SVG vectorial de alta resolución (`public/favicon.svg`) con isotipo `F` y gradiente azul-cian, reemplazando el antiguo `NM`.
- [x] **Preferencia de Modo Oscuro / Claro en Onboarding (`/crear`)**:
  - [x] Selección dual en Paso 2: Plantilla Visual + Preferencia de Tema (🌙 Modo Oscuro vs ☀️ Modo Claro).
  - [x] Mockup interactivo en miniatura (*Live Mini Browser Preview*) que reacciona en tiempo real al nombre, iniciales, plantilla y modo seleccionado antes de generar.
  - [x] Persistencia de `theme_mode` en Supabase `public.profiles`.
- [x] **Personalización de Tema en CMS (`/admin`)**:
  - [x] Selector interactivo en la pestaña *Plantilla Visual* para alternar y guardar `theme_mode` (Oscuro / Claro) en Supabase con toasts animados.
  - [x] Activación instantánea de plantillas con feedback visual.
- [x] **Vista Pública Limpia (`/[slug]`)**:
  - [x] Eliminación de botones administrativos públicos ("Gestionar datos") para visitantes externos.
  - [x] Eliminación de botones flotantes o desalineados de tema: el portafolio se renderiza puramente con la preferencia del autor (`mode-dark` o `mode-light`).
  - [x] Filtrado interactivo de proyectos por pills de categoría.
- [x] **Despliegue a Producción**:
  - [x] Fusión limpia de `develop` a `main` y despliegue automático exitoso en Vercel.

---

## 🌟 Fase 4: Optimización Multimedia, Hero Visual (Opción 4) & CMS Dinámico
- [x] **Arquitectura Dinámica SSR en Vercel**:
  - [x] Configuración de `@astrojs/vercel` con `output: 'server'` en `astro.config.mjs` para reflejar instantáneamente cambios de base de datos en `/[slug]` sin necesidad de redeploy.
  - [x] Rutas de casos de estudio estáticas prerenderizadas con `prerender = true`.
- [x] **Hero Split Card Visual (Opción 4)**:
  - [x] Implementación de tarjeta de impacto visual en `src/pages/[slug].astro` dividida en dos columnas: marco de foto de perfil con badge en vivo a la izquierda y bio, CTA y redes a la derecha.
  - [x] Renderizado de avatar subido por el usuario con bordes redondeados y glow sutil, fallback a iniciales si no hay foto.
  - [x] Integración de barra social profesional (GitHub, LinkedIn, Instagram, Behance, X/Twitter, Sitio Web) con íconos SVG vectoriales.
  - [x] Soporte completo de temas en modo oscuro (`mode-dark`) y claro (`mode-light`).
- [x] **Optimización de Imágenes & Herramienta de Recorte (Cropper Tool)**:
  - [x] Motor de compresión y redimensionado del lado del cliente (`src/lib/storage.ts`) con HTML5 Canvas convirtiendo a WebP (~80KB - 250KB) antes de subir a Supabase Storage.
  - [x] Modal interactivo de recorte en `/admin`: ajuste de posición (arrastrar y soltar), zoom interactivo y marcos circulares (avatar) o rectangulares (proyectos).
  - [x] Alivio dramático en tiempos de subida y ahorro de almacenamiento en Supabase.
- [x] **Detección y Ocultamiento Inteligente de Secciones Vacías**:
  - [x] Si un usuario elimina todas las experiencias, proyectos, servicios o habilidades, la sección correspondiente se oculta automáticamente en el portafolio en vivo (`[slug].astro`) sin dejar encabezados ni espacios en blanco.
  - [x] Corrección en `getPortfolioBySlug` (`src/lib/supabase.ts`) para respetar arrays vacíos (`skills_data: []`) sin forzar los valores demo por defecto.
  - [x] Mensajes informativos en `/admin` que indican claramente al usuario que las secciones vacías permanecen ocultas en su portafolio público hasta añadir contenido.
- [x] **Corrección del Editor de Habilidades en CMS (`/admin`)**:
  - [x] Solución al bug de títulos `undefined`: compatibilidad y normalización con la propiedad `title` de `SkillCategory`.
  - [x] Sincronización en tiempo real y guardado confiable en Supabase (`profiles.skills_data`).
  - [x] Inicialización automática con las habilidades de la plantilla cuando el usuario accede por primera vez a su panel.
- [x] **Optimización del Formulario de Enlace Personal (`/crear`)**:
  - [x] Unificación del prefijo de dominio a `folioweb.vercel.app/` en el formulario y en la barra de direcciones del mini mockup.
  - [x] Comprobación de disponibilidad de enlace en tiempo real contra Supabase (Live Check con debounce) e indicador visual de estado (✓ Disponible, ✕ Ya ocupado, ⏳ Comprobando).
  - [x] Protección contra slugs reservados del sistema (`admin`, `login`, `crear`, `api`, `dashboard`, `portfolio`, etc.).
  - [x] Generación de sugerencias automáticas alternativas clickeables cuando el enlace deseado ya está en uso.
  - [x] Conversión inteligente de caracteres especiales (ñ $\rightarrow$ n, acentos $\rightarrow$ vocales limpias, espacios $\rightarrow$ guiones `-`).
  - [x] Botón interactivo "Sincronizar con mi nombre" para regenerar el enlace derivado del nombre completo con un solo clic.

---

## 🔮 Próxima Sesión: Mejoras y Nuevas Funcionalidades (Fase 5)
- [ ] **Dominio & Presencia**:
  - [ ] Asignar subdominio definitivo en Vercel (ej: `folio-app.vercel.app`) o vincular dominio personalizado propio.
  - [ ] Generación de códigos QR descargables en `/admin` para compartir el enlace del portafolio en tarjetas de presentación o CVs.
- [ ] **Experiencia del CMS / Editor**:
  - [ ] Reordenamiento interactivo (Drag & Drop o flechas arriba/abajo) para proyectos, experiencias y servicios.
  - [ ] Galería de imágenes múltiples por proyecto (soporte de carrusel/slideshow en el modal de detalle).
  - [ ] Soporte para personalizar el mensaje predeterminado de WhatsApp desde el perfil.
- [ ] **Métricas & Crecimiento**:
  - [ ] Contador de visitas o clics en el botón de WhatsApp y enlaces externos de cada portafolio.
  - [ ] Tarjetas Open Graph (OG Images) personalizadas dinámicamente con el nombre y avatar de cada usuario al compartir en redes sociales.

