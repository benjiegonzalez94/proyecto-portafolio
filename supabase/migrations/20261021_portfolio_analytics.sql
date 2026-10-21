-- ==============================================================================
-- MIGRACIÓN: MÉTRICAS ANALÍTICAS AVANZADAS PARA PORTAFOLIOS
-- ==============================================================================
-- Agrega columnas de conteo de visitas y clics de contacto/enlaces en profiles,
-- además de funciones RPC atómicas con SECURITY DEFINER para registro público seguro.

-- 1. Agregar columnas de analítica a la tabla profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS whatsapp_clicks INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS link_clicks INTEGER DEFAULT 0;

-- 2. Asegurar que las filas existentes no tengan valores NULL
UPDATE public.profiles 
SET 
  views_count = COALESCE(views_count, 0),
  whatsapp_clicks = COALESCE(whatsapp_clicks, 0),
  link_clicks = COALESCE(link_clicks, 0)
WHERE views_count IS NULL OR whatsapp_clicks IS NULL OR link_clicks IS NULL;

-- 3. Función RPC atómica para incrementar visitas al portafolio
CREATE OR REPLACE FUNCTION public.increment_portfolio_view(target_slug TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    views_count = COALESCE(views_count, 0) + 1,
    updated_at = now()
  WHERE LOWER(slug) = LOWER(target_slug);
END;
$$;

-- 4. Función RPC atómica para incrementar clics en el botón de WhatsApp
CREATE OR REPLACE FUNCTION public.increment_whatsapp_click(target_slug TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    whatsapp_clicks = COALESCE(whatsapp_clicks, 0) + 1,
    updated_at = now()
  WHERE LOWER(slug) = LOWER(target_slug);
END;
$$;

-- 5. Función RPC atómica para incrementar clics en enlaces externos y proyectos
CREATE OR REPLACE FUNCTION public.increment_link_click(target_slug TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    link_clicks = COALESCE(link_clicks, 0) + 1,
    updated_at = now()
  WHERE LOWER(slug) = LOWER(target_slug);
END;
$$;

-- 6. Otorgar permisos de ejecución a los roles anon y authenticated
GRANT EXECUTE ON FUNCTION public.increment_portfolio_view(TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.increment_whatsapp_click(TEXT) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.increment_link_click(TEXT) TO anon, authenticated, service_role;
