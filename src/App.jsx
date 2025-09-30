import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const COLORS = {
  green: '#86BC25',
  black: '#0B0B0B',
  gray900: '#1A1A1A',
  gray800: '#222',
  gray700: '#2B2B2B',
  text: '#F5F5F5',
};

const API_URL = 'http://127.0.0.1:8000';
const TOKEN_ENV = import.meta.env.VITE_REACT_APP_TOKEN;

function DeloitteLogo({ size = 26 }) {
  return (
    <div className="d-flex align-items-center" style={{ gap: 6 }}>
      <span
        style={{
          fontWeight: 900,
          fontSize: size,
          letterSpacing: '0.2px',
          color: '#FFFFFF',
        }}
      >
        Deloitte
      </span>
      {/* dot verde da marca */}
      <span
        aria-hidden="true"
        style={{
          width: size * 0.23,
          height: size * 0.23,
          backgroundColor: COLORS.green,
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [token, setToken] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [success, setSuccess] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAuth = async (e) => {
    e.preventDefault();
    setMensagem('');
    setSuccess('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/login' : '/register';
      const resp = await axios.post(`${API_URL}${endpoint}`, form);
      if (isLogin) {
        setToken(resp.data.access_token);
        setSuccess('Login realizado com sucesso.');
      } else {
        setSuccess('Usuário cadastrado! Faça o login.');
        setIsLogin(true);
      }
    } catch (err) {
      setMensagem(err.response?.data?.detail || 'Erro na requisição');
    } finally {
      setLoading(false);
    }
  };

  const handleMe = async () => {
    setMensagem('');
    setSuccess('');
    setLoading(true);
    try {
      const useToken = token || TOKEN_ENV;
      if (!useToken) {
        setMensagem('Token não encontrado! Faça login ou configure o .env.');
        setUsuario(null);
        return;
      }
      const resp = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${useToken}` },
      });
      setUsuario(resp.data);
      setSuccess('Dados recuperados.');
    } catch (err) {
      setMensagem(err.response?.data?.detail || 'Erro ao buscar usuário');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.black, fontFamily: 'Inter, Helvetica, Arial, sans-serif' }}>
      {/* Header */}
      <header
        className="w-100"
        style={{
          background: COLORS.black,
          borderBottom: `1px solid ${COLORS.gray700}`,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div className="container py-3 d-flex align-items-center justify-content-between">
          <DeloitteLogo size={28} />
          <nav className="d-none d-md-flex" style={{ gap: 24 }}>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>
              Produto
            </a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>
              Segurança
            </a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>
              Ajuda
            </a>
          </nav>
        </div>
      </header>

      {/* faixa verde sutil */}
      <div style={{ height: 3, background: COLORS.green, width: '100%' }} />

      {/* Conteúdo central */}
      <main className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="row w-100 justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-5">
            <div
              className="shadow"
              style={{
                background: COLORS.gray900,
                color: COLORS.text,
                borderRadius: 20,
                overflow: 'hidden',
                border: `1px solid ${COLORS.gray700}`,
              }}
            >
              {/* Top Bar da Card em verde */}
              <div style={{ height: 6, background: COLORS.green }} />

              <div className="p-4 p-md-5">
                <h1 className="mb-1" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                  {isLogin ? 'Entrar' : 'Criar conta'}
                </h1>
                <p className="mb-4" style={{ color: '#BDBDBD' }}>
                  Acesse com sua conta {isLogin ? 'para continuar' : 'ou crie uma nova para começar'}.
                </p>

                <form onSubmit={handleAuth} noValidate>
                  <label htmlFor="username" className="form-label" style={{ color: '#CFCFCF' }}>
                    Usuário
                  </label>
                  <input
                    id="username"
                    name="username"
                    className="form-control mb-3"
                    placeholder="seu.usuario"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                    style={{
                      background: COLORS.gray800,
                      color: COLORS.text,
                      border: `1px solid ${COLORS.gray700}`,
                      borderRadius: 12,
                    }}
                  />
                  <label htmlFor="password" className="form-label" style={{ color: '#CFCFCF' }}>
                    Senha
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control mb-4"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    style={{
                      background: COLORS.gray800,
                      color: COLORS.text,
                      border: `1px solid ${COLORS.gray700}`,
                      borderRadius: 12,
                    }}
                  />

                  <div className="d-flex align-items-center gap-3">
                    <button
                      type="submit"
                      className="btn"
                      disabled={loading}
                      style={{
                        backgroundColor: COLORS.green,
                        color: '#0A0A0A',
                        fontWeight: 700,
                        borderRadius: 12,
                        padding: '10px 16px',
                        flex: 1,
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 3px rgba(134,188,37,.35)`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                    >
                      {loading ? 'Aguarde…' : isLogin ? 'Entrar' : 'Cadastrar'}
                    </button>

                    <button
                      type="button"
                      className="btn btn-link p-0 ms-2"
                      onClick={() => setIsLogin(!isLogin)}
                      style={{ color: COLORS.green, fontWeight: 600, textDecoration: 'none' }}
                    >
                      {isLogin ? 'Criar conta' : 'Ir para login'}
                    </button>
                  </div>
                </form>

                {(token || TOKEN_ENV) && (
                  <div className="mt-4">
                    <button
                      className="btn w-100"
                      onClick={handleMe}
                      disabled={loading}
                      style={{
                        background: COLORS.gray800,
                        color: COLORS.green,
                        border: `1px solid ${COLORS.gray700}`,
                        borderRadius: 12,
                        fontWeight: 700,
                      }}
                    >
                      Visualizar meus dados
                    </button>
                    {TOKEN_ENV && !token && (
                      <div style={{ fontSize: 12, marginTop: 8, color: '#9E9E9E' }}>(Usando token do .env)</div>
                    )}
                  </div>
                )}

                {usuario && (
                  <div className="mt-4 p-3" style={{ background: COLORS.gray800, borderRadius: 12 }}>
                    <div className="d-flex align-items-center mb-2" style={{ gap: 8 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: COLORS.green,
                          display: 'inline-block',
                        }}
                      />
                      <h2 className="m-0" style={{ fontSize: '1rem', fontWeight: 700, color: COLORS.green }}>
                        Seus dados
                      </h2>
                    </div>
                    <p className="m-0">ID: {usuario.id}</p>
                    <p className="m-0">Usuário: {usuario.username}</p>
                  </div>
                )}

                {/* Alerts brand-friendly */}
                {success && (
                  <div className="alert mt-3 py-2" style={{ background: '#17360A', color: '#DFF6C5', border: `1px solid ${COLORS.green}`, borderRadius: 10 }}>
                    {success}
                  </div>
                )}
                {mensagem && (
                  <div className="alert mt-3 py-2" style={{ background: '#3A1010', color: '#FFC7C7', border: '1px solid #8B1E1E', borderRadius: 10 }}>
                    {mensagem}
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé enxuto */}
            <div className="text-center mt-4" style={{ color: '#9E9E9E', fontSize: 12 }}>
              <span>© {new Date().getFullYear()} Deloitte — Ambiente de demonstração</span>
              <span className="mx-2">•</span>
              <a href="#" style={{ color: '#CFCFCF', textDecoration: 'none' }}>Política de Privacidade</a>
              <span className="mx-2">•</span>
              <a href="#" style={{ color: '#CFCFCF', textDecoration: 'none' }}>Termos</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
