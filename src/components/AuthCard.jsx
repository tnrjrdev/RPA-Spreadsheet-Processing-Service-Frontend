import React from 'react';
import { COLORS } from '../theme';

export default function AuthCard({ title, subtitle, children }) {
  return (
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
      <div style={{ height: 6, background: COLORS.green }} />
      <div className="p-4 p-md-5">
        <h1 className="mb-1" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          {title}
        </h1>
        {subtitle && <p className="mb-4" style={{ color: '#BDBDBD' }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
