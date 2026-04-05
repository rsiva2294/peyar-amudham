import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nameTamil: '',
    nameEnglish: '',
    gender: 'Boy',
    meaning: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct email parameters
    const recipient = 'rsiva2294@gmail.com';
    const subject = encodeURIComponent(`[Peyar Amudham] New Name Contribution: ${formData.nameEnglish}`);
    const body = encodeURIComponent(
      `Peyar Amudham Name Contribution\n` +
      `--------------------------------\n` +
      `Name (Tamil): ${formData.nameTamil}\n` +
      `Name (English): ${formData.nameEnglish}\n` +
      `Gender: ${formData.gender}\n` +
      `Meaning: ${formData.meaning}\n\n` +
      `Submitted via Peyar Amudham Web App`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    onClose();
  };

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
        padding: '2rem',
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
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={24} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>Contribute a Name</h2>
          <p className="text-sm text-muted" style={{ marginTop: '0.5rem' }}>
            Help us expand our archive of pure Tamil names.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-dark)' }}>
              Name in Tamil
            </label>
            <input 
              required
              type="text"
              placeholder="எ.கா. அழகன்"
              value={formData.nameTamil}
              onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: 'var(--bg-color)',
                color: 'var(--text-dark)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-dark)' }}>
              Name in English
            </label>
            <input 
              required
              type="text"
              placeholder="e.g. Azhagan"
              value={formData.nameEnglish}
              onChange={(e) => setFormData({ ...formData, nameEnglish: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: 'var(--bg-color)',
                color: 'var(--text-dark)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-dark)' }}>
              Gender
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {(['Boy', 'Girl'] as const).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: g })}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: formData.gender === g ? 'var(--primary)' : 'var(--bg-color)',
                    color: formData.gender === g ? 'white' : 'var(--text-muted)',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: formData.gender === g ? '0 4px 12px rgba(197, 160, 40, 0.3)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-dark)' }}>
              Meaning / Notes
            </label>
            <textarea 
              required
              placeholder="Describe the meaning or source of this pure Tamil name..."
              rows={4}
              value={formData.meaning}
              onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                background: 'var(--bg-color)',
                color: 'var(--text-dark)',
                fontSize: '1rem',
                resize: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '16px',
              background: 'var(--primary)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            <Send size={20} />
            Submit via Email
          </button>
        </form>
      </div>
    </div>
  );
};
