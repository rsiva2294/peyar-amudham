
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

export function UpdateToast() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: any) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error: any) {
      console.log('SW registration error:', error);
    },
  });

  const close = () => {
    setNeedRefresh(false);
  };

  if (!needRefresh) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: 'var(--card-bg)',
      border: '1.5px solid rgba(212, 175, 55, 0.4)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(212, 175, 55, 0.05)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      padding: '1rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      width: 'max-content',
      maxWidth: '90vw',
      animation: 'modal-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold-gradient)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-color)',
          flexShrink: 0
        }}>
          <RefreshCw size={16} strokeWidth={3} />
        </div>
        <div>
          <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: '700' }}>New Artifacts Discovered!</h4>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>An update is ready to install.</p>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
        <button 
          onClick={() => updateServiceWorker(true)}
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--gold-gradient)',
            color: 'var(--bg-color)',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.75rem',
            fontWeight: '800',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 10px rgba(184, 134, 11, 0.3)',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(184, 134, 11, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(184, 134, 11, 0.3)';
          }}
        >
          Reload
        </button>
        <button 
          onClick={close}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
