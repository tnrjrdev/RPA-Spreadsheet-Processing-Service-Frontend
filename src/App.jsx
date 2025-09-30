import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { COLORS } from './theme';
import DeloitteLogo from './components/DeloitteLogo';
import AuthCard from './components/AuthCard';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPanel from './components/UserPanel';
import ClientManager from './components/ClientManager';

import { login, register, getMe } from './api/auth';

const TOKEN_ENV = import.meta.env.VITE_REACT_APP_TOKEN;

export default function App() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [token, setToken] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [success, setSuccess] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmitAuth(e) {
    e.preventDefault();
    setMensagem('');
    setSuccess('');
    setLoading(true);
    try {
      if (isLogin) {
        const data = await login(form);
        setToken(data.access_token);
        setSuccess('Login realizado com sucesso.');
      } else {
        await register(form);
        setSuccess('Usuário cadastrado! Faça o login.');
        setIsLogin(true);
      }
    } catch (err) {
      setMensagem(err?.response?.data?.detail || 'Erro na requisição');
    } finally {
      setLoading(false);
    }
  }

  async function handleMe() {
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
      const data = await getMe(useToken);
      setUsuario(data);
      setSuccess('Dados recuperados.');
    } catch (err) {
      setMensagem(err?.response?.data?.detail || 'Erro ao buscar usuário');
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  }

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
            <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>Produto</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>Segurança</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>Ajuda</a>
          </nav>
        </div>
      </header>

      <div style={{ height: 3, background: COLORS.green, width: '100%' }} />

      <main className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="row w-100 justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-5">
            <AuthCard
              title={isLogin ? 'Entrar' : 'Criar conta'}
              subtitle={
                isLogin ? 'Acesse com sua conta para continuar.' : 'Crie uma nova conta para começar.'
              }
            >
              {isLogin ? (
                <LoginForm
                  form={form}
                  loading={loading}
                  onChange={handleChange}
                  onSubmit={handleSubmitAuth}
                  onSwitch={() => setIsLogin(false)}
                />
              ) : (
                <RegisterForm
                  form={form}
                  loading={loading}
                  onChange={handleChange}
                  onSubmit={handleSubmitAuth}
                  onSwitch={() => setIsLogin(true)}
                />
              )}

              <UserPanel
                tokenEnv={TOKEN_ENV}
                hasToken={!!token}
                onMe={handleMe}
                loading={loading}
                usuario={usuario}
              />

              {success && (
                <div className="alert mt-3 py-2"
                  style={{ background: '#17360A', color: '#DFF6C5', border: `1px solid ${COLORS.green}`, borderRadius: 10 }}>
                  {success}
                </div>
              )}
              {mensagem && (
                <div className="alert mt-3 py-2"
                  style={{ background: '#3A1010', color: '#FFC7C7', border: '1px solid #8B1E1E', borderRadius: 10 }}>
                  {mensagem}
                </div>
              )}

              {/* Adiciona a interface de gerenciamento somente se usuário estiver autenticado */}
              {token && <ClientManager token={token} />}
            </AuthCard>

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
