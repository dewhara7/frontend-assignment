import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api';

const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
console.log(searchInput)

// Memoize the fetch function to prevent unnecessary re-renders
const fetchCountries = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    let data = [];

    if (searchQuery) {
      data = await getCountryByName(searchQuery);
    } else if (selectedRegion) {
      data = await getCountriesByRegion(selectedRegion);
    } else {
      data = await getAllCountries();
    }

    setCountries(data);
  } catch (err) {
    setError(err.message || 'Something went wrong');
    setCountries([]);
  } finally {
    setLoading(false);
  }
}, [searchQuery, selectedRegion]);

// Effect for handling region changes
useEffect(() => {
  if (selectedRegion) {
    setSearchQuery('');
    setSearchInput('');
  }
  fetchCountries();
}, [selectedRegion, fetchCountries]);

// Effect for handling search changes
useEffect(() => {
  const debounceTimer = setTimeout(() => {
    if (searchQuery) {
      fetchCountries();
    }
  }, 30); // Add a small delay to prevent too many API calls

  return () => clearTimeout(debounceTimer);
}, [searchQuery, fetchCountries]);

// Initial load
useEffect(() => {
  fetchCountries();
}, [fetchCountries]);

const handleSearch = useCallback(() => {
  setSelectedRegion(''); // Reset region filter when searching
  setSearchQuery(searchInput.trim());
}, [searchInput]);

const handleRegionChange = useCallback((region) => {
  setSelectedRegion(region);
  setSearchQuery('');
  setSearchInput('');
}, []);

const handleInputChange = useCallback((value) => {
  setSearchInput(value);
  // If the input is empty, reset to show all countries
  if (!value.trim()) {
    setSearchQuery('');
    setSelectedRegion('');
  }
}, []);

const value = {
  countries,
  loading,
  error,
  searchInput,
  setSearchInput: handleInputChange,
  handleSearch,
  selectedRegion,
  setSelectedRegion: handleRegionChange,
};

return (
  <CountriesContext.Provider value={value}>
    {children}
  </CountriesContext.Provider>
);
};

export const useCountries = () => {
  const context = useContext(CountriesContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
};
