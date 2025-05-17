import { useCountries } from '../context/CountriesContext';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const RegionFilter = () => {
  const { selectedRegion, setSelectedRegion } = useCountries();

  return (
    <div className="w-full md:w-48">
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region.toLowerCase()}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter; 