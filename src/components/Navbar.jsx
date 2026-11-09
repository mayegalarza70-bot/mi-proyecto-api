
import { useState } from "react";

function Navbar({ seccion, cambiarSeccion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const opciones = [
    { nombre: "Inicio", icono: "⌂" },
    { nombre: "Noticias", icono: "▤" },
    { nombre: "Perros", icono: "🐶" },
    { nombre: "Clima", icono: "☀" },
    { nombre: "Películas", icono: "▶" },
    { nombre: "Países", icono: "🌎" },
    { nombre: "Monedas", icono: "💱" }
  ];

  const seleccionarSeccion = (nombre) => {
    cambiarSeccion(nombre);
    setMenuAbierto(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="navbar">
      <div className="navbar-contenido">

        <button
          className="navbar-logo"
          onClick={() => seleccionarSeccion("Inicio")}
        >
          <span className="logo-simbolo">✦</span>

          <span className="logo-texto">
            NEXUS<span>API</span>
          </span>
        </button>

        <button
          className="menu-movil"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú de navegación"
        >
          {menuAbierto ? "✕" : "☰"}
        </button>

        <nav className={`navbar-menu ${menuAbierto ? "menu-abierto" : ""}`}>
          {opciones.map((opcion) => (
            <button
              key={opcion.nombre}
              className={
                seccion === opcion.nombre
                  ? "nav-link activo"
                  : "nav-link"
              }
              onClick={() => seleccionarSeccion(opcion.nombre)}
            >
              <span className="nav-icono">{opcion.icono}</span>
              {opcion.nombre}
            </button>
          ))}
        </nav>

        <div className="navbar-estado">
          <span className="estado-punto"></span>
          <span>Conectado</span>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
