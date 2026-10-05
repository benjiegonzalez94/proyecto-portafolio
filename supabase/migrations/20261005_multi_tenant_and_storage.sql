-- ==============================================================================
-- MIGRACIÓN: MULTI-TENANCY, TEMPLATES Y STORAGE (PORTFOLIO BUILDER)
-- ==============================================================================

-- 1. Agregar columnas a 'profiles'
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS template_id VARCHAR(50) DEFAULT 'tech-minimal';

-- 2. Asignar plantillas predefinidas a los perfiles existentes
UPDATE public.profiles SET template_id = 'tech-minimal' WHERE slug = 'benjie';
UPDATE public.profiles SET template_id = 'creative-visual' WHERE slug = 'nahomi';

-- 3. Crear Bucket de Supabase Storage para multimedia
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-media', 
  'portfolio-media', 
  true, 
  10485760, -- 10MB límite
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 10485760;

-- 4. Políticas RLS para Storage (portfolio-media)
DROP POLICY IF EXISTS "Acceso de lectura pública portfolio-media" ON storage.objects;
CREATE POLICY "Acceso de lectura pública portfolio-media" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Subida permitida portfolio-media" ON storage.objects;
CREATE POLICY "Subida permitida portfolio-media" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Actualización permitida portfolio-media" ON storage.objects;
CREATE POLICY "Actualización permitida portfolio-media" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "Eliminación permitida portfolio-media" ON storage.objects;
CREATE POLICY "Eliminación permitida portfolio-media" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'portfolio-media');

-- 5. Actualizar Políticas RLS de base de datos
-- Lectura pública universal
DROP POLICY IF EXISTS "Lectura pública de perfiles" ON public.profiles;
CREATE POLICY "Lectura pública de perfiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de experiencias" ON public.experiences;
CREATE POLICY "Lectura pública de experiencias" ON public.experiences FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de proyectos" ON public.projects;
CREATE POLICY "Lectura pública de proyectos" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de servicios" ON public.services;
CREATE POLICY "Lectura pública de servicios" ON public.services FOR SELECT USING (true);

-- Modificación: Permitir a usuarios autenticados o vinculados
DROP POLICY IF EXISTS "Modificación perfiles" ON public.profiles;
CREATE POLICY "Modificación perfiles" ON public.profiles FOR ALL 
USING (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR auth.role() = 'authenticated'
)
WITH CHECK (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR auth.role() = 'authenticated'
);

DROP POLICY IF EXISTS "Modificación proyectos" ON public.projects;
CREATE POLICY "Modificación proyectos" ON public.projects FOR ALL 
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Modificación experiencias" ON public.experiences;
CREATE POLICY "Modificación experiencias" ON public.experiences FOR ALL 
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Modificación servicios" ON public.services;
CREATE POLICY "Modificación servicios" ON public.services FOR ALL 
USING (true)
WITH CHECK (true);
