# Portafolio de Nahomi Machuca

Sitio web del portafolio profesional de **Nahomi Machuca** — Diseñadora Gráfica, Editora de
Video y Creadora de Contenido (Manta, Manabí — Ecuador).

Construido con [Astro](https://astro.build): genera un sitio **100 % estático**, muy rápido y
gratis de alojar en internet.

---

## Índice

1. [Qué incluye el sitio](#1-qué-incluye-el-sitio)
2. [Empezar a trabajar (vista previa)](#2-empezar-a-trabajar-vista-previa)
3. [Cómo cambiar el contenido](#3-cómo-cambiar-el-contenido)
4. [Cómo cambiar los colores y las letras](#4-cómo-cambiar-los-colores-y-las-letras)
5. [Cómo cambiar las imágenes](#5-cómo-cambiar-las-imágenes)
6. [Activar el formulario de contacto](#6-activar-el-formulario-de-contacto)
7. [Publicar el sitio en internet](#7-publicar-el-sitio-en-internet)
8. [Antes de publicar: lista de comprobación](#8-antes-de-publicar-lista-de-comprobación)
9. [Estructura del proyecto](#9-estructura-del-proyecto)
10. [Problemas frecuentes](#10-problemas-frecuentes)
11. [Ficha técnica](#11-ficha-técnica)

---

## 1. Qué incluye el sitio

| Página | Dirección | Qué contiene |
| --- | --- | --- |
| Inicio | `/` | Portada, cifras, presentación, proyectos destacados, servicios, proceso, testimonios |
| Portafolio | `/portafolio` | Los 9 proyectos con filtros por categoría |
| Proyecto | `/portafolio/nombre-del-proyecto` | Ficha completa con navegación anterior/siguiente |
| Servicios | `/servicios` | 6 servicios, proceso, 3 planes con precios y preguntas frecuentes |
| Sobre mí | `/sobre-mi` | Historia, formación, herramientas, valores y testimonios |
| Contacto | `/contacto` | Formulario, datos de contacto, WhatsApp y redes |
| Error 404 | `/404` | Página amable cuando una dirección no existe |

Además incluye:

- **Diseño adaptable** a móvil, tableta y escritorio, con menú desplegable en el teléfono.
- **Accesibilidad**: navegación con teclado, foco visible, textos alternativos y buen contraste.
- **SEO**: títulos, descripciones, datos estructurados para Google, `sitemap.xml` y `robots.txt`.
- **Compartir en redes**: imagen y texto preparados para WhatsApp, Facebook y LinkedIn.
- **Optimización de imágenes** automática a WebP y AVIF.
- **Respeto por el movimiento reducido**: si el sistema pide menos animaciones, se desactivan.
- Un script para **generar las ilustraciones** de los proyectos (`generar_imagenes.py`).

---

## 2. Empezar a trabajar (vista previa)

Necesitas tener instalado [Node.js](https://nodejs.org) (versión 20 o superior).

```bash
# 1. Instalar las dependencias (solo la primera vez)
pnpm install

# 2. Arrancar el servidor de vista previa
pnpm dev
```

Abre en el navegador la dirección que aparece en pantalla (normalmente
`http://localhost:4321`). Cada vez que guardes un archivo, la página se actualiza sola.

Para ver el sitio tal como quedará publicado:

```bash
pnpm build     # genera la carpeta dist/ con el sitio final
pnpm preview   # sirve esa carpeta para revisarla
```

> Si no tienes `pnpm`, puedes usar `npm install`, `npm run dev`, `npm run build`. Funciona igual.

### Comandos disponibles

| Comando | Para qué sirve |
| --- | --- |
| `pnpm dev` | Servidor de vista previa mientras trabajas (se recarga solo) |
| `pnpm build` | Genera el sitio final en la carpeta `dist/` |
| `pnpm preview` | Sirve `dist/` para revisarlo tal como se publicará |
| `pnpm clean` | Borra `dist/` y `.astro/` si algo se comporta de forma rara |
| `node auditar-sitio.mjs` | Revisa que ningún enlace ni imagen esté roto (ver abajo) |

### Comprobar que no hay enlaces rotos

El proyecto incluye un auditor que recorre todas las páginas generadas, extrae cada enlace interno
y cada imagen, y comprueba que todos respondan bien:

```bash
pnpm build
pnpm preview                    # déjalo abierto en otra terminal
node auditar-sitio.mjs          # en una segunda terminal
```

Al terminar informa cuántos elementos revisó y cuáles fallan. Es útil hacerlo antes de publicar,
sobre todo después de cambiar enlaces o nombres de proyectos.

---

## 3. Cómo cambiar el contenido

**Todo el texto del sitio vive en un solo archivo: `src/data/site.ts`.**

No hace falta tocar nada más. Ábrelo con cualquier editor y verás bloques comentados en español:

| Sección del archivo | Qué controla |
| --- | --- |
| `1. DATOS BÁSICOS` | Nombre, título, frase de portada, presentación, ciudad, correo, teléfono |
| `2. REDES SOCIALES` | Los enlaces a Instagram, LinkedIn, Behance, YouTube |
| `3. MENÚ DE NAVEGACIÓN` | Los enlaces del menú superior |
| `4. CIFRAS DESTACADAS` | Los números de la portada (+6 años, +80 proyectos…) |
| `5. SERVICIOS` | Los 6 servicios: título, descripción, qué incluye y precio |
| `6. PROCESO DE TRABAJO` | Los 4 pasos de tu método |
| `7. SOBRE MÍ` | Tu historia, formación, herramientas y valores |
| `8. PROYECTOS` | Los proyectos del portafolio |
| `9. TESTIMONIOS` | Las opiniones de tus clientes |
| `10. PREGUNTAS FRECUENTES` | Las dudas de la página de servicios |

**Reglas básicas:** mantén las comillas `" "`, las comas `,` y las llaves `{ }` donde están.
Solo cambia lo que hay entre comillas.

### Añadir un proyecto nuevo

Copia un bloque completo dentro de `projects` (desde `{` hasta `},`) y pégalo debajo. Luego
cambia sus datos:

```ts
{
  slug: 'nombre-corto-sin-espacios',   // se usa en el enlace de la página
  title: 'Nombre del proyecto',
  category: 'Identidad visual',        // debe coincidir con otra categoría o se crea una nueva
  summary: 'Una frase corta para la tarjeta.',
  description: 'Descripción larga para la página del proyecto.',
  year: '2025',
  client: 'Nombre del cliente',
  image: 'mi-imagen.svg',              // archivo dentro de src/assets/proyectos/
  accent: 'pink',                      // pink, violet, cyan, tangerine, yellow o lime
  tags: ['Logotipo', 'Manual de marca'],
  featured: true,                      // true = aparece también en la página de inicio
},
```

Guarda el archivo: la página del proyecto se crea sola. No hay que programar nada.

---

## 4. Cómo cambiar los colores y las letras

Abre `src/styles/global.css` y busca el bloque `:root` al principio. Ahí están todos los colores:

```css
--c-pink: #ff2d78;      /* Rosa chicle — acento principal */
--c-violet: #7c3aed;    /* Violeta eléctrico */
--c-cyan: #06b6d4;      /* Cian vibrante */
--c-tangerine: #ff6b35; /* Naranja mandarina */
--c-yellow: #ffc93c;    /* Amarillo sol */
--c-lime: #a3e635;      /* Lima fresca */
```

Cambia esos valores y todo el sitio se actualiza: botones, degradados, etiquetas y tarjetas.

Las tipografías se cargan desde `@fontsource` en `src/layouts/BaseLayout.astro`. Si quieres usar
otras, instala el paquete correspondiente y cambia las variables `--font-display` y `--font-body`.

---

## 5. Cómo cambiar las imágenes

Las ilustraciones de los proyectos están en **`src/assets/proyectos/`** y son archivos SVG
dibujados por el script `generar_imagenes.py`.

### Opción A — Poner fotos reales (recomendado)

1. Guarda tus fotos dentro de `src/assets/proyectos/`.
2. En `src/data/site.ts`, cambia el campo `image` del proyecto por el nombre de tu archivo.
   Por ejemplo, de `image: 'cafe-litoral.svg'` a `image: 'cafe-litoral.jpg'`.
3. Nada más. Astro convierte las fotos a WebP y AVIF y crea varios tamaños automáticamente.

**Consejo:** usa imágenes de al menos 1200 px de ancho y menos de 500 KB para que el sitio cargue rápido.

### Opción B — Regenerar las ilustraciones

```bash
python generar_imagenes.py
```

Puedes editar los títulos, los colores y las formas dentro del propio script.

### Imagen para compartir en redes

`public/og-image.svg` es la imagen que aparece al compartir el sitio en WhatsApp o Facebook.
Se genera con el mismo script. Si prefieres una foto tuya, guarda un archivo de **1200 × 630 px**
en `public/og-image.jpg` y actualiza la referencia en `astro.config.mjs` / `BaseLayout.astro`.

---

## 6. Activar el formulario de contacto

El formulario **ya funciona visualmente**, pero para que los mensajes lleguen a tu correo
necesita un servicio externo. El más sencillo y gratuito es **Formspree**:

1. Entra en [formspree.io](https://formspree.io) y crea una cuenta con tu correo.
2. Crea un formulario nuevo (*New Form*) y copia el identificador que te dan
   (algo como `xbljrpwq`).
3. Abre `src/pages/contacto.astro` y cambia esta línea, al principio del archivo:

   ```js
   const FORMSPREE_ID = 'TU_ID_AQUI';   // ← escribe aquí tu identificador
   ```

4. Guarda y vuelve a publicar el sitio.

Mientras no lo configures, el formulario avisa al visitante y le ofrece **WhatsApp y correo**,
que funcionan siempre. Así el sitio nunca queda roto.

Alternativas: [Web3Forms](https://web3forms.com), [Netlify Forms](https://docs.netlify.com/forms/setup/)
(si publicas en Netlify) o cualquier servicio que reciba envíos por POST.

---

## 7. Publicar el sitio en internet

El proyecto ya incluye la configuración lista para tres plataformas. Todas tienen plan gratuito y
certificado de seguridad (HTTPS) automático.

### Antes de publicar, en cualquier caso

Edita **`astro.config.mjs`** y pon tu dominio real en la línea `site`:

```js
export default defineConfig({
  site: 'https://tudominio.com',   // ← cámbialo
  ...
});
```

Haz lo mismo en `src/data/site.ts` (campo `url`) y en `public/robots.txt`.
Esto es lo que usan Google y las redes sociales para enlazar bien el sitio.

---

### Opción 1 — Netlify (la más sencilla)

1. Sube el proyecto a un repositorio de GitHub (ver más abajo).
2. Entra en [netlify.com](https://netlify.com) → *Add new site* → *Import an existing project*.
3. Elige tu repositorio. Netlify leerá `netlify.toml` y configurará todo solo.
4. Pulsa *Deploy*. En un minuto tendrás una dirección como `nombre.netlify.app`.
5. En *Domain settings* puedes conectar tu propio dominio.

### Opción 2 — Vercel

1. Sube el proyecto a GitHub.
2. Entra en [vercel.com](https://vercel.com) → *Add New* → *Project* → importa el repositorio.
3. Vercel detecta Astro automáticamente por `vercel.json`. Pulsa *Deploy*.

### Opción 3 — Cloudflare Pages

1. Sube el proyecto a GitHub.
2. Entra en [pages.cloudflare.com](https://pages.cloudflare.com) → *Create a project*.
3. Comando de compilación: `pnpm build` · Carpeta de salida: `dist`.

### Opción 4 — GitHub Pages

El proyecto incluye el flujo de trabajo `.github/workflows/deploy.yml`, que publica solo cada vez
que subes cambios.

1. Sube el proyecto a GitHub.
2. En el repositorio: *Settings* → *Pages* → en *Source* elige **GitHub Actions**.
3. Si tu repositorio **no** se llama `usuario.github.io`, el sitio quedará en
   `usuario.github.io/nombre-del-repo`. En ese caso añade también en `astro.config.mjs`:

   ```js
   base: '/nombre-del-repo',
   ```

   y pon en `site`: `https://usuario.github.io/nombre-del-repo`.

### Cómo subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "Portafolio de Nahomi Machuca"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

---

## 8. Antes de publicar: lista de comprobación

Repasa estos puntos; son los que suelen olvidarse:

- [ ] **Nombre y datos reales** en `src/data/site.ts` (sección 1).
- [ ] **Correo y teléfono reales** en `src/data/site.ts` y en `src/pages/contacto.astro`.
- [ ] **Enlaces de redes sociales** reales (sección 2 de `src/data/site.ts`).
- [ ] **Dominio real** en `astro.config.mjs` (`site`), `src/data/site.ts` (`url`) y `public/robots.txt`.
- [ ] **Proyectos reales**: títulos, descripciones, años y clientes.
- [ ] **Imágenes propias** en lugar de las ilustraciones de ejemplo.
- [ ] **Testimonios reales** con permiso de tus clientes.
- [ ] **Precios** actualizados en servicios y planes.
- [ ] **Formulario conectado** a Formspree (sección 6).
- [ ] **Favicon**: ahora muestra las iniciales "NM". Para cambiarlo, edita el bloque `<link rel="icon">`
      en `src/layouts/BaseLayout.astro` (campo `initials` en `src/data/site.ts` cambia las letras).

---

## 9. Estructura del proyecto

```
proyecto-portafolio/
├── public/                     Archivos que se copian tal cual al sitio
│   ├── og-image.svg            Imagen para compartir en redes
│   ├── robots.txt              Instrucciones para los buscadores
│   └── scripts/animations.js   Animaciones de aparición al hacer scroll
│
├── src/
│   ├── assets/proyectos/       Ilustraciones y fotos de los proyectos
│   ├── components/             Piezas reutilizables
│   │   ├── Header.astro        Encabezado y menú
│   │   ├── Footer.astro        Pie de página
│   │   ├── Icon.astro          Todos los iconos del sitio
│   │   ├── ProjectCard.astro   Tarjeta de proyecto
│   │   └── CtaBand.astro       Banda de llamada a la acción
│   ├── data/site.ts            ⭐ TODO EL CONTENIDO EDITABLE
│   ├── layouts/BaseLayout.astro   Estructura común, SEO y etiquetas meta
│   ├── pages/                  Una página por archivo
│   │   ├── index.astro         Inicio
│   │   ├── servicios.astro     Servicios
│   │   ├── sobre-mi.astro      Sobre mí
│   │   ├── contacto.astro      Contacto
│   │   ├── 404.astro           Página de error
│   │   └── portafolio/
│   │       ├── index.astro     Índice del portafolio
│   │       └── [slug].astro    Ficha de cada proyecto (se genera sola)
│   └── styles/global.css       🎨 Colores, tipografías y estilos base
│
├── auditar-sitio.mjs           Revisa que no haya enlaces ni imágenes rotas
├── generar_imagenes.py         Genera las ilustraciones de los proyectos
├── limpiar_bom.py              Utilidad: revisa la codificación de los archivos de texto
├── reparar_acentos.py          Utilidad: repara acentos dañados por doble codificación
├── astro.config.mjs            Configuración de Astro (dominio, sitemap)
├── netlify.toml                Configuración de despliegue en Netlify
├── vercel.json                 Configuración de despliegue en Vercel
├── .env.example                Plantilla de variables de entorno (opcional)
└── package.json                Dependencias y comandos
```

---

## 10. Problemas frecuentes

**Al compilar aparece "Ignored build scripts: esbuild, sharp".**
Es un aviso de seguridad de pnpm, no un error. Esos dos paquetes ya traen sus binarios
precompilados, así que el sitio compila y se publica sin problema.

**Los acentos se ven con caracteres extraños**, como si cada letra acentuada se hubiera convertido
en dos símbolos raros. Significa que un archivo se guardó con la codificación equivocada. Ejecuta:

```bash
python limpiar_bom.py        # informa qué archivos están mal
python reparar_acentos.py    # los repara
```

Después vuelve a compilar con `pnpm build`.

**El formulario no envía nada.**
Es lo esperado hasta que lo conectes a Formspree (ver la sección 6).

**Los cambios no aparecen en el sitio publicado.**
Asegúrate de haber subido los cambios a GitHub (`git push`). Las plataformas publican solas en
cuanto reciben cambios. Si el problema sigue, revisa el historial de despliegues en el panel.

**Quiero cambiar el orden de los servicios o de los proyectos.**
Se muestran en el orden en que aparecen en `src/data/site.ts`. Para reordenarlos, mueve los bloques.

---

## 11. Ficha técnica

- **Framework:** Astro 5 (salida estática, sin servidor)
- **Estilos:** CSS propio con variables de diseño (sin frameworks)
- **Tipografías:** Outfit y Plus Jakarta Sans, servidas desde el propio sitio (sin depender de Google)
- **Imágenes:** optimización automática a WebP y AVIF con Sharp
- **Gestor de paquetes:** pnpm (compatible con npm)
- **Sitemap:** generado automáticamente por `@astrojs/sitemap`
- **Peso de la página de inicio:** alrededor de 200 KB, sin librerías de JavaScript externas

---

Hecho con cariño para Nahomi. 💜
