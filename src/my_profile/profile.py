"""Modelos y utilidades para representar un perfil profesional."""

from __future__ import annotations

from collections.abc import Iterable
from dataclasses import dataclass, field


def validar_habilidades(habilidades: Iterable[str]) -> list[str]:
    """Normaliza y valida habilidades asegurando que no existan duplicados vacíos.

    Args:
        habilidades: Iterable con las habilidades declaradas.

    Returns:
        Lista normalizada y ordenada de habilidades únicas.

    Raises:
        ValueError: Si alguna habilidad es una cadena vacía o sólo espacios.
    """

    habilidades_limpias = []
    vistos = set()
    for habilidad in habilidades:
        limpia = habilidad.strip()
        if not limpia:
            raise ValueError("Las habilidades deben ser cadenas no vacías.")
        if limpia.lower() in vistos:
            continue
        vistos.add(limpia.lower())
        habilidades_limpias.append(limpia)
    return sorted(habilidades_limpias)


@dataclass(slots=True)
class Profile:
    """Representa un perfil profesional y genera descripciones consistentes."""

    nombre: str
    rol: str
    habilidades: list[str] = field(default_factory=list)
    ubicacion: str | None = None

    def __post_init__(self) -> None:
        if not self.nombre.strip():
            raise ValueError("El nombre no puede estar vacío.")
        if not self.rol.strip():
            raise ValueError("El rol no puede estar vacío.")
        self.habilidades = validar_habilidades(self.habilidades)
        if self.ubicacion is not None and not self.ubicacion.strip():
            raise ValueError("La ubicación no puede ser una cadena vacía.")

    def resumen(self) -> str:
        """Devuelve un resumen legible del perfil."""

        secciones = [f"{self.nombre} — {self.rol}"]
        if self.ubicacion:
            secciones.append(f"Ubicación: {self.ubicacion}")
        if self.habilidades:
            secciones.append("Habilidades: " + ", ".join(self.habilidades))
        return " | ".join(secciones)
