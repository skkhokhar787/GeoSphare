import { useState, useEffect, useCallback } from 'react';
import { useCountries } from './useCountries';
import { fetchCountryByAlpha } from './fetchAPI';

/**
 * Custom React Hook to load and manage individual country details.
 * Uses cached context data first for instant response, then fetches live data.
 * @param {string} code - Alpha code (alpha2, alpha3, or cioc)
 */
export const useCountryDetail = (code) => {
  const { getCountryByCode } = useCountries();

  const cachedMatch = getCountryByCode(code);
  const [country, setCountry] = useState(cachedMatch);
  const [loading, setLoading] = useState(!cachedMatch && Boolean(code));
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    if (!code) {
      setCountry(null);
      setLoading(false);
      setError(null);
      return;
    }

    const initial = getCountryByCode(code);
    setLoading(!initial);
    setError(null);

    try {
      const data = await fetchCountryByAlpha(code);
      if (data) {
        setCountry(data);
        setError(null);
      } else if (initial) {
        setCountry(initial);
        setError(null);
      } else {
        setCountry(null);
        setError(`No country records found matching code "${code}".`);
      }
    } catch (err) {
      if (initial) {
        setCountry(initial);
        setError(null);
      } else {
        setError(err.message || 'Failed to fetch country details from API.');
        setCountry(null);
      }
    } finally {
      setLoading(false);
    }
  }, [code, getCountryByCode]);

  useEffect(() => {
    let ignore = false;
    const initial = getCountryByCode(code);

    if (!code) {
      return;
    }

    (async () => {
      try {
        const data = await fetchCountryByAlpha(code);
        if (!ignore) {
          if (data) {
            setCountry(data);
            setError(null);
          } else if (initial) {
            setCountry(initial);
            setError(null);
          } else {
            setCountry(null);
            setError(`No country records found matching code "${code}".`);
          }
        }
      } catch (err) {
        if (!ignore) {
          if (initial) {
            setCountry(initial);
            setError(null);
          } else {
            setError(err.message || 'Failed to fetch country details from API.');
            setCountry(null);
          }
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [code, getCountryByCode]);

  return { country, loading, error, refetch: loadData };
};

export default useCountryDetail;
