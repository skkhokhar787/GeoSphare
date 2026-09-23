const API_BASE = "https://countries.dev/alpha";
const ALL_COUNTRIES_API = "https://countries.dev/countries";

/**
 * Fetch all 250 countries from the API.
 * @returns {Promise<Array>} Array of all country objects
 */
export const fetchAllCountries = async () => {
  const response = await fetch(ALL_COUNTRIES_API);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
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

  const response = await fetch(`${API_BASE}/${cleanCode}`);

  if (!response.ok) {
    if (response.status === 404) {
      console.warn(`Country not found for alpha code: ${cleanCode}`);
      return null;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};