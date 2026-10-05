import { createClient } from '@supabase/supabase-js';
import type { FullPortfolio, Profile, Experience, Project, Service } from './types';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Datos locales de respaldo (Fallback) para funcionar inmediatamente
 * sin necesidad de credenciales configuradas en local.
 */
export const fallbackPortfolios: Record<string, FullPortfolio> = {
  benjie: {
    profile: {
      id: 'benjie-fallback-id',
      slug: 'benjie',
      full_name: 'Benjie González',
      headline: 'Ingeniero en Tecnologías de la Información',
      bio: 'Especialista en desarrollo de software, infraestructura TI, administración de redes y soporte corporativo. Apasionado por la automatización y soluciones tecnológicas escalables.',
      hero_badge: 'Disponible para consultoría y proyectos TI',
      email: 'contacto@benjiegonzalez.dev',
      location: 'Ecuador',
      theme_accent: '#2563eb', // Royal Blue
    },
    experiences: [
      {
        id: 'exp-b-1',
        profile_id: 'benjie-fallback-id',
        role: 'Ingeniero de Sistemas y Soporte TI',
        company: 'Empresas y Clientes Independientes',
        period: '2022 - Presente',
        description: 'Implementación y soporte de infraestructura tecnológica, mantenimiento de servidores, configuración de redes y seguridad de datos.',
        order_index: 1,
      },
      {
        id: 'exp-b-2',
        profile_id: 'benjie-fallback-id',
        role: 'Desarrollador de Software',
        company: 'Proyectos Propios & Freelance',
        period: '2021 - Presente',
        description: 'Construcción de aplicaciones web, automatización de flujos de trabajo e integración de bases de datos y APIs.',
        order_index: 2,
      },
    ],
    projects: [
      {
        id: 'proj-b-1',
        profile_id: 'benjie-fallback-id',
        title: 'Plataforma Web Multi-Portafolios',
        description: 'Micro-SaaS para despliegue y administración dinámica de portafolios profesionales con Astro y Supabase.',
        category: 'Desarrollo Web',
        tags: ['Astro', 'TypeScript', 'Supabase', 'PostgreSQL'],
        live_url: '#',
        featured: true,
        order_index: 1,
      },
      {
        id: 'proj-b-2',
        profile_id: 'benjie-fallback-id',
        title: 'Automatización y Monitoreo de Redes',
        description: 'Scripts y herramientas para diagnóstico, gestión de tráfico y seguridad en redes corporativas.',
        category: 'Redes y Sysadmin',
        tags: ['Linux', 'Networking', 'Bash', 'Docker'],
        live_url: '#',
        featured: true,
        order_index: 2,
      },
      {
        id: 'proj-b-3',
        profile_id: 'benjie-fallback-id',
        title: 'Helpdesk & Gestión de Activos TI',
        description: 'Sistema centralizado para tickets de soporte, control de inventario de hardware y auditoría de software.',
        category: 'Soporte TI',
        tags: ['ITSM', 'Hardware', 'Helpdesk', 'Database'],
        live_url: '#',
        featured: false,
        order_index: 3,
      },
    ],
    services: [
      {
        id: 'srv-b-1',
        profile_id: 'benjie-fallback-id',
        title: 'Desarrollo de Software y Web',
        description: 'Creación de sitios web rápidos, paneles administrativos y aplicaciones a medida con tecnologías modernas.',
        icon: 'code',
        order_index: 1,
      },
      {
        id: 'srv-b-2',
        profile_id: 'benjie-fallback-id',
        title: 'Redes e Infraestructura TI',
        description: 'Diseño, configuración, optimización y aseguramiento de redes locales y servidores en la nube.',
        icon: 'server',
        order_index: 2,
      },
      {
        id: 'srv-b-3',
        profile_id: 'benjie-fallback-id',
        title: 'Soporte Técnico y Consultoría',
        description: 'Diagnóstico, mantenimiento preventivo/correctivo y asesoría para modernizar el ecosistema tecnológico de tu negocio.',
        icon: 'tool',
        order_index: 3,
      },
    ],
  },
  nahomi: {
    profile: {
      id: 'nahomi-fallback-id',
      slug: 'nahomi',
      full_name: 'Nahomi Machuca',
      headline: 'Diseñadora Gráfica, Editora de Video & Marketing',
      bio: 'Combino el diseño, la edición de video y la estrategia de marketing con una mirada técnica para que cada marca comunique con claridad, emoción y carácter.',
      hero_badge: 'Disponible para proyectos creativos',
      email: 'contacto@nahomimachuca.com',
      location: 'Manta, Manabí — Ecuador',
      theme_accent: '#ec4899', // Pink
    },
    experiences: [
      {
        id: 'exp-n-1',
        profile_id: 'nahomi-fallback-id',
        role: 'Directora Creativa & Freelance',
        company: 'Estudio Propio',
        period: '2021 - Presente',
        description: 'Creación de identidades visuales, edición audiovisual para redes sociales y dirección de campañas digitales.',
        order_index: 1,
      },
    ],
    projects: [
      {
        id: 'proj-n-1',
        profile_id: 'nahomi-fallback-id',
        title: 'Identidad Visual & Branding Comercial',
        description: 'Manual de marca completo, paleta tipográfica y sistema de empaques para negocios emergentes.',
        category: 'Branding',
        tags: ['Identidad', 'Tipografía', 'Diseño de Marca'],
        featured: true,
        order_index: 1,
      },
      {
        id: 'proj-n-2',
        profile_id: 'nahomi-fallback-id',
        title: 'Edición y Contenido para Redes Sociales',
        description: 'Producción de Reels y TikToks de alto engagement con animaciones y storytelling visual.',
        category: 'Video & Contenido',
        tags: ['Premiere', 'After Effects', 'Reels', 'TikTok'],
        featured: true,
        order_index: 2,
      },
    ],
    services: [
      {
        id: 'srv-n-1',
        profile_id: 'nahomi-fallback-id',
        title: 'Identidad Visual & Branding',
        description: 'Logotipos, manuales de marca y estética visual coherente y memorable.',
        icon: 'palette',
        order_index: 1,
      },
      {
        id: 'srv-n-2',
        profile_id: 'nahomi-fallback-id',
        title: 'Edición de Video & Motion',
        description: 'Edición dinámica para contenido digital, anuncios y videos corporativos.',
        icon: 'video',
        order_index: 2,
      },
      {
        id: 'srv-n-3',
        profile_id: 'nahomi-fallback-id',
        title: 'Estrategia de Contenido y Marketing',
        description: 'Planificación y diseño de piezas visuales orientadas a conversión en canales digitales.',
        icon: 'sparkles',
        order_index: 3,
      },
    ],
  },
};

/**
 * Obtener todos los perfiles disponibles para el Hub de inicio
 */
export async function getAllProfiles(): Promise<Profile[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Profile[];
      }
    } catch (e) {
      console.warn('Error conectando a Supabase, usando fallback local:', e);
    }
  }

  return Object.values(fallbackPortfolios).map((p) => p.profile);
}

export const defaultSkillsBySlug: Record<string, { title: string; skills: string[] }[]> = {
  benjie: [
    {
      title: 'Desarrollo Web & Software',
      skills: ['Astro', 'TypeScript', 'JavaScript', 'Python', 'Node.js', 'React', 'HTML5 & CSS3', 'Git / GitHub'],
    },
    {
      title: 'Bases de Datos & Backend',
      skills: ['PostgreSQL', 'Supabase', 'MySQL', 'REST APIs', 'SQL Server', 'JSON / Webhooks'],
    },
    {
      title: 'Infraestructura & Servidores',
      skills: ['Linux (Ubuntu/Debian)', 'Windows Server', 'Docker', 'Nginx', 'Apache', 'Cloud Hosting'],
    },
    {
      title: 'Redes & Seguridad TI',
      skills: ['MikroTik', 'Cisco', 'TCP/IP & Subnetting', 'VLANs', 'VPNs', 'Helpdesk Corporativo', 'Seguridad TI'],
    },
  ],
  nahomi: [
    {
      title: 'Identidad Visual & Branding',
      skills: ['Manual de Marca', 'Diseño de Logotipos', 'Sistemas Visuales', 'Tipografía', 'Diseño de Empaques'],
    },
    {
      title: 'Software de Diseño Profesional',
      skills: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Adobe InDesign', 'Canva Pro'],
    },
    {
      title: 'Producción & Edición Audiovisual',
      skills: ['Adobe Premiere Pro', 'After Effects', 'CapCut Pro', 'Motion Graphics', 'Reels & TikToks'],
    },
    {
      title: 'Marketing & Estrategia Digital',
      skills: ['Estrategia de Contenido', 'Storytelling Visual', 'Copywriting', 'Gestión de Campañas', 'SEO Redes'],
    },
  ],
};

/**
 * Obtener la información completa de un portafolio por su slug ('benjie' o 'nahomi')
 */
export async function getPortfolioBySlug(slug: string): Promise<FullPortfolio | null> {
  const normalizedSlug = slug.toLowerCase().trim();
  const skills = defaultSkillsBySlug[normalizedSlug] || [];

  if (supabase) {
    try {
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('slug', normalizedSlug)
        .single();

      if (!profileErr && profile) {
        const [expRes, projRes, srvRes] = await Promise.all([
          supabase.from('experiences').select('*').eq('profile_id', profile.id).order('order_index'),
          supabase.from('projects').select('*').eq('profile_id', profile.id).order('order_index'),
          supabase.from('services').select('*').eq('profile_id', profile.id).order('order_index'),
        ]);

        return {
          profile: profile as Profile,
          experiences: (expRes.data as Experience[]) || [],
          projects: (projRes.data as Project[]) || [],
          services: (srvRes.data as Service[]) || [],
          skillCategories: skills,
        };
      }
    } catch (e) {
      console.warn(`Error al consultar perfil ${slug} en Supabase, usando fallback:`, e);
    }
  }

  const fallback = fallbackPortfolios[normalizedSlug];
  if (fallback) {
    return {
      ...fallback,
      skillCategories: skills,
    };
  }

  return null;
}
