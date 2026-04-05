import { useState, useEffect } from 'react';
import { Header } from './Header';
import { SearchFilters } from './SearchFilters';
import { NameCard } from './NameCard';
import { SurpriseModal } from './SurpriseModal';
import { ContributeModal } from './ContributeModal';
import { useNamesData } from './hooks/useNamesData';
import { useFavorites } from './hooks/useFavorites';
import { useNameFilters } from './hooks/useNameFilters';
import { fetchMagicKeywords } from './services/gemini';
import type { BabyName } from './types';

function App() {
  // 1. Core Data & Persistence
  const { names, loading } = useNamesData();
  const { favorites, toggleFavorite } = useFavorites();

  // 2. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'tag' | 'magic'>('name');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Boy' | 'Girl'>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [startingLetter, setStartingLetter] = useState<string | null>(null);
  const [lengthFilter, setLengthFilter] = useState<'All' | 'Short' | 'Medium' | 'Long'>('All');
  
  // 3. AI, Surprise & Contribute State
  const [aiKeywords, setAiKeywords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [surpriseName, setSurpriseName] = useState<BabyName | null>(null);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);

  // 4. Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  // 5. Filtering Logic (Extracted Hook)
  const filteredNames = useNameFilters(names, {
    searchQuery,
    searchType,
    genderFilter,
    startingLetter,
    lengthFilter,
    aiKeywords,
    showFavoritesOnly,
    favorites
  });

  // 6. Effects
  useEffect(() => {
    setPage(1);
  }, [searchQuery, searchType, genderFilter, startingLetter, lengthFilter, showFavoritesOnly]);

  // 7. Handlers
  const handleMagicSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsGenerating(true);
    try {
      const keywords = await fetchMagicKeywords(query);
      setAiKeywords(keywords);
      setPage(1);
    } catch (error: any) {
      console.error("Magic Search Error:", error);
      alert(error.message || 'Failed to generate results.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSurpriseMe = () => {
    if (filteredNames.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredNames.length);
    setSurpriseName(filteredNames[randomIndex]);
    setIsSurpriseOpen(true);
  };

  const paginatedNames = filteredNames.slice(0, page * itemsPerPage);
  const hasMore = paginatedNames.length < filteredNames.length;

  return (
    <div style={{ paddingBottom: '4rem', background: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="container">
        <Header 
          showFavoritesOnly={showFavoritesOnly} 
          onToggleFavorites={() => {
            setShowFavoritesOnly(!showFavoritesOnly);
            setPage(1);
          }} 
          onOpenContribute={() => setIsContributeOpen(true)}
        />
        
        {/* Subtle Tagline */}
        <div style={{ marginTop: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.9rem' }}>
            A curated archive of 30k+ pure classical Tamil names.
          </p>
        </div>

        <SearchFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchType={searchType}
          setSearchType={setSearchType}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          startingLetter={startingLetter}
          setStartingLetter={setStartingLetter}
          lengthFilter={lengthFilter}
          setLengthFilter={setLengthFilter}
          onSurpriseMe={handleSurpriseMe}
          isGenerating={isGenerating}
          onMagicSearch={handleMagicSearch}
        />
        
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ height: '1px', flex: 1, background: 'rgba(212, 175, 55, 0.1)' }}></div>
          <span className="text-xs font-bold" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            {filteredNames.length.toLocaleString()} ARTIFACTS FOUND
          </span>
          <div style={{ height: '1px', flex: 1, background: 'rgba(212, 175, 55, 0.1)' }}></div>
        </div>
      </div>

      {loading ? (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
          <div style={{ color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', animation: 'pulse 2s infinite' }}>
            Consulting the Archives...
          </div>
        </div>
      ) : filteredNames.length === 0 ? (
        <div className="container" style={{ textAlign: 'center', padding: '6rem', color: 'var(--text-muted)' }}>
          <p className="text-lg font-bold" style={{ opacity: 0.5 }}>No results match these criteria.</p>
        </div>
      ) : (
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
            gap: '1rem' 
          }}>
            {paginatedNames.map(name => (
              <NameCard 
                key={name.id}
                data={name} 
                isFavorite={favorites.has(name.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {hasMore && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
              <button 
                onClick={() => setPage(p => p + 1)}
                style={{
                  padding: '1rem 3rem',
                  background: 'var(--card-bg)',
                  border: '1.5px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '16px',
                  color: 'var(--primary)',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.85rem',
                  boxShadow: 'var(--card-shadow)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--card-hover-shadow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              >
                Reveal More
              </button>
            </div>
          )}
        </div>
      )}

      <footer style={{ 
        marginTop: '8rem', 
        textAlign: 'center', 
        color: 'var(--text-muted)', 
        fontSize: '0.8rem',
        borderTop: '1px solid rgba(166, 124, 0, 0.1)',
        padding: '5rem 1.5rem',
        background: 'rgba(166, 124, 0, 0.02)'
      }}>
        <div style={{ marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '0.15em', opacity: 0.6, fontSize: '0.85rem' }}>
          ஆராய்க (EXPLORE) • 30k+ தொல்பொருட்கள் (ARTIFACTS) • மரபு வழி (TRADITION FIRST)
        </div>
        <p style={{ maxWidth: '700px', margin: '0.5rem auto', lineHeight: '1.8', fontWeight: '500' }}>
          Our dataset is professionally curated and cross-verified with the official **Tamil Virtual Academy (TVA)** public archives. 
          Each entry has been meticulously translated, tagged, and digitized to provide a contemporary discovery experience for pure Tamil heritage.
        </p>
        <p style={{ maxWidth: '650px', margin: '1.5rem auto', fontSize: '0.75rem', opacity: 0.5, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.6' }}>
          Peyar Amudham is an independent cultural initiative. This project is dedicated to language preservation and is not officially affiliated with the Government of Tamil Nadu.
        </p>
        <p style={{ marginTop: '2.5rem', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.15em', opacity: 0.8, textTransform: 'uppercase' }}>
          Developed by <a href="https://in.linkedin.com/in/sivakaminathan-muthusamy" target="_blank" rel="noopener noreferrer" style={{ 
            color: 'inherit', 
            textDecoration: 'none',
            background: 'var(--gold-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            borderBottom: '1px solid rgba(166, 124, 0, 0.4)'
          }}>Sivakaminathan Muthusamy</a>
        </p>
      </footer>

      {surpriseName && (
        <SurpriseModal 
          isOpen={isSurpriseOpen}
          onClose={() => setIsSurpriseOpen(false)}
          name={surpriseName}
          isFavorite={favorites.has(surpriseName.id)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      <ContributeModal 
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
      />
    </div>
  );
}

export default App;
