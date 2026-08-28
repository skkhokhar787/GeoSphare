import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { countriesData as initialCountriesData } from '../data/countriesData';
import { fetchAllCountries } from '../hooks/fetchAPI';
import { CountryContext } from './CountryContextObject';

export const CountryProvider = ({ children }) => {
  const { data: allCountries = initialCountriesData, isLoading, error: apiError, refetch } = useQuery({
    queryKey: ['allCountries'],
    queryFn: fetchAllCountries,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });

  const [loading, setLoading] = useState(isLoading);
  const [contextError, setError] = useState(apiError ?? null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Background sync with https://countries.dev/countries API
  const refreshCountries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await refetch();
    } catch (err) {
      console.warn('Background sync failed, using preloaded country data:', err);
      setError('Failed to fetch latest API updates. Displaying cached data.');
    } finally {
      setLoading(false);
    }
  }, [refetch]);

  // Derived list of all available regions
  const regions = useMemo(() => {
    const set = new Set();
    allCountries.forEach((c) => {
      if (c.region) set.add(c.region);
    });
    return ['All', ...Array.from(set).sort()];
  }, [allCountries]);

  // Lookup country by code (alpha2, alpha3, or cioc)
  const getCountryByCode = useCallback((code) => {
    if (!code) return null;
    const upper = String(code).toUpperCase().trim();
    return allCountries.find(
      (c) =>
        (c.alpha2Code && c.alpha2Code.toUpperCase() === upper) ||
        (c.alpha3Code && c.alpha3Code.toUpperCase() === upper) ||
        (c.cioc && c.cioc.toUpperCase() === upper)
    );
  }, [allCountries]);

  // Memoized Filtered & Sorted Countries
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const reg = selectedRegion.toLowerCase();

    let result = allCountries.filter((c) => {
      const matchesRegion =
        selectedRegion === 'All' ||
        (c.region && c.region.toLowerCase() === reg);

      const matchesQuery =
        !q ||
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.nativeName && c.nativeName.toLowerCase().includes(q)) ||
        (c.capital && c.capital.toLowerCase().includes(q)) ||
        (c.alpha2Code && c.alpha2Code.toLowerCase().includes(q)) ||
        (c.alpha3Code && c.alpha3Code.toLowerCase().includes(q));

      return matchesRegion && matchesQuery;
    });

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (sortBy === 'population') {
        return (b.population || 0) - (a.population || 0);
      }
      if (sortBy === 'area') {
        return (b.area || 0) - (a.area || 0);
      }
      if (sortBy === 'density') {
        return (b.populationDensity || 0) - (a.populationDensity || 0);
      }
      return 0;
    });
  }, [allCountries, searchQuery, selectedRegion, sortBy]);

  // Featured Spotlight Country (defaults to US or first country)
  const featuredCountry = useMemo(() => {
    return getCountryByCode('US') || allCountries[0] || null;
  }, [allCountries, getCountryByCode]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSortBy('name');
  }, []);

  const value = useMemo(
    () => ({
      allCountries,
      filteredCountries,
      regions,
      featuredCountry,
      loading,
      error: contextError,
      searchQuery,
      selectedRegion,
      sortBy,
      setSearchQuery,
      setSelectedRegion,
      setSortBy,
      resetFilters,
      getCountryByCode,
      refreshCountries,
    }),
    [
      allCountries,
      filteredCountries,
      regions,
      featuredCountry,
      loading,
      contextError,
      searchQuery,
      selectedRegion,
      sortBy,
      resetFilters,
      getCountryByCode,
      refreshCountries,
    ]
  );

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
};