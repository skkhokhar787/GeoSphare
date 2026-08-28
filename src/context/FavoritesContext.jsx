import React, { useState, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContextObject';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('geosphere_favorites');
      return saved ? JSON.parse(saved) : ['US', 'JP', 'BR'];
    } catch {
      return ['US', 'JP', 'BR'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('geosphere_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (code) => {
    if (!code) return;
    const upper = code.toUpperCase();
    setFavorites((prev) =>
      prev.includes(upper) ? prev.filter((c) => c !== upper) : [...prev, upper]
    );
  };

  const isFavorite = (code) => {
    if (!code) return false;
    return favorites.includes(code.toUpperCase());
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

