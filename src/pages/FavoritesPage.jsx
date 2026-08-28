import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useCountries } from '../hooks/useCountries';
import Card from '../components/Card';
import { Heart, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const { getCountryByCode } = useCountries();

  const favoriteCountries = favorites
    .map((code) => getCountryByCode(code))
    .filter(Boolean);

  return (
    <div className="max-w-container-max mx-auto px-margin-safe py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-label-mono text-xs text-tertiary uppercase tracking-widest">
          <Heart size={14} className="fill-tertiary" /> SAVED BOOKMARKS
        </div>
        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface">Your Favorite Nations</h1>
        <p className="text-text-muted text-sm max-w-xl">
          Quick access to all bookmarked countries saved directly in your browser.
        </p>
      </div>

      {/* Grid or Empty state */}
      {favoriteCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {favoriteCountries.map((country) => (
            <Card key={country.alpha2Code || country.alpha3Code} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 p-8 rounded-3xl border border-border-glass bg-card max-w-lg mx-auto flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary shadow-[0_0_20px_rgba(239,184,200,0.2)]">
            <Heart size={32} />
          </div>
          <h2 className="font-headline-md text-2xl font-bold text-on-surface">No Favorites Saved Yet</h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Click the heart icon on any country card or country profile page to save nations to your custom favorites list.
          </p>
          <Link
            to="/explore"
            className="mt-2 px-6 py-3 rounded-2xl bg-primary text-bg-deep font-bold font-label-mono text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Compass size={16} /> EXPLORE COUNTRIES CATALOGUE
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
