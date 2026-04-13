import { useState, useEffect } from 'react';
import { Header } from './Header';
import { SearchFilters } from './SearchFilters';
import { NameCard } from './NameCard';
import { SurpriseModal } from './SurpriseModal';
import { ContributeModal } from './ContributeModal';
import { ShareModal } from './ShareModal';
import { SEO } from './components/SEO';
import { UpdateToast } from './components/UpdateToast';
import { useFavorites } from './hooks/useFavorites';
import { useNamesManager } from './hooks/useNamesManager';
import { fetchMagicKeywords } from './services/gemini';
import type { BabyName } from './types';

function App() {
  // 1. Core State
  const { favorites, toggleFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'tag' | 'magic'>('name');
  const [searchPredicate, setSearchPredicate] = useState<'starts' | 'contains' | 'ends'>('starts');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Boy' | 'Girl'>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [startingLetter, setStartingLetter] = useState<string | null>(null);
  const [lengthFilter, setLengthFilter] = useState<'All' | 'Short' | 'Medium' | 'Long'>('All');
  
  const [aiKeywords, setAiKeywords] = useState<string[]>([]);
  const [aiTamilRoots, setAiTamilRoots] = useState<string[]>([]);
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [surpriseName, setSurpriseName] = useState<BabyName | null>(null);
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [sharedName, setSharedName] = useState<BabyName | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 24;

  // 2. High Performance Filter Management (Web Worker backed)
  const { filteredNames, loading } = useNamesManager({
    searchQuery,
    searchType,
    searchPredicate,
    genderFilter,
    startingLetter,
    lengthFilter,
    aiKeywords,
    aiTamilRoots,
    showFavoritesOnly,
    favorites
  });

  // 3. Effects
  useEffect(() => {
    setPage(1);
    if (searchType !== 'magic' || !searchQuery.trim()) {
      setAiKeywords([]);
      setAiTamilRoots([]);
      setAiNote(null);
    }
  }, [searchQuery, searchType, searchPredicate, genderFilter, startingLetter, lengthFilter, showFavoritesOnly]);

  // Handle Deep Linking (?name=EnglishName)
  useEffect(() => {
    if (loading || filteredNames.length === 0) return;
    
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get('name');
    
    if (nameParam) {
      const decodedName = decodeURIComponent(nameParam);
      const foundName = filteredNames.find((n: BabyName) => n.name_english.toLowerCase() === decodedName.toLowerCase());
      if (foundName) {
        setSharedName(foundName);
        setIsShareOpen(true);
      }
    }
  }, [loading, filteredNames]);

  // 7. Handlers
  const handleMagicSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsGenerating(true);
    try {
      const response = await fetchMagicKeywords(query);
      setAiKeywords(response.keywords);
      setAiTamilRoots(response.tamilRoots);
      setAiNote(response.culturalNote);
      setPage(1);
    } catch (error: unknown) {
      console.error("Magic Search Error:", error);
      const message = error instanceof Error ? error.message : 'Failed to generate results.';
      alert(message);
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

  const handleShare = (name: BabyName) => {
    setSharedName(name);
    setIsShareOpen(true);
  };

  const paginatedNames = filteredNames.slice(0, page * itemsPerPage);
  const hasMore = paginatedNames.length < filteredNames.length;

  return (
    <div style={{ paddingBottom: '4rem', background: 'var(--bg-color)', minHeight: '100vh' }}>
      <SEO name={sharedName} />
      <UpdateToast />
      <div className="container">
        <Header 
          showFavoritesOnly={showFavoritesOnly} 
          onToggleFavorites={() => {
            setShowFavoritesOnly(!showFavoritesOnly);
            setPage(1);
          }} 
          onOpenContribute={() => setIsContributeOpen(true)}
        />
        
        <SearchFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchType={searchType}
          setSearchType={setSearchType}
          searchPredicate={searchPredicate}
          setSearchPredicate={setSearchPredicate}
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

        {aiNote && searchType === 'magic' && filteredNames.length > 0 && (
          <div className="scholar-note-container" style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'var(--gold-gradient)',
            borderRadius: '20px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(184, 134, 11, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            animation: 'modal-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: '1.5rem' }}>🏺</span>
            </div>
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: '800', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.25rem', opacity: 0.8 }}>Scholar's Discovery Note</p>
              <p style={{ fontSize: '0.95rem', fontWeight: '500', lineHeight: '1.5' }}>{aiNote}</p>
            </div>
          </div>
        )}
        
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
            gap: '1rem' 
          }}>
            {paginatedNames.map((name: BabyName) => (
              <NameCard 
                key={name.id}
                data={name} 
                isFavorite={favorites.has(name.id)}
                onToggleFavorite={toggleFavorite}
                onShare={handleShare}
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
        <div style={{ marginBottom: '1rem', fontWeight: '800', letterSpacing: '0.15em', opacity: 0.7, fontSize: '0.85rem' }}>
          ஆராய்க (EXPLORE) • 31k+ தொல்பொருட்கள் (ARTIFACTS)
        </div>
        <p style={{ maxWidth: '600px', margin: '0 auto 1.25rem', lineHeight: '1.6', fontWeight: '500' }}>
          Heritage archives cross-verified with the **Tamil Virtual Academy (TVA)**. 
          Digitally preserved for the pure Tamil community.
        </p>
        <p style={{ fontSize: '0.7rem', opacity: 0.4, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Independent initiative • Not affiliated with the Govt. of Tamil Nadu • <a href="/privacy.html" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
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
          onShare={handleShare}
        />
      )}

      <ContributeModal 
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
      />

      {sharedName && (
        <ShareModal 
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          name={sharedName}
        />
      )}
    </div>
  );
}

export default App;
