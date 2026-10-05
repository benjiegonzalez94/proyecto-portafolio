-- ==============================================================================
-- SCHEMA SUPABASE: SISTEMA MULTI-PORTAFOLIO (BENJIE & NAHOMI)
-- ==============================================================================
-- Ejecuta este script en el SQL Editor de tu panel de Supabase.

-- 1. Tabla de Perfiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(50) UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  hero_badge TEXT DEFAULT 'Disponible para proyectos',
  email TEXT,
  phone TEXT,
  location TEXT,
  resume_url TEXT,
  theme_accent TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabla de Experiencias Laborales
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabla de Proyectos
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  live_url TEXT,
  repo_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabla de Servicios / Especialidades
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT DEFAULT 'code',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Políticas de Lectura Pública (Cualquier visitante puede ver los portafolios)
DROP POLICY IF EXISTS "Lectura pública de perfiles" ON public.profiles;
CREATE POLICY "Lectura pública de perfiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de experiencias" ON public.experiences;
CREATE POLICY "Lectura pública de experiencias" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de proyectos" ON public.projects;
CREATE POLICY "Lectura pública de proyectos" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de servicios" ON public.services;
CREATE POLICY "Lectura pública de servicios" ON public.services FOR SELECT USING (true);

-- Políticas de Escritura (Solo usuarios autenticados pueden modificar)
DROP POLICY IF EXISTS "Modificación autenticada perfiles" ON public.profiles;
CREATE POLICY "Modificación autenticada perfiles" ON public.profiles FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Modificación autenticada experiencias" ON public.experiences;
CREATE POLICY "Modificación autenticada experiencias" ON public.experiences FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Modificación autenticada proyectos" ON public.projects;
CREATE POLICY "Modificación autenticada proyectos" ON public.projects FOR ALL TO authenticated USING (true);

DROP POLICY IF EXISTS "Modificación autenticada servicios" ON public.services;
CREATE POLICY "Modificación autenticada servicios" ON public.services FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- DATOS INICIALES (SEMILLA PARA BENJIE Y NAHOMI)
-- ==============================================================================

-- Perfil Benjie
INSERT INTO public.profiles (slug, full_name, headline, bio, hero_badge, email, location, theme_accent)
VALUES (
  'benjie',
  'Benjie González',
  'Ingeniero en Tecnologías de la Información',
  'Especialista en desarrollo de software, infraestructura TI, soporte y redes. Enfocado en soluciones de alto impacto y automatización de procesos para empresas y proyectos independientes.',
  'Disponible para contratos y proyectos TI',
  'benjiegonzalez@ejemplo.com',
  'Ecuador',
  '#0284c7'
) ON CONFLICT (slug) DO NOTHING;

-- Perfil Nahomi
INSERT INTO public.profiles (slug, full_name, headline, bio, hero_badge, email, location, theme_accent)
VALUES (
  'nahomi',
  'Nahomi Machuca',
  'Diseñadora Gráfica, Video Editor & Estratega de Marketing',
  'Creadora de contenido visual y estratega digital. Especializada en branding, identidad corporativa, edición de video comercial y campañas de marketing para potenciar marcas.',
  'Disponible para colaboraciones creativas',
  'nahomi@ejemplo.com',
  'Manta, Ecuador',
  '#ec4899'
) ON CONFLICT (slug) DO NOTHING;
