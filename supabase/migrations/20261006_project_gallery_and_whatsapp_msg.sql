-- ==============================================================================
-- MIGRACIÓN: GALERÍA DE MÚLTIPLES FOTOS PARA PROYECTOS Y MENSAJE DE WHATSAPP
-- ==============================================================================

-- 1. Agregar 'gallery_images' a 'projects' (array de URLs de imágenes secundarias)
ALTER TABLE public.projects 
  ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';

-- 2. Agregar 'whatsapp_message' a 'profiles' (mensaje inicial personalizable)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS whatsapp_message TEXT;
