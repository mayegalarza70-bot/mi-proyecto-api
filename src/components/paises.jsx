import { useState, useEffect } from "react";

// Lista de respaldo garantizada por si la red o API externa falla
const PAISES_INICIALES = [
  {
    name: { common: "Peru" },
    translations: { spa: { common: "Perú" } },
    capital: ["Lima"],
    population: 33719000,
    flags: { svg: "https://flagcdn.com/pe.svg" },
  },
  {
    name: { common: "Argentina" },
    translations: { spa: { common: "Argentina" } },
    capital: ["Buenos Aires"],
    population: 45810000,
    flags: { svg: "https://flagcdn.com/ar.svg" },
  },
  {
    name: { common: "Colombia" },
    translations: { spa: { common: "Colombia" } },
    capital: ["Bogotá"],
    population: 51520000,
    flags: { svg: "https://flagcdn.com/co.svg" },
  },
  {
    name: { common: "Mexico" },
    translations: { spa: { common: "México" } },
    capital: ["Ciudad de México"],
    population: 128500000,
    flags: { svg: "https://flagcdn.com/mx.svg" },
  },
  {
    name: { common: "Spain" },
    translations: { spa: { common: "España" } },
    capital: ["Madrid"],
    population: 47420000,
    flags: { svg: "https://flagcdn.com/es.svg" },
  },
  {
    name: { common: "Japan" },
    translations: { spa: { common: "Japón" } },
    capital: ["Tokio"],
    population: 125570000,
    flags: { svg: "https://flagcdn.com/jp.svg" },
  },
  {
    name: { common: "Brazil" },
    translations: { spa: { common: "Brasil" } },
    capital: ["Brasilia"],
    population: 214300000,
    flags: { svg: "https://flagcdn.com/br.svg" },
  },
  {
    name: { common: "United States" },
    translations: { spa: { common: "Estados Unidos" } },
    capital: ["Washington D. C."],
    population: 331900000,
    flags: { svg: "https://flagcdn.com/us.svg" },
  },
  {
    name: { common: "Chile" },
    translations: { spa: { common: "Chile" } },
    capital: ["Santiago"],
    population: 19490000,
    flags: { svg: "https://flagcdn.com/cl.svg" },
  },
  {
    name: { common: "Ecuador" },
    translations: { spa: { common: "Ecuador" } },
    capital: ["Quito"],
    population: 17800000,
    flags: { svg: "https://flagcdn.com/ec.svg" },
  },
  {
    name: { common: "France" },
    translations: { spa: { common: "Francia" } },
    capital: ["París"],
    population: 67750000,
    flags: { svg: "https://flagcdn.com/fr.svg" },
  },
  {
    name: { common: "Italy" },
    translations: { spa: { common: "Italia" } },
    capital: ["Roma"],
    population: 59110000,
    flags: { svg: "https://flagcdn.com/it.svg" },
  },
];

export default function Paises() {
  const [paises, setPaises] = useState(PAISES_INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarPaises = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,translations",
        );
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPaises(data);
        }
      } catch (err) {
        console.warn(
          "Usando lista local de respaldo debido a un fallo de red:",
          err,
        );
      } finally {
        setCargando(false);
      }
    };
    cargarPaises();
  }, []);

  // Función para limpiar tildes y acentos
  const limpiarTexto = (texto) => {
    return texto
      ? texto
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
      : "";
  };

  const queryLimpia = limpiarTexto(busqueda);

  const paisesFiltrados = paises.filter((p) => {
    if (!queryLimpia) return true;

    const nombreIngles = limpiarTexto(p.name?.common);
    const nombreEspanol = limpiarTexto(p.translations?.spa?.common);

    return (
      nombreIngles.includes(queryLimpia) || nombreEspanol.includes(queryLimpia)
    );
  });

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color: "#16a34a",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          EXPLORADOR GLOBAL
        </span>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text-main)",
            margin: "0.3rem 0",
          }}
        >
          🌎 Países del Mundo
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Escribe el nombre de cualquier país para filtrar los resultados
          automáticamente en tiempo real.
        </p>
      </div>

      {/* Buscador instantáneo */}
      <div
        style={{
          position: "relative",
          maxWidth: "450px",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Escribe un país (ej. Perú, Japón, España)..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 20px",
            paddingRight: "40px",
            borderRadius: "25px",
            border: "1px solid var(--border, #f3d2e6)",
            outline: "none",
            fontSize: "0.95rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
          }}
        />
        {busqueda && (
          <button
            onClick={() => setBusqueda("")}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            ✕
          </button>
        )}
      </div>

      {paisesFiltrados.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            background: "#fdf2f8",
            borderRadius: "16px",
            textAlign: "center",
            border: "1px solid var(--border)",
          }}
        >
          <p style={{ color: "var(--text-main)", fontWeight: "600" }}>
            No se encontraron países que coincidan con "{busqueda}".
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {paisesFiltrados.slice(0, 16).map((pais, index) => {
            const nombreMostrar =
              pais.translations?.spa?.common || pais.name?.common;
            return (
              <div
                key={index}
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  padding: "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <img
                  src={pais.flags?.svg || pais.flags?.png}
                  alt={nombreMostrar}
                  style={{
                    width: "60px",
                    height: "40px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    border: "1px solid #f3d2e6",
                  }}
                />
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "1.05rem",
                      color: "var(--text-main)",
                    }}
                  >
                    {nombreMostrar}
                  </h4>
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <strong>Capital:</strong>{" "}
                    {pais.capital ? pais.capital[0] : "N/A"}
                    <br />
                    <strong>Población:</strong>{" "}
                    {pais.population ? pais.population.toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
