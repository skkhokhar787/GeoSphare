import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCountryDetailQuery } from "../hooks/useCountryQueries";
import useCountryStore from "../store/useCountryStore";
import DetailedData from "../components/DetailedData";
import QuickFacts from "../components/QuickFacts";

import {
  ArrowLeft,
  Heart,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  Share2,
  Loader2,
  RefreshCw,
} from "lucide-react";

const CountryDetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  // Zustand
  const favorites = useCountryStore((state) => state.favorites);
  const toggleFavorite = useCountryStore((state) => state.toggleFavorite);

  // React Query / country detail
  const {
    data: country,
    isLoading: loading,
    error,
    refetch,
  } = useCountryDetailQuery(code);

  if (loading) {
    return (
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-margin-safe py-24 sm:py-32 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(173,198,255,0.2)]">
          <Loader2 size={30} className="sm:w-8 sm:h-8 animate-spin" />
        </div>

        <p className="font-label-mono text-xs sm:text-sm text-on-surface font-semibold tracking-wider uppercase">
          Fetching Live Country Data from API...
        </p>

        <span className="max-w-full break-all font-label-mono text-[10px] sm:text-xs text-text-muted">
          https://countries.dev/alpha/{code}
        </span>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="w-full max-w-container-max mx-auto px-4 sm:px-margin-safe py-20 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl font-headline-md font-bold text-on-surface mb-4">
          Country Not Found
        </h1>

        <p className="text-sm sm:text-base text-text-muted mb-6 max-w-xl mx-auto">
          {error || `No country records found matching code "${code}".`}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => refetch()}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border-glass bg-surface-glass text-on-surface hover:text-primary font-label-mono text-xs inline-flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw size={16} />
            RETRY API FETCH
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-bg-deep font-bold font-label-mono text-xs inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            RETURN HOME
          </Link>
        </div>
      </div>
    );
  }

  const favorite = favorites.includes(country.alpha2Code);

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-margin-safe py-5 sm:py-8 flex flex-col gap-8 sm:gap-10">
      {/* Navigation & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-3.5 sm:px-4 py-2.5 rounded-xl border border-border-glass bg-surface-glass text-on-surface hover:text-primary hover:border-primary/40 font-label-mono text-xs flex items-center gap-2 transition-all"
        >
          <ArrowLeft size={16} />
          BACK
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Share */}
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert("Profile URL copied to clipboard!");
              }
            }}
            className="p-2.5 rounded-xl border border-border-glass bg-surface-glass text-on-surface-variant hover:text-on-surface transition-all"
            title="Share URL"
          >
            <Share2 size={18} />
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(country.alpha2Code)}
            className={`px-3 sm:px-5 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-2 font-label-mono text-[10px] sm:text-xs font-semibold transition-all ${
              favorite
                ? "bg-tertiary/20 border-tertiary text-tertiary shadow-[0_0_15px_rgba(239,184,200,0.3)]"
                : "bg-surface-glass border-border-glass text-on-surface hover:border-tertiary/50 hover:text-tertiary"
            }`}
          >
            <Heart
              size={17}
              className={favorite ? "fill-tertiary" : ""}
            />

            <span className="hidden sm:inline">
              {favorite
                ? "SAVED IN FAVORITES"
                : "ADD TO FAVORITES"}
            </span>

            <span className="sm:hidden">
              {favorite ? "SAVED" : "SAVE"}
            </span>
          </button>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-border-glass bg-card backdrop-blur-xl p-5 sm:p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
          {/* Flag & Primary Info */}
          <div className="w-full min-w-0 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="w-full sm:w-40 h-48 sm:h-28 rounded-2xl overflow-hidden border-2 border-border-glass shadow-2xl shrink-0 bg-surface-variant">
              <img
                src={
                  country.flags?.svg ||
                  country.flags?.png ||
                  `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`
                }
                alt={`${country.name} flag`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const alpha2 = country.alpha2Code?.toLowerCase();

                  if (
                    alpha2 &&
                    !e.target.src.includes("flagcdn.com")
                  ) {
                    e.target.src = `https://flagcdn.com/w320/${alpha2}.png`;
                  }
                }}
              />
            </div>

            <div className="min-w-0 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl sm:text-3xl">
                  {country.flag}
                </span>

                <span className="font-label-mono text-[10px] sm:text-xs bg-primary/10 border border-primary/30 text-primary px-2.5 sm:px-3 py-1 rounded-full uppercase font-bold">
                  {country.alpha2Code} / {country.alpha3Code}
                </span>

                {country.independent && (
                  <span className="font-label-mono text-[10px] sm:text-xs bg-secondary/10 border border-secondary/30 text-secondary px-2.5 sm:px-3 py-1 rounded-full uppercase flex items-center gap-1">
                    <CheckCircle size={12} />
                    INDEPENDENT NATION
                  </span>
                )}
              </div>

              <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight break-words">
                {country.name}
              </h1>

              {country.nativeName && (
                <p className="text-sm sm:text-lg text-text-muted italic break-words">
                  Native Name:{" "}
                  <span className="text-on-surface font-medium">
                    {country.nativeName}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3">
            <div className="flex-1 min-w-0 p-3.5 px-4 sm:px-5 rounded-2xl border border-border-glass bg-surface-glass flex items-center gap-3">
              <MapPin
                size={20}
                className="text-primary shrink-0"
              />

              <div className="min-w-0">
                <span className="font-label-mono text-[10px] text-text-muted block uppercase">
                  Capital
                </span>

                <span className="font-headline-md text-sm sm:text-base text-on-surface font-semibold truncate block">
                  {country.capital || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex-1 min-w-0 p-3.5 px-4 sm:px-5 rounded-2xl border border-border-glass bg-surface-glass flex items-center gap-3">
              <Users
                size={20}
                className="text-secondary shrink-0"
              />

              <div className="min-w-0">
                <span className="font-label-mono text-[10px] text-text-muted block uppercase">
                  Population
                </span>

                <span className="font-headline-md text-sm sm:text-base text-on-surface font-semibold truncate block">
                  {country.population
                    ? country.population.toLocaleString()
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts */}
      <QuickFacts country={country} />

      {/* Complete Data */}
      <div className="min-w-0">
        <h2 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface mb-4">
          Complete Country Profile Specs
        </h2>

        <DetailedData country={country} />
      </div>

      {/* All Timezones */}
      {country.timezones?.length > 0 && (
        <div className="p-5 sm:p-8 rounded-2xl border border-border-glass bg-card">
          <h3 className="font-headline-md text-base sm:text-lg font-bold text-on-surface mb-3 flex items-start sm:items-center gap-2">
            <Clock
              size={18}
              className="text-primary shrink-0 mt-0.5 sm:mt-0"
            />

            <span>
              All Applicable Timezones ({country.timezones.length})
            </span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {country.timezones.map((tz) => (
              <span
                key={tz}
                className="font-label-mono text-[10px] sm:text-xs bg-surface-variant border border-border-glass px-2.5 sm:px-3 py-1.5 rounded-lg text-on-surface break-all"
              >
                {tz}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDetailPage;