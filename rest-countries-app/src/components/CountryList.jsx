import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
