import React from "react";
import { Globe } from "lucide-react";

import Card from "../components/Card";
import { useAllCountriesQuery } from "../hooks/useCountryQueries";
import { getRegions } from "../store/useCountryStore";

const RegionsPage = () => {
  const { data: allCountries = [] } = useAllCountriesQuery();

  const regionsList = getRegions(allCountries).filter(
    (region) => region !== "All"
  );

  const getRegionStats = (regionName) => {
    const countries = allCountries.filter(
      (country) =>
        country.region?.toLowerCase() === regionName.toLowerCase()
    );

    const totalPopulation = countries.reduce(
      (total, country) => total + (country.population || 0),
      0
    );

    const totalArea = countries.reduce(
      (total, country) => total + (country.area || 0),
      0
    );

    return {
      countries,
      totalPopulation,
      totalArea,
    };
  };

  return (
    <div className="mx-auto flex max-w-container-max flex-col gap-12 px-margin-safe py-8">

      {/* ==================== PAGE HEADER ==================== */}
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-label-mono text-xs uppercase tracking-widest text-secondary">
          <Globe size={14} />
          <span>CONTINENTAL REGIONS</span>
        </div>

        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface">
          World Regions
        </h1>

        <p className="max-w-xl text-sm text-text-muted">
          Browse countries grouped by geographic continents and regional
          classifications.
        </p>
      </header>

      {/* ==================== REGIONS ==================== */}
      <div className="flex flex-col gap-16">

        {regionsList.map((regionName) => {
          const {
            countries,
            totalPopulation,
            totalArea,
          } = getRegionStats(regionName);

          return (
            <section
              key={regionName}
              className="flex flex-col gap-6"
            >

              {/* ==================== REGION HEADER ==================== */}
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border-glass bg-card p-6 backdrop-blur-lg sm:flex-row sm:items-center">

                <div>
                  <span className="mb-1 block font-label-mono text-xs uppercase tracking-widest text-primary">
                    CONTINENT
                  </span>

                  <h2 className="flex items-center gap-3 font-headline-md text-3xl font-bold text-on-surface">
                    {regionName}

                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-label-mono text-xs text-primary">
                      {countries.length}{" "}
                      {countries.length === 1 ? "Nation" : "Nations"}
                    </span>
                  </h2>
                </div>

                {/* Region Statistics */}
                <div className="flex items-center gap-6 font-label-mono text-sm">

                  <div>
                    <span className="block text-[10px] uppercase text-text-muted">
                      REGIONAL POPULATION
                    </span>

                    <span className="font-semibold text-on-surface">
                      {totalPopulation.toLocaleString()}
                    </span>
                  </div>

                  <div className="border-l border-border-glass pl-6">
                    <span className="block text-[10px] uppercase text-text-muted">
                      TOTAL LAND AREA
                    </span>

                    <span className="font-semibold text-on-surface">
                      {totalArea.toLocaleString()} km²
                    </span>
                  </div>

                </div>
              </div>

              {/* ==================== COUNTRY CARDS ==================== */}
              {countries.length > 0 ? (
                <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {countries.map((country) => (
                    <Card
                      key={country.alpha2Code || country.alpha3Code}
                      country={country}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border-glass bg-card p-8 text-center text-text-muted">
                  No countries indexed in {regionName} region yet.
                </div>
              )}
            </section>
          );
        })}

      </div>
    </div>
  );
};

export default RegionsPage;
