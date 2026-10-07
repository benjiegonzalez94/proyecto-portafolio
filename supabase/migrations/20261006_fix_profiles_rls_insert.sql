-- ==============================================================================
-- MIGRACIÓN: CORRECCIÓN DE POLÍTICAS RLS EN PROFILES (REGISTRO Y EDICIÓN)
-- ==============================================================================

-- 1. Permitir inserción en profiles para nuevos registros
DROP POLICY IF EXISTS "Inserción perfiles nuevos" ON public.profiles;
CREATE POLICY "Inserción perfiles nuevos" ON public.profiles FOR INSERT 
WITH CHECK (true);

-- 2. Asegurar modificación para usuarios autenticados, vinculados o modo abierto
DROP POLICY IF EXISTS "Modificación perfiles" ON public.profiles;
CREATE POLICY "Modificación perfiles" ON public.profiles FOR ALL 
USING (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR auth.role() = 'authenticated'
  OR auth.role() = 'anon'
)
WITH CHECK (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR auth.role() = 'authenticated'
  OR auth.role() = 'anon'
);
