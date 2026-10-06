# 🏛️ Arquitectura del Sistema - Generador de Portafolios Online & CMS Multi-Usuario

Este documento describe la arquitectura, decisiones de diseño y estructura del proyecto para que cualquier desarrollador o agente de IA comprenda el contexto rápidamente con el mínimo consumo de tokens.

---

## 🎯 Objetivo de la Plataforma (Portfolio Builder)
Crear una plataforma SaaS web escalable y de costo $0 que permita:
1. **Perfiles Emblemáticos**: Alojar y gestionar los portafolios de **Benjie González** (Ingeniero en TI) y **Nahomi Machuca** (Marketing, Diseño Gráfico y Video).
2. **Generador de Portafolios Multi-Usuario**: Cualquier usuario nuevo puede registrarse, ingresar sus datos esenciales, seleccionar entre diversas **plantillas de diseño predefinidas**, y obtener su portafolio publicado al instante (`/:slug`).
3. **Gestión Autónoma (CMS)**: Cada usuario autenticado con sus credenciales accede a su propio panel `/admin` para personalizar biografía, proyectos, experiencias, servicios, subir archivos multimedia (fotos, portadas) y alternar de plantilla.
4. **Costo $0**: Infraestructura 100% sobre capas gratuitas de GitHub, Supabase (Auth, DB, Storage) y Vercel.

---

## 🛠️ Stack Tecnológico
- **Frontend / Framework**: [Astro 5](https://astro.build/) (Rendimiento ultra-rápido, SSG/SSR híbrido, SEO optimizado).
- **Estilos**: Vanilla CSS moderno / CSS Modules, CSS Variables dinámicas por plantilla y acento.
- **Base de Datos & Auth & Storage**: [Supabase](https://supabase.com/):
  - **PostgreSQL**: Datos relacionales multi-inquilino.
  - **Supabase Auth**: Autenticación segura de usuarios (JWT / Email + Contraseña).
  - **Supabase Storage**: Bucket público `portfolio-media` para imágenes de proyectos y avatares.
  - **Row Level Security (RLS)**: Cada usuario solo puede mutar sus propios registros.
- **Hosting & CI/CD**: [Vercel](https://vercel.com/) conectado al repositorio GitHub (`main`). Cada commit actualiza la web automáticamente.

---

## 📂 Estructura de Rutas
- `/`: **Hub Principal** - Landing page atractiva con llamado a la acción ("Crea tu Portafolio Gratis"), vitrina de portafolios destacados y acceso al sistema.
- `/crear`: **Generador de Portafolios (Onboarding)** - Formulario paso a paso donde el nuevo usuario ingresa sus datos, selecciona una plantilla visual, crea sus credenciales y genera su portafolio base.
- `/login`: **Inicio de Sesión** - Acceso para usuarios registrados (Benjie, Nahomi y nuevos usuarios).
- `/admin`: **Panel de Control / CMS** protegido por sesión:
  - Edición de perfil básico y biografía.
  - Selector y vista previa de plantillas (`template_id`).
  - Gestor de proyectos con carga directa de imágenes a Supabase Storage.
  - Gestor de experiencias laborales y servicios/skills.
  - Enlaces de contacto y redes.
- `/:slug` (ej: `/benjie`, `/nahomi`, `/nuevo-usuario`): **Portafolio Dinámico Público**, renderizado con la plantilla visual correspondiente (`template_id`).

---

## 🎨 Sistema de Plantillas Predefinidas (*Templates*)
1. `tech-minimal` (Por defecto para TI/Ingeniería): Estilo sobrio, paleta azul/grafito, enfoque en stacks tecnológicos, repositorios y métricas de proyectos.
2. `creative-visual` (Por defecto para Diseño/Multimedia): Estilo vibrante, paleta oscura o violeta/coral, tarjetas de proyectos tipo galería visual, énfasis en videos, diseño y branding.
3. `modern-gradient` (Universal/Ejecutivo): Estilo corporativo y limpio, acentos en degradados sutiles, enfoque en trayectoria y servicios de consultoría.

---

## 🗄️ Esquema de Base de Datos (Supabase / PostgreSQL)

### 1. `profiles`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> `auth.users.id` ON DELETE SET NULL)
- `slug` (VARCHAR unique, ej: 'benjie', 'nahomi')
- `full_name` (TEXT)
- `headline` (TEXT)
- `bio` (TEXT)
- `avatar_url` (TEXT)
- `hero_badge` (TEXT)
- `email` (TEXT)
- `phone` (TEXT)
- `location` (TEXT)
- `resume_url` (TEXT)
- `theme_accent` (TEXT)
- `theme_mode` (VARCHAR(20) DEFAULT 'dark' — 'dark' | 'light')
- `template_id` (VARCHAR(50) DEFAULT 'tech-minimal')
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

### 2. `projects`
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> `profiles.id` ON DELETE CASCADE)
- `title` (TEXT)
- `description` (TEXT)
- `category` (TEXT)
- `tags` (TEXT[])
- `image_url` (TEXT - almacena URL pública de Supabase Storage)
- `live_url` (TEXT)
- `repo_url` (TEXT)
- `featured` (BOOLEAN)
- `order_index` (INTEGER)
- `created_at` (TIMESTAMPTZ)

### 3. `experiences`
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> `profiles.id` ON DELETE CASCADE)
- `role` (TEXT)
- `company` (TEXT)
- `period` (TEXT)
- `description` (TEXT)
- `order_index` (INTEGER)
- `created_at` (TIMESTAMPTZ)

### 4. `services`
- `id` (UUID, PK)
- `profile_id` (UUID, FK -> `profiles.id` ON DELETE CASCADE)
- `title` (TEXT)
- `description` (TEXT)
- `icon` (TEXT)
- `order_index` (INTEGER)
- `created_at` (TIMESTAMPTZ)

---

## 📦 Almacenamiento Multimedia (Supabase Storage)
- **Bucket**: `portfolio-media` (acceso público para lectura, subida restringida a usuarios autenticados).
- **Ruta de archivos**:
  - `avatars/{profile_id}/{filename}`
  - `projects/{profile_id}/{filename}`

---

## ⚡ Reglas de Eficiencia & Ahorro de Tokens para Agentes
1. **Verificar `TODO.md` y `ARCHITECTURE.md`** antes de consultar archivos masivos.
2. **Fallback Offline**: Soporte de fallback estático si Supabase no responde o en desarrollo offline.
3. **No reescribir archivos innecesariamente**: Modificar solo las secciones pertinentes.
