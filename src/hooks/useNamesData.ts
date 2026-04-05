import { useState, useEffect } from 'react';
import type { BabyName } from '../types';

export function useNamesData() {
  const [names, setNames] = useState<BabyName[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the 31,000+ JSON dataset
    fetch('/data/names.json')
      .then(res => res.json())
      .then(data => {
        setNames(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load names data:", err);
        setLoading(false);
      });
  }, []);

  return { names, loading };
}
