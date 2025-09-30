import React from 'react';
import { COLORS } from '../theme';

export default function DeloitteLogo({ size = 26, light = true }) {
  return (
    <div className="d-flex align-items-center" style={{ gap: 6 }}>
      <span
        style={{
          fontWeight: 900,
          fontSize: size,
          letterSpacing: '0.2px',
          color: light ? '#FFFFFF' : '#111',
        }}
      >
        Deloitte
      </span>
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
