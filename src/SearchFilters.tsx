import { useState, useEffect } from 'react';
import { Search, Sparkles, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: 'name' | 'tag' | 'magic';
  setSearchType: (type: 'name' | 'tag' | 'magic') => void;
  searchPredicate: 'starts' | 'contains' | 'ends';
  setSearchPredicate: (predicate: 'starts' | 'contains' | 'ends') => void;
  genderFilter: 'All' | 'Boy' | 'Girl';
  setGenderFilter: (gender: 'All' | 'Boy' | 'Girl') => void;
  startingLetter: string | null;
  setStartingLetter: (letter: string | null) => void;
  lengthFilter: 'All' | 'Short' | 'Medium' | 'Long';
  setLengthFilter: (length: 'All' | 'Short' | 'Medium' | 'Long') => void;
  onSurpriseMe: () => void;
  isGenerating?: boolean;
  onMagicSearch?: (query: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery, setSearchQuery, searchType, setSearchType, searchPredicate, setSearchPredicate, genderFilter, setGenderFilter,
  startingLetter, setStartingLetter, lengthFilter, setLengthFilter, onSurpriseMe, isGenerating, onMagicSearch
}) => {
  const [alphabetLang, setAlphabetLang] = useState<'en' | 'ta'>('en');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hasActiveFilters = lengthFilter !== 'All' || startingLetter !== null;

  const ENGLISH_ALPHABET = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const TAMIL_ALPHABET = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஒள', 'க', 'ச', 'ஞ', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ'];
  const activeAlphabet = alphabetLang === 'en' ? ENGLISH_ALPHABET : TAMIL_ALPHABET;

  return (
    <div className="search-filters-container" style={{ marginBottom: '2.5rem' }}>
      {/* Top Row: Search Type & Surprise Button */}
      <div className="filter-row top-row" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div
          className="heritage-box search-type-toggle"
          style={{
            display: 'flex',
            gap: '0.35rem',
            background: 'rgba(212, 175, 55, 0.05)',
            padding: '0.35rem',
            borderRadius: '20px',
            border: '1.5px solid rgba(212, 175, 55, 0.1)'
          }}
        >
          {(['name', 'tag', 'magic'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setSearchType(type);
                setSearchQuery('');
              }}
              className={`filter-btn ${searchType === type ? 'active' : ''}`}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '16px',
                border: 'none',
                background: searchType === type ? 'var(--gold-gradient)' : 'transparent',
                color: searchType === type ? 'white' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: searchType === type ? '0 4px 12px rgba(184, 134, 11, 0.3)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {type === 'magic' ? '✨ Vibe' : type === 'name' ? 'Name' : 'Terms'}
            </button>
          ))}
        </div>

        <button
          onClick={onSurpriseMe}
          className="surprise-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.65rem 1.75rem',
            background: 'var(--gold-gradient)',
            color: 'white',
            borderRadius: '24px',
            border: 'none',
            fontWeight: '800',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(133, 101, 0, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'var(--font-en)'
          }}
        >
          <Sparkles size={18} />
          <span className="btn-text">Surprise Me</span>
        </button>
      </div>

      {/* Main Row: Search + Gender + Length (Single Line on Desktop) */}
      {/* Unified Search Row: Always Visible */}
      <div className="search-primary-container" style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        width: '100%',
        flexWrap: 'wrap',
        marginBottom: '1.5rem'
      }}>
        {/* Search Input Area */}
        <div className="search-input-box magic-box" style={{
          flex: '1 1 100%',
          height: 'auto',
          background: 'var(--card-bg)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 16px',
          boxShadow: 'var(--card-shadow)',
          border: '1px solid var(--primary)',
          transition: 'all 0.3s ease'
        }}>
          {searchType === 'magic' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
              <input
                type="text"
                placeholder="Describe the vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tamil-text"
                style={{
                  border: 'none',
                  outline: 'none',
                  flex: 1,
                  fontSize: isDesktop ? '1.05rem' : '0.9rem',
                  color: 'var(--text-dark)',
                  background: 'transparent',
                  opacity: 0.9,
                  fontWeight: '500',
                  padding: isDesktop ? '0.4rem 0' : '0.2rem 0'
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}
                  >
                    <X size={isDesktop ? 16 : 14} />
                  </button>
                )}
                <button
                  onClick={() => onMagicSearch?.(searchQuery)}
                  disabled={isGenerating || !searchQuery.trim()}
                  style={{
                    background: isGenerating ? 'var(--text-muted)' : 'var(--gold-gradient)',
                    color: 'white',
                    padding: isDesktop ? '0.45rem 1.25rem' : '0.35rem 0.85rem',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: isDesktop ? '0.75rem' : '0.65rem',
                    textTransform: 'uppercase',
                    cursor: isGenerating || !searchQuery.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isGenerating ? (isDesktop ? 'Consulting Archives...' : '...') : 'DISCOVER'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Search size={20} color="var(--primary)" style={{ marginRight: '1rem', opacity: 0.8 }} />
                <input
                  type="text"
                  placeholder={searchType === 'name' ? "Enter pure name (e.g. 'அழகன்')" : "Search by theme (e.g. 'nature')"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="tamil-text"
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '100%',
                    fontSize: isDesktop ? '1.05rem' : '0.9rem',
                    color: 'var(--text-dark)',
                    background: 'transparent',
                    fontWeight: '500',
                    padding: isDesktop ? '4px 0' : '0.2rem 0'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', opacity: 0.6 }}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* Name Specific Options: Moved outside to maintain consistent bar height */}
        {!isDesktop && searchType === 'name' && (
          <div className="predicate-row mobile-only" style={{
            display: 'flex',
            gap: '0.4rem',
            width: '100%',
            overflowX: 'auto',
            paddingBottom: '2px',
            marginTop: '-0.5rem',
            marginBottom: '1rem',
            scrollbarWidth: 'none'
          }}>
            {(['starts', 'contains', 'ends'] as const).map(pred => (
              <button
                key={pred}
                onClick={() => setSearchPredicate(pred)}
                className={`predicate-pill ${searchPredicate === pred ? 'active' : ''}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  border: '1px solid transparent',
                  background: searchPredicate === pred ? 'rgba(166, 124, 0, 0.1)' : 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  color: searchPredicate === pred ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {pred === 'starts' ? 'Starts with' : pred === 'contains' ? 'Contains' : 'Ends with'}
              </button>
            ))}
          </div>
        )}

        {isDesktop && searchType === 'name' && (
          <div className="predicate-row desktop-only" style={{
            display: 'flex',
            gap: '0.5rem',
            width: '100%',
            marginTop: '-1rem',
            marginBottom: '1.25rem'
          }}>
            {(['starts', 'contains', 'ends'] as const).map(pred => (
              <button
                key={pred}
                onClick={() => setSearchPredicate(pred)}
                className={`predicate-pill ${searchPredicate === pred ? 'active' : ''}`}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  border: '1.5px solid transparent',
                  background: searchPredicate === pred ? 'rgba(166, 124, 0, 0.1)' : 'transparent',
                  color: searchPredicate === pred ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {pred === 'starts' ? 'Starts with' : pred === 'contains' ? 'Contains' : 'Ends with'}
              </button>
            ))}
          </div>
        )}

        {/* Filters Group: Gender & Length (Row on Desktop, Hidden on Mobile unless drawer open) */}
        <div className={`filter-options-group ${!isDesktop && !isFiltersExpanded ? 'hide-mobile' : ''}`} style={{
          display: 'flex',
          flex: '1 1 100%',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          {/* Gender Toggle */}
          <div className="gender-toggle" style={{
            flex: 1,
            minWidth: '220px',
            display: 'flex',
            gap: '0.35rem',
            background: 'var(--card-bg)',
            padding: '6px',
            borderRadius: '16px',
            boxShadow: 'var(--card-shadow)',
            border: '1.5px solid rgba(166, 124, 0, 0.05)',
            alignItems: 'center'
          }}>
            {(['All', 'Boy', 'Girl'] as const).map(gender => (
              <button
                key={gender}
                onClick={() => setGenderFilter(gender)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: genderFilter === gender
                    ? (gender === 'Girl' ? 'var(--ruby-gradient)' : gender === 'Boy' ? 'var(--sapphire-gradient)' : 'var(--gold-gradient)')
                    : 'transparent',
                  color: genderFilter === gender ? 'white' : 'var(--text-muted)',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease'
                }}
              >
                {gender}
              </button>
            ))}
          </div>

          {/* Length Toggle */}
          <div className="length-toggle" style={{
            flex: 1.2,
            minWidth: '280px',
            display: 'flex',
            gap: '0.25rem',
            background: 'var(--card-bg)',
            padding: '6px',
            borderRadius: '16px',
            boxShadow: 'var(--card-shadow)',
            border: '1.5px solid rgba(166, 124, 0, 0.05)',
            alignItems: 'center'
          }}>
            {(['All', 'Short', 'Medium', 'Long'] as const).map(len => (
              <button
                key={len}
                onClick={() => setLengthFilter(len)}
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: '10px',
                  border: 'none',
                  background: lengthFilter === len ? 'rgba(166, 124, 0, 0.08)' : 'transparent',
                  color: lengthFilter === len ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: '800',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s'
                }}
              >
                {len}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Refine Archives Toggle Button (Visible only on Mobile) */}
      <button
        className="refine-toggle mobile-only"
        onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0.85rem 1.25rem',
          background: 'var(--card-bg)',
          borderRadius: '16px',
          border: '1.5px solid rgba(166, 124, 0, 0.1)',
          boxShadow: 'var(--card-shadow)',
          color: 'var(--primary)',
          fontWeight: '800',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '1rem',
          cursor: 'pointer'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Filter size={18} />
          <span>Refine Archives</span>
          {hasActiveFilters && (
            <span style={{
              width: '8px',
              height: '8px',
              background: 'var(--primary)',
              borderRadius: '50%',
              boxShadow: '0 0 8px var(--primary)'
            }}></span>
          )}
        </div>
        {isFiltersExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Alphabet Block (Visible on Desktop always, controlled by Drawer on mobile) */}
      <div className={`alphabet-section ${!isDesktop && !isFiltersExpanded ? 'hide-mobile' : ''}`} style={{ width: '100%', marginTop: '0.5rem' }}>
        <div className="scroller-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="text-sm font-bold scroller-label" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>
            Chronological Archive
          </span>
          <div className="lang-toggle-container" style={{
            display: 'flex',
            gap: '0.25rem',
            background: 'rgba(166, 124, 0, 0.05)',
            padding: '0.25rem',
            borderRadius: '10px',
            border: '1px solid rgba(166, 124, 0, 0.1)'
          }}>
            {(['en', 'ta'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => { setAlphabetLang(lang); setStartingLetter(null); }}
                style={{
                  background: alphabetLang === lang ? 'var(--gold-gradient)' : 'transparent',
                  color: alphabetLang === lang ? 'white' : 'var(--text-muted)',
                  border: 'none',
                  padding: '5px 14px',
                  borderRadius: '8px',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit'
                }}
              >
                {lang === 'en' ? 'EN' : 'TA'}
              </button>
            ))}
          </div>
        </div>

        <div className="alphabet-scroller-compact" style={{
          display: 'flex',
          gap: '0.6rem',
          overflowX: 'auto',
          padding: '0.2rem 0.2rem 1.25rem 0.2rem',
          scrollbarWidth: 'auto',
          msOverflowStyle: 'auto',
          width: '100%'
        }}>
          <button
            onClick={() => setStartingLetter(null)}
            className="alphabet-seal"
            style={{
              minWidth: '40px',
              height: '40px',
              borderRadius: '10px',
              border: startingLetter === null ? 'none' : '1.5px solid rgba(212, 175, 55, 0.1)',
              background: startingLetter === null ? 'var(--gold-gradient)' : 'var(--card-bg)',
              color: startingLetter === null ? 'white' : 'var(--text-dark)',
              fontWeight: '800',
              boxShadow: startingLetter === null ? '0 6px 16px rgba(184, 134, 11, 0.3)' : 'var(--card-shadow)',
              flexShrink: 0,
              textTransform: 'uppercase',
              fontSize: '0.7rem',
              transition: 'all 0.3s ease'
            }}
          >
            All
          </button>
          {activeAlphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setStartingLetter(letter)}
              className="alphabet-seal"
              style={{
                minWidth: '40px',
                height: '40px',
                borderRadius: '10px',
                background: startingLetter === letter ? 'var(--gold-gradient)' : 'var(--card-bg)',
                color: startingLetter === letter ? 'white' : 'var(--text-dark)',
                fontWeight: '800',
                fontSize: '0.9rem',
                boxShadow: startingLetter === letter ? '0 6px 16px rgba(184, 134, 11, 0.3)' : 'var(--card-shadow)',
                flexShrink: 0,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: startingLetter === letter ? 'none' : '1.5px solid rgba(212, 175, 55, 0.05)',
                fontFamily: alphabetLang === 'ta' ? 'var(--font-ta)' : 'var(--font-en)'
              }}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
