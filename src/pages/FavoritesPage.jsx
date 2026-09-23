import React, { useMemo } from "react";
import { useAllCountriesQuery } from "../hooks/useCountryQueries";
import {
  getCountryByCode,
  useCountryStore,
} from "../store/useCountryStore";
import Card from "../components/Card";
import { Heart, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  // Zustand
  const favorites = useCountryStore((state) => state.favorites);

  // Country/server data
  const { data: allCountries = [] } = useAllCountriesQuery();

  const favoriteCountries = useMemo(
    () =>
      favorites
        .map((code) => getCountryByCode(allCountries, code))
        .filter(Boolean),
    [favorites, allCountries]
  );

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-margin-safe py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-label-mono text-[10px] sm:text-xs text-tertiary uppercase tracking-widest">
          <Heart size={14} className="fill-tertiary shrink-0" />
          SAVED BOOKMARKS
        </div>

        <h1 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-on-surface">
          Your Favorite Nations
        </h1>

        <p className="text-text-muted text-sm max-w-xl">
          Quick access to all bookmarked countries saved directly
          in your browser.
        </p>
      </div>

      {/* Favorites */}
      {favoriteCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {favoriteCountries.map((country) => (
            <Card
              key={
                country.alpha2Code ||
                country.alpha3Code
              }
              country={country}
            />
          ))}
        </div>
      ) : (
        <div className="w-full max-w-lg mx-auto text-center py-16 sm:py-24 px-5 sm:px-8 rounded-2xl sm:rounded-3xl border border-border-glass bg-card flex flex-col items-center gap-4">

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-tertiary/10 border border-tertiary/30 flex items-center justify-center text-tertiary shadow-[0_0_20px_rgba(239,184,200,0.2)]">
            <Heart size={28} className="sm:w-8 sm:h-8" />
          </div>

          <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
            No Favorites Saved Yet
          </h2>

          <p className="text-text-muted text-sm leading-relaxed max-w-md">
            Click the heart icon on any country card or country
            profile page to save nations to your custom favorites
            list.
          </p>

          <Link
            to="/explore"
            className="mt-2 w-full sm:w-auto px-5 sm:px-6 py-3 rounded-2xl bg-primary text-bg-deep font-bold font-label-mono text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Compass size={16} />
            EXPLORE COUNTRIES CATALOGUE
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;