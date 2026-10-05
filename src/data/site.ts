/**
 * ============================================================================
 *  CONTENIDO DEL PORTAFOLIO  —  ÚNICO ARCHIVO QUE NECESITAS EDITAR
 * ============================================================================
 *
 *  Todo el texto, los enlaces y los proyectos del sitio salen de este archivo.
 *  No hace falta saber programar: cambia lo que está entre comillas " " y listo.
 *
 *  Reglas útiles:
 *   · Mantén las comillas, las comas y las llaves { } donde están.
 *   · Para dejar una línea vacía, usa "" (comillas vacías).
 *   · Los colores van en formato hexadecimal, por ejemplo "#FF3D8B".
 *   · Después de editar, guarda el archivo: la vista previa se actualiza sola.
 *
 *  Para añadir un proyecto nuevo, copia un bloque completo desde
 *  `{` hasta `},` dentro de `projects` y pégalo debajo. Luego cambia sus datos.
 * ============================================================================
 */

export type SocialNetwork = 'instagram' | 'linkedin' | 'behance' | 'youtube' | 'tiktok' | 'whatsapp' | 'email';

export interface SocialLink {
  network: SocialNetwork;
  label: string;
  url: string;
}

export interface Project {
  /** Debe ser único y sin espacios ni tildes: se usa en el enlace de la página. */
  slug: string;
  title: string;
  /** Categoría corta que aparece como etiqueta sobre la tarjeta. */
  category: string;
  /** Una frase corta que resume el proyecto. Aparece en la tarjeta. */
  summary: string;
  /** Descripción larga para la página individual del proyecto (2 a 4 frases). */
  description: string;
  year: string;
  client: string;
  /** Nombre del archivo de imagen dentro de src/assets/proyectos/. */
  image: string;
  /** Color de acento de la tarjeta (debe existir en la paleta de abajo). */
  accent: 'pink' | 'violet' | 'cyan' | 'tangerine' | 'yellow' | 'lime';
  /** Servicios aplicados en este proyecto. */
  tags: string[];
  /** Pon true para que aparezca en la página de inicio. Máximo 6 recomendado. */
  featured: boolean;
}

export interface Service {
  /** Icono decorativo: ver src/components/Icon.astro para la lista disponible. */
  icon: 'palette' | 'video' | 'megaphone' | 'chart' | 'sparkles' | 'camera';
  title: string;
  description: string;
  /** Lista de entregables concretos. */
  includes: string[];
  /** Rango de precio orientativo. Déjalo en "" para no mostrar precios. */
  price: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const site = {
  /* ------------------------------------------------------------------ */
  /*  1. DATOS BÁSICOS                                                   */
  /* ------------------------------------------------------------------ */

  /** Nombre tal como quieres que aparezca en grande. */
  name: 'Nahomi Machuca',

  /** Iniciales para el logo y el favicon (1 o 2 letras). */
  initials: 'NM',

  /** Tu título profesional principal. */
  role: 'Diseñadora Gráfica & Creadora de Contenido',

  /** Frase potente de portada. Que sea tuya y breve. */
  tagline: 'Convierto ideas en marcas que se ven, se sienten y se recuerdan.',

  /** Párrafo de presentación de la portada (2 o 3 frases). */
  intro:
    'Soy diseñadora gráfica en Manta, Ecuador. Combino el diseño, la edición de video y la estrategia de marketing con una mirada técnica —soy Ingeniera en TI y Magíster en Ciencia de Datos— para que cada marca comunique con claridad y con carácter.',

  /** Ciudad y país. */
  location: 'Manta, Manabí — Ecuador',

  /** Texto de disponibilidad. Aparece como un distintivo verde. */
  availability: 'Disponible para proyectos',

  /**
   * ⚠️ CAMBIA ESTOS DOS DATOS POR LOS REALES
   * El formulario de contacto los usa como destino.
   */
  email: 'hola@nahomimachuca.com',
  phone: '+593 99 000 0000',

  /** URL pública del sitio, igual que en astro.config.mjs. */
  url: 'https://nahomimachuca.com',

  /** Descripción para Google (máximo ~155 caracteres). */
  metaDescription:
    'Portafolio de Nahomi Machuca, diseñadora gráfica y creadora de contenido en Manta, Ecuador. Identidad visual, diseño digital, edición de video y marketing con estrategia.',

  /** Palabras clave para buscadores. */
  keywords: [
    'diseñadora gráfica Manta',
    'diseño de marca Ecuador',
    'identidad visual Manabí',
    'edición de video Ecuador',
    'creadora de contenido',
    'diseño gráfico freelance',
  ],

  /* ------------------------------------------------------------------ */
  /*  2. REDES SOCIALES                                                  */
  /*     Cambia las URLs por tus perfiles reales.                        */
  /*     Si no usas una red, borra su bloque completo { ... },           */
  /* ------------------------------------------------------------------ */

  social: [
    {
      network: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/nahomimachuca',
    },
    {
      network: 'linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/nahomimachuca',
    },
    {
      network: 'behance',
      label: 'Behance',
      url: 'https://behance.net/nahomimachuca',
    },
    {
      network: 'youtube',
      label: 'YouTube',
      url: 'https://youtube.com/@nahomimachuca',
    },
  ] as SocialLink[],

  /* ------------------------------------------------------------------ */
  /*  3. MENÚ DE NAVEGACIÓN                                              */
  /* ------------------------------------------------------------------ */

  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Portafolio', href: '/portafolio' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Sobre mí', href: '/sobre-mi' },
    { label: 'Contacto', href: '/contacto' },
  ],

  /* ------------------------------------------------------------------ */
  /*  4. CIFRAS DESTACADAS (portada)                                     */
  /* ------------------------------------------------------------------ */

  stats: [
    { value: '+6', label: 'Años de experiencia' },
    { value: '+80', label: 'Proyectos entregados' },
    { value: '+40', label: 'Marcas acompañadas' },
    { value: '100%', label: 'Clientes satisfechos' },
  ] as Stat[],

  /* ------------------------------------------------------------------ */
  /*  5. SERVICIOS                                                       */
  /* ------------------------------------------------------------------ */

  services: [
    {
      icon: 'palette',
      title: 'Identidad visual y branding',
      description:
        'Construyo marcas desde cero o les doy un aire nuevo: logo, paleta, tipografías y un manual para que todo se vea coherente en cualquier soporte.',
      includes: ['Logotipo y variantes', 'Paleta de color y tipografías', 'Manual de marca', 'Papelería y aplicaciones'],
      price: 'Desde $350',
    },
    {
      icon: 'sparkles',
      title: 'Diseño gráfico y publicitario',
      description:
        'Piezas que venden: anuncios, catálogos, empaques, vallas y material para redes, siempre alineados a la identidad de tu marca.',
      includes: ['Diseño para redes sociales', 'Flyers, banners y vallas', 'Empaques y etiquetas', 'Catálogos y brochures'],
      price: 'Desde $120',
    },
    {
      icon: 'video',
      title: 'Edición de video',
      description:
        'Del material crudo a una pieza que retiene la mirada: reels, spots publicitarios y videos corporativos con ritmo, color y sonido cuidados.',
      includes: ['Reels y TikToks', 'Spots publicitarios', 'Videos corporativos', 'Color, audio y subtítulos'],
      price: 'Desde $200',
    },
    {
      icon: 'megaphone',
      title: 'Marketing digital y contenido',
      description:
        'Planifico y produzco el contenido de tus canales con una estrategia clara, para que publicar deje de ser improvisar y empiece a dar resultados.',
      includes: ['Plan de contenidos mensual', 'Copywriting y guiones', 'Gestión de redes', 'Campañas pagadas'],
      price: 'Desde $250/mes',
    },
    {
      icon: 'chart',
      title: 'Análisis de datos y métricas',
      description:
        'Mi lado de Magíster en Ciencia de Datos: mido qué funciona, convierto tus números en tableros claros y decido el siguiente paso con evidencia.',
      includes: ['Tablero de métricas', 'Informe mensual de resultados', 'Análisis de audiencia', 'Optimización de campañas'],
      price: 'A cotizar',
    },
    {
      icon: 'camera',
      title: 'Producción de contenido visual',
      description:
        'Dirección de arte y producción de fotografía y video de producto, para que tu catálogo se vea a la altura de lo que vendes.',
      includes: ['Dirección de arte', 'Fotografía de producto', 'Video de producto', 'Retoque y postproducción'],
      price: 'A cotizar',
    },
  ] as Service[],

  /* ------------------------------------------------------------------ */
  /*  6. PROCESO DE TRABAJO                                              */
  /* ------------------------------------------------------------------ */

  process: [
    {
      step: '01',
      title: 'Conversamos',
      description: 'Escucho tu idea, tu público y tus objetivos. Definimos alcance, tiempos y presupuesto sin tecnicismos.',
    },
    {
      step: '02',
      title: 'Investigo y propongo',
      description: 'Analizo tu mercado y tu competencia, y te presento una propuesta visual con fundamento, no solo bonita.',
    },
    {
      step: '03',
      title: 'Diseño y ajustamos',
      description: 'Desarrollo el proyecto y lo revisamos juntas. Dos rondas de ajustes están incluidas en todos los paquetes.',
    },
    {
      step: '04',
      title: 'Entregamos y medimos',
      description: 'Recibes los archivos finales organizados y, si lo necesitas, seguimos midiendo resultados para mejorar.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  7. SOBRE MÍ                                                        */
  /* ------------------------------------------------------------------ */

  about: {
    /** Título grande de la página Sobre mí. */
    heading: 'Diseño con criterio, datos y mucha curiosidad.',

    /** Párrafos de tu historia. Cada línea es un párrafo. */
    paragraphs: [
      'Soy Nahomi Machuca y llevo más de seis años ayudando a emprendimientos, marcas personales y empresas de Manabí y del resto del país a comunicar mejor. Empecé en el diseño gráfico y fui sumando la edición de video, la creación de contenido y el marketing, porque entendí que una marca no se comunica solo con un logo: se comunica con todo lo que publica.',
      'Estudié Ingeniería en Tecnologías de la Información y después una Maestría en Ciencia de Datos. Eso me dio una ventaja poco común en el mundo creativo: no diseño por intuición sola, también mido. Sé qué está funcionando, qué hay que ajustar y cómo justificar cada decisión con números.',
      'Trabajo de cerca con cada cliente, sin intermediarios y sin lenguaje rebuscado. Me involucro en el negocio, entiendo a quién le habla y traduzco eso en piezas gráficas y audiovisuales que la gente entiende y recuerda.',
      'Cuando no estoy diseñando, estoy aprendiendo una herramienta nueva o grabando contenido. Me gusta la parte técnica del oficio tanto como la creativa.',
    ],

    /** Herramientas y áreas de dominio. */
    skills: [
      { group: 'Diseño', items: ['Adobe Illustrator', 'Adobe Photoshop', 'Adobe InDesign', 'Figma', 'Canva Pro', 'CorelDRAW'] },
      { group: 'Video', items: ['Adobe Premiere Pro', 'Adobe After Effects', 'CapCut', 'DaVinci Resolve', 'Animación 2D'] },
      { group: 'Marketing', items: ['Meta Ads', 'Google Ads', 'Planificación de contenido', 'Copywriting', 'Email marketing'] },
      { group: 'Datos y web', items: ['Power BI', 'Python', 'SQL', 'Google Analytics', 'Excel avanzado', 'Diseño web'] },
    ],

    /** Títulos y formación. */
    education: [
      { title: 'Magíster en Ciencia de Datos', place: 'Ecuador', year: '' },
      { title: 'Ingeniera en Tecnologías de la Información', place: 'Ecuador', year: '' },
      { title: 'Diseño Gráfico y Producción Audiovisual', place: 'Formación complementaria continua', year: '' },
    ],

    /** Lo que te diferencia. */
    values: [
      {
        icon: 'sparkles',
        title: 'Creatividad con estrategia',
        description: 'Cada pieza responde a un objetivo de negocio, no solamente a un gusto estético.',
      },
      {
        icon: 'chart',
        title: 'Decisiones con datos',
        description: 'Mido resultados y ajusto. El diseño también se puede evaluar y mejorar.',
      },
      {
        icon: 'palette',
        title: 'Trato directo',
        description: 'Hablas siempre conmigo, no con un equipo rotativo. Respuesta en menos de 24 horas.',
      },
      {
        icon: 'camera',
        title: 'Entrega puntual',
        description: 'Fechas claras desde el inicio y cumplimiento estricto de lo acordado.',
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  8. PROYECTOS                                                       */
  /*     Las imágenes viven en src/assets/proyectos/.                    */
  /*     Para reemplazar una, pon tu archivo con el mismo nombre.        */
  /* ------------------------------------------------------------------ */

  projects: [
    {
      slug: 'identidad-cafe-litoral',
      title: 'Café Litoral',
      category: 'Identidad visual',
      summary: 'Marca completa para una cafetería de especialidad frente al mar.',
      description:
        'Café Litoral necesitaba una identidad que hablara de su origen costero sin caer en los tópicos de playa. Construí un sistema gráfico inspirado en las líneas del oleaje y en la paleta cálida del grano tostado, con un logotipo versátil que funciona igual en el vaso de cartón que en el letrero luminoso.',
      year: '2024',
      client: 'Café Litoral — Manta',
      image: 'cafe-litoral.svg',
      accent: 'tangerine',
      tags: ['Logotipo', 'Manual de marca', 'Empaque', 'Señalética'],
      featured: true,
    },
    {
      slug: 'campana-verano-tienda',
      title: 'Campaña Verano',
      category: 'Campaña digital',
      summary: 'Lanzamiento de temporada con piezas para redes y video corto.',
      description:
        'Una campaña de temporada completa para una tienda de ropa local: concepto creativo, plantillas para redes, animaciones y un video vertical de 15 segundos que multiplicó por cuatro el alcance orgánico habitual de la marca.',
      year: '2024',
      client: 'Tienda Mar Adentro',
      image: 'campana-verano.svg',
      accent: 'pink',
      tags: ['Concepto creativo', 'Piezas para redes', 'Motion graphics', 'Video vertical'],
      featured: true,
    },
    {
      slug: 'documental-manabi',
      title: 'Raíces de Manabí',
      category: 'Edición de video',
      summary: 'Documental corto sobre artesanos de la provincia.',
      description:
        'Edición y postproducción de un documental de doce minutos sobre tres familias artesanas de Manabí. El reto fue ordenar más de nueve horas de material bruto en una narrativa emotiva, con corrección de color y diseño sonoro cuidados.',
      year: '2023',
      client: 'Proyecto independiente',
      image: 'documental-manabi.svg',
      accent: 'violet',
      tags: ['Edición', 'Corrección de color', 'Diseño sonoro', 'Subtítulos'],
      featured: true,
    },
    {
      slug: 'packaging-cacao',
      title: 'Cacao de Origen',
      category: 'Empaque',
      summary: 'Línea de empaques para chocolate artesanal de exportación.',
      description:
        'Diseño de una familia de empaques para chocolate fino de aroma, pensada para competir en góndola internacional. Trabajé la jerarquía de la información, los acabados y la coherencia entre las cinco variedades de la línea.',
      year: '2023',
      client: 'Finca La Perla',
      image: 'packaging-cacao.svg',
      accent: 'lime',
      tags: ['Packaging', 'Ilustración', 'Etiquetas', 'Pre-prensa'],
      featured: true,
    },
    {
      slug: 'redes-clinica',
      title: 'Clínica Vida',
      category: 'Marketing y contenido',
      summary: 'Estrategia y contenido mensual para redes sociales.',
      description:
        'Planificación, diseño y redacción del contenido de una clínica local durante ocho meses. Pasamos de publicar sin rumbo a un calendario editorial con pilares de contenido, guiones y un tablero de métricas para revisar resultados cada mes.',
      year: '2024',
      client: 'Clínica Vida — Manta',
      image: 'redes-clinica.svg',
      accent: 'cyan',
      tags: ['Estrategia', 'Calendario editorial', 'Diseño para redes', 'Métricas'],
      featured: true,
    },
    {
      slug: 'revista-aniversario',
      title: 'Revista 25 Años',
      category: 'Editorial',
      summary: 'Maquetación de una revista conmemorativa de 68 páginas.',
      description:
        'Diseño editorial de una publicación institucional de aniversario: retícula, jerarquías tipográficas, tratamiento fotográfico y coordinación con imprenta para asegurar el color y los acabados en la edición impresa.',
      year: '2023',
      client: 'Colegio Cervantes',
      image: 'revista-aniversario.svg',
      accent: 'yellow',
      tags: ['Diseño editorial', 'Retícula', 'Tipografía', 'Impresión'],
      featured: true,
    },
    {
      slug: 'app-finanzas-ui',
      title: 'FinApp',
      category: 'Diseño de interfaz',
      summary: 'Interfaz y sistema visual para una app de finanzas personales.',
      description:
        'Diseño de la interfaz de una aplicación móvil de finanzas personales: sistema de componentes, tipografía, iconografía y prototipo navegable validado con usuarios reales antes de pasar a desarrollo.',
      year: '2024',
      client: 'Startup FinApp',
      image: 'app-finanzas.svg',
      accent: 'violet',
      tags: ['UI/UX', 'Design system', 'Prototipo', 'Testeo con usuarios'],
      featured: false,
    },
    {
      slug: 'spot-turismo',
      title: 'Manta Te Espera',
      category: 'Video publicitario',
      summary: 'Spot turístico de 30 segundos para promoción local.',
      description:
        'Guion, edición y postproducción de un spot turístico de 30 segundos, con versiones adaptadas para televisión local, YouTube y formatos verticales para redes.',
      year: '2024',
      client: 'Cámara de Turismo',
      image: 'spot-turismo.svg',
      accent: 'cyan',
      tags: ['Guion', 'Edición', 'Motion graphics', 'Adaptación de formatos'],
      featured: false,
    },
    {
      slug: 'menu-gastronomia',
      title: 'Sabor Manabita',
      category: 'Diseño gráfico',
      summary: 'Carta, menú digital y señalética de un restaurante.',
      description:
        'Rediseño completo de la carta impresa y del menú digital de un restaurante tradicional, con fotografía de producto y una jerarquía que facilita la elección y aumenta el ticket promedio.',
      year: '2023',
      client: 'Restaurante Sabor Manabita',
      image: 'menu-gastronomia.svg',
      accent: 'tangerine',
      tags: ['Menú', 'Fotografía', 'Diagramación', 'Piezas digitales'],
      featured: false,
    },
  ] as Project[],

  /* ------------------------------------------------------------------ */
  /*  9. TESTIMONIOS                                                     */
  /*     Reemplázalos por opiniones reales de tus clientes.              */
  /* ------------------------------------------------------------------ */

  testimonials: [
    {
      quote:
        'Nahomi entendió nuestra marca mejor que nosotros. Nos entregó una identidad completa y, además, un plan para usarla bien en redes. Las ventas se notaron desde el segundo mes.',
      author: 'María Fernanda Loor',
      role: 'Fundadora, Café Litoral',
    },
    {
      quote:
        'Es muy ordenada y cumplida. Nos entregó el documental en la fecha exacta y con una calidad que no esperábamos con el material que teníamos.',
      author: 'Carlos Zambrano',
      role: 'Director, Raíces de Manabí',
    },
    {
      quote:
        'Lo que más valoro es que mide los resultados. No solo diseña bonito: nos muestra con números qué contenido funciona y por qué.',
      author: 'Dra. Andrea Ponce',
      role: 'Directora, Clínica Vida',
    },
  ] as Testimonial[],

  /* ------------------------------------------------------------------ */
  /* 10. PREGUNTAS FRECUENTES                                            */
  /* ------------------------------------------------------------------ */

  faqs: [
    {
      question: '¿Cómo empezamos un proyecto?',
      answer:
        'Escríbeme por el formulario, correo o WhatsApp con una idea general de lo que necesitas. Agendamos una llamada o reunión de 30 minutos sin costo, y en 48 horas te envío una propuesta con alcance, tiempos y precio.',
    },
    {
      question: '¿Cuánto tarda un proyecto?',
      answer:
        'Una pieza gráfica puntual toma de 2 a 4 días. Una identidad visual completa, de 3 a 4 semanas. Un video, entre 1 y 3 semanas según la duración y el material disponible. Siempre acordamos el calendario antes de empezar.',
    },
    {
      question: '¿Qué necesitas de mi parte?',
      answer:
        'La información de tu negocio, tu logo si ya tienes uno, fotografías o material de archivo si existen, y disponibilidad para revisar avances. Si no tienes nada de eso, no hay problema: también puedo crear el contenido desde cero.',
    },
    {
      question: '¿Cómo se paga?',
      answer:
        'El 50% para reservar el cupo y comenzar, y el 50% contra entrega de los archivos finales. Acepto transferencia bancaria y pagos por pasarela digital. Emito factura.',
    },
    {
      question: '¿Cuántas revisiones incluye?',
      answer:
        'Dos rondas de ajustes están incluidas en todos los paquetes. Si necesitas más, se cotizan aparte. Los ajustes deben pedirse juntos y por escrito para no extender los tiempos.',
    },
    {
      question: '¿Trabajas con clientes de otras ciudades o países?',
      answer:
        'Sí. Trabajo de forma remota con clientes de todo Ecuador y del exterior. Todo el proceso se puede hacer por videollamada, correo y WhatsApp, con los archivos entregados en la nube.',
    },
  ],
} as const;

/** Lista de proyectos que se muestran en la página de inicio. */
export const featuredProjects = site.projects.filter((p) => p.featured);

/** Categorías únicas, para los filtros del portafolio. */
export const categories = ['Todos', ...Array.from(new Set(site.projects.map((p) => p.category)))];

export type Site = typeof site;
