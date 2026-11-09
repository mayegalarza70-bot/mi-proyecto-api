import { useState, useEffect } from "react";

export default function Perros() {
  const [imagen, setImagen] = useState("");
  const [raza, setRaza] = useState("");
  const [cargando, setCargando] = useState(true);

  const obtenerPerro = async () => {
    setCargando(true);
    try {
      const res = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await res.json();
      setImagen(data.message);

      // Extraer la raza de la URL (ej: .../breeds/golden-retriever/n02099601_3000.jpg)
      const partesUrl = data.message.split("/");
      const indexBreed = partesUrl.indexOf("breeds");
      if (indexBreed !== -1 && partesUrl[indexBreed + 1]) {
        let nombreRaza = partesUrl[indexBreed + 1];
        // Formatear nombre de la raza
        nombreRaza = nombreRaza.split("-").reverse().join(" ");
        setRaza(nombreRaza.charAt(0).toUpperCase() + nombreRaza.slice(1));
      } else {
        setRaza("Raza adorable aleatoria");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPerro();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "1rem",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: "700",
          color: "#ea580c",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        MUNDO ANIMAL
      </span>
      <h2
        style={{
          fontSize: "1.8rem",
          color: "var(--text-main)",
          margin: "0.3rem 0",
        }}
      >
        🐶 Galería de Perritos
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        Fotografías y razas obtenidas en tiempo real desde la Dog API pública.
      </p>

      {cargando ? (
        <p style={{ color: "#ea580c" }}>Buscando un perrito tierno...</p>
      ) : (
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          <img
            src={imagen}
            alt="Perrito"
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: "14px",
              marginBottom: "1rem",
            }}
          />
          <div
            style={{
              background: "#ffedd5",
              padding: "10px 16px",
              borderRadius: "12px",
              marginBottom: "1.2rem",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: "700",
                color: "#c2410c",
              }}
            >
              🐾 Raza identificada: {raza}
            </span>
          </div>
          <br />
          <button
            onClick={obtenerPerro}
            style={{
              background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "25px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
            }}
          >
            Ver otro perrito 🔄
          </button>
        </div>
      )}
    </div>
  );
}
