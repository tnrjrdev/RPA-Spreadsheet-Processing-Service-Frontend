import React, { useEffect, useState } from 'react';
import { COLORS } from '../theme';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export default function ClientManager({ token }) {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Busca os clientes ao montar
  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line
  }, []);

  async function fetchClients() {
    setError('');
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const { data } = await axios.get(`${API_URL}/clients/`, { headers });
      setClients(data);
    } catch (err) {
      setError('Não foi possível buscar os clientes.');
    }
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (!form.name || !form.email) {
      setError("Preencha os campos obrigatórios.");
      setLoading(false);
      return;
    }
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${API_URL}/clients/`, form, { headers });
      setSuccess("Cliente cadastrado com sucesso!");
      setForm({ name: '', email: '' });
      fetchClients();
    } catch (err) {
      setError(err?.response?.data?.detail || "Não foi possível cadastrar.");
    }
    setLoading(false);
  }

  return (
    <div className="shadow mt-5" style={{
      background: COLORS.gray900,
      color: COLORS.text,
      borderRadius: 20,
      overflow: 'hidden',
      border: `1px solid ${COLORS.gray700}`,
      maxWidth: 520,
      margin: 'auto'
    }}>
      <div style={{ height: 6, background: COLORS.green }} />
      <div className="p-4 p-md-5">
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 15 }}>Gestão de Clientes</h2>
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="row mb-2">
            <div className="col-sm-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nome do cliente"
                value={form.name}
                onChange={handleChange}
                style={{
                  background: COLORS.gray800,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.gray700}`,
                  borderRadius: 12
                }}
              />
            </div>
            <div className="col-sm-6">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                style={{
                  background: COLORS.gray800,
                  color: COLORS.text,
                  border: `1px solid ${COLORS.gray700}`,
                  borderRadius: 12
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn w-100 mt-2"
            disabled={loading}
            style={{
              backgroundColor: COLORS.green,
              color: "#171717",
              fontWeight: 700,
              borderRadius: 12,
              padding: '10px 0'
            }}
          >
            {loading ? "Aguarde…" : "Adicionar cliente"}
          </button>
        </form>
        {success && (
          <div className="alert py-2 mb-3"
            style={{
              background: '#17360A',
              color: '#DFF6C5',
              border: `1px solid ${COLORS.green}`,
              borderRadius: 10
            }}>
            {success}
          </div>
        )}
        {error && (
          <div className="alert py-2 mb-3"
            style={{
              background: '#3A1010',
              color: '#FFC7C7',
              border: '1px solid #8B1E1E',
              borderRadius: 10
            }}>
            {error}
          </div>
        )}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {clients.map(client => (
            <li key={client.id}
                className="mb-2 p-3"
                style={{
                  background: COLORS.gray800,
                  borderRadius: 12,
                  color: COLORS.text,
                  boxShadow: "0 0 3px #2223"
                }}>
              <strong style={{ color: COLORS.green }}>{client.name}</strong>
              <br />
              <span style={{ color: "#ccc", fontSize: 14 }}>{client.email}</span>
            </li>
          ))}
        </ul>
        {!loading && clients.length === 0 && (
          <div style={{ color: "#BDBDBD", fontSize: 14 }}>Nenhum cliente cadastrado até o momento.</div>
        )}
      </div>
    </div>
  );
}
