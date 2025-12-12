import pytest

from my_profile.profile import Profile, validar_habilidades


def test_validar_habilidades_normaliza_y_ordena():
    habilidades = ["Python", "  python ", "QA", "Documentación"]
    resultado = validar_habilidades(habilidades)

    assert resultado == ["Documentación", "Python", "QA"]


def test_validar_habilidades_rechaza_vacios():
    with pytest.raises(ValueError):
        validar_habilidades(["", "Python"])


def test_profile_resumen_incluye_campos():
    perfil = Profile(
        nombre="Ada Lovelace",
        rol="Pionera de la programación",
        habilidades=["Matemática", "Algoritmos", "Documentación"],
        ubicacion="Londres, Reino Unido",
    )

    resumen = perfil.resumen()

    assert "Ada Lovelace" in resumen
    assert "Pionera de la programación" in resumen
    assert "Ubicación: Londres, Reino Unido" in resumen
    assert "Habilidades: Algoritmos, Documentación, Matemática" in resumen


def test_profile_rechaza_nombre_o_rol_vacios():
    with pytest.raises(ValueError):
        Profile(nombre="   ", rol="Desarrollador")

    with pytest.raises(ValueError):
        Profile(nombre="Dev", rol=" ")


def test_profile_rechaza_ubicacion_vacia():
    with pytest.raises(ValueError):
        Profile(nombre="Dev", rol="Backend", ubicacion="   ")
