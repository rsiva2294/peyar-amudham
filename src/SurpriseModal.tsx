import { Heart, X, Share2, Sparkles } from 'lucide-react';
import type { BabyName } from './types';

interface SurpriseModalProps {
  name: BabyName;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: (name: BabyName) => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({ 
  name, isOpen, onClose, isFavorite, onToggleFavorite, onShare 
}) => {
  if (!isOpen) return null;

  const isGirl = name.gender.toLowerCase() === 'girl';
  const accentColor = isGirl ? '#FF4D8B' : '#007AFF';
  const bgGradient = isGirl 
    ? 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)' 
    : 'linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 100%)';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(11, 14, 20, 0.9)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div 
        className="share-modal-content"
        style={{
          background: 'var(--card-bg)',
          borderRadius: '28px',
          padding: '2rem',
          maxWidth: '480px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: 'var(--text-muted)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            padding: '0.75rem', 
            background: 'var(--gold-gradient)', 
            borderRadius: '16px',
            marginBottom: '1rem',
            boxShadow: '0 8px 16px rgba(184, 134, 11, 0.2)'
          }}>
            <Sparkles size={24} color="white" />
          </div>
          <h2 style={{ 
            fontSize: '0.8rem', 
            fontWeight: '800', 
            color: 'var(--primary)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            margin: 0
          }}>
            Name of the Moment
          </h2>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          background: bgGradient,
          padding: '2.5rem 1.5rem',
          borderRadius: '24px',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
          border: '1px solid rgba(255,255,255,0.5)'
        }}>
          <h1 className="tamil-text font-bold" style={{ 
            fontSize: name.name_tamil.length > 8 ? '2rem' : '2.75rem', 
            color: '#1A202C', 
            marginBottom: '0.5rem',
            lineHeight: '1.2',
            wordBreak: 'break-word',
            display: 'block'
          }}>
            {name.name_tamil}
          </h1>
          <p className="font-semibold" style={{ 
            fontSize: name.name_english.length > 12 ? '1rem' : '1.25rem',
            color: '#4A5568', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em',
            margin: 0,
            wordBreak: 'break-word'
          }}>
            {name.name_english}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
            <span style={{
              background: 'white',
              color: accentColor,
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '800',
              textTransform: 'uppercase',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              {name.gender}
            </span>
            <span style={{ 
              background: 'rgba(255,255,255,0.6)',
              color: 'var(--text-muted)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '600'
            }}>
              {name.length} letters
            </span>
          </div>
        </div>

        <div style={{ 
          padding: '0 0.5rem',
          marginBottom: '2rem',
          flex: 1
        }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <p className="tamil-text" style={{ 
              fontSize: '1.15rem', 
              color: 'var(--text-dark)', 
              marginBottom: '0.75rem', 
              textAlign: 'center', 
              lineHeight: '1.6',
              fontWeight: '500'
            }}>
              {name.meaning_tamil}
            </p>
            <p style={{ 
              fontSize: '0.95rem', 
              color: 'var(--text-muted)', 
              fontStyle: 'italic', 
              textAlign: 'center', 
              lineHeight: '1.5',
              fontWeight: '500',
              opacity: 0.8
            }}>
              "{name.meaning_english}"
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginTop: 'auto'
        }}>
          <button 
            onClick={() => onToggleFavorite(name.id)}
            style={{
              padding: '1rem',
              borderRadius: '18px',
              border: 'none',
              background: isFavorite ? '#FFF0F5' : 'var(--bg-color)',
              color: isFavorite ? '#FF4D8B' : 'var(--text-dark)',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
              boxShadow: isFavorite ? '0 4px 12px rgba(255, 77, 139, 0.15)' : 'none'
            }}
          >
            <Heart fill={isFavorite ? '#FF4D8B' : 'none'} size={20} />
            {isFavorite ? 'Saved' : 'Save'}
          </button>

          <button 
            onClick={() => onShare(name)}
            style={{
              padding: '1rem',
              borderRadius: '18px',
              border: 'none',
              background: 'var(--gold-gradient)',
              color: 'white',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
              cursor: 'pointer',
              boxShadow: '0 8px 16px rgba(184, 134, 11, 0.25)'
            }}
          >
            <Share2 size={20} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};
