import React from "react";
import { Link } from "react-router-dom";
import { Search, Sparkles, ArrowRight } from "lucide-react";

import HeroSection from "../components/HeroSection";
import QuickFacts from "../components/QuickFacts";
import DetailedData from "../components/DetailedData";
import Card from "../components/Card";

import { useAllCountriesQuery } from "../hooks/useCountryQueries";
import {
  filterCountries,
  getFeaturedCountry,
  getRegions,
  useCountryStore,
} from "../store/useCountryStore";

const HomePage = () => {
  const { data: allCountries = [] } = useAllCountriesQuery();

  const searchQuery = useCountryStore((state) => state.searchQuery);
  const selectedRegion = useCountryStore((state) => state.selectedRegion);
  const setSearchQuery = useCountryStore((state) => state.setSearchQuery);
  const setSelectedRegion = useCountryStore((state) => state.setSelectedRegion);
  const resetFilters = useCountryStore((state) => state.resetFilters);

  const filteredCountries = filterCountries(allCountries, {
    searchQuery,
    selectedRegion,
  });

  const featuredCountry = getFeaturedCountry(allCountries);
  const regions = getRegions(allCountries);

  return (
    <div className="flex flex-col gap-8 pb-12">

      {/* Hero */}
      {featuredCountry && (
        <HeroSection featuredCountry={featuredCountry} />
      )}

      {/* Quick Facts */}
      {featuredCountry && (
        <QuickFacts country={featuredCountry} />
      )}

      {/* Explorer */}
      <section className="mx-auto w-full max-w-container-max px-margin-safe py-6">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest text-secondary">
              <Sparkles size={14} />
              <span>LIVE EXPLORER</span>
            </div>

            <h2 className="font-headline-md text-3xl font-extrabold text-on-surface">
              Explore Global Nations
            </h2>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Search */}
            <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-border-glass bg-surface-glass px-3.5 transition-colors focus-within:border-primary/50 sm:w-60">
              <Search
                size={16}
                className="shrink-0 text-on-surface-variant"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter nations..."
                className="w-full bg-transparent text-sm text-on-surface outline-none placeholder:text-text-muted"
              />
            </div>

            {/* Regions */}
            <div className="flex max-w-full items-center gap-1.5 overflow-x-auto pb-1">
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setSelectedRegion(region)}
                  className={`whitespace-nowrap rounded-xl px-3 py-1.5 font-label-mono text-xs transition-all ${
                    selectedRegion === region
                      ? "bg-primary font-bold text-bg-deep shadow-[0_0_12px_rgba(173,198,255,0.3)]"
                      : "border border-border-glass bg-surface-glass text-on-surface-variant hover:bg-hover-subtle hover:text-on-surface"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Countries */}
        {filteredCountries.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCountries.slice(0, 8).map((country) => (
                <Card
                  key={country.alpha2Code || country.alpha3Code}
                  country={country}
                />
              ))}
            </div>

            {/* View All */}
            {filteredCountries.length > 8 && (
              <div className="mt-10 flex justify-center">
                <Link
                  to="/explore"
                  className="group flex items-center gap-2 rounded-2xl border border-border-glass bg-card px-8 py-3.5 font-label-mono text-xs font-bold tracking-wider text-on-surface shadow-md transition-all duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <span>
                    VIEW ALL {filteredCountries.length} NATIONS IN CATALOGUE
                  </span>

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            )}
          </>
        ) : (
          /* No Results */
          <div className="rounded-2xl border border-border-glass bg-card p-8 py-16 text-center">
            <p className="mb-2 text-lg text-text-muted">
              No countries found
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="font-label-mono text-xs text-primary underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* Detailed Spotlight */}
      {featuredCountry && (
        <section className="mx-auto w-full max-w-container-max px-margin-safe">

          <div className="mb-4">
            <span className="font-label-mono text-xs uppercase tracking-widest text-primary">
              DEEP DIVE SPOTLIGHT
            </span>

            <h2 className="font-headline-md text-2xl font-bold text-on-surface">
              {featuredCountry.name} Technical Profile
            </h2>
          </div>

          <DetailedData country={featuredCountry} />
        </section>
      )}
    </div>
  );
};

export default HomePage;

