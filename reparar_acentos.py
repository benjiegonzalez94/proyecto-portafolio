"""
reparar_acentos.py — Repara texto con acentos dañado por doble codificación.

EL PROBLEMA
    Algunos archivos guardaron los acentos codificados dos veces. Por ejemplo la
    letra "ñ" debería ocupar 2 bytes (C3 B1) y ocupa 4 (C3 83 C2 B1), que al
    leerse muestran "Ã±". En la página se ve "DiseÃ±o" en lugar de "Diseño".

LA SOLUCIÓN
    Reinterpretar el texto como Latin-1 y volver a codificarlo en UTF-8 deshace
    exactamente esa doble codificación.

SEGURIDAD
    · Solo actúa sobre secuencias que realmente están dañadas.
    · Si el resultado todavía contiene marcas de daño, deja el archivo intacto.
    · Es idempotente: ejecutarlo de nuevo no cambia nada.

Uso:  python reparar_acentos.py
"""

from __future__ import annotations

import pathlib

EXTENSIONS = {".astro", ".ts", ".js", ".css", ".json", ".md", ".txt", ".svg", ".yml", ".yaml", ".toml"}
SKIP_DIRS = {"node_modules", "dist", ".astro", ".git", "qa-shots", "__pycache__"}


def build_byte_map() -> dict[str, int]:
    """
    Construye la tabla carácter -> byte según Windows-1252.

    Windows-1252 es la codificación que usan por defecto varias herramientas de
    Windows al leer texto sin indicar la codificación. Tiene 5 posiciones sin
    definir (0x81, 0x8D, 0x8F, 0x90, 0x9D); en ellas se usa el valor idéntico de
    Latin-1, que es lo que hacen los programas habituales.
    """
    mapping: dict[str, int] = {}
    for byte in range(256):
        try:
            mapping[bytes([byte]).decode("cp1252")] = byte
        except UnicodeDecodeError:
            mapping[chr(byte)] = byte
    return mapping


BYTE_OF = build_byte_map()


def mojibake_runs(text: str) -> int:
    """
    Cuenta las secuencias de doble codificación de verdad.

    Una "Ã" o "Â" legítima (la que forma parte de un carácter UTF-8 correcto,
    como la "ñ" = U+00F1) va seguida de un carácter normal. Una dañada va seguida
    siempre de un carácter de continuación, entre U+0080 y U+00BF.

    Devuelve el número de secuencias; 0 significa que el texto está bien.
    """
    runs = 0
    i = 0
    while i < len(text):
        ch = text[i]
        if ch in ("\u00c3", "\u00c2") and i + 1 < len(text) and "\u0080" <= text[i + 1] <= "\u00bf":
            runs += 1
            i += 2
        else:
            i += 1
    return runs


def is_lead(ch: str) -> bool:
    """¿Este carácter puede ser el primer byte de un carácter UTF-8 multibyte?"""
    byte = BYTE_OF.get(ch)
    return byte is not None and 0xC2 <= byte <= 0xF4


def is_continuation(ch: str) -> bool:
    """¿Este carácter puede ser un byte de continuación UTF-8?"""
    byte = BYTE_OF.get(ch)
    return byte is not None and 0x80 <= byte <= 0xBF


def repair(text: str) -> str | None:
    """
    Repara la doble codificación y devuelve el texto corregido, o None si no hay
    nada que reparar o si la reparación no resulta fiable.

    Cómo funciona:
      · Recorre el texto en busca de un carácter que pueda ser el primer byte de
        un carácter UTF-8 y lo extiende mientras encuentre bytes de continuación.
      · Esa secuencia se convierte a sus bytes originales y se decodifica como
        UTF-8, lo que devuelve el carácter correcto.
      · Solo se sustituye si el resultado es válido; el resto del archivo se
        conserva tal cual, incluidos los caracteres que ya estaban bien.
    """
    if mojibake_runs(text) == 0:
        return None

    result: list[str] = []
    i = 0
    changed = False

    while i < len(text):
        ch = text[i]

        if is_lead(ch) and i + 1 < len(text) and is_continuation(text[i + 1]):
            # Se extiende la secuencia mientras sigan apareciendo bytes de
            # continuación válidos.
            end = i + 1
            while end + 1 < len(text) and is_continuation(text[end + 1]):
                end += 1

            raw = bytes(BYTE_OF[c] for c in text[i : end + 1])
            try:
                decoded = raw.decode("utf-8")
            except UnicodeDecodeError:
                # La secuencia más larga no era válida: se prueba con solo dos
                # caracteres, que cubre el caso más común (por ejemplo "Ã±").
                try:
                    decoded = bytes(BYTE_OF[c] for c in text[i : i + 2]).decode("utf-8")
                    end = i + 1
                except UnicodeDecodeError:
                    result.append(ch)
                    i += 1
                    continue

            result.append(decoded)
            changed = True
            i = end + 1
            continue

        result.append(ch)
        i += 1

    if not changed:
        return None

    fixed = "".join(result)

    # Si todavía quedan secuencias dañadas, la reparación no era la correcta y
    # preferimos dejar el archivo como estaba.
    if fixed == text or mojibake_runs(fixed) != 0:
        return None

    return fixed


def main() -> None:
    root = pathlib.Path(__file__).resolve().parent
    changed: list[tuple[str, int, int]] = []

    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in EXTENSIONS:
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(root).parts):
            continue

        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            print(f"  omitido (no es UTF-8 válido): {path.relative_to(root)}")
            continue

        fixed = repair(original)
        if fixed is None:
            continue

        path.write_text(fixed, encoding="utf-8", newline="")
        changed.append((str(path.relative_to(root)), mojibake_runs(original), mojibake_runs(fixed)))

    if not changed:
        print("No hay nada que reparar: los acentos están correctos.")
        return

    print(f"Archivos reparados: {len(changed)}\n")
    for name, before, after in changed:
        print(f"   {name}: {before} secuencias dañadas -> {after}")
    print("\nListo. Vuelve a compilar con: pnpm build")


if __name__ == "__main__":
    main()
