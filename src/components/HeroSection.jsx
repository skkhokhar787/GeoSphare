import React from "react";
import { Link } from "react-router-dom";
import { Heart, Compass, MapPin, ArrowUpRight } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

const HeroSection = ({ featuredCountry }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
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
      png: "https://flagcdn.com/w320/us.png"
    }
  };

  const favorite = isFavorite(country.alpha2Code);

  return (
    <header className="relative w-full min-h-125 mt-4 flex items-center justify-center overflow-hidden rounded-3xl border border-border-glass max-w-container-max mx-auto px-margin-safe py-12">
      {/* Background Graphic & Glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full opacity-20 mix-blend-screen scale-105 filter blur-[2px]"
          style={{
            backgroundImage: `url(${
              country.flags?.png ||
              country.flags?.svg ||
              `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`
            })`,
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-bg-deep via-bg-deep/80 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-r from-bg-deep via-bg-deep/60 to-transparent"></div>
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 pt-8">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="font-label-mono text-xs text-secondary tracking-widest uppercase border border-secondary/30 bg-secondary/10 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_12px_rgba(78,222,163,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              SPOTLIGHT COUNTRY
            </span>
            <span className="font-label-mono text-xs text-on-surface-variant uppercase tracking-wider bg-surface-variant/80 px-2.5 py-1 rounded-md border border-border-glass">
              {country.region} / {country.subregion}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-5xl md:text-6xl">{country.flag}</span>
            <div>
              <h1 className="font-display-lg text-4xl md:text-6xl text-on-surface font-extrabold tracking-tight leading-tight">
                {country.name}
              </h1>
              {country.nativeName && country.nativeName !== country.name && (
                <h2 className="font-headline-md text-lg md:text-2xl text-text-muted font-normal italic mt-1">
                  "{country.nativeName}"
                </h2>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 p-4 rounded-2xl bg-card border border-card-border backdrop-blur-md">
            <div>
              <span className="font-label-mono text-[10px] text-text-muted uppercase block">CAPITAL</span>
              <span className="font-headline-md text-base text-on-surface font-semibold flex items-center gap-1">
                <MapPin size={14} className="text-primary" /> {country.capital}
              </span>
            </div>
            <div>
              <span className="font-label-mono text-[10px] text-text-muted uppercase block">POPULATION</span>
              <span className="font-headline-md text-base text-on-surface font-semibold">
                {country.population ? country.population.toLocaleString() : "N/A"}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="font-label-mono text-[10px] text-text-muted uppercase block">LAND AREA</span>
              <span className="font-headline-md text-base text-on-surface font-semibold">
                {country.area ? `${country.area.toLocaleString()} km²` : "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/country/${country.alpha2Code}`}
            className="bg-primary text-bg-deep font-semibold px-6 py-3.5 rounded-2xl flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(173,198,255,0.3)] hover:scale-105"
          >
            <Compass size={18} />
            <span className="font-label-mono text-xs font-bold tracking-wider uppercase">Explore Profile</span>
            <ArrowUpRight size={16} />
          </Link>

          <button
            onClick={() => toggleFavorite(country.alpha2Code)}
            className={`px-5 py-3.5 rounded-2xl border backdrop-blur-lg flex items-center gap-2.5 transition-all duration-300 ${
              favorite
                ? "bg-tertiary/20 border-tertiary text-tertiary shadow-[0_0_15px_rgba(239,184,200,0.3)]"
                : "bg-surface-glass border-border-glass text-on-surface hover:border-tertiary/50 hover:text-tertiary"
            }`}
          >
            <Heart size={18} className={favorite ? "fill-tertiary" : ""} />
            <span className="font-label-mono text-xs font-semibold">
              {favorite ? "Saved in Favorites" : "Add to Favorites"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
