import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Compass,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import useCountryStore from "../store/useCountryStore";

const HeroSection = ({ featuredCountry }) => {
  const favorites = useCountryStore((state) => state.favorites);
  const toggleFavorite = useCountryStore(
    (state) => state.toggleFavorite
  );

  const country = featuredCountry || {
    name: "United States of America",
    nativeName: "United States",
    alpha2Code: "US",
    alpha3Code: "USA",
    capital: "Washington, D.C.",
    region: "Americas",
    subregion: "Northern America",
    population: 329484123,
    area: 9629091,
    flag: "🇺🇸",
    flags: {
      svg: "https://flagcdn.com/us.svg",
      png: "https://flagcdn.com/w320/us.png",
    },
  };

  const favorite = favorites.includes(country.alpha2Code);

  return (
    <header className="relative w-full min-h-[500px] mt-4 flex items-center justify-center overflow-hidden rounded-3xl border border-border-glass max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-safe py-10 sm:py-12">

      {/* Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">

        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full opacity-20 mix-blend-screen scale-105 blur-[2px]"
          style={{
            backgroundImage: `url(${
              country.flags?.png ||
              country.flags?.svg ||
              `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`
            })`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-bg-deep via-bg-deep/80 to-transparent" />

        <div className="absolute inset-0 bg-linear-to-r from-bg-deep via-bg-deep/60 to-transparent" />

        <div className="absolute top-10 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pt-6 sm:pt-8">

        {/* Country Info */}
        <div className="flex flex-col gap-3 w-full max-w-2xl min-w-0">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            <span className="font-label-mono text-[10px] sm:text-xs text-secondary tracking-widest uppercase border border-secondary/30 bg-secondary/10 px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(78,222,163,0.2)]">
              <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-secondary animate-pulse" />
              SPOTLIGHT COUNTRY
            </span>

            <span className="max-w-full truncate font-label-mono text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider bg-surface-variant/80 px-2.5 py-1 rounded-md border border-border-glass">
              {country.region} / {country.subregion}
            </span>
          </div>

          {/* Country Name */}
          <div className="flex items-start gap-3 sm:gap-4 mt-2 min-w-0">

            <span className="text-4xl sm:text-5xl md:text-6xl shrink-0">
              {country.flag}
            </span>

            <div className="min-w-0">
              <h1 className="font-display-lg text-3xl sm:text-4xl md:text-6xl text-on-surface font-extrabold tracking-tight leading-tight break-words">
                {country.name}
              </h1>

              {country.nativeName &&
                country.nativeName !== country.name && (
                  <h2 className="font-headline-md text-base sm:text-lg md:text-2xl text-text-muted font-normal italic mt-1 truncate">
                    "{country.nativeName}"
                  </h2>
                )}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-4 p-3 sm:p-4 rounded-2xl bg-card border border-card-border backdrop-blur-md">

            {/* Capital */}
            <div className="min-w-0">
              <span className="font-label-mono text-[9px] sm:text-[10px] text-text-muted uppercase block">
                CAPITAL
              </span>

              <span className="font-headline-md text-sm sm:text-base text-on-surface font-semibold flex items-center gap-1 min-w-0">
                <MapPin
                  size={14}
                  className="text-primary shrink-0"
                />

                <span className="truncate">
                  {country.capital || "N/A"}
                </span>
              </span>
            </div>

            {/* Population */}
            <div className="min-w-0">
              <span className="font-label-mono text-[9px] sm:text-[10px] text-text-muted uppercase block">
                POPULATION
              </span>

              <span className="font-headline-md text-sm sm:text-base text-on-surface font-semibold truncate block">
                {country.population
                  ? country.population.toLocaleString()
                  : "N/A"}
              </span>
            </div>

            {/* Area */}
            <div className="min-w-0">
              <span className="font-label-mono text-[9px] sm:text-[10px] text-text-muted uppercase block">
                LAND AREA
              </span>

              <span className="font-headline-md text-sm sm:text-base text-on-surface font-semibold truncate block">
                {country.area
                  ? `${country.area.toLocaleString()} km²`
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3">

          {/* Explore */}
          <Link
            to={`/country/${country.alpha2Code}`}
            className="w-full sm:w-auto bg-primary text-bg-deep font-semibold px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(173,198,255,0.3)] hover:scale-[1.02] sm:hover:scale-105"
          >
            <Compass size={18} />

            <span className="font-label-mono text-xs font-bold tracking-wider uppercase">
              Explore Profile
            </span>

            <ArrowUpRight size={16} />
          </Link>

          {/* Favorite */}
          <button
            type="button"
            onClick={() =>
              toggleFavorite(country.alpha2Code)
            }
            className={`w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-2xl border backdrop-blur-lg flex items-center justify-center gap-2.5 transition-all duration-300 ${
              favorite
                ? "bg-tertiary/20 border-tertiary text-tertiary shadow-[0_0_15px_rgba(239,184,200,0.3)]"
                : "bg-surface-glass border-border-glass text-on-surface hover:border-tertiary/50 hover:text-tertiary"
            }`}
          >
            <Heart
              size={18}
              className={favorite ? "fill-tertiary" : ""}
            />

            <span className="font-label-mono text-xs font-semibold">
              {favorite
                ? "Saved in Favorites"
                : "Add to Favorites"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;