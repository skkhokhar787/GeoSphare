import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import { useCountries } from '../hooks/useCountries';
import { Search, ArrowUpDown, Globe } from 'lucide-react';

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    allCountries,
    filteredCountries,
    regions,
    searchQuery,
    selectedRegion,
    sortBy,
    setSearchQuery,
    setSelectedRegion,
    setSortBy,
    resetFilters,
  } = useCountries();

  // Sync URL params to Context state
  useEffect(() => {
    const qParam = searchParams.get('q');
    const rParam = searchParams.get('region');
    if (qParam !== null && qParam !== searchQuery) {
      setSearchQuery(qParam);
    }
    if (rParam !== null && rParam !== selectedRegion) {
      setSelectedRegion(rParam);
    }
  }, [searchParams, searchQuery, selectedRegion, setSearchQuery, setSelectedRegion]);

  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newRegion === 'All') next.delete('region');
      else next.set('region', newRegion);
      return next;
    });
  };

  const handleQueryChange = (newQuery) => {
    setSearchQuery(newQuery);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!newQuery) next.delete('q');
      else next.set('q', newQuery);
      return next;
    });
  };

  const handleClearFilters = () => {
    resetFilters();
    setSearchParams({});
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-safe py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-label-mono text-xs text-primary uppercase tracking-widest">
          <Globe size={14} /> COMPLETE COUNTRY CATALOGUE
        </div>
        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface">Explore Nations</h1>
        <p className="text-text-muted text-sm max-w-xl">
          Search, filter, and inspect detailed profiles for countries across all global regions.
        </p>
      </div>

      {/* Control Bar: Search, Filter, Sort */}
      <div className="p-6 rounded-2xl border border-border-glass bg-card backdrop-blur-lg flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="flex items-center gap-2 px-4 h-11 border border-border-glass bg-surface-glass rounded-xl focus-within:border-primary/50 flex-1">
          <Search size={18} className="text-on-surface-variant shrink-0" />
          <input
            className="outline-none bg-transparent w-full text-sm text-on-surface placeholder:text-text-muted"
            type="text"
            value={searchQuery}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search by country name, capital, or code..."
          />
        </div>

        {/* Region Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => handleRegionChange(r)}
              className={`px-3 py-2 rounded-xl font-label-mono text-xs transition-all whitespace-nowrap ${
                selectedRegion === r
                  ? "bg-primary text-bg-deep font-bold shadow-[0_0_12px_rgba(173,198,255,0.3)]"
                  : "bg-surface-glass border border-border-glass text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 border border-border-glass bg-surface-glass rounded-xl px-3 h-11 shrink-0">
          <ArrowUpDown size={16} className="text-on-surface-variant" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-on-surface font-label-mono text-xs outline-none cursor-pointer"
          >
            <option value="name" className="bg-bg-deep text-on-surface">Sort: Name (A-Z)</option>
            <option value="population" className="bg-bg-deep text-on-surface">Sort: Population (High-Low)</option>
            <option value="area" className="bg-bg-deep text-on-surface">Sort: Area (High-Low)</option>
            <option value="density" className="bg-bg-deep text-on-surface">Sort: Density (High-Low)</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex justify-between items-center text-xs font-label-mono text-text-muted">
        <span>SHOWING {filteredCountries.length} OF {allCountries.length} COUNTRIES</span>
        {searchQuery && <span>FILTERED BY: "{searchQuery}"</span>}
      </div>

      {/* Country Cards Grid */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {filteredCountries.map((country) => (
            <Card key={country.alpha2Code || country.alpha3Code} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-border-glass rounded-2xl bg-card">
          <p className="text-text-muted text-lg mb-2">No country matches your filter criteria.</p>
          <button
            onClick={handleClearFilters}
            className="text-primary font-label-mono text-xs underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
