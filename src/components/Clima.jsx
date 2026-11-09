import { useState } from "react";

export default function Clima() {
  const [ciudad, setCiudad] = useState("Lima");
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const consultarClima = async (e) => {
    e.preventDefault();
    if (!ciudad) return;
    setCargando(true);
    setError("");
    try {
      // Usando geocoding + clima público simulado o API directa de OpenWeather
      const res = await fetch(
        `https://wttr.in/${encodeURIComponent(ciudad)}?format=j1`,
      );
      if (!res.ok) throw new Error("Ciudad no encontrada");
      const data = await res.json();
      setClima(data);
    } catch (err) {
      setError("No se pudo obtener el clima para esta ciudad.");
      setClima(null);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🌤️ Consultas de Clima</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
        Revisa el estado meteorológico actual de cualquier ciudad.
      </p>

      <form
        onSubmit={consultarClima}
        style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}
      >
        <input
          type="text"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Escribe una ciudad..."
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
          }}
        />
        <button
          type="submit"
          style={{
            background: "#8b5cf6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Consultar
        </button>
      </form>

      {cargando && <p>Consultando satélites meteorológicos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {clima && clima.current_condition && (
        <div
          style={{
            background: "#fdf4f9",
            padding: "1.5rem",
            borderRadius: "16px",
            border: "1px solid #fbcfe8",
          }}
        >
          <h3>Clima en {ciudad}</h3>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#db2777" }}>
            {clima.current_condition[0].temp_C} °C
          </p>
          <p>Condición: {clima.current_condition[0].weatherDesc[0].value}</p>
          <p>Humedad: {clima.current_condition[0].humidity}%</p>
        </div>
      )}
    </div>
  );
}
