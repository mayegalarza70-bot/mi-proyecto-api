import { useState, useEffect } from "react";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        const res = await fetch(
          "https://api.spaceflightnewsapi.net/v4/articles/?limit=6",
        );
        const data = await res.json();
        setNoticias(data.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };
    cargarNoticias();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: "700",
            color: "var(--primary)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          ACTUALIDAD Y TENDENCIAS
        </span>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text-main)",
            margin: "0.3rem 0",
          }}
        >
          📰 Noticias Globales y Ciencia
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Titulares recientes, reportajes y publicaciones de actualidad mundial.
        </p>
      </div>

      {cargando ? (
        <p style={{ color: "var(--primary)" }}>
          Cargando titulares recientes...
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {noticias.map((item) => (
            <article
              key={item.id}
              style={{
                background: "#ffffff",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
              )}
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
                  <span
                    style={{
                      fontSize: "0.72rem",
                      background: "var(--primary-light)",
                      color: "var(--primary-dark)",
                      padding: "3px 10px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.news_site || "Actualidad"}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      margin: "0.6rem 0",
                      color: "var(--text-main)",
                      lineHeight: "1.4",
                    }}
                  >
                    {item.title}
                  </h3>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "var(--primary)",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    marginTop: "1rem",
                    display: "inline-block",
                  }}
                >
                  Leer artículo completo →
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
