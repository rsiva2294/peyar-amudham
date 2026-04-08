import { useState, useEffect, useRef } from 'react';
import type { BabyName } from '../types';

export interface FilterOptions {
  searchQuery: string;
  searchType: 'name' | 'tag' | 'magic';
  searchPredicate: 'starts' | 'contains' | 'ends';
  genderFilter: 'All' | 'Boy' | 'Girl';
  startingLetter: string | null;
  lengthFilter: 'All' | 'Short' | 'Medium' | 'Long';
  aiKeywords: string[];
  aiTamilRoots?: string[];
  showFavoritesOnly: boolean;
  favorites: Set<number>;
}

// Vite worker import
import NamesWorker from '../workers/names.worker?worker';

export function useNamesManager(options: FilterOptions) {
  const [filteredNames, setFilteredNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  
  const workerRef = useRef<Worker | null>(null);

  // Initialize Worker
  useEffect(() => {
    const worker = new NamesWorker();
    workerRef.current = worker;

    worker.onmessage = (e: MessageEvent) => {
      const { type, results, count, message } = e.data;
      
      switch (type) {
        case 'DATA_LOADED':
          setTotalCount(count);
          setLoading(false);
          break;
        case 'FILTER_RESULTS':
          setFilteredNames(results);
          setLoading(false);
          break;
        case 'ERROR':
          console.error("Worker Error:", message);
          setLoading(false);
          break;
      }
    };

    worker.postMessage({ type: 'INIT' });

    return () => {
      worker.terminate();
    };
  }, []);

  // Handle Filtering (Debounced)
  const debounceTimer = useRef<number | null>(null);

  // Skip Magic Search keystrokes
  const prevAiState = useRef({ 
    keywords: JSON.stringify(options.aiKeywords), 
    roots: JSON.stringify(options.aiTamilRoots),
    type: options.searchType
  });

  const {
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
  } = options;

  useEffect(() => {
    if (!workerRef.current) return;

    // Detect what changed
    const aiKeywordsChanged = JSON.stringify(aiKeywords) !== prevAiState.current.keywords;
    const aiTamilRootsChanged = JSON.stringify(aiTamilRoots) !== prevAiState.current.roots;
    const typeChanged = searchType !== prevAiState.current.type;

    // If we're in magic mode and only the query changed, skip everything
    if (searchType === 'magic' && !aiKeywordsChanged && !aiTamilRootsChanged && !typeChanged) {
      return;
    }

    // Update refs for next run
    prevAiState.current = {
      keywords: JSON.stringify(aiKeywords),
      roots: JSON.stringify(aiTamilRoots),
      type: searchType
    };

    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }

    // Identify if any options that should trigger a filter have changed
    const triggerOptions = {
      searchQuery: searchType === 'magic' ? '' : searchQuery,
      searchType,
      searchPredicate,
      genderFilter,
      startingLetter,
      lengthFilter,
      aiKeywords,
      aiTamilRoots,
      showFavoritesOnly,
      favorites
    };

    // Immediately show loading for magic search, debounce others
    const delay = (searchType === 'name' || searchType === 'tag') ? 300 : 0;

    debounceTimer.current = window.setTimeout(() => {
      setLoading(true);
      workerRef.current?.postMessage({
        type: 'FILTER',
        payload: {
          ...triggerOptions,
          favorites: Array.from(favorites)
        }
      });
    }, delay);

    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, [
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
  ]);

  return { filteredNames, loading, totalCount };
}
