import { useState, useEffect } from "react";
import "./App.css";

import Noticias from "./components/Noticias";
import Perros from "./components/Perros";
import Clima from "./components/Clima";
import Peliculas from "./components/Peliculas";
import Paises from "./components/paises";
import Monedas from "./components/monedas";

const secciones = [
  { nombre: "Inicio", icono: "⌂" },
  { nombre: "Noticias", icono: "▤" },
  { nombre: "Perros", icono: "🐶" },
  { nombre: "Clima", icono: "☀" },
  { nombre: "Películas", icono: "▣" },
  { nombre: "Países", icono: "◎" },
  { nombre: "Monedas", icono: "＄" },
];

const servicios = [
  {
    nombre: "Noticias",
    descripcion:
      "Descubre noticias actuales de diferentes categorías y fuentes globales.",
    icono: "📰",
    color: "blue",
    detalle: "Información y actualidad",
  },
  {
    nombre: "Perros",
    descripcion:
      "Explora una galería fotográfica con imágenes de diferentes razas de perros.",
    icono: "🐕",
    color: "orange",
    detalle: "Galería de razas",
  },
  {
    nombre: "Clima",
    descripcion:
      "Consulta la temperatura y condiciones meteorológicas en tiempo real.",
    icono: "🌤️",
    color: "cyan",
    detalle: "Pronóstico meteorológico",
  },
  {
    nombre: "Películas",
    descripcion:
      "Encuentra películas populares, carátulas y sinopsis detalladas.",
    icono: "🎬",
    color: "purple",
    detalle: "Catálogo cinematográfico",
  },
  {
    nombre: "Países",
    descripcion:
      "Conoce datos geográficos, banderas y población de diversos países.",
    icono: "🌎",
    color: "green",
    detalle: "Explorador internacional",
  },
  {
    nombre: "Monedas",
    descripcion:
      "Consulta tipos de cambio actualizados y realiza conversiones de divisas.",
    icono: "💱",
    color: "pink",
    detalle: "Conversor de divisas",
  },
];

const componentes = {
  Noticias,
  Perros,
  Clima,
  Películas: Peliculas,
  Países: Paises,
  Monedas,
};

function App() {
  const [seccion, setSeccion] = useState("Inicio");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sincronizar el título de la pestaña del navegador
  useEffect(() => {
    document.title =
      seccion === "Inicio"
        ? "NEXUS API - Portal Digital"
        : `${seccion} | NEXUS API`;
  }, [seccion]);

  // Rotación automática del Carrusel en la página de inicio
  useEffect(() => {
    if (seccion !== "Inicio") return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % servicios.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [seccion]);

  const seleccionarSeccion = (nombreSeccion) => {
    setSeccion(nombreSeccion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ComponenteActual = componentes[seccion];

  return (
    <div className="nexus-app">
      {/* 🧭 BARRA DE NAVEGACIÓN (NAVBAR) */}
      <header className="header">
        <div className="header-inner">
          <div className="brand" onClick={() => seleccionarSeccion("Inicio")}>
            <div className="brand-logo">N</div>
            <div>
              <h2>
                NEXUS<span>API</span>
              </h2>
              <small>PLATAFORMA DIGITAL</small>
            </div>
          </div>

          <nav className="nav-menu">
            {secciones.map((item) => (
              <button
                key={item.nombre}
                className={`nav-item ${seccion === item.nombre ? "active" : ""}`}
                onClick={() => seleccionarSeccion(item.nombre)}
              >
                <span>{item.icono}</span>
                {item.nombre}
              </button>
            ))}
          </nav>

          <div className="header-status">
            <span className="online-dot"></span>
            <span>Servicios en línea</span>
          </div>
        </div>
      </header>

      {/* 📰 CONTENIDO PRINCIPAL */}
      <main className="main-content">
        {seccion === "Inicio" ? (
          <>
            {/* BANNER BIENVENIDA */}
            <section className="welcome-banner">
              <div className="welcome-content">
                <span className="welcome-tag">PORTAL INTERACTIVO DE APIS</span>
                <h1>
                  Explora datos globales con <span>NEXUS</span>
                </h1>
                <p>
                  Una plataforma moderna para consultar información relevante en
                  tiempo real mediante la integración de servicios REST.
                </p>
                <button
                  className="welcome-button"
                  onClick={() => seleccionarSeccion("Noticias")}
                >
                  Explorar servicios <span>→</span>
                </button>
              </div>

              <div className="welcome-decoration">
                <div className="orbit orbit-one"></div>
                <div className="orbit orbit-two"></div>
                <div className="orbit-center">N</div>
                <div className="orbit-icon icon-one">🌎</div>
                <div className="orbit-icon icon-two">☁️</div>
                <div className="orbit-icon icon-three">🎬</div>
              </div>
            </section>

            {/* 🎞️ CARRUSEL DE SERVICIOS */}
            <section style={{ marginBottom: "3rem" }}>
              <div className="section-heading">
                <div>
                  <span className="section-label">DESTACADOS</span>
                  <h2>Carrusel de Servicios</h2>
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "2rem",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                }}
              >
                <button
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? servicios.length - 1 : prev - 1,
                    )
                  }
                  style={{
                    background: "var(--primary-light)",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "var(--primary-dark)",
                  }}
                >
                  ‹
                </button>

                <div style={{ textAlign: "center", flex: 1 }}>
                  <span
                    style={{
                      fontSize: "3rem",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {servicios[currentSlide].icono}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--text-main)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {servicios[currentSlide].nombre}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      maxWidth: "500px",
                      margin: "0 auto 1rem",
                    }}
                  >
                    {servicios[currentSlide].descripcion}
                  </p>
                  <button
                    className="welcome-button"
                    style={{ padding: "8px 18px", fontSize: "0.85rem" }}
                    onClick={() =>
                      seleccionarSeccion(servicios[currentSlide].nombre)
                    }
                  >
                    Abrir {servicios[currentSlide].nombre}
                  </button>
                </div>

                <button
                  onClick={() =>
                    setCurrentSlide((prev) => (prev + 1) % servicios.length)
                  }
                  style={{
                    background: "var(--primary-light)",
                    border: "none",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontWeight: "bold",
                    color: "var(--primary-dark)",
                  }}
                >
                  ›
                </button>
              </div>
            </section>

            {/* 🃏 TARJETAS INFORMATIVAS */}
            <section className="services-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">CATÁLOGO COMPLETO</span>
                  <h2>Explora nuestras herramientas</h2>
                </div>
                <span className="service-count">06 SERVICIOS DISPONIBLES</span>
              </div>

              <div className="services-grid">
                {servicios.map((servicio) => (
                  <article className="service-card" key={servicio.nombre}>
                    <div className={`service-icon ${servicio.color}`}>
                      {servicio.icono}
                    </div>
                    <span className="service-detail">{servicio.detalle}</span>
                    <h3>{servicio.nombre}</h3>
                    <p>{servicio.descripcion}</p>
                    <button
                      className="service-link"
                      onClick={() => seleccionarSeccion(servicio.nombre)}
                    >
                      Consultar API <span>→</span>
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* ⚙️ VISTA DE APIS LIMPIA */
          <section className="api-view">
            <div className="api-page-heading-clean">
              <div className="api-breadcrumb">
                Inicio <span>›</span>{" "}
                <strong style={{ color: "var(--primary)" }}>{seccion}</strong>
              </div>

              <button
                className="back-button"
                onClick={() => seleccionarSeccion("Inicio")}
              >
                ← Volver al inicio
              </button>
            </div>

            <div className="api-component-container">
              {ComponenteActual ? (
                <ComponenteActual />
              ) : (
                <p>Cargando módulo...</p>
              )}
            </div>
          </section>
        )}
      </main>

      {/* 📌 PIE DE PÁGINA (FOOTER) */}
      <footer className="footer">
        <strong>NEXUS API - Portal Digital</strong>
        <span>
          Desarrollo de portales web interactivos con React e integración de
          APIs.
        </span>
        <span>© 2026 - Todos los derechos reservados.</span>
      </footer>
    </div>
  );
}

export default App;
