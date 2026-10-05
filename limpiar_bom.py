"""
limpiar_bom.py — Quita el BOM (marca de orden de bytes) de los archivos de texto.

EL PROBLEMA
    Algunos archivos empiezan con los bytes EF BB BF (BOM). En un archivo .astro
    ese BOM queda dentro del contenido y, según cómo lo lea la herramienta, puede
    acabar mostrándose en la página como "ï»¿" o romper la primera línea.

LA SOLUCIÓN
    Eliminar esos tres bytes del principio. Nada más: el resto del archivo,
    incluidos los acentos, se conserva byte a byte.

También informa si encuentra doble codificación real (por ejemplo "Ã±" en lugar
de "ñ"), para poder repararla aparte.

Uso:  python limpiar_bom.py
"""

from __future__ import annotations

import pathlib

EXTENSIONS = {".astro", ".ts", ".js", ".css", ".json", ".md", ".txt", ".svg", ".yml", ".yaml", ".toml"}
SKIP_DIRS = {"node_modules", "dist", ".astro", ".git", "qa-shots", "__pycache__"}

BOM = b"\xef\xbb\xbf"


def main() -> None:
    root = pathlib.Path(__file__).resolve().parent
    cleaned: list[str] = []
    mojibake: list[tuple[str, int]] = []

    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in EXTENSIONS:
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue

        raw = path.read_bytes()

        # --- 1. Quitar el BOM si lo tiene ---
        if raw.startswith(BOM):
            path.write_bytes(raw[len(BOM) :])
            raw = raw[len(BOM) :]
            cleaned.append(str(path.relative_to(root)))

        # --- 2. Avisar de doble codificación real ---
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError:
            print(f"  AVISO: {path.relative_to(root)} no es UTF-8 válido.")
            continue

        hits = sum(
            1
            for i, ch in enumerate(text)
            if ch in ("\u00c3", "\u00c2") and i + 1 < len(text) and "\u0080" <= text[i + 1] <= "\u00bf"
        )
        if hits:
            mojibake.append((str(path.relative_to(root)), hits))

    print(f"Archivos sin BOM corregidos: {len(cleaned)}")
    for name in cleaned:
        print(f"   {name}")

    if mojibake:
        print(f"\nArchivos con doble codificación real: {len(mojibake)}")
        for name, hits in mojibake:
            print(f"   {name}  ({hits} secuencias)")
    else:
        print("\nNo se encontró doble codificación: los acentos están correctos.")


if __name__ == "__main__":
    main()
