import { useState, useEffect } from "react";

export default function Monedas() {
  const [monto, setMonto] = useState(100);
  const [deMoneda, setDeMoneda] = useState("USD");
  const [aMoneda, setAMoneda] = useState("EUR");
  const [resultado, setResultado] = useState(null);
  const [cargando, setCargando] = useState(false);

  const calcularCambio = async () => {
    if (deMoneda === aMoneda) {
      setResultado(monto);
      return;
    }
    setCargando(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${monto}&from=${deMoneda}&to=${aMoneda}`,
      );
      const data = await res.json();
      setResultado(data.rates[aMoneda]);
    } catch (err) {
      console.error("Error convirtiendo moneda", err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    calcularCambio();
  }, [monto, deMoneda, aMoneda]);

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#db2777", marginBottom: "0.5rem" }}>
        💱 Conversor de Divisas
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        Consulta tipos de cambio de divisas globales en tiempo real.
      </p>

      <div
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "20px",
          border: "1px solid var(--border)",
          boxShadow: "0 10px 25px rgba(219, 39, 119, 0.08)",
        }}
      >
        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: "var(--text-muted)",
            }}
          >
            Monto a convertir:
          </label>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              marginTop: "4px",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "1.5rem" }}>
          <div style={{ flex: 1, textAlign: "left" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "var(--text-muted)",
              }}
            >
              De:
            </label>
            <select
              value={deMoneda}
              onChange={(e) => setDeMoneda(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                marginTop: "4px",
              }}
            >
              <option value="USD">USD - Dólar Estadounidense</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - Libra Esterlina</option>
              <option value="BRL">BRL - Real Brasileño</option>
            </select>
          </div>

          <div style={{ flex: 1, textAlign: "left" }}>
            <label
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                color: "var(--text-muted)",
              }}
            >
              A:
            </label>
            <select
              value={aMoneda}
              onChange={(e) => setAMoneda(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "10px",
                border: "1px solid #d1d5db",
                marginTop: "4px",
              }}
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - Dólar Estadounidense</option>
              <option value="GBP">GBP - Libra Esterlina</option>
              <option value="BRL">BRL - Real Brasileño</option>
            </select>
          </div>
        </div>

        {cargando ? (
          <p>Calculando tipo de cambio...</p>
        ) : (
          resultado !== null && (
            <div
              style={{
                background: "#fce7f3",
                padding: "1rem",
                borderRadius: "14px",
              }}
            >
              <span style={{ fontSize: "0.85rem", color: "#be185d" }}>
                Resultado Estimado:
              </span>
              <h3
                style={{
                  fontSize: "1.8rem",
                  color: "#db2777",
                  margin: "4px 0",
                }}
              >
                {resultado} {aMoneda}
              </h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}
