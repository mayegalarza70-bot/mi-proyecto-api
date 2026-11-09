import { useState, useEffect } from "react";

export default function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [categoria, setCategoria] = useState("all");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPeliculas = async () => {
      setCargando(true);
      try {
        const res = await fetch("https://api.tvmaze.com/shows?page=1");
        const data = await res.json();
        setPeliculas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    obtenerPeliculas();
  }, []);

  const peliculasFiltradas = peliculas.filter((item) => {
    if (!item.image || !item.image.medium) return false;
    if (categoria === "all") return true;
    return (
      item.genres &&
      item.genres.map((g) => g.toLowerCase()).includes(categoria.toLowerCase())
    );
  });

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          CARTELERA CINEMATOGRÁFICA
        </span>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text-main)",
            margin: "0.3rem 0",
          }}
        >
          🎬 Películas y Series Actuales
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Filtra por categorías y descubre producciones populares y estrenos
          destacados.
        </p>
      </div>

      {/* Botones de Categorías */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        {[
          { id: "all", label: "Todas" },
          { id: "drama", label: "Estrenos / Drama" },
          { id: "action", label: "Acción" },
          { id: "comedy", label: "Comedia" },
          { id: "romance", label: "Romance" },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoria(cat.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: categoria === cat.id ? "var(--accent)" : "#ffffff",
              color: categoria === cat.id ? "white" : "var(--text-main)",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {cargando ? (
        <p style={{ color: "var(--accent)" }}>Cargando cartelera de cine...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {peliculasFiltradas.slice(0, 8).map((item) => (
            <div
              key={item.id}
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border)",
                boxShadow: "0 8px 20px rgba(139, 92, 246, 0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={item.image.original || item.image.medium}
                  alt={item.name}
                  style={{ width: "100%", height: "280px", objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "rgba(139, 92, 246, 0.9)",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  ★ {item.rating?.average || "8.0"}
                </span>
              </div>

              <div
                style={{
                  padding: "1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      color: "var(--text-main)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-muted)",
                      marginBottom: "1rem",
                    }}
                  >
                    {item.genres?.join(" • ")}
                  </p>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: "var(--primary-light)",
                    color: "var(--primary-dark)",
                    textAlign: "center",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    fontWeight: "600",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    display: "block",
                  }}
                >
                  Ver sinopsis →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
