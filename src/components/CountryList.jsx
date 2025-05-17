import React from 'react';
import CountryCard from './CountryCard';

// CountryList component renders a responsive grid of country cards
// Props:
// - countries: Array of country objects to display
const CountryList = ({ countries }) => {
  return (
    // Responsive grid layout with different columns based on screen size
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
