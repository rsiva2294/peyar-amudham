import React, { useState } from 'react';
import { X, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import type { BabyName } from './types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: BabyName;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, name }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `Discovering a piece of our heritage: "${name.name_tamil}" (${name.name_english}). Meaning: ${name.meaning_english}. Found on Peyar Amudham.`;
  const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name.name_english)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Peyar Amudham - Tamil Baby Name',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1.5rem'
    }}>
      <div 
        className="share-modal-content" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--card-bg)',
          borderRadius: '32px',
          overflow: 'hidden',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(0,0,0,0.2)',
            border: 'none',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* The Golden Card Visual */}
        <div className="golden-card-preview" style={{
          padding: 'clamp(2rem, 5vh, 4rem) 1.5rem 2.5rem 1.5rem',
          background: 'var(--gold-gradient)',
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          flexShrink: 0
        }}>
          {/* Heritage Seal Ornament */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            opacity: 0.15,
            width: '100px',
            height: '100px',
            background: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/><path d="m15 9-6 6M9 9l6 6"/></svg>\')',
            backgroundSize: 'contain'
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ 
              fontSize: '0.7rem', 
              fontWeight: '800', 
              letterSpacing: '0.3em', 
              textTransform: 'uppercase',
              opacity: 0.8,
              display: 'block',
              marginBottom: '1.5rem'
            }}>
              Pure Heritage Artifact
            </span>
            
            <h2 className="tamil-text" style={{ 
              fontSize: name.name_tamil.length > 12 
                ? 'clamp(1.4rem, 6vw, 1.8rem)' 
                : name.name_tamil.length > 8 
                ? 'clamp(1.8rem, 8vw, 2.2rem)' 
                : 'clamp(2.2rem, 10vw, 3.2rem)', 
              marginBottom: '0.4rem',
              textShadow: '0 4px 12px rgba(0,0,0,0.2)',
              lineHeight: '1',
              wordBreak: 'break-word'
            }}>
              {name.name_tamil}
            </h2>
            
            <p style={{ 
              fontSize: '1.2rem', 
              fontWeight: '700', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              marginBottom: '2rem',
              opacity: 0.9
            }}>
              {name.name_english}
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(4px)',
              padding: '1.5rem',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              marginBottom: '1rem'
            }}>
              <p className="tamil-text" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                {name.meaning_tamil}
              </p>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.9 }}>
                "{name.meaning_english}"
              </p>
            </div>

            <span style={{ fontSize: '0.65rem', fontWeight: '700', opacity: 0.6, letterSpacing: '0.1em' }}>
              SOURCE: TAMIL VIRTUAL ACADEMY (TVA) 
            </span>
          </div>
        </div>

        {/* Share Actions */}
        <div style={{ padding: 'clamp(1.5rem, 5vh, 2rem)', overflowY: 'auto' }}>
          <h3 style={{ 
            fontSize: '0.8rem', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            letterSpacing: '0.1em', 
            color: 'var(--text-muted)',
            marginBottom: '1.25rem',
            textAlign: 'center'
          }}>
            Share this treasure
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button 
              onClick={handleWhatsAppShare}
              className="share-action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '16px',
                border: 'none',
                background: '#25D366',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <MessageCircle size={20} />
              WhatsApp
            </button>
            <button 
              onClick={handleNativeShare}
              className="share-action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '1rem',
                borderRadius: '16px',
                border: 'none',
                background: 'var(--primary)',
                color: 'white',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              <Share2 size={20} />
              Share
            </button>
          </div>

          <button 
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '1rem',
              borderRadius: '16px',
              border: '1.5px solid rgba(212, 175, 55, 0.2)',
              background: 'transparent',
              color: 'var(--text-dark)',
              fontWeight: '700',
              fontSize: '0.9rem',
              cursor: 'pointer',
              width: '100%',
              marginTop: '1rem'
            }}
          >
            {copied ? <Check size={20} color="#25D366" /> : <Copy size={20} />}
            {copied ? 'Copied to Clipboard' : 'Copy Share Link'}
          </button>

          <p style={{ 
            fontSize: '0.75rem', 
            color: 'var(--text-muted)', 
            textAlign: 'center', 
            marginTop: '1.5rem',
            fontStyle: 'italic'
          }}>
            On mobile, you can also long-press the card above to save it as an image.
          </p>
        </div>
      </div>
    </div>
  );
};
