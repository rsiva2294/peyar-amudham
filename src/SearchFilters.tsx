import { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchType: 'name' | 'tag' | 'magic';
  setSearchType: (type: 'name' | 'tag' | 'magic') => void;
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
  searchQuery, setSearchQuery, searchType, setSearchType, genderFilter, setGenderFilter,
  startingLetter, setStartingLetter, lengthFilter, setLengthFilter, onSurpriseMe, isGenerating, onMagicSearch
}) => {
  const [alphabetLang, setAlphabetLang] = useState<'en' | 'ta'>('en');

  const ENGLISH_ALPHABET = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const TAMIL_ALPHABET = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஒள', 'க', 'ச', 'ஞ', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ'];
  const activeAlphabet = alphabetLang === 'en' ? ENGLISH_ALPHABET : TAMIL_ALPHABET;

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Search Type & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: 'rgba(212, 175, 55, 0.05)',
          padding: '0.35rem',
          borderRadius: '20px',
          border: '1.5px solid rgba(212, 175, 55, 0.1)'
        }}>
          {(['name', 'tag', 'magic'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setSearchType(type);
                setSearchQuery('');
              }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '16px',
                border: 'none',
                background: searchType === type ? 'var(--gold-gradient)' : 'transparent',
                color: searchType === type ? 'white' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                boxShadow: searchType === type ? '0 4px 12px rgba(184, 134, 11, 0.3)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {type === 'magic' ? '✨ Magic' : type === 'name' ? 'Name' : 'Terms'}
            </button>
          ))}
        </div>

        <button
          onClick={onSurpriseMe}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3), 0 8px 15px rgba(133, 101, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(133, 101, 0, 0.1)';
          }}
        >
          <Sparkles size={18} />
          Surprise Me
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        {/* Search Input Area */}
        <div style={{
          flex: '1',
          minWidth: '280px',
          background: 'var(--card-bg)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          padding: searchType === 'magic' ? '0.4rem' : '0.75rem 1.25rem',
          boxShadow: 'var(--card-shadow)',
          border: `1.5px solid ${searchType === 'magic' ? 'var(--primary)' : 'rgba(166, 124, 0, 0.1)'}`,
          transition: 'all 0.3s ease'
        }}>
          {searchType === 'magic' ? (
            <div style={{ padding: '0.75rem 1rem' }}>
              <textarea
                placeholder="Describe the vibe... (e.g. 'A beautiful flower that blooms at night')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                rows={2}
                className="tamil-text"
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '1.1rem',
                  color: 'var(--text-dark)',
                  background: 'transparent',
                  resize: 'none',
                  opacity: 0.9,
                  fontWeight: '500'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  onClick={() => onMagicSearch?.(searchQuery)}
                  disabled={isGenerating || !searchQuery.trim()}
                  style={{
                    background: isGenerating ? 'var(--text-muted)' : 'var(--gold-gradient)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    cursor: isGenerating || !searchQuery.trim() ? 'not-allowed' : 'pointer',
                    boxShadow: !isGenerating && searchQuery.trim() ? '0 4px 12px rgba(133, 101, 0, 0.2)' : 'none'
                  }}
                >
                  {isGenerating ? 'DIVINING...' : 'MAGIC SEARCH'}
                </button>
              </div>
            </div>
          ) : (
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
                  fontSize: '1.2rem',
                  color: 'var(--text-dark)',
                  background: 'transparent',
                  fontWeight: '500'
                }}
              />
            </div>
          )}
        </div>

        {/* Gender Filters */}
        <div style={{
          display: 'flex',
          gap: '0.35rem',
          background: 'var(--card-bg)',
          padding: '0.35rem',
          borderRadius: '16px',
          boxShadow: 'var(--card-shadow)',
          border: '1.5px solid rgba(166, 124, 0, 0.05)'
        }}>
          {(['All', 'Boy', 'Girl'] as const).map(gender => (
            <button
              key={gender}
              onClick={() => setGenderFilter(gender)}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: genderFilter === gender
                  ? (gender === 'Girl' ? 'var(--ruby-gradient)' : gender === 'Boy' ? 'var(--sapphire-gradient)' : 'var(--gold-gradient)')
                  : 'transparent',
                color: genderFilter === gender ? 'white' : 'var(--text-muted)',
                fontWeight: '800',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
                minWidth: '70px',
                boxShadow: genderFilter === gender ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'
              }}
            >
              {gender}
            </button>
          ))}
        </div>

        {/* Length Filters */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          background: 'var(--card-bg)',
          padding: '0.35rem',
          borderRadius: '16px',
          boxShadow: 'var(--card-shadow)',
          border: '1.5px solid rgba(166, 124, 0, 0.05)'
        }}>
          {(['All', 'Short', 'Medium', 'Long'] as const).map(len => (
            <button
              key={len}
              onClick={() => setLengthFilter(len)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: lengthFilter === len ? 'rgba(166, 124, 0, 0.08)' : 'transparent',
                color: lengthFilter === len ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.2s'
              }}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet Scroller */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="text-sm font-bold" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>
            Chronological Archive
          </span>
          <div style={{
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
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease'
                }}
              >
                {lang === 'en' ? 'English' : 'தமிழ்'}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          overflowX: 'auto',
          padding: '0.6rem 0.2rem 1.2rem 0.2rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <button
            onClick={() => setStartingLetter(null)}
            style={{
              minWidth: '46px',
              height: '46px',
              borderRadius: '12px',
              border: startingLetter === null ? 'none' : '1.5px solid rgba(212, 175, 55, 0.1)',
              background: startingLetter === null ? 'var(--gold-gradient)' : 'var(--card-bg)',
              color: startingLetter === null ? 'white' : 'var(--text-dark)',
              fontWeight: '800',
              boxShadow: startingLetter === null ? '0 6px 16px rgba(184, 134, 11, 0.3)' : 'var(--card-shadow)',
              flexShrink: 0,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              transition: 'all 0.3s ease'
            }}
          >
            All
          </button>
          {activeAlphabet.map(letter => (
            <button
              key={letter}
              onClick={() => setStartingLetter(letter)}
              style={{
                minWidth: '46px',
                height: '46px',
                borderRadius: '12px',
                background: startingLetter === letter ? 'var(--gold-gradient)' : 'var(--card-bg)',
                color: startingLetter === letter ? 'white' : 'var(--text-dark)',
                fontWeight: '800',
                fontSize: '1rem',
                boxShadow: startingLetter === letter ? '0 6px 16px rgba(184, 134, 11, 0.3)' : 'var(--card-shadow)',
                flexShrink: 0,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: startingLetter === letter ? 'none' : '1.5px solid rgba(212, 175, 55, 0.05)',
                fontFamily: alphabetLang === 'ta' ? 'var(--font-ta)' : 'var(--font-en)'
              }}
              onMouseEnter={(e) => {
                if (startingLetter !== letter) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (startingLetter !== letter) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.05)';
                }
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
