import React from 'react';
import { COLORS } from '../theme';

export default function RegisterForm({
  form, loading, onChange, onSubmit, onSwitch
}) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="username" className="form-label" style={{ color: '#CFCFCF' }}>
        Usuário
      </label>
      <input
        id="username"
        name="username"
        className="form-control mb-3"
        placeholder="seu.usuario"
        value={form.username}
        onChange={onChange}
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
        onChange={onChange}
        autoComplete="new-password"
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
          }}
        >
          {loading ? 'Aguarde…' : 'Cadastrar'}
        </button>

        <button
          type="button"
          className="btn btn-link p-0 ms-2"
          onClick={onSwitch}
          style={{ color: COLORS.green, fontWeight: 600, textDecoration: 'none' }}
        >
          Ir para login
        </button>
      </div>
    </form>
  );
}
