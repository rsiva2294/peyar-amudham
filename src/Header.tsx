import { Heart, Sun, Moon, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  showFavoritesOnly: boolean;
  onToggleFavorites: () => void;
  onOpenContribute: () => void;
}

export const Header: React.FC<HeaderProps> = ({ showFavoritesOnly, onToggleFavorites, onOpenContribute }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('tamil_baby_names_theme');
    if (saved) return saved as 'light' | 'dark';
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tamil_baby_names_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="main-header" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div className="logo-container">
          <img
            src="/pwa-192.png"
            alt="Peyar Amudham Logo"
            className="logo-img"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <h1 className="font-heading text-2xl brand-title" style={{
            background: 'var(--gold-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.02em',
            lineHeight: '1'
          }}>
            PEYAR AMUDHAM
          </h1>
          <span className="text-xs font-bold brand-tagline" style={{ color: 'var(--text-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6 }}>
            PURE LINGUISTIC NECTAR
          </span>
        </div>
      </div>
      <div className="header-actions" style={{ display: 'flex', gap: '0.75rem' }}>
        <button className="icon-btn" onClick={onOpenContribute} title="Contribute a Name">
          <PlusCircle size={20} />
        </button>
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Dark Mode">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          className={`icon-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={onToggleFavorites}
          title="Favorites"
          style={{
            color: showFavoritesOnly ? '#FF4D8B' : 'inherit',
            background: showFavoritesOnly ? 'rgba(255, 77, 139, 0.1)' : 'transparent'
          }}
        >
          <Heart size={20} fill={showFavoritesOnly ? '#FF4D8B' : 'none'} />
        </button>
      </div>
    </header>
  );
};
