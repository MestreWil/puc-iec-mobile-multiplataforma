// src/components/UpdatePrompt.tsx
// TODO 3 (parte 2): aviso de "pronto para offline" e de "nova versão disponível".
// Só funciona com registerType: 'prompt' e no BUILD (npm run build && npm run preview).

import type { CSSProperties } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const styles: Record<string, CSSProperties> = {
  toast: {
    position: 'fixed',
    left: 16,
    right: 16,
    bottom: 80,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 10,
    background: '#0d253f',
    color: '#fff',
    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
    fontSize: 14,
  },
  message: { flex: 1 },
  primary: {
    background: '#01b4e4',
    color: '#0d253f',
    border: 'none',
    borderRadius: 6,
    padding: '6px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  secondary: {
    background: 'transparent',
    color: '#90a4ae',
    border: '1px solid #90a4ae',
    borderRadius: 6,
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (needRefresh) {
    return (
      <div role="alert" style={styles.toast}>
        <span style={styles.message}>🔄 Nova versão disponível</span>
        <button style={styles.primary} onClick={() => updateServiceWorker(true)}>
          Atualizar
        </button>
        <button style={styles.secondary} onClick={() => setNeedRefresh(false)}>
          Depois
        </button>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div role="status" style={styles.toast}>
        <span style={styles.message}>✅ App pronto para uso offline</span>
        <button style={styles.secondary} onClick={() => setOfflineReady(false)}>
          OK
        </button>
      </div>
    );
  }

  return null;
}
