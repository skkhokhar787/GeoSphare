import { useQuery } from "@tanstack/react-query";
import { countriesData as fallbackCountries } from "../data/countriesData";
import { fetchAllCountries, fetchCountryByAlpha } from "./fetchAPI";
import { getCountryByCode } from "../store/useCountryStore";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const useAllCountriesQuery = () =>
  useQuery({
    queryKey: ["allCountries"],
    queryFn: fetchAllCountries,
    staleTime: STALE_TIME,
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    placeholderData: fallbackCountries,
  });

export const useCountryDetailQuery = (code) => {
  const { data: allCountries = [] } = useAllCountriesQuery();
  const cachedCountry = getCountryByCode(allCountries, code);

  return useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountryByAlpha(code),
    enabled: Boolean(code),
    staleTime: STALE_TIME,
    initialData: cachedCountry || undefined,
  });
};