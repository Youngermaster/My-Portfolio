/**
 * Every user-facing string that is *not* content-collection data.
 *
 * `UIKey` is derived from the English dictionary, and `es` is typed as a
 * complete Record of those keys — so a missing or misspelled Spanish string is
 * a build-time type error rather than an English word leaking into the Spanish
 * page. That guarantee is the whole reason this file is hand-written rather
 * than a loose object.
 */

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

const en = {
  // --- document ---
  'site.title': 'Juan Manuel Young Hoyos — Problem Solver',
  'site.description':
    'Technical lead building national-scale health interoperability, robotics in Rust and mobile apps. Medellín, Colombia.',

  // --- navigation ---
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.services': 'Services',
  'nav.experience': 'Experience',
  'nav.technologies': 'Tech Stack',
  'nav.projects': 'Projects',
  'nav.awards': 'Awards',
  'nav.contact': 'Contact',
  'nav.blog': 'Blog',
  'nav.styleguide': 'Styleguide',
  'nav.menu': 'Menu',
  'nav.openMenu': 'Open menu',
  'nav.closeMenu': 'Close menu',
  'nav.skipToContent': 'Skip to content',
  'nav.backToTop': 'Back to top',
  'nav.language': 'Language',
  'nav.switchToSpanish': 'Ver en español',
  'nav.switchToEnglish': 'View in English',

  // --- hero ---
  'hero.title.line1': 'Problem',
  'hero.title.line2': 'Solver',
  'hero.cta': 'Contact me',
  'hero.ctaSecondary': 'See my work',
  // Short by design: these are the giant pale words behind the hero, and long
  // phrases turn them into an unreadable smear rather than a background texture.
  'hero.ghost1': 'DevOps',
  'hero.ghost2': 'IOT AI',
  'hero.ghost3': 'Apps',
  'hero.portraitAlt':
    'Ligne claire illustration of Juan Manuel Young Hoyos reading a book, with a rocket and a lightbulb overhead',

  // --- about ---
  'about.eyebrow': 'About me',
  'about.ghost': 'Problem Solver',
  'about.photoAlt': 'Juan Manuel Young Hoyos',
  'about.yearsLabel': 'Years of experience',
  'about.stat.roles': 'Roles across 8 organisations',
  'about.stat.tech': 'Languages & tools used',
  'about.stat.awards': 'Awards won',

  // --- services ---
  'services.eyebrow': 'What I do',
  'services.title': 'Services',
  'services.ghost': 'Services',

  // --- experience ---
  'experience.eyebrow': 'Where I have worked',
  'experience.title': 'Experience',
  'experience.ghost': 'Experience',
  'experience.present': 'Present',
  'experience.type.full-time': 'Full-time',
  'experience.type.part-time': 'Part-time',
  'experience.type.contract': 'Contract',
  'experience.type.self-employed': 'Self-employed',
  'experience.type.freelance': 'Freelance',
  'experience.workplace.on-site': 'On-site',
  'experience.workplace.hybrid': 'Hybrid',
  'experience.workplace.remote': 'Remote',

  // --- technologies ---
  'technologies.eyebrow': 'Tools of the trade',
  'technologies.title': 'Tech Stack',
  'technologies.ghost': 'Tech Stack',

  // --- projects ---
  'projects.eyebrow': 'Selected work',
  'projects.title': 'Projects',
  'projects.ghost': 'My Projects',
  'projects.viewAll': 'See all projects',
  'projects.allTitle': 'All projects',
  'projects.allDescription':
    'Everything worth showing — robotics in Rust, mobile apps, security work and older experiments.',
  'projects.filter.all': 'All',
  'projects.filter.label': 'Filter by tag',
  'projects.empty': 'Nothing matches that filter yet.',
  'projects.featured': 'Featured',
  'projects.archive': 'Earlier work',
  'projects.backToProjects': 'Back to projects',
  'projects.tech': 'Built with',
  'projects.links': 'Links',
  'projects.year': 'Year',
  'projects.showing': 'Showing',
  'projects.tag.robotics': 'Robotics',
  'projects.tag.security': 'Security',
  'projects.tag.mobile': 'Mobile',
  'projects.tag.web': 'Web',
  'projects.tag.iot': 'IoT',
  'projects.tag.gaming': 'Games',
  'projects.tag.ai': 'AI',
  'projects.tag.devops': 'DevOps',
  'projects.tag.misc': 'Misc',
  'projects.status.live': 'Live',
  'projects.status.wip': 'In progress',
  'projects.status.archived': 'Archived',

  // --- awards ---
  'awards.eyebrow': 'Recognition',
  'awards.title': 'Awards',
  'awards.ghost': 'My Awards',
  'awards.issuedBy': 'Issued by',

  // --- contact ---
  'contact.eyebrow': 'Get in touch',
  'contact.title': 'Say hello',
  'contact.ghost': 'Contact Me',
  'contact.lede':
    'Working on something interesting, or hiring? Email is the fastest way to reach me.',
  'contact.emailCta': 'Email me',
  'contact.elsewhere': 'Elsewhere',
  'contact.basedIn': 'Based in',

  // --- footer ---
  'footer.rights': 'All rights reserved.',
  'footer.builtWith': 'Built with Astro.',

  // --- 404 ---
  '404.title': 'Page not found',
  '404.lede': 'That page does not exist. It may have moved, or never existed at all.',
  '404.cta': 'Back home',

  // --- styleguide ---
  'styleguide.title': 'Styleguide',
  'styleguide.description':
    'The design system behind this site: palette, type scale, buttons, comic panels and icons.',
} as const;

export type UIKey = keyof typeof en;

const es: Record<UIKey, string> = {
  // --- document ---
  'site.title': 'Juan Manuel Young Hoyos — Solucionador de problemas',
  'site.description':
    'Líder técnico construyendo interoperabilidad en salud a escala nacional, robótica en Rust y aplicaciones móviles. Medellín, Colombia.',

  // --- navigation ---
  'nav.home': 'Inicio',
  'nav.about': 'Sobre mí',
  'nav.services': 'Servicios',
  'nav.experience': 'Experiencia',
  'nav.technologies': 'Tecnologías',
  'nav.projects': 'Proyectos',
  'nav.awards': 'Reconocimientos',
  'nav.contact': 'Contacto',
  'nav.blog': 'Blog',
  'nav.styleguide': 'Guía de estilo',
  'nav.menu': 'Menú',
  'nav.openMenu': 'Abrir menú',
  'nav.closeMenu': 'Cerrar menú',
  'nav.skipToContent': 'Saltar al contenido',
  'nav.backToTop': 'Volver arriba',
  'nav.language': 'Idioma',
  'nav.switchToSpanish': 'Ver en español',
  'nav.switchToEnglish': 'View in English',

  // --- hero ---
  'hero.title.line1': 'Resuelvo',
  'hero.title.line2': 'Problemas',
  'hero.cta': 'Contáctame',
  'hero.ctaSecondary': 'Ver mi trabajo',
  'hero.ghost1': 'DevOps',
  'hero.ghost2': 'IOT IA',
  'hero.ghost3': 'Apps',
  'hero.portraitAlt':
    'Ilustración en línea clara de Juan Manuel Young Hoyos leyendo un libro, con un cohete y una bombilla sobre él',

  // --- about ---
  'about.eyebrow': 'Sobre mí',
  'about.ghost': 'Problem Solver',
  'about.photoAlt': 'Juan Manuel Young Hoyos',
  'about.yearsLabel': 'Años de experiencia',
  'about.stat.roles': 'Cargos en 8 organizaciones',
  'about.stat.tech': 'Lenguajes y herramientas',
  'about.stat.awards': 'Reconocimientos',

  // --- services ---
  'services.eyebrow': 'Lo que hago',
  'services.title': 'Servicios',
  'services.ghost': 'Servicios',

  // --- experience ---
  'experience.eyebrow': 'Dónde he trabajado',
  'experience.title': 'Experiencia',
  'experience.ghost': 'Experiencia',
  'experience.present': 'Actualidad',
  'experience.type.full-time': 'Tiempo completo',
  'experience.type.part-time': 'Medio tiempo',
  'experience.type.contract': 'Por contrato',
  'experience.type.self-employed': 'Independiente',
  'experience.type.freelance': 'Freelance',
  'experience.workplace.on-site': 'Presencial',
  'experience.workplace.hybrid': 'Híbrido',
  'experience.workplace.remote': 'Remoto',

  // --- technologies ---
  'technologies.eyebrow': 'Herramientas del oficio',
  'technologies.title': 'Tecnologías',
  'technologies.ghost': 'Tecnologías',

  // --- projects ---
  'projects.eyebrow': 'Trabajo seleccionado',
  'projects.title': 'Proyectos',
  'projects.ghost': 'Proyectos',
  'projects.viewAll': 'Ver todos los proyectos',
  'projects.allTitle': 'Todos los proyectos',
  'projects.allDescription':
    'Todo lo que vale la pena mostrar: robótica en Rust, aplicaciones móviles, seguridad y experimentos anteriores.',
  'projects.filter.all': 'Todos',
  'projects.filter.label': 'Filtrar por etiqueta',
  'projects.empty': 'Todavía no hay nada con ese filtro.',
  'projects.featured': 'Destacados',
  'projects.archive': 'Trabajo anterior',
  'projects.backToProjects': 'Volver a proyectos',
  'projects.tech': 'Construido con',
  'projects.links': 'Enlaces',
  'projects.year': 'Año',
  'projects.showing': 'Mostrando',
  'projects.tag.robotics': 'Robótica',
  'projects.tag.security': 'Seguridad',
  'projects.tag.mobile': 'Móvil',
  'projects.tag.web': 'Web',
  'projects.tag.iot': 'IoT',
  'projects.tag.gaming': 'Juegos',
  'projects.tag.ai': 'IA',
  'projects.tag.devops': 'DevOps',
  'projects.tag.misc': 'Varios',
  'projects.status.live': 'Publicado',
  'projects.status.wip': 'En curso',
  'projects.status.archived': 'Archivado',

  // --- awards ---
  'awards.eyebrow': 'Reconocimientos',
  'awards.title': 'Reconocimientos',
  'awards.ghost': 'Reconocimientos',
  'awards.issuedBy': 'Otorgado por',

  // --- contact ---
  'contact.eyebrow': 'Hablemos',
  'contact.title': 'Escríbeme',
  'contact.ghost': 'Contacto',
  'contact.lede':
    '¿Tienes algo interesante entre manos, o estás contratando? El correo es la forma más rápida de encontrarme.',
  'contact.emailCta': 'Enviarme un correo',
  'contact.elsewhere': 'En otros lugares',
  'contact.basedIn': 'Ubicado en',

  // --- footer ---
  'footer.rights': 'Todos los derechos reservados.',
  'footer.builtWith': 'Hecho con Astro.',

  // --- 404 ---
  '404.title': 'Página no encontrada',
  '404.lede': 'Esa página no existe. Puede que se haya movido, o que nunca haya existido.',
  '404.cta': 'Volver al inicio',

  // --- styleguide ---
  'styleguide.title': 'Guía de estilo',
  'styleguide.description':
    'El sistema de diseño detrás de este sitio: paleta, escala tipográfica, botones, viñetas e iconos.',
};

export const ui = { en, es } satisfies Record<Locale, Record<UIKey, string>>;
