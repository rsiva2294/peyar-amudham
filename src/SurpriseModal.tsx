import { Heart, X } from 'lucide-react';
import type { BabyName } from './types';

interface SurpriseModalProps {
  name: BabyName;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({ name, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  if (!isOpen) return null;

  const isGirl = name.gender.toLowerCase() === 'girl';
  const tagColor = isGirl ? 'var(--girl-color)' : 'var(--boy-color)';
  const tagBg = isGirl ? '#FFF0F5' : '#F0F5FF';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '24px',
        padding: 'clamp(1rem, 5vw, 2.5rem)',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '2.5rem' }}>✨</span>
          <h2 className="text-lg font-bold text-primary" style={{ marginTop: '0.25rem' }}>Name of the Moment</h2>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem', width: '100%', containerType: 'inline-size' }}>
          <h1 className="tamil-text font-bold" style={{ 
            fontSize: `clamp(1.5rem, calc(80cqi / ${Math.max(name.name_tamil.length, 6) * 0.5}), 2.75rem)`, 
            color: 'var(--text-dark)', 
            marginBottom: '0.25rem',
            lineHeight: '1.2',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {name.name_tamil}
          </h1>
          <p className="font-semibold" style={{ 
            fontSize: `clamp(0.875rem, calc(80cqi / ${Math.max(name.name_english.length, 10) * 0.5}), 1.25rem)`,
            color: 'var(--text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap'
          }}>
            {name.name_english}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{
            background: tagBg,
            color: tagColor,
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase'
          }}>
            {name.gender}
          </span>
          <span style={{ 
            background: 'var(--bg-color)',
            color: 'var(--text-muted)',
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '0.75rem',
          }}>
            {name.length} letters
          </span>
        </div>

        <div style={{ background: 'var(--bg-color)', padding: '1.25rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
          <p className="tamil-text" style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '0.5rem', textAlign: 'center', lineHeight: '1.5' }}>
            {name.meaning_tamil}
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.5', fontWeight: '500' }}>
            "{name.meaning_english}"
          </p>
        </div>

        <button 
          onClick={() => onToggleFavorite(name.id)}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '16px',
            border: isFavorite ? '2px solid #FF4D8B' : '2px solid #E5E7EB',
            background: isFavorite ? '#FFF0F5' : 'transparent',
            color: isFavorite ? '#FF4D8B' : 'var(--text-dark)',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '1.1rem',
            transition: 'all 0.2s'
          }}
        >
          <Heart fill={isFavorite ? '#FF4D8B' : 'none'} size={24} />
          {isFavorite ? 'Removed from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};
