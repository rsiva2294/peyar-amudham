import type { BabyName } from '../types';

/**
 * PEYAR AMUDHAM - High Performance Web Worker
 * Handles 18MB JSON fetching, IndexedDB caching, and complex filtering.
 */

// Simple IndexedDB wrapper for the worker
const DB_NAME = 'peyar_amudham_db';
const STORE_NAME = 'names_store';
const DB_VERSION = 1;

interface FilterOptions {
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

let cachedNames: BabyName[] = [];

async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveToDB(names: BabyName[]) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(names, 'all_names');
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}

async function loadFromDB(): Promise<BabyName[] | null> {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get('all_names');
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
}

let pendingFilterOptions: FilterOptions | null = null;

async function fetchAndCacheNames() {
  try {
    const response = await fetch('/data/names.json');
    const names = await response.json();
    cachedNames = names;
    await saveToDB(names);
    
    // Auto-run pending filter if it exists
    if (pendingFilterOptions) {
      const results = filterNames(pendingFilterOptions);
      self.postMessage({ type: 'FILTER_RESULTS', results });
      pendingFilterOptions = null;
    }
    
    self.postMessage({ type: 'DATA_LOADED', count: names.length, fromCache: false });
  } catch (error) {
    self.postMessage({ type: 'ERROR', message: 'Failed to fetch names' });
  }
}

function filterNames(options: FilterOptions): BabyName[] {
  const {
    searchQuery,
    searchType,
    searchPredicate,
    genderFilter,
    startingLetter,
    lengthFilter,
    aiKeywords,
    aiTamilRoots = [],
    showFavoritesOnly,
    favorites
  } = options;

  let result = cachedNames.filter(name => {
    // 1. Filter by Gender
    if (genderFilter !== 'All' && name.gender?.toLowerCase() !== genderFilter.toLowerCase()) {
      return false;
    }

    // 1b. Filter by Favorites
    if (showFavoritesOnly && !favorites.has(name.id)) {
      return false;
    }

    // 2. Filter by Alphabet
    if (startingLetter) {
      if (/^[A-Z]$/.test(startingLetter)) {
        if (!name.name_english || !name.name_english.toUpperCase().startsWith(startingLetter)) {
          return false;
        }
      } else {
        if (!name.name_tamil || !name.name_tamil.startsWith(startingLetter)) {
          return false;
        }
      }
    }

    // 3. Filter by Length
    if (lengthFilter !== 'All') {
      const len = name.length;
      if (lengthFilter === 'Short' && len > 5) return false;
      if (lengthFilter === 'Medium' && (len < 6 || len > 8)) return false;
      if (lengthFilter === 'Long' && len < 9) return false;
    }
    
    // 4. Filter by Search Query
    if (searchType === 'magic') return true;
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase().trim();
    if (searchType === 'name') {
      if (searchPredicate === 'starts') {
        return (
          (name.name_english?.toLowerCase().startsWith(query) ?? false) || 
          (name.name_tamil?.startsWith(query) ?? false)
        );
      } else if (searchPredicate === 'ends') {
        return (
          (name.name_english?.toLowerCase().endsWith(query) ?? false) || 
          (name.name_tamil?.endsWith(query) ?? false)
        );
      } else {
        return (
          (name.name_english?.toLowerCase().includes(query) ?? false) || 
          (name.name_tamil?.includes(query) ?? false)
        );
      }
    } else {
      return name.tags?.some(tag => tag.toLowerCase().includes(query)) ?? false;
    }
  });

  // AI Semantic Scorer
  if (searchType === 'magic' && (aiKeywords.length > 0 || aiTamilRoots.length > 0)) {
    const scoredNames = result.map(name => {
      let score = 0;
      const meaningEng = (name.meaning_english || '').toLowerCase();
      const tagsStr = name.tags?.join(' ').toLowerCase() || '';
      const nameTa = name.name_tamil || '';

      for (const root of aiTamilRoots) {
        if (nameTa.includes(root)) score += 5;
      }
      for (const kw of aiKeywords) {
         if (meaningEng.includes(kw) || tagsStr.includes(kw)) score += 1;
      }
      return { name, score };
    });
    result = scoredNames
        .filter(sn => sn.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(sn => sn.name);
  }

  return result;
}

self.onmessage = async (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'INIT':
      const localData = await loadFromDB();
      if (localData) {
        cachedNames = localData;
        
        // Auto-run pending filter if it exists
        if (pendingFilterOptions) {
          const results = filterNames(pendingFilterOptions);
          self.postMessage({ type: 'FILTER_RESULTS', results });
          pendingFilterOptions = null;
        }

        self.postMessage({ type: 'DATA_LOADED', count: cachedNames.length, fromCache: true });
      } else {
        await fetchAndCacheNames();
      }
      break;

    case 'FILTER':
      if (cachedNames.length === 0) {
        pendingFilterOptions = payload; // Queue it
        self.postMessage({ type: 'FILTER_RESULTS', results: [] });
        return;
      }
      const filtered = filterNames(payload);
      self.postMessage({ type: 'FILTER_RESULTS', results: filtered });
      break;
  }
};
