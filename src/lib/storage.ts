import { supabase, isSupabaseConfigured } from './supabase';

export const STORAGE_BUCKET = 'portfolio-media';

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
  format?: 'image/webp' | 'image/jpeg';
}

/**
 * Optimiza y redimensiona una imagen en el navegador del cliente usando HTML5 Canvas.
 * Reduce pesos de 5MB-15MB a menos de 200KB-400KB al instante.
 */
export async function optimizeImageClient(
  file: File | Blob,
  options: ImageOptimizationOptions = {}
): Promise<{ blob: Blob; width: number; height: number }> {
  const {
    maxWidth = 1600,
    maxHeight = 1600,
    quality = 0.85,
    format = 'image/webp'
  } = options;

  return new Promise((resolve, reject) => {
    // Si ya es SVG, no redimensionar
    if ('type' in file && file.type === 'image/svg+xml') {
      return resolve({ blob: file, width: 0, height: 0 });
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;

      // Calcular nuevas dimensiones manteniendo aspect ratio
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          maxHeight;
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('No se pudo inicializar canvas 2D para optimización.'));
      }

      // Dibujar imagen con suavizado de alta calidad
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return reject(new Error('Fallo al comprimir imagen en canvas.'));
          }
          resolve({ blob, width, height });
        },
        format,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo decodificar el archivo de imagen.'));
    };

    img.src = url;
  });
}

/**
 * Sube una imagen optimizada a Supabase Storage y retorna su URL pública accesible.
 */
export async function uploadMediaFile(
  file: File | Blob,
  folder: 'avatars' | 'projects' | 'general' = 'general',
  prefix: string = 'media',
  fileNameCustom?: string
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase || !isSupabaseConfigured) {
    return { url: null, error: 'Supabase no está configurado.' };
  }

  try {
    // 1. Optimizar imagen automáticamente antes de subir
    let uploadBlob: Blob = file;
    let extension = 'webp';

    const isSvg = 'type' in file && file.type === 'image/svg+xml';
    if (!isSvg) {
      const isAvatar = folder === 'avatars';
      const opt = await optimizeImageClient(file, {
        maxWidth: isAvatar ? 800 : 1600,
        maxHeight: isAvatar ? 800 : 1200,
        quality: isAvatar ? 0.88 : 0.84,
        format: 'image/webp'
      });
      uploadBlob = opt.blob;
      extension = 'webp';
    } else {
      extension = 'svg';
    }

    // 2. Generar nombre de archivo único
    const cleanPrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '');
    const fileName = fileNameCustom || `${folder}/${cleanPrefix}-${Date.now()}.${extension}`;

    // 3. Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, uploadBlob, {
        cacheControl: '3600',
        upsert: true,
        contentType: isSvg ? 'image/svg+xml' : 'image/webp',
      });

    if (error) {
      console.error('Error al subir a Supabase Storage:', error);
      return { url: null, error: error.message };
    }

    // 4. Obtener URL pública
    const { data: publicData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.path);

    return { url: publicData.publicUrl, error: null };
  } catch (err: any) {
    console.error('Excepción al subir imagen:', err);
    return { url: null, error: err?.message || 'Error inesperado al subir la imagen.' };
  }
}
