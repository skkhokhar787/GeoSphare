import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_FAVORITES = ["US", "JP", "BR"];

export const useCountryStore = create()(
  persist(
    (set) => ({
      // Filters
      searchQuery: "",
      selectedRegion: "All",
      sortBy: "name",

      // Favorites
      favorites: DEFAULT_FAVORITES,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
      setSortBy: (sortBy) => set({ sortBy }),

      resetFilters: () =>
        set({
          searchQuery: "",
          selectedRegion: "All",
          sortBy: "name",
        }),

      toggleFavorite: (code) => {
        if (!code) return;
        const upper = code.toUpperCase();
        set((state) => ({
          favorites: state.favorites.includes(upper)
            ? state.favorites.filter((c) => c !== upper)
            : [...state.favorites, upper],
        }));
      },
    }),
    {
      name: "geosphere-store",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);

// ---- Selector helpers (pure functions over the countries list) ----

export const getCountryByCode = (countries, code) => {
  if (!code || !countries?.length) return null;

  const upper = code.toUpperCase().trim();

  return countries.find(
    (c) =>
      (c.alpha2Code && c.alpha2Code.toUpperCase() === upper) ||
      (c.alpha3Code && c.alpha3Code.toUpperCase() === upper) ||
      (c.cioc && c.cioc.toUpperCase() === upper)
  );
};

export const getFeaturedCountry = (countries) =>
  getCountryByCode(countries, "US") || countries?.[0] || null;

export const getRegions = (countries) => {
  const regions = new Set(
    (countries || []).map((c) => c.region).filter(Boolean)
  );

  return ["All", ...Array.from(regions).sort()];
};

export const filterCountries = (countries, { searchQuery, selectedRegion, sortBy }) => {
  const query = (searchQuery || "").toLowerCase().trim();
  const region = (selectedRegion || "All").toLowerCase();

  const result = (countries || []).filter((c) => {
    const matchesRegion =
      selectedRegion === "All" ||
      (c.region && c.region.toLowerCase() === region);

    const matchesQuery =
      !query ||
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.nativeName && c.nativeName.toLowerCase().includes(query)) ||
      (c.capital && c.capital.toLowerCase().includes(query)) ||
      (c.alpha2Code && c.alpha2Code.toLowerCase().includes(query)) ||
      (c.alpha3Code && c.alpha3Code.toLowerCase().includes(query));

    return matchesRegion && matchesQuery;
  });

  return [...result].sort((a, b) => {
    switch (sortBy) {
      case "population":
        return (b.population || 0) - (a.population || 0);
      case "area":
        return (b.area || 0) - (a.area || 0);
      case "density":
        return (b.populationDensity || 0) - (a.populationDensity || 0);
      default:
        return (a.name || "").localeCompare(b.name || "");
    }
  });
};

export default useCountryStore;