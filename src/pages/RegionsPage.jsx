import React from 'react';
import { useCountries } from '../hooks/useCountries';
import Card from '../components/Card';
import { Globe } from 'lucide-react';

const RegionsPage = () => {
  const { allCountries, regions } = useCountries();
  const regionsList = regions.filter((r) => r !== 'All');

  const getRegionStats = (regionName) => {
    const list = allCountries.filter(
      (c) => c.region && c.region.toLowerCase() === regionName.toLowerCase()
    );
    const totalPopulation = list.reduce((acc, c) => acc + (c.population || 0), 0);
    const totalArea = list.reduce((acc, c) => acc + (c.area || 0), 0);
    return { list, totalPopulation, totalArea };
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-safe py-8 flex flex-col gap-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 font-label-mono text-xs text-secondary uppercase tracking-widest">
          <Globe size={14} /> CONTINENTAL REGIONS
        </div>
        <h1 className="font-display-lg text-4xl font-extrabold text-on-surface">World Regions</h1>
        <p className="text-text-muted text-sm max-w-xl">
          Browse countries grouped by geographic continents and regional classifications.
        </p>
      </div>

      {/* Regions Breakdown */}
      <div className="flex flex-col gap-16">
        {regionsList.map((regionName) => {
          const { list, totalPopulation, totalArea } = getRegionStats(regionName);

          return (
            <div key={regionName} className="flex flex-col gap-6">
              {/* Region Banner */}
              <div className="p-6 rounded-2xl border border-border-glass bg-card backdrop-blur-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="font-label-mono text-xs text-primary uppercase tracking-widest block mb-1">
                    CONTINENT
                  </span>
                  <h2 className="font-headline-md text-3xl font-bold text-on-surface flex items-center gap-3">
                    {regionName}
                    <span className="font-label-mono text-xs bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full">
                      {list.length} {list.length === 1 ? 'Nation' : 'Nations'}
                    </span>
                  </h2>
                </div>

                <div className="flex items-center gap-6 text-sm font-label-mono">
                  <div>
                    <span className="text-text-muted text-[10px] block uppercase">REGIONAL POPULATION</span>
                    <span className="text-on-surface font-semibold">{totalPopulation.toLocaleString()}</span>
                  </div>
                  <div className="border-l border-border-glass pl-6">
                    <span className="text-text-muted text-[10px] block uppercase">TOTAL LAND AREA</span>
                    <span className="text-on-surface font-semibold">{totalArea.toLocaleString()} km²</span>
                  </div>
                </div>
              </div>

              {/* Region Cards Grid */}
              {list.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                  {list.map((country) => (
                    <Card key={country.alpha2Code} country={country} />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-text-muted border border-border-glass rounded-xl bg-card">
                  No countries indexed in {regionName} region yet.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegionsPage;
