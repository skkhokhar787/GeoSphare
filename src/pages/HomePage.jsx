import React from "react";
import HeroSection from "../components/HeroSection";
import QuickFacts from "../components/QuickFacts";
import DetailedData from "../components/DetailedData";
import Card from "../components/Card";
import { useCountries } from "../hooks/useCountries";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const {
    filteredCountries,
    featuredCountry,
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    regions,
    resetFilters,
  } = useCountries();

  const featured = featuredCountry;

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Featured Hero */}
      {featured && <HeroSection featuredCountry={featured} />}

      {/* Quick Stats Banner */}
      {featured && <QuickFacts country={featured} />}

      {/* Country Exploration Section */}
      <section className="max-w-container-max mx-auto px-margin-safe py-6 w-full">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-secondary text-xs font-label-mono uppercase tracking-widest mb-1">
              <Sparkles size={14} /> LIVE EXPLORER
            </div>
            <h2 className="font-headline-md text-3xl font-extrabold text-on-surface">
              Explore Global Nations
            </h2>
          </div>

          {/* Region Tabs & Search */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="flex items-center gap-2 px-3.5 h-10 border border-border-glass bg-surface-glass rounded-xl focus-within:border-primary/50 transition-colors w-full sm:w-60">
              <Search size={16} className="text-on-surface-variant shrink-0" />
              <input
                className="outline-none bg-transparent w-full text-sm text-on-surface placeholder:text-text-muted"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter nations..."
              />
            </div>

            {/* Region Pill Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded-xl font-label-mono text-xs transition-all whitespace-nowrap ${
                    selectedRegion === region
                      ? "bg-primary text-bg-deep font-bold shadow-[0_0_12px_rgba(173,198,255,0.3)]"
                      : "bg-surface-glass border border-border-glass text-on-surface-variant hover:text-on-surface hover:bg-hover-subtle"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {filteredCountries.slice(0, 8).map((country) => (
              <Card key={country.alpha2Code || country.alpha3Code} country={country} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl border border-border-glass bg-card">
            <p className="text-text-muted text-lg mb-2">No countries found matching "{searchQuery}"</p>
            <button
              onClick={resetFilters}
              className="text-primary font-label-mono text-xs underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* View All Button */}
        {filteredCountries.length > 8 && (
          <div className="flex justify-center mt-10">
            <Link
              to="/explore"
              className="px-8 py-3.5 rounded-2xl bg-card border border-border-glass hover:border-primary/50 text-on-surface hover:text-primary font-label-mono text-xs font-bold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-md group"
            >
              <span>VIEW ALL {filteredCountries.length} NATIONS IN CATALOGUE</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </section>

      {/* Spotlight Country Detailed Data Breakdown */}
      {featured && (
        <div className="max-w-container-max mx-auto px-margin-safe w-full">
          <div className="mb-4">
            <span className="font-label-mono text-xs text-primary uppercase tracking-widest">DEEP DIVE SPOTLIGHT</span>
            <h2 className="font-headline-md text-2xl font-bold text-on-surface">{featured.name} Technical Profile</h2>
          </div>
          <DetailedData country={featured} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
