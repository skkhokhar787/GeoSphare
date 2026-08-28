import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCountryDetail } from '../hooks/useCountryDetail';
import { useFavorites } from '../hooks/useFavorites';
import DetailedData from '../components/DetailedData';
import QuickFacts from '../components/QuickFacts';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Users,
  CheckCircle,
  Clock,
  Share2,
  Loader2,
  RefreshCw
} from 'lucide-react';

const CountryDetailPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { country, loading, error, refetch } = useCountryDetail(code);

  if (loading) {
    return (
      <div className="max-w-container-max mx-auto px-margin-safe py-32 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(173,198,255,0.2)]">
          <Loader2 size={32} className="animate-spin" />
        </div>
        <p className="font-label-mono text-sm text-on-surface font-semibold tracking-wider uppercase">
          Fetching Live Country Data from API...
        </p>
        <span className="font-label-mono text-xs text-text-muted">
          https://countries.dev/alpha/{code}
        </span>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="max-w-container-max mx-auto px-margin-safe py-24 text-center">
        <h1 className="text-4xl font-headline-md font-bold text-on-surface mb-4">Country Not Found</h1>
        <p className="text-text-muted mb-6">{error || `No country records found matching code "${code}".`}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-5 py-2.5 rounded-xl border border-border-glass bg-surface-glass text-on-surface hover:text-primary font-label-mono text-xs inline-flex items-center gap-2"
          >
            <RefreshCw size={16} /> RETRY API FETCH
          </button>
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-primary text-bg-deep font-bold font-label-mono text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> RETURN HOME
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(country.alpha2Code);

  return (
    <div className="max-w-container-max mx-auto px-margin-safe py-8 flex flex-col gap-10">
      {/* Navigation & Actions Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2.5 rounded-xl border border-border-glass bg-surface-glass text-on-surface hover:text-primary hover:border-primary/40 font-label-mono text-xs flex items-center gap-2 transition-all"
        >
          <ArrowLeft size={16} /> BACK
        </button>

        <div className="flex items-center gap-3">
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
          <button
            onClick={() => toggleFavorite(country.alpha2Code)}
            className={`px-5 py-2.5 rounded-xl border backdrop-blur-md flex items-center gap-2 font-label-mono text-xs font-semibold transition-all ${
              favorite
                ? "bg-tertiary/20 border-tertiary text-tertiary shadow-[0_0_15px_rgba(239,184,200,0.3)]"
                : "bg-surface-glass border-border-glass text-on-surface hover:border-tertiary/50 hover:text-tertiary"
            }`}
          >
            <Heart size={18} className={favorite ? "fill-tertiary" : ""} />
            {favorite ? "SAVED IN FAVORITES" : "ADD TO FAVORITES"}
          </button>
        </div>
      </div>

      {/* Main Profile Header Banner */}
      <div className="relative rounded-3xl border border-border-glass bg-card backdrop-blur-xl p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between relative z-10">
          {/* Flag & Primary Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-32 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border-2 border-border-glass shadow-2xl shrink-0 bg-surface-variant">
              <img
                src={country.flags?.svg || country.flags?.png || `https://flagcdn.com/w320/${country.alpha2Code?.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const alpha2 = country.alpha2Code?.toLowerCase();
                  if (alpha2 && !e.target.src.includes('flagcdn.com')) {
                    e.target.src = `https://flagcdn.com/w320/${alpha2}.png`;
                  }
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-3xl">{country.flag}</span>
                <span className="font-label-mono text-xs bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full uppercase font-bold">
                  {country.alpha2Code} / {country.alpha3Code}
                </span>
                {country.independent && (
                  <span className="font-label-mono text-xs bg-secondary/10 border border-secondary/30 text-secondary px-3 py-1 rounded-full uppercase flex items-center gap-1">
                    <CheckCircle size={12} /> INDEPENDENT NATION
                  </span>
                )}
              </div>

              <h1 className="font-display-lg text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
                {country.name}
              </h1>

              {country.nativeName && (
                <p className="text-lg text-text-muted italic">
                  Native Name: <span className="text-on-surface font-medium">{country.nativeName}</span>
                </p>
              )}
            </div>
          </div>

          {/* Key Metrics Chips */}
          <div className="flex flex-wrap lg:flex-col gap-3 w-full lg:w-auto">
            <div className="p-3.5 px-5 rounded-2xl border border-border-glass bg-surface-glass flex items-center gap-3">
              <MapPin size={20} className="text-primary" />
              <div>
                <span className="font-label-mono text-[10px] text-text-muted block uppercase">Capital</span>
                <span className="font-headline-md text-base text-on-surface font-semibold">{country.capital || "N/A"}</span>
              </div>
            </div>

            <div className="p-3.5 px-5 rounded-2xl border border-border-glass bg-surface-glass flex items-center gap-3">
              <Users size={20} className="text-secondary" />
              <div>
                <span className="font-label-mono text-[10px] text-text-muted block uppercase">Population</span>
                <span className="font-headline-md text-base text-on-surface font-semibold">{country.population ? country.population.toLocaleString() : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Facts Row */}
      <QuickFacts country={country} />

      {/* Complete Data Breakdown */}
      <div>
        <h2 className="font-headline-md text-2xl font-bold text-on-surface mb-4">Complete Country Profile Specs</h2>
        <DetailedData country={country} />
      </div>

      {/* All Timezones Badges */}
      {country.timezones && country.timezones.length > 0 && (
        <div className="p-8 rounded-2xl border border-border-glass bg-card">
          <h3 className="font-headline-md text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <Clock size={18} className="text-primary" /> All Applicable Timezones ({country.timezones.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {country.timezones.map((tz) => (
              <span
                key={tz}
                className="font-label-mono text-xs bg-surface-variant border border-border-glass px-3 py-1.5 rounded-lg text-on-surface"
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
