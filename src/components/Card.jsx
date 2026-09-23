import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Users, ArrowRight } from "lucide-react";
import useCountryStore from "../store/useCountryStore";

function Card({ country }) {
  const favorites = useCountryStore((state) => state.favorites);
  const toggleFavorite = useCountryStore((state) => state.toggleFavorite);

  if (!country) return null;

  const favorite = favorites.includes(country.alpha2Code);

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  return (
    <div className="w-full min-w-0 bg-card border border-card-border backdrop-blur-lg backdrop-saturate-[180%] rounded-2xl p-4 sm:p-5 flex flex-col justify-between group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(173,198,255,0.12)] transition-all duration-300 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none" />

      <div className="min-w-0">

        {/* Flag */}
        <div className="relative mb-4 h-32 xs:h-36 sm:h-40 rounded-xl overflow-hidden bg-surface-variant border border-border-glass group-hover:border-primary/30 transition-all">

          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={
              country.flags?.png ||
              country.flags?.svg ||
              `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`
            }
            alt={`${country.name} flag`}
            loading="lazy"
            onError={(e) => {
              const alpha2 = country.alpha2Code?.toLowerCase();

              if (
                alpha2 &&
                !e.target.src.includes("flagcdn.com")
              ) {
                e.target.src = `https://flagcdn.com/w320/${alpha2}.png`;
              } else {
                e.target.style.display = "none";
              }
            }}
          />

          <div className="absolute inset-0 bg-linear-to-t from-bg-deep/90 via-transparent to-transparent" />

          {/* Region */}
          <span className="absolute top-2.5 left-2.5 max-w-[calc(100%-5rem)] truncate bg-bg-deep/80 backdrop-blur-md text-secondary border border-secondary/30 px-2 py-1 rounded-full text-[10px] sm:text-xs font-label-mono uppercase tracking-wider">
            {country.region}
          </span>

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(country.alpha2Code);
            }}
            aria-label={
              favorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className={`absolute top-2.5 right-2.5 shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${
              favorite
                ? "bg-tertiary/20 border-tertiary text-tertiary shadow-[0_0_12px_rgba(239,184,200,0.4)]"
                : "bg-bg-deep/60 border-border-glass text-on-surface-variant hover:text-tertiary hover:bg-bg-deep"
            }`}
          >
            <Heart
              size={16}
              className={favorite ? "fill-tertiary" : ""}
            />
          </button>

          {/* Codes */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-lg shrink-0">
                {country.flag}
              </span>

              <span className="font-label-mono text-[10px] sm:text-xs text-on-surface-variant bg-surface-variant/80 px-1.5 py-0.5 rounded border border-border-glass">
                {country.alpha3Code}
              </span>
            </div>

            <span className="font-label-mono text-[10px] sm:text-xs text-text-muted shrink-0">
              {country.alpha2Code}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 mb-4 min-w-0">

          <h3 className="font-headline-md text-lg sm:text-xl text-on-surface font-semibold group-hover:text-primary transition-colors truncate">
            {country.name}
          </h3>

          <p className="font-body-base text-xs text-text-muted italic truncate">
            {country.nativeName !== country.name
              ? country.nativeName
              : country.demonym
              ? `${country.demonym} Nation`
              : ""}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border-glass">

            {/* Capital */}
            <div className="min-w-0 flex flex-col">
              <span className="font-label-mono text-[9px] sm:text-[10px] text-text-muted uppercase flex items-center gap-1">
                <MapPin
                  size={10}
                  className="text-primary shrink-0"
                />
                Capital
              </span>

              <span className="font-body-base text-xs sm:text-sm text-on-surface font-medium truncate">
                {country.capital || "N/A"}
              </span>
            </div>

            {/* Population */}
            <div className="min-w-0 flex flex-col">
              <span className="font-label-mono text-[9px] sm:text-[10px] text-text-muted uppercase flex items-center gap-1">
                <Users
                  size={10}
                  className="text-secondary shrink-0"
                />
                Population
              </span>

              <span className="font-body-base text-xs sm:text-sm text-on-surface font-medium truncate">
                {formatNumber(country.population)}
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <Link
        to={`/country/${country.alpha2Code}`}
        className="w-full min-w-0 py-2.5 px-3 sm:px-4 rounded-xl border border-border-glass bg-surface-glass text-on-surface hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-between gap-2 font-label-mono text-[10px] sm:text-xs transition-all duration-300 mt-2 group/btn"
      >
        <span className="truncate">EXPLORE DETAILS</span>

        <ArrowRight
          size={14}
          className="shrink-0 group-hover/btn:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
}

export default Card;