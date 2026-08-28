import { useState, useEffect, useCallback } from "react";

const API_BASE = "https://countries.dev/alpha";
const ALL_COUNTRIES_API = "https://countries.dev/countries";

/**
 * Fetch all 250 countries from the API.
 * @returns {Promise<Array>} Array of all country objects
 */
export const fetchAllCountries = async () => {
  try {
    const response = await fetch(ALL_COUNTRIES_API);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch all countries:", error);
    throw error;
  }
};
/**
 * Fetch country data by its alpha code.
 * @param {string} alphaCode
 * @returns {Promise<Object|null>} Country data object or null if not found
 */
export const fetchCountryByAlpha = async (alphaCode) => {
  if (!alphaCode) return null;
  const cleanCode = String(alphaCode).trim().toLowerCase();
  if (!cleanCode) return null;

  try {
    const response = await fetch(`${API_BASE}/${cleanCode}`);
    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Country not found for alpha code: ${cleanCode}`);
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch country for code "${cleanCode}":`, error);
    throw error;
  }
};

/**
 * Custom React Hook to fetch country data by alpha code from https://countries.dev/alpha/(alpha code)
 * @param {string} alphaCode 
 */
export const useCountryData = (alphaCode) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(Boolean(alphaCode));
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    if (!alphaCode) {
      setCountry(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchCountryByAlpha(alphaCode);
      if (!data) {
        setCountry(null);
        setError(`No country records found matching code "${alphaCode}".`);
      } else {
        setCountry(data);
      }
    } catch (err) {
      setError(err.message || "Failed to load country data from API.");
      setCountry(null);
    } finally {
      setLoading(false);
    }
  }, [alphaCode]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!alphaCode) {
        setCountry(null);
        setLoading(false);
        setError(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCountryByAlpha(alphaCode);
        if (!ignore) {
          if (!data) {
            setCountry(null);
            setError(`No country records found matching code "${alphaCode}".`);
          } else {
            setCountry(data);
            setError(null);
          }
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load country data from API.");
          setCountry(null);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [alphaCode]);

  return { country, loading, error, refetch: loadData };
};

