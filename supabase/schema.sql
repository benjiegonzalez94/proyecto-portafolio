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

-- Políticas de Escritura y Gestión (Permitir inserción y actualización desde el panel administrativo)
DROP POLICY IF EXISTS "Modificación autenticada perfiles" ON public.profiles;
CREATE POLICY "Modificación perfiles" ON public.profiles FOR ALL USING (true);

DROP POLICY IF EXISTS "Modificación autenticada experiencias" ON public.experiences;
CREATE POLICY "Modificación experiencias" ON public.experiences FOR ALL USING (true);

DROP POLICY IF EXISTS "Modificación autenticada proyectos" ON public.projects;
CREATE POLICY "Modificación proyectos" ON public.projects FOR ALL USING (true);

DROP POLICY IF EXISTS "Modificación autenticada servicios" ON public.services;
CREATE POLICY "Modificación servicios" ON public.services FOR ALL USING (true);

-- ==============================================================================
-- DATOS INICIALES (SEMILLA PARA BENJIE Y NAHOMI)
-- ==============================================================================

-- 1. Perfil Benjie
INSERT INTO public.profiles (slug, full_name, headline, bio, hero_badge, email, location, theme_accent)
VALUES (
  'benjie',
  'Benjie González',
  'Ingeniero en Tecnologías de la Información',
  'Especialista en desarrollo de software, infraestructura TI, soporte corporativo y redes. Enfocado en soluciones de alto impacto y automatización de procesos para empresas y proyectos independientes.',
  'Disponible para contratos y proyectos TI',
  'contacto@benjiegonzalez.dev',
  'Ecuador',
  '#0284c7'
) ON CONFLICT (slug) DO NOTHING;

-- 2. Perfil Nahomi
INSERT INTO public.profiles (slug, full_name, headline, bio, hero_badge, email, location, theme_accent)
VALUES (
  'nahomi',
  'Nahomi Machuca',
  'Diseñadora Gráfica, Video Editor & Estratega de Marketing',
  'Combino el diseño gráfico, la edición de video dinámico y la estrategia de marketing digital con una mirada técnica para que cada marca comunique con claridad, carácter y alta retención.',
  'Disponible para colaboraciones creativas',
  'contacto@nahomimachuca.com',
  'Manta, Manabí — Ecuador',
  '#ec4899'
) ON CONFLICT (slug) DO NOTHING;

-- 3. Proyectos Benjie
INSERT INTO public.projects (profile_id, title, description, category, tags, live_url, featured, order_index)
SELECT id, 'Plataforma Web Multi-Portafolios con CMS', 'Micro-SaaS para despliegue y administración dinámica de portafolios profesionales con Astro, Supabase y CI/CD en Vercel.', 'Desarrollo Web', ARRAY['Astro', 'TypeScript', 'Supabase', 'PostgreSQL'], '#', true, 1
FROM public.profiles WHERE slug = 'benjie';

INSERT INTO public.projects (profile_id, title, description, category, tags, live_url, featured, order_index)
SELECT id, 'Automatización & Infraestructura de Redes', 'Diseño de red corporativa, scripts de diagnóstico y monitoreo de tráfico en tiempo real con políticas de seguridad.', 'Redes y Servidores', ARRAY['Linux', 'Networking', 'Mikrotik', 'Docker'], '#', true, 2
FROM public.profiles WHERE slug = 'benjie';

INSERT INTO public.projects (profile_id, title, description, category, tags, live_url, featured, order_index)
SELECT id, 'Sistema Helpdesk y Control de Activos TI', 'Gestión centralizada de incidencias de soporte técnico, inventario de hardware y auditoría preventiva de sistemas.', 'Soporte TI', ARRAY['ITSM', 'Hardware', 'Helpdesk', 'Database'], '#', false, 3
FROM public.profiles WHERE slug = 'benjie';

-- 4. Servicios Benjie
INSERT INTO public.services (profile_id, title, description, icon, order_index)
SELECT id, 'Desarrollo de Software y Aplicaciones Web', 'Creación de plataformas rápidas, seguras y escalables con tecnologías modernas (Astro, Node.js, React).', 'code', 1
FROM public.profiles WHERE slug = 'benjie';

INSERT INTO public.services (profile_id, title, description, icon, order_index)
SELECT id, 'Administración de Redes y Servidores Cloud', 'Configuración, optimización y aseguramiento de redes cableadas, WiFi empresarial y entornos de servidores.', 'server', 2
FROM public.profiles WHERE slug = 'benjie';

INSERT INTO public.services (profile_id, title, description, icon, order_index)
SELECT id, 'Soporte Técnico Especializado y Consultoría', 'Mantenimiento preventivo, diagnóstico correctivo y consultoría en modernización tecnológica corporativa.', 'tool', 3
FROM public.profiles WHERE slug = 'benjie';

-- 5. Experiencias Benjie
INSERT INTO public.experiences (profile_id, role, company, period, description, order_index)
SELECT id, 'Ingeniero de Infraestructura y Soporte TI', 'Empresas y Clientes Independientes', '2022 - Presente', 'Gestión y mantenimiento integral de infraestructura tecnológica, soporte a usuarios y resolución de incidencias críticas.', 1
FROM public.profiles WHERE slug = 'benjie';

INSERT INTO public.experiences (profile_id, role, company, period, description, order_index)
SELECT id, 'Desarrollador de Software y Consultor TI', 'Proyectos Freelance & Propios', '2020 - 2022', 'Creación de software de automatización, integración de APIs y desarrollo de interfaces web a medida.', 2
FROM public.profiles WHERE slug = 'benjie';

-- 6. Proyectos Nahomi
INSERT INTO public.projects (profile_id, title, description, category, tags, featured, order_index)
SELECT id, 'Identidad Visual & Branding Café Litoral', 'Manual de identidad de marca completo, isotipo, paleta cromática y diseño de empaques para negocio de café gourmet.', 'Branding', ARRAY['Branding', 'Identidad', 'Tipografía'], true, 1
FROM public.profiles WHERE slug = 'nahomi';

INSERT INTO public.projects (profile_id, title, description, category, tags, featured, order_index)
SELECT id, 'Campaña Audiovisual y Contenido para Redes', 'Producción de Reels y TikToks de alto impacto con edición dinámica y motion graphics para marcas de retail.', 'Video & Redes', ARRAY['Premiere', 'After Effects', 'Reels'], true, 2
FROM public.profiles WHERE slug = 'nahomi';

INSERT INTO public.projects (profile_id, title, description, category, tags, featured, order_index)
SELECT id, 'Diseño de Packaging Sustentable de Cacao', 'Concepto y diseño de empaque para barras de chocolate fino de aroma con certificación ambiental.', 'Packaging', ARRAY['Packaging', 'Empaques', 'Ilustración'], true, 3
FROM public.profiles WHERE slug = 'nahomi';

-- 7. Servicios Nahomi
INSERT INTO public.services (profile_id, title, description, icon, order_index)
SELECT id, 'Identidad Visual y Diseño de Marca', 'Logotipos memorables, manuales de marca y sistemas visuales que posicionan tu negocio con coherencia.', 'palette', 1
FROM public.profiles WHERE slug = 'nahomi';

INSERT INTO public.services (profile_id, title, description, icon, order_index)
SELECT id, 'Edición de Video Comercial y Motion Graphics', 'Edición dinámica para reels, videos corporativos y comerciales optimizados para conversión.', 'video', 2
FROM public.profiles WHERE slug = 'nahomi';

INSERT INTO public.services (profile_id, title, description, icon, order_index)
SELECT id, 'Estrategia de Contenido y Campañas Digitales', 'Planificación estratégica y producción estética de contenido visual con narrativa de marca atractiva.', 'sparkles', 3
FROM public.profiles WHERE slug = 'nahomi';

-- 8. Experiencias Nahomi
INSERT INTO public.experiences (profile_id, role, company, period, description, order_index)
SELECT id, 'Directora Creativa & Diseñadora Senior', 'Estudio de Diseño Propio', '2021 - Presente', 'Dirección de proyectos de branding, producción visual y consultoría estética para marcas emergentes.', 1
FROM public.profiles WHERE slug = 'nahomi';
