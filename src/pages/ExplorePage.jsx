import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../components/Card";
import { useAllCountriesQuery } from "../hooks/useCountryQueries";
import {
  filterCountries,
  getRegions,
  useCountryStore,
} from "../store/useCountryStore";
import { Search, ArrowUpDown, Globe } from "lucide-react";

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --------------------------------
  // React Query / API data
  // --------------------------------
  const { data: allCountries = [] } = useAllCountriesQuery();

  // --------------------------------
  // Zustand / UI state
  // --------------------------------
  const searchQuery = useCountryStore((state) => state.searchQuery);
  const selectedRegion = useCountryStore(
    (state) => state.selectedRegion
  );
  const sortBy = useCountryStore((state) => state.sortBy);

  const setSearchQuery = useCountryStore(
    (state) => state.setSearchQuery
  );
  const setSelectedRegion = useCountryStore(
    (state) => state.setSelectedRegion
  );
  const setSortBy = useCountryStore((state) => state.setSortBy);
  const resetFilters = useCountryStore(
    (state) => state.resetFilters
  );

  // --------------------------------
  // Derived data
  // --------------------------------
  const regions = getRegions(allCountries);
  const filteredCountries = filterCountries(allCountries, {
    searchQuery,
    selectedRegion,
    sortBy,
  });

  // --------------------------------
  // Sync URL -> Zustand
  // --------------------------------
  useEffect(() => {
    const qParam = searchParams.get("q");
    const rParam = searchParams.get("region");

    if (qParam !== null && qParam !== searchQuery) {
      setSearchQuery(qParam);
    }

    if (rParam !== null && rParam !== selectedRegion) {
      setSelectedRegion(rParam);
    }

    if (rParam === null && selectedRegion !== "All") {
      setSelectedRegion("All");
    }

    if (qParam === null && searchQuery !== "") {
      setSearchQuery("");
    }
  }, [
    searchParams,
    searchQuery,
    selectedRegion,
    setSearchQuery,
    setSelectedRegion,
  ]);

  // --------------------------------
  // Region change
  // --------------------------------
  const handleRegionChange = (newRegion) => {
    setSelectedRegion(newRegion);

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (newRegion === "All") {
        next.delete("region");
      } else {
        next.set("region", newRegion);
      }

      return next;
    });
  };

  // --------------------------------
  // Search change
  // --------------------------------
  const handleQueryChange = (newQuery) => {
    setSearchQuery(newQuery);

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      if (!newQuery.trim()) {
        next.delete("q");
      } else {
        next.set("q", newQuery);
      }

      return next;
    });
  };

  // --------------------------------
  // Clear filters
  // --------------------------------
  const handleClearFilters = () => {
    resetFilters();
    setSearchParams({});
  };

  return (
    <div className="w-full max-w-container-max mx-auto px-4 sm:px-margin-safe py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-label-mono text-[10px] sm:text-xs text-primary uppercase tracking-widest">
          <Globe size={14} />
          COMPLETE COUNTRY CATALOGUE
        </div>

        <h1 className="font-display-lg text-3xl sm:text-4xl font-extrabold text-on-surface">
          Explore Nations
        </h1>

        <p className="text-text-muted text-sm max-w-xl">
          Search, filter, and inspect detailed profiles for
          countries across all global regions.
        </p>
      </div>

      {/* Control Bar */}
      <div className="p-4 sm:p-6 rounded-2xl border border-border-glass bg-card backdrop-blur-lg flex flex-col gap-4">

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="flex items-center gap-2 px-4 h-11 border border-border-glass bg-surface-glass rounded-xl focus-within:border-primary/50 flex-1 min-w-0">
            <Search
              size={18}
              className="text-on-surface-variant shrink-0"
            />

            <input
              className="outline-none bg-transparent w-full min-w-0 text-sm text-on-surface placeholder:text-text-muted"
              type="text"
              value={searchQuery}
              onChange={(e) =>
                handleQueryChange(e.target.value)
              }
              placeholder="Search by country name, capital, or code..."
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 border border-border-glass bg-surface-glass rounded-xl px-3 h-11 shrink-0">
            <ArrowUpDown
              size={16}
              className="text-on-surface-variant shrink-0"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-on-surface font-label-mono text-xs outline-none cursor-pointer max-w-full"
            >
              <option
                value="name"
                className="bg-bg-deep text-on-surface"
              >
                Sort: Name (A-Z)
              </option>

              <option
                value="population"
                className="bg-bg-deep text-on-surface"
              >
                Sort: Population (High-Low)
              </option>

              <option
                value="area"
                className="bg-bg-deep text-on-surface"
              >
                Sort: Area (High-Low)
              </option>

              <option
                value="density"
                className="bg-bg-deep text-on-surface"
              >
                Sort: Density (High-Low)
              </option>
            </select>
          </div>
        </div>

        {/* Regions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionChange(region)}
              className={`px-3 py-2 rounded-xl font-label-mono text-xs transition-all whitespace-nowrap shrink-0 ${
                selectedRegion === region
                  ? "bg-primary text-bg-deep font-bold shadow-[0_0_12px_rgba(173,198,255,0.3)]"
                  : "bg-surface-glass border border-border-glass text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[10px] sm:text-xs font-label-mono text-text-muted">
        <span>
          SHOWING {filteredCountries.length} OF{" "}
          {allCountries.length} COUNTRIES
        </span>

        {searchQuery && (
          <span className="truncate max-w-full">
            FILTERED BY: "{searchQuery}"
          </span>
        )}
      </div>

      {/* Country Cards */}
      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredCountries.map((country) => (
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
        <div className="text-center py-16 sm:py-20 px-4 border border-border-glass rounded-2xl bg-card">
          <p className="text-text-muted text-base sm:text-lg mb-2">
            No country matches your filter criteria.
          </p>

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