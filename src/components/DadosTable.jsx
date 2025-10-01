import React, { useEffect, useState } from "react";
import axios from "axios";
import { COLORS } from "../theme";

export default function DadosTable({ token, reloadFlag }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDados() {
      setLoading(true);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      try {
        const resp = await axios.get("http://127.0.0.1:8000/dados/", { headers });
        setDados(resp.data);
      } catch {
        setDados([]);
      }
      setLoading(false);
    }
    fetchDados();
  }, [token, reloadFlag]);

  if (loading) return <div>Carregando dados...</div>;
  if (!dados.length) return <div style={{ color: '#aaa', background: COLORS.gray900, borderRadius: 12, padding: 16 }}>Nenhum registro enviado.</div>;

  return (
    <div style={{
      background: COLORS.gray900,
      padding: 24,
      borderRadius: 16,
      border: `1px solid ${COLORS.gray700}`,
      color: COLORS.text
    }}>
      <h4 className="mb-3" style={{ color: COLORS.green }}>Pré-visualização dos Dados</h4>
      <div style={{
        overflowX: 'auto'
      }}>
        <table className="table table-sm table-dark"
          style={{
            background: COLORS.gray800,
            color: COLORS.text,
            borderRadius: 10,
            minWidth: 400
          }}>
          <thead>
            <tr>
              {Object.keys(dados[0]).map(key => (
                <th key={key} style={{ background: COLORS.gray900, color: COLORS.green }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dados.map((reg, i) => (
              <tr key={i}>
                {Object.values(reg).map((v, k) => (
                  <td key={k} style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis" }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: 12, color: '#999', marginTop: 8 }}>
        Visualize todos os registros da sua planilha antes da automação.
      </div>
    </div>
  );
}
