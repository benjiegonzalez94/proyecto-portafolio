import { supabase, isSupabaseConfigured } from './supabase';

export const STORAGE_BUCKET = 'portfolio-media';

/**
 * Sube una imagen a Supabase Storage y retorna su URL pública accesible.
 * 
 * @param file - Archivo de imagen seleccionado por el usuario (File/Blob)
 * @param folder - Carpeta destino dentro del bucket (ej: 'avatars', 'projects')
 * @param prefix - Prefijo identificador (ej: profileId o slug)
 * @returns {Promise<{ url: string | null; error: string | null }>}
 */
export async function uploadMediaFile(
  file: File,
  folder: 'avatars' | 'projects' | 'general' = 'general',
  prefix: string = 'media'
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase || !isSupabaseConfigured) {
    return { url: null, error: 'Supabase no está configurado.' };
  }

  try {
    // Validar tipo de archivo
    const validTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return { url: null, error: 'Formato no compatible. Por favor usa JPG, PNG, WEBP o SVG.' };
    }

    // Validar tamaño máximo (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { url: null, error: 'La imagen supera el límite de 5MB.' };
    }

    // Generar nombre de archivo único
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png';
    const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '');
    const fileName = `${folder}/${cleanPrefix}-${Date.now()}.${fileExt}`;

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Error al subir a Supabase Storage:', error);
      return { url: null, error: error.message };
    }

    // Obtener la URL pública del archivo subido
    const { data: publicData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return { url: publicData.publicUrl, error: null };
  } catch (err: any) {
    console.error('Excepción al subir imagen:', err);
    return { url: null, error: err?.message || 'Error inesperado al subir la imagen.' };
  }
}
