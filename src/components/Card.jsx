import React from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Users, ArrowRight } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

function Card({ country }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!country) return null;

  const favorite = isFavorite(country.alpha2Code);

  const formatNumber = (num) => {
    return num ? num.toLocaleString() : "N/A";
  };

  return (
    <div className="bg-card border border-card-border backdrop-blur-lg backdrop-saturate-[180%] rounded-2xl p-5 flex flex-col justify-between group hover:border-primary/50 hover:shadow-[0_0_30px_rgba(173,198,255,0.12)] transition-all duration-300 relative overflow-hidden">
      {/* Glow highlight effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all pointer-events-none"></div>

      <div>
        {/* Header with Flag and Favorite button */}
        <div className="relative mb-4 h-40 rounded-xl overflow-hidden bg-surface-variant border border-border-glass group-hover:border-primary/30 transition-all">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={country.flags?.png || country.flags?.svg || `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`}
            alt={`${country.name} flag`}
            loading="lazy"
            onError={(e) => {
              const alpha2 = country.alpha2Code?.toLowerCase();
              if (alpha2 && !e.target.src.includes('flagcdn.com')) {
                e.target.src = `https://flagcdn.com/w320/${alpha2}.png`;
              } else {
                e.target.style.display = 'none';
              }
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-bg-deep/90 via-transparent to-transparent"></div>

          {/* Region Badge */}
          <span className="absolute top-3 left-3 bg-bg-deep/80 backdrop-blur-md text-secondary border border-secondary/30 px-2.5 py-1 rounded-full text-xs font-label-mono uppercase tracking-wider">
            {country.region}
          </span>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(country.alpha2Code);
            }}
            aria-label="Favorite country"
            className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${
              favorite
                ? "bg-tertiary/20 border-tertiary text-tertiary shadow-[0_0_12px_rgba(239,184,200,0.4)]"
                : "bg-bg-deep/60 border-border-glass text-on-surface-variant hover:text-tertiary hover:bg-bg-deep"
            }`}
          >
            <Heart size={18} className={favorite ? "fill-tertiary" : ""} />
          </button>

          {/* Country Codes & Name Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div>
              <span className="text-xl mr-2">{country.flag}</span>
              <span className="font-label-mono text-xs text-on-surface-variant bg-surface-variant/80 px-1.5 py-0.5 rounded border border-border-glass">
                {country.alpha3Code}
              </span>
            </div>
            <span className="font-label-mono text-xs text-text-muted">
              {country.alpha2Code}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 mb-4">
          <h3 className="font-headline-md text-xl text-on-surface font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {country.name}
          </h3>
          <p className="font-body-base text-xs text-text-muted italic line-clamp-1">
            {country.nativeName !== country.name ? country.nativeName : country.demonym ? `${country.demonym} Nation` : ''}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border-glass">
            <div className="flex flex-col">
              <span className="font-label-mono text-[10px] text-text-muted uppercase flex items-center gap-1">
                <MapPin size={10} className="text-primary" /> Capital
              </span>
              <span className="font-body-base text-sm text-on-surface font-medium truncate">
                {country.capital || "N/A"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-mono text-[10px] text-text-muted uppercase flex items-center gap-1">
                <Users size={10} className="text-secondary" /> Population
              </span>
              <span className="font-body-base text-sm text-on-surface font-medium truncate">
                {formatNumber(country.population)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <Link
        to={`/country/${country.alpha2Code}`}
        className="w-full py-2.5 px-4 rounded-xl border border-border-glass bg-surface-glass text-on-surface hover:text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center justify-between font-label-mono text-xs transition-all duration-300 mt-2 group/btn"
      >
        <span>EXPLORE DETAILS</span>
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default Card;
