/**
 * analytics.ts — Módulo de seguimiento analítico en tiempo real para portafolios.
 * Registra visitas únicas por sesión, clics en WhatsApp y clics en enlaces externos,
 * con sincronización en Supabase y respaldo inteligente de tolerancia a fallos.
 */
import { supabase } from './supabase';
import type { Profile } from './types';

export interface PortfolioAnalytics {
  views: number;
  whatsappClicks: number;
  linkClicks: number;
}

/**
 * Obtener métricas locales de respaldo (por si la BD aún no cuenta con las columnas)
 */
function getLocalFallbackMetrics(slug: string): PortfolioAnalytics {
  if (typeof window === 'undefined') return { views: 0, whatsappClicks: 0, linkClicks: 0 };
  try {
    const raw = localStorage.getItem(`portfolio_metrics_${slug.toLowerCase()}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // Silencioso en caso de bloqueo de localStorage
  }
  return { views: 0, whatsappClicks: 0, linkClicks: 0 };
}

/**
 * Guardar métricas locales de respaldo
 */
function saveLocalFallbackMetrics(slug: string, metrics: PortfolioAnalytics): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`portfolio_metrics_${slug.toLowerCase()}`, JSON.stringify(metrics));
  } catch (e) {
    // Ignorar si el almacenamiento está restringido
  }
}

/**
 * Incrementar métrica en respaldo local
 */
function incrementLocalFallback(slug: string, key: keyof PortfolioAnalytics): void {
  const current = getLocalFallbackMetrics(slug);
  current[key] = (current[key] || 0) + 1;
  saveLocalFallbackMetrics(slug, current);
}

/**
 * Registrar una visita al portafolio.
 * Se contabiliza una única vez por sesión del navegador para no inflar métricas en recargas F5.
 */
export async function recordPortfolioView(slug: string): Promise<void> {
  if (typeof window === 'undefined') return;

  const normalizedSlug = slug.toLowerCase().trim();
  const sessionKey = `view_recorded_${normalizedSlug}`;

  // Verificar si ya fue registrado en la sesión actual
  try {
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }
    sessionStorage.setItem(sessionKey, '1');
  } catch (e) {
    // Continuar si sessionStorage está deshabilitado
  }

  // 1. Intentar llamar a la función RPC en Supabase
  if (supabase) {
    try {
      const { error } = await supabase.rpc('increment_portfolio_view', {
        target_slug: normalizedSlug,
      });

      if (!error) return;

      // Si el RPC falla (ej. función no instalada todavía), intentar actualizar directamente
      const { data: profile } = await supabase
        .from('profiles')
        .select('views_count')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (profile && typeof profile.views_count === 'number') {
        await supabase
          .from('profiles')
          .update({ views_count: (profile.views_count || 0) + 1 })
          .eq('slug', normalizedSlug);
        return;
      }
    } catch (err) {
      console.warn('Registro de visita en Supabase en espera de migración:', err);
    }
  }

  // 2. Respaldo local
  incrementLocalFallback(normalizedSlug, 'views');
}

/**
 * Registrar un clic en el botón de WhatsApp (Hero, Flotante, Lightbox o Footer)
 */
export async function recordWhatsAppClick(slug: string): Promise<void> {
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Intentar registrar en Supabase vía RPC
  if (supabase) {
    try {
      const { error } = await supabase.rpc('increment_whatsapp_click', {
        target_slug: normalizedSlug,
      });

      if (!error) return;

      // Actualización directa si el RPC aún no está creado
      const { data: profile } = await supabase
        .from('profiles')
        .select('whatsapp_clicks')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (profile && typeof profile.whatsapp_clicks === 'number') {
        await supabase
          .from('profiles')
          .update({ whatsapp_clicks: (profile.whatsapp_clicks || 0) + 1 })
          .eq('slug', normalizedSlug);
        return;
      }
    } catch (err) {
      console.warn('Registro de WhatsApp en Supabase en espera de migración:', err);
    }
  }

  // 2. Respaldo local
  incrementLocalFallback(normalizedSlug, 'whatsappClicks');
}

/**
 * Registrar un clic en enlaces externos (demo en vivo, repositorios, redes sociales, CV)
 */
export async function recordLinkClick(slug: string, _url?: string): Promise<void> {
  const normalizedSlug = slug.toLowerCase().trim();

  // 1. Intentar registrar en Supabase vía RPC
  if (supabase) {
    try {
      const { error } = await supabase.rpc('increment_link_click', {
        target_slug: normalizedSlug,
      });

      if (!error) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('link_clicks')
        .eq('slug', normalizedSlug)
        .maybeSingle();

      if (profile && typeof profile.link_clicks === 'number') {
        await supabase
          .from('profiles')
          .update({ link_clicks: (profile.link_clicks || 0) + 1 })
          .eq('slug', normalizedSlug);
        return;
      }
    } catch (err) {
      console.warn('Registro de clic de enlace en Supabase:', err);
    }
  }

  // 2. Respaldo local
  incrementLocalFallback(normalizedSlug, 'linkClicks');
}

/**
 * Obtener métricas consolidadas para un portafolio específico
 */
export function extractPortfolioMetrics(profile?: Profile | null): PortfolioAnalytics {
  if (!profile) return { views: 0, whatsappClicks: 0, linkClicks: 0 };

  const local = getLocalFallbackMetrics(profile.slug);

  const dbViews = typeof profile.views_count === 'number' ? profile.views_count : 0;
  const dbWa = typeof profile.whatsapp_clicks === 'number' ? profile.whatsapp_clicks : 0;
  const dbLinks = typeof profile.link_clicks === 'number' ? profile.link_clicks : 0;

  return {
    views: Math.max(dbViews, local.views),
    whatsappClicks: Math.max(dbWa, local.whatsappClicks),
    linkClicks: Math.max(dbLinks, local.linkClicks),
  };
}
