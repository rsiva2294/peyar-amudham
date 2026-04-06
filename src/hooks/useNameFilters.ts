import { useMemo } from 'react';
import type { BabyName } from '../types';

export interface FilterOptions {
  searchQuery: string;
  searchType: 'name' | 'tag' | 'magic';
  searchPredicate: 'starts' | 'contains' | 'ends';
  genderFilter: 'All' | 'Boy' | 'Girl';
  startingLetter: string | null;
  lengthFilter: 'All' | 'Short' | 'Medium' | 'Long';
  aiKeywords: string[];
  showFavoritesOnly: boolean;
  favorites: Set<number>;
}

export function useNameFilters(names: BabyName[], options: FilterOptions) {
  const {
    searchQuery,
    searchType,
    searchPredicate,
    genderFilter,
    startingLetter,
    lengthFilter,
    aiKeywords,
    showFavoritesOnly,
    favorites
  } = options;

  return useMemo(() => {
    let result = names.filter(name => {
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

    if (searchType === 'magic' && aiKeywords.length > 0) {
      const scoredNames = result.map(name => {
        let score = 0;
        const meaningEng = (name.meaning_english || '').toLowerCase();
        const tagsStr = name.tags?.join(' ').toLowerCase() || '';
        for (const kw of aiKeywords) {
           if (meaningEng.includes(kw) || tagsStr.includes(kw)) score++;
        }
        return { name, score };
      });
      result = scoredNames
          .filter(sn => sn.score > 0)
          .sort((a, b) => b.score - a.score)
          .map(sn => sn.name);
    }

    return result;
  }, [names, searchQuery, searchType, searchPredicate, genderFilter, startingLetter, lengthFilter, aiKeywords, showFavoritesOnly, favorites]);
}
