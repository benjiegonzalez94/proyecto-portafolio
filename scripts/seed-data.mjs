import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zkohdxyhytvtneijfbyd.supabase.co',
  'sb_publishable_tkZxZfWHPUNNFu1AqcqZMw_vQ36f1lE'
);

async function seed() {
  const { data: profiles } = await supabase.from('profiles').select('id, slug');
  const benjieId = profiles.find((p) => p.slug === 'benjie')?.id;
  const nahomiId = profiles.find((p) => p.slug === 'nahomi')?.id;

  if (!benjieId || !nahomiId) {
    console.error('No se encontraron perfiles.');
    return;
  }

  // 1. Proyectos Benjie
  const benjieProjects = [
    {
      profile_id: benjieId,
      title: 'Plataforma Web Multi-Portafolios con CMS',
      description: 'Arquitectura escalable para despliegue y gestión de portafolios profesionales con Astro, Supabase y CI/CD.',
      category: 'Desarrollo de Software',
      tags: ['Astro', 'TypeScript', 'Supabase', 'PostgreSQL'],
      live_url: '#',
      featured: true,
      order_index: 1,
    },
    {
      profile_id: benjieId,
      title: 'Infraestructura & Automatización de Redes',
      description: 'Implementación y optimización de redes empresariales, monitoreo de tráfico y protocolos de seguridad.',
      category: 'Redes y Servidores',
      tags: ['Linux', 'Networking', 'Mikrotik', 'Docker'],
      live_url: '#',
      featured: true,
      order_index: 2,
    },
    {
      profile_id: benjieId,
      title: 'Helpdesk & Gestión de Activos TI',
      description: 'Solución centralizada para soporte corporativo, mantenimiento de hardware y aseguramiento de operaciones.',
      category: 'Soporte TI',
      tags: ['ITSM', 'Hardware', 'Soporte', 'Seguridad'],
      live_url: '#',
      featured: false,
      order_index: 3,
    },
  ];

  // 2. Servicios Benjie
  const benjieServices = [
    {
      profile_id: benjieId,
      title: 'Desarrollo de Software & Web',
      description: 'Construcción de aplicaciones web rápidas, sistemas internos y paneles de administración a medida.',
      icon: 'code',
      order_index: 1,
    },
    {
      profile_id: benjieId,
      title: 'Administración de Redes y Servidores',
      description: 'Diseño, configuración y monitoreo de infraestructura cableada, inalámbrica y entornos cloud.',
      icon: 'server',
      order_index: 2,
    },
    {
      profile_id: benjieId,
      title: 'Soporte Técnico y Consultoría TI',
      description: 'Diagnóstico rápido, planes de mantenimiento y asesoramiento tecnológico integral para empresas.',
      icon: 'tool',
      order_index: 3,
    },
  ];

  // 3. Experiencias Benjie
  const benjieExperiences = [
    {
      profile_id: benjieId,
      role: 'Ingeniero de TI & Soporte de Infraestructura',
      company: 'Empresas y Clientes Independientes',
      period: '2022 - Presente',
      description: 'Soporte continuo a infraestructura tecnológica, administración de estaciones de trabajo, gestión de servidores y redes.',
      order_index: 1,
    },
    {
      profile_id: benjieId,
      role: 'Consultor de Software y Redes',
      company: 'Proyectos Propios & Freelance',
      period: '2020 - 2022',
      description: 'Desarrollo de plataformas web a medida, automatización de tareas con scripts y soporte a sistemas corporativos.',
      order_index: 2,
    },
  ];

  // 4. Proyectos Nahomi
  const nahomiProjects = [
    {
      profile_id: nahomiId,
      title: 'Identidad Visual & Branding Café Litoral',
      description: 'Creación integral de identidad visual, logotipo, paleta cromática y piezas editoriales para marca cafetera.',
      category: 'Branding & Identidad',
      tags: ['Branding', 'Logotipo', 'Empaques'],
      featured: true,
      order_index: 1,
    },
    {
      profile_id: nahomiId,
      title: 'Campaña Digital y Contenido Audiovisual de Verano',
      description: 'Dirección de arte, fotografía y producción de reels promocionales para retail de moda.',
      category: 'Marketing & Video',
      tags: ['Reels', 'TikTok', 'Edición de Video', 'Campaña'],
      featured: true,
      order_index: 2,
    },
    {
      profile_id: nahomiId,
      title: 'Packaging & Diseño de Empaques Cacao',
      description: 'Diseño de etiquetas y empaques sustentables para producto gourmet de exportación nacional.',
      category: 'Packaging',
      tags: ['Packaging', 'Ilustración', 'Diseño'],
      featured: true,
      order_index: 3,
    },
  ];

  // 5. Servicios Nahomi
  const nahomiServices = [
    {
      profile_id: nahomiId,
      title: 'Diseño Gráfico & Identidad Visual',
      description: 'Branding completo, logotipos memorables y manuales de marca para destacar en el mercado.',
      icon: 'palette',
      order_index: 1,
    },
    {
      profile_id: nahomiId,
      title: 'Edición de Video & Motion Graphics',
      description: 'Producción y montaje audiovisual dinámico para TikTok, Instagram Reels y videos promocionales.',
      icon: 'video',
      order_index: 2,
    },
    {
      profile_id: nahomiId,
      title: 'Estrategia y Creación de Contenido',
      description: 'Planificación y producción estética de contenido visual con enfoque en retención y engagement.',
      icon: 'sparkles',
      order_index: 3,
    },
  ];

  // 6. Experiencias Nahomi
  const nahomiExperiences = [
    {
      profile_id: nahomiId,
      role: 'Directora Creativa & Freelance',
      company: 'Estudio de Diseño Propio',
      period: '2021 - Presente',
      description: 'Diseño de identidades corporativas, edición de contenido publicitario y gestión de imagen para marcas.',
      order_index: 1,
    },
  ];

  console.log('Insertando datos en Supabase...');
  await supabase.from('projects').insert([...benjieProjects, ...nahomiProjects]);
  await supabase.from('services').insert([...benjieServices, ...nahomiServices]);
  await supabase.from('experiences').insert([...benjieExperiences, ...nahomiExperiences]);

  console.log('✓ Todos los datos iniciales fueron cargados exitosamente en Supabase.');
}

seed().catch(console.error);
