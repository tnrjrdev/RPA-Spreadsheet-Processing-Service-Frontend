import React, { useRef, useState } from "react";
import axios from "axios";
import { COLORS } from "../theme";

export default function UploadPanel({ token, onUploadSuccess }) {
  const fileInput = useRef();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const file = fileInput.current.files[0];
    if (!file) {
      setMsg("Selecione um arquivo.");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const resp = await axios.post("http://127.0.0.1:8000/upload/", formData, { headers });
      setMsg(`Arquivo enviado! Registros: ${resp.data.total}`);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setMsg(err?.response?.data?.detail || "Erro ao enviar arquivo!");
    }
    setLoading(false);
  }

  return (
    <div style={{
      background: COLORS.gray900,
      padding: 24,
      borderRadius: 16,
      border: `1px solid ${COLORS.gray700}`,
      marginBottom: 20,
      color: COLORS.text
    }}>
      <h4 className="mb-3" style={{ color: COLORS.green }}>Upload de Planilha</h4>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv, .xlsx"
          ref={fileInput}
          className="form-control mb-2"
          style={{
            background: COLORS.gray800,
            color: COLORS.text,
            borderRadius: 10,
            border: `1px solid ${COLORS.gray700}`
          }}
        />
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: COLORS.green,
            color: "#111",
            fontWeight: 700,
            borderRadius: 10,
            padding: "8px 0",
            marginTop: 8
          }}
          disabled={loading}
        >
          {loading ? "Enviando…" : "Enviar arquivo"}
        </button>
      </form>
      {msg && (
        <div className="alert mt-2 py-2"
          style={{
            background: msg.includes("Erro") ? '#3A1010' : '#17360A',
            color: msg.includes("Erro") ? '#FFC7C7' : '#DFF6C5',
            border: msg.includes("Erro") ? '1px solid #8B1E1E' : `1px solid ${COLORS.green}`,
            borderRadius: 10
          }}>
          {msg}
        </div>
      )}
    </div>
  );
}
