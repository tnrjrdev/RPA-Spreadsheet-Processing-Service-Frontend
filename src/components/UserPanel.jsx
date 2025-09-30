import React from 'react';
import { COLORS } from '../theme';

export default function UserPanel({ tokenEnv, hasToken, onMe, loading, usuario }) {
  return (
    <>
      {(hasToken || tokenEnv) && (
        <div className="mt-4">
          <button
            className="btn w-100"
            onClick={onMe}
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
          {tokenEnv && !hasToken && (
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
    </>
  );
}
