"""
Genera las imágenes de los proyectos como SVG.

Cada imagen es un cartel abstracto de estilo estudio de diseño: degradado de
color, formas geométricas y el nombre del proyecto. Son archivos vectoriales
ligeros (unos pocos KB) que se ven nítidos en cualquier pantalla y que Astro
convierte a WebP/AVIF automáticamente.

Para reemplazar una imagen por una foto real:
  1. Guarda tu archivo en src/assets/proyectos/
  2. Ponle el mismo nombre que aparece en src/data/site.ts (campo `image`)
     por ejemplo 'cafe-litoral.jpg' en vez de 'cafe-litoral.svg'
     y actualiza ese campo en site.ts.

Uso:  python generar_imagenes.py
"""

from __future__ import annotations

import pathlib

# Paleta del sitio (debe coincidir con src/styles/global.css)
PALETTE = {
    "pink": ("#FF2D78", "#FF6B35"),
    "violet": ("#7C3AED", "#06B6D4"),
    "cyan": ("#06B6D4", "#7C3AED"),
    "tangerine": ("#FF6B35", "#FFC93C"),
    "yellow": ("#FFC93C", "#FF2D78"),
    "lime": ("#A3E635", "#06B6D4"),
}

W, H = 1200, 900  # relación 4:3, cómoda para las tarjetas del portafolio


def shapes(kind: str, c1: str, c2: str) -> str:
    """
    Devuelve las formas geométricas decorativas según el tipo de proyecto.

    Todas se mantienen en la mitad superior y en el lateral derecho para no
    chocar con el bloque de texto, que va abajo a la izquierda.
    """
    white = "#FFFFFF"

    if kind == "circles":
        return f"""
    <circle cx="900" cy="230" r="190" fill="{white}" opacity="0.18"/>
    <circle cx="900" cy="230" r="125" fill="{white}" opacity="0.22"/>
    <circle cx="900" cy="230" r="62" fill="{c1}" opacity="0.85"/>
    <circle cx="300" cy="180" r="90" fill="{white}" opacity="0.14"/>"""

    if kind == "waves":
        return f"""
    <path d="M0 470 Q150 400 300 470 T600 470 T900 470 T1200 470 V0 H0 Z" fill="{white}" opacity="0.10"/>
    <path d="M0 330 Q150 260 300 330 T600 330 T900 330 T1200 330 V0 H0 Z" fill="{white}" opacity="0.14"/>
    <path d="M0 190 Q150 120 300 190 T600 190 T900 190 T1200 190 V0 H0 Z" fill="{white}" opacity="0.18"/>
    <circle cx="990" cy="150" r="75" fill="{white}" opacity="0.26"/>"""

    if kind == "grid":
        cells = []
        for r in range(3):
            for c in range(3):
                op = 0.10 + ((r + c) % 3) * 0.08
                cells.append(
                    f'<rect x="{840 + c * 100}" y="{120 + r * 100}" width="84" height="84" '
                    f'rx="16" fill="{white}" opacity="{op:.2f}"/>'
                )
        cells.append(
            f'<rect x="940" y="220" width="84" height="84" rx="16" fill="{white}" opacity="0.85"/>'
        )
        cells.append(f'<circle cx="260" cy="200" r="86" fill="{white}" opacity="0.14"/>')
        return "\n    ".join(cells)

    if kind == "bars":
        bars = []
        for i, (x, h) in enumerate([(720, 250), (850, 380), (980, 180), (1110, 320)]):
            op = 0.16 + i * 0.08
            bars.append(
                f'<rect x="{x}" y="{560 - h}" width="80" height="{h}" rx="40" '
                f'fill="{white}" opacity="{op:.2f}"/>'
            )
        bars.append(f'<circle cx="240" cy="190" r="80" fill="{white}" opacity="0.16"/>')
        return "\n    ".join(bars)

    if kind == "play":
        return f"""
    <circle cx="900" cy="240" r="160" fill="{white}" opacity="0.16"/>
    <circle cx="900" cy="240" r="112" fill="{white}" opacity="0.24"/>
    <path d="M868 182 L980 240 L868 298 Z" fill="{white}" opacity="0.92"/>
    <circle cx="250" cy="180" r="80" fill="{white}" opacity="0.14"/>"""

    if kind == "blob":
        return f"""
    <path d="M930 100 C1060 110 1120 230 1065 330 C1010 430 860 420 807 330 C753 240 790 90 930 100 Z"
          fill="{white}" opacity="0.20"/>
    <path d="M912 175 C982 180 1018 255 982 308 C946 361 858 357 831 304 C804 250 840 170 912 175 Z"
          fill="{c1}" opacity="0.80"/>
    <circle cx="250" cy="190" r="86" fill="{white}" opacity="0.14"/>"""

    if kind == "stack":
        return f"""
    <rect x="800" y="120" width="300" height="82" rx="22" fill="{white}" opacity="0.18"/>
    <rect x="838" y="230" width="300" height="82" rx="22" fill="{white}" opacity="0.26"/>
    <rect x="876" y="340" width="300" height="82" rx="22" fill="{white}" opacity="0.34"/>
    <circle cx="250" cy="190" r="86" fill="{white}" opacity="0.14"/>"""

    # default: "dots"
    dots = []
    for r in range(4):
        for c in range(5):
            op = 0.10 + ((r * 5 + c) % 5) * 0.09
            dots.append(
                f'<circle cx="{780 + c * 74}" cy="{140 + r * 74}" r="18" fill="{white}" opacity="{op:.2f}"/>'
            )
    dots.append(f'<circle cx="250" cy="190" r="86" fill="{white}" opacity="0.14"/>')
    return "\n    ".join(dots)


# tipo de composición, gradiente y etiqueta para cada archivo
IMAGES = [
    ("cafe-litoral.svg", "waves", "tangerine", "IDENTIDAD VISUAL", "Café Litoral"),
    ("campana-verano.svg", "circles", "pink", "CAMPAÑA DIGITAL", "Verano"),
    ("documental-manabi.svg", "play", "violet", "DOCUMENTAL", "Raíces de Manabí"),
    ("packaging-cacao.svg", "stack", "lime", "PACKAGING", "Cacao de Origen"),
    ("redes-clinica.svg", "grid", "cyan", "MARKETING", "Clínica Vida"),
    ("revista-aniversario.svg", "bars", "yellow", "EDITORIAL", "Revista 25 Años"),
    ("app-finanzas.svg", "stack", "violet", "INTERFAZ UI", "FinApp"),
    ("spot-turismo.svg", "blob", "cyan", "VIDEO PUBLICITARIO", "Manta Te Espera"),
    ("menu-gastronomia.svg", "dots", "tangerine", "DISEÑO GRÁFICO", "Sabor Manabita"),
]


def make_monograma(initials: str = "NM", name: str = "Nahomi Machuca", role: str = "Diseñadora Gráfica") -> str:
    """
    Imagen para la sección "Sobre mí".

    Está compuesta en el centro y con márgenes amplios, para que se pueda
    recortar en vertical sin perder nada importante: las iniciales y el nombre
    quedan siempre en el centro del encuadre.
    """
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Monograma de {name}">
  <defs>
    <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF2D78"/>
      <stop offset="52%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
    <linearGradient id="soft" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.16"/>
    </linearGradient>
  </defs>

  <rect width="{W}" height="{H}" fill="url(#mg)"/>

  <!-- Círculos decorativos, todos centrados -->
  <circle cx="600" cy="330" r="295" fill="#FFFFFF" opacity="0.10"/>
  <circle cx="600" cy="330" r="225" fill="#FFFFFF" opacity="0.14"/>
  <circle cx="925" cy="130" r="95" fill="#FFC93C" opacity="0.35"/>
  <circle cx="255" cy="640" r="115" fill="#FFFFFF" opacity="0.10"/>

  <rect width="{W}" height="{H}" fill="url(#soft)"/>

  <!-- Monograma centrado: es lo último que se recortaría -->
  <g text-anchor="middle" font-family="Outfit, 'Segoe UI', system-ui, sans-serif" fill="#FFFFFF">
    <text x="600" y="420" font-size="290" font-weight="800" letter-spacing="-8" opacity="0.96">{initials}</text>
    <rect x="450" y="490" width="300" height="8" rx="4" fill="#FFC93C" opacity="0.95"/>
    <text x="600" y="590" font-size="52" font-weight="700" letter-spacing="-1">{name}</text>
    <text x="600" y="645" font-size="30" font-weight="500" opacity="0.9">{role}</text>
  </g>
</svg>
"""


def build(filename: str, kind: str, accent: str, eyebrow: str, title: str) -> str:
    c1, c2 = PALETTE[accent]

    # El texto se coloca dentro de una "zona segura" con margen amplio, porque
    # estas imágenes se recortan de formas distintas (tarjetas 4:3, portada en
    # vertical, miniaturas). Con este margen, ningún título queda cortado.
    #
    # Si el título es largo se reduce el tamaño de letra para que quepa.
    size = 62 if len(title) <= 13 else 50 if len(title) <= 18 else 42
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="{title} — {eyebrow}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{c1}"/>
      <stop offset="100%" stop-color="{c2}"/>
    </linearGradient>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.28"/>
    </linearGradient>
  </defs>

  <rect width="{W}" height="{H}" fill="url(#g)"/>
  {shapes(kind, c1, c2)}
  <rect width="{W}" height="{H}" fill="url(#scrim)"/>

  <!-- Texto del cartel -->
  <g font-family="Outfit, 'Segoe UI', system-ui, sans-serif" fill="#FFFFFF">
    <text x="90" y="612" font-size="24" font-weight="600" letter-spacing="6" opacity="0.88">{eyebrow}</text>
    <text x="90" y="694" font-size="{size}" font-weight="700" letter-spacing="-1.5">{title}</text>
    <rect x="90" y="730" width="130" height="8" rx="4" fill="#FFFFFF" opacity="0.8"/>
  </g>
</svg>
"""


def make_og_image() -> str:
    """Imagen para compartir en redes (Open Graph), 1200x630."""
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" role="img" aria-label="Nahomi Machuca — Diseñadora Gráfica y Creadora de Contenido">
  <defs>
    <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FF2D78"/>
      <stop offset="52%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#06B6D4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og)"/>
  <circle cx="1080" cy="90" r="180" fill="#FFFFFF" opacity="0.14"/>
  <circle cx="120" cy="560" r="150" fill="#FFC93C" opacity="0.28"/>
  <g font-family="Outfit, 'Segoe UI', system-ui, sans-serif" fill="#FFFFFF">
    <text x="90" y="210" font-size="26" font-weight="600" letter-spacing="6" opacity="0.9">PORTAFOLIO</text>
    <text x="90" y="330" font-size="88" font-weight="700" letter-spacing="-3">Nahomi Machuca</text>
    <text x="90" y="405" font-size="33" font-weight="500" opacity="0.94">Diseñadora Gráfica &amp; Creadora de Contenido</text>
    <rect x="90" y="460" width="200" height="9" rx="4.5" fill="#FFC93C"/>
    <text x="90" y="540" font-size="25" font-weight="500" opacity="0.9">Manta, Manabí — Ecuador</text>
  </g>
</svg>
"""


def main() -> None:
    root = pathlib.Path(__file__).resolve().parent
    out_dir = root / "src" / "assets" / "proyectos"
    out_dir.mkdir(parents=True, exist_ok=True)

    for filename, kind, accent, eyebrow, title in IMAGES:
        (out_dir / filename).write_text(build(filename, kind, accent, eyebrow, title), encoding="utf-8")
        print(f"  creado  src/assets/proyectos/{filename}")

    # Imagen de la sección "Sobre mí": compuesta en el centro y a prueba de recortes.
    (out_dir / "sobre-mi.svg").write_text(make_monograma(), encoding="utf-8")
    print("  creado  src/assets/proyectos/sobre-mi.svg")
    og_dir = root / "public"
    og_dir.mkdir(parents=True, exist_ok=True)
    (og_dir / "og-image.svg").write_text(make_og_image(), encoding="utf-8")
    print("  creado  public/og-image.svg")
    print(f"\nListo: {len(IMAGES)} imágenes de proyecto + 1 retrato + 1 imagen para redes.")


if __name__ == "__main__":
    main()
