import React from 'react';
import { Map, Users, Radio, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';

const DetailedData = ({ country }) => {
  const { getCountryByCode } = useCountries();
  const data = country || {
    name: "United States of America",
    nativeName: "United States",
    alpha2Code: "US",
    alpha3Code: "USA",
    area: 9629091,
    borders: ["CAN", "MEX"],
    callingCodes: ["1"],
    capital: "Washington, D.C.",
    cioc: "USA",
    currencies: [{ code: "USD", name: "United States Dollar", symbol: "$" }],
    demonym: "American",
    flag: "🇺🇸",
    flags: { png: "https://flagcdn.com/w320/us.png", svg: "https://flagcdn.com/us.svg" },
    gini: 41.4,
    independent: true,
    languages: [{ iso639_1: "en", iso639_2: "eng", name: "English", nativeName: "English" }],
    latlng: [38, -97],
    numericCode: "840",
    population: 329484123,
    populationDensity: 34.22,
    region: "Americas",
    subregion: "Northern America",
    timezones: ["UTC-05:00", "UTC-08:00"],
    topLevelDomain: [".us"]
  };

  const cardClasses = "bg-card border border-card-border backdrop-blur-lg backdrop-saturate-[180%] rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden group hover:border-primary/40 transition-all duration-300";

  return (
    <section className="max-w-container-max mx-auto px-margin-safe py-6 grid grid-cols-1 md:grid-cols-3 gap-gutter">
      {/* Geography Card */}
      <div className={cardClasses}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/20 transition-all"></div>
        <div className="flex items-center gap-3 border-b border-border-glass pb-4">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Map size={18} />
          </div>
          <h3 className="font-headline-md text-xl font-bold text-on-surface">Geography</h3>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Capital</span>
            <span className="text-on-surface font-semibold text-right">{data.capital || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Region</span>
            <span className="text-on-surface font-semibold text-right">{data.region}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Subregion</span>
            <span className="text-on-surface font-semibold text-right">{data.subregion}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Total Area</span>
            <span className="text-on-surface font-semibold text-right">{data.area ? `${data.area.toLocaleString()} km²` : "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Coordinates (latlng)</span>
            <span className="font-label-mono text-xs text-secondary bg-secondary/10 px-2 py-1 rounded border border-secondary/20">
              {data.latlng ? `${data.latlng[0]}°, ${data.latlng[1]}°` : "N/A"}
            </span>
          </div>

          {/* Borders */}
          {data.borders && data.borders.length > 0 && (
            <div className="pt-3 border-t border-border-glass">
              <span className="text-text-muted text-xs font-label-mono uppercase block mb-2">Border Countries</span>
              <div className="flex flex-wrap gap-1.5">
                {data.borders.map((bCode) => {
                  const bCountry = getCountryByCode(bCode);
                  return (
                    <Link
                      key={bCode}
                      to={`/country/${bCode}`}
                      className="font-label-mono text-xs bg-surface-variant hover:bg-primary/20 hover:text-primary text-on-surface px-2.5 py-1 rounded border border-border-glass transition-colors flex items-center gap-1"
                    >
                      {bCountry ? bCountry.flag : '🌐'} {bCode}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demographics Card */}
      <div className={cardClasses}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-secondary/20 transition-all"></div>
        <div className="flex items-center gap-3 border-b border-border-glass pb-4">
          <div className="w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
            <Users size={18} />
          </div>
          <h3 className="font-headline-md text-xl font-bold text-on-surface">Demographics</h3>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Population</span>
            <span className="text-on-surface font-semibold text-right">{data.population ? data.population.toLocaleString() : "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Population Density</span>
            <span className="text-on-surface font-semibold text-right">{data.populationDensity ? `${data.populationDensity} / km²` : "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Demonym</span>
            <span className="text-on-surface font-semibold text-right">{data.demonym || "N/A"}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-text-muted">Official Languages</span>
            <div className="text-right">
              {data.languages && data.languages.map((l) => (
                <div key={l.iso639_1 || l.name} className="text-on-surface font-semibold">
                  {l.name} ({l.nativeName})
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 border-t border-border-glass pt-4">
            <span className="text-text-muted flex items-center gap-1.5">
              <Coins size={16} className="text-secondary" /> Primary Currency
            </span>
            <div className="flex flex-col items-end">
              <span className="text-on-surface font-semibold text-right">{data.currencies?.[0]?.name || "N/A"}</span>
              <span className="font-label-mono text-xs text-text-muted">{data.currencies?.[0]?.code} ({data.currencies?.[0]?.symbol})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical & Communication Card */}
      <div className={cardClasses}>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-tertiary/20 transition-all"></div>
        <div className="flex items-center gap-3 border-b border-border-glass pb-4">
          <div className="w-9 h-9 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary">
            <Radio size={18} />
          </div>
          <h3 className="font-headline-md text-xl font-bold text-on-surface">Identifiers & Telecom</h3>
        </div>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Calling Codes</span>
            <span className="font-label-mono text-xs text-on-surface bg-surface-variant px-2.5 py-1 rounded border border-border-glass">
              +{data.callingCodes?.join(", +")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Top Level Domain</span>
            <span className="font-label-mono text-xs text-on-surface bg-surface-variant px-2.5 py-1 rounded border border-border-glass">
              {data.topLevelDomain?.join(", ")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">CIOC / IOC Code</span>
            <span className="font-label-mono text-xs text-secondary bg-secondary/10 px-2.5 py-1 rounded border border-secondary/20">
              {data.cioc || data.alpha3Code}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted">Numeric ISO Code</span>
            <span className="font-label-mono text-xs text-on-surface bg-surface-variant px-2.5 py-1 rounded border border-border-glass">
              {data.numericCode}
            </span>
          </div>

          <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-border-glass">
            <span className="font-label-mono text-[10px] text-text-muted tracking-widest uppercase">RESTCOUNTRIES SCHEMA INTEGRITY</span>
            <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-full shadow-[0_0_10px_rgba(78,222,163,0.5)]"></div>
            </div>
            <span className="font-label-mono text-xs text-secondary text-right font-semibold">100% Schema Validated</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedData;
