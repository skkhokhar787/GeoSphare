import { useContext } from 'react';
import { CountryContext } from '../context/CountryContextObject';

export const useCountries = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return context;
};

export default useCountries;
