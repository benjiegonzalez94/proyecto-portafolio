# 🏛️ Arquitectura del Sistema - Portafolios Multi-Perfil & CMS

Este documento describe la arquitectura, decisiones de diseño y estructura del proyecto para que cualquier desarrollador o agente de IA comprenda el contexto rápidamente con el mínimo consumo de tokens.

---

## 🎯 Objetivo del Proyecto
Crear una plataforma web escalable y de costo $0 para alojar y administrar múltiples portafolios profesionales:
1. **Benjie González**: Ingeniero en TI (Desarrollo, Soporte, Redes, Cloud).
2. **Nahomi Machuca**: Marketing, Diseño Gráfico, Edición de Video, Creación de Contenido.
3. **Escalabilidad**: Capacidad futura para admitir más usuarios y perfiles sin rehacer la arquitectura.

---

## 🛠️ Stack Tecnológico
- **Frontend / Framework**: [Astro 5](https://astro.build/) (Rendimiento ultra-rápido, SSG/SSR híbrido, SEO optimizado).
- **Estilos**: Vanilla CSS moderno / CSS Modules, CSS Variables con temas personalizables por perfil.
- **Base de Datos & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security + Auth + Storage).
- **Hosting & CI/CD**: [Vercel](https://vercel.com/) / [Netlify](https://netlify.com/) conectado al repositorio GitHub (`main`). Cada commit actualiza la web automáticamente.
- **Coste de Operación**: $0 (Capa gratuita de GitHub, Supabase y Vercel/Netlify).

---

## 📂 Estructura de Rutas
- `/`: **Hub Principal** - Landing interactiva con selector de perfiles destacados (Benjie & Nahomi).
- `/:slug` (ej: `/benjie`, `/nahomi`): **Portafolio Dinámico** que carga la información desde la base de datos o fallback offline.
  - Subsecciones o anclas: Sobre mí, Experiencia, Proyectos, Servicios, Contacto.
- `/admin/login`: Inicio de sesión para los creadores de portafolios.
- `/admin`: **Panel de Control / Dashboard** para editar:
  - Información básica y biografía.
  - Experiencias laborales.
  - Proyectos (títulos, imágenes, links).
  - Habilidades / Servicios.
  - Enlaces de contacto y redes.

---

## 🗄️ Esquema de Base de Datos (Supabase / PostgreSQL)

### 1. `profiles`
- `id` (UUID, PK)
- `slug` (VARCHAR unique, ej: 'benjie', 'nahomi')
- `full_name` (TEXT)
- `headline` (TEXT, ej: 'Ingeniero en TI')
- `bio` (TEXT)
- `avatar_url` (TEXT)
- `hero_badge` (TEXT)
- `email` (TEXT)
- `phone` (TEXT)
- `location` (TEXT)
- `resume_url` (TEXT)
- `theme_color` (TEXT)
- `created_at` (TIMESTAMP)

### 2. `projects`
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> profiles.id)
- `title` (TEXT)
- `description` (TEXT)
- `category` (TEXT)
- `tags` (TEXT[])
- `image_url` (TEXT)
- `live_url` (TEXT)
- `repo_url` (TEXT)
- `featured` (BOOLEAN)
- `order_index` (INTEGER)

### 3. `experiences`
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> profiles.id)
- `role` (TEXT)
- `company` (TEXT)
- `period` (TEXT)
- `description` (TEXT)
- `order_index` (INTEGER)

### 4. `services`
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> profiles.id)
- `title` (TEXT)
- `description` (TEXT)
- `icon` (TEXT)
- `order_index` (INTEGER)

---

## ⚡ Reglas de Eficiencia & Ahorro de Tokens para Agentes
1. **Verificar `TODO.md` y `ARCHITECTURE.md`** antes de consultar archivos masivos.
2. **Fallback Offline**: La aplicación cuenta con datos estáticos de respaldo (`fallbackData`) en caso de que las variables de Supabase no estén configuradas en local, evitando errores en tiempo de ejecución.
3. **No reescribir archivos innecesariamente**: Modificar solo las secciones pertinentes.
