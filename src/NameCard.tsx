import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import clsx from 'clsx';
import type { BabyName } from './types';

interface NameCardProps {
  data: BabyName;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: (name: BabyName) => void;
  style?: React.CSSProperties; // for react-window virtualization
}

export const NameCard: React.FC<NameCardProps> = ({ data, isFavorite, onToggleFavorite, onShare, style }) => {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isGirl = data.gender.toLowerCase() === 'girl';
  const tagColor = isGirl ? 'var(--girl-color)' : 'var(--boy-color)';
  const tagBg = isGirl ? 'var(--girl-bg)' : 'var(--boy-bg)';

  const displayTags = (isDesktop || isTagsExpanded) ? data.tags : data.tags?.slice(0, 3);
  const hasMoreTags = data.tags && data.tags.length > 3;

  return (
    <div className="name-card-container" style={{ ...style, padding: '0.75rem' }}>
      <div className="artifact-card" style={{ height: '100%', padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 className="tamil-text text-xl" style={{ marginBottom: '0.3rem', color: 'var(--text-dark)', lineHeight: '1.2' }}>
              {data.name_tamil}
            </h2>
            <p className="text-sm font-bold latin-name" style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {data.name_english}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0, marginLeft: '0.5rem' }}>
            <button 
              className="icon-btn"
              onClick={() => onShare(data)}
              style={{ color: 'var(--text-muted)' }}
            >
              <Share2 size={16} strokeWidth={2.5} />
            </button>
            <button 
              className={clsx('icon-btn', { 'active': isFavorite })}
              onClick={() => onToggleFavorite(data.id)}
              style={{ color: isFavorite ? 'var(--girl-color)' : 'var(--text-muted)' }}
            >
              <Heart size={16} fill={isFavorite ? 'var(--girl-color)' : 'none'} strokeWidth={isFavorite ? 0 : 2.5} />
            </button>
          </div>
        </div>

        <div className="card-chips" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem', marginBottom: '1.5rem' }}>
          <span className="gender-chip" style={{
            background: tagBg,
            color: tagColor,
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            border: `1.5px solid ${tagColor}44`
          }}>
            {data.gender}
          </span>
          <span className="chip-sep" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>|</span>
          <span className="length-chip" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {data.length} letters
          </span>
        </div>

        <div className="card-content" style={{ flex: 1 }}>
          <p className="tamil-text text-md meaning-ta" style={{ color: 'var(--text-dark)', marginBottom: '0.75rem', opacity: 0.9, fontWeight: '500' }}>
            {data.meaning_tamil}
          </p>
          <p className="text-sm meaning-en" style={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6', fontWeight: '500' }}>
            "{data.meaning_english}"
          </p>
        </div>

        <div className="card-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2rem' }}>
          {displayTags?.map((tag, i) => (
            <span key={i} className="heritage-tag" style={{
              background: 'rgba(212, 175, 55, 0.05)',
              color: 'var(--primary)',
              padding: '4px 12px',
              borderRadius: '8px',
              fontSize: '0.7rem',
              fontWeight: '700',
              border: '1px solid rgba(212, 175, 55, 0.1)'
            }}>
              {tag.toUpperCase()}
            </span>
          ))}
          {hasMoreTags && !isTagsExpanded && !isDesktop && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsTagsExpanded(true);
              }}
              className="tags-more-btn" 
              style={{ 
                background: 'rgba(212, 175, 55, 0.03)',
                border: '1px dashed rgba(212, 175, 55, 0.2)',
                color: 'var(--text-muted)', 
                fontSize: '0.65rem', 
                fontWeight: '800', 
                padding: '4px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              +{data.tags!.length - 3} MORE
            </button>
          )}
          {isTagsExpanded && !isDesktop && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsTagsExpanded(false);
              }}
              style={{ 
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)', 
                fontSize: '0.7rem', 
                fontWeight: '800', 
                padding: '4px 0',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                opacity: 0.6
              }}
            >
              [ LESS ]
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
