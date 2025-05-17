import { useCountries } from '../context/CountriesContext';
import SearchBar from '../components/SearchBar';
import RegionFilter from '../components/RegionFilter';
import CountryCard from '../components/CountryCard';
import HeroSection from '../components/HeroSection';

// Home page component displaying the hero section and country grid
const Home = () => {
  // Get countries data and loading states from context
  const { countries, loading, error } = useCountries();

  return (
    <div>
      {/* Hero section with background image */}
      <HeroSection />
      <div className="w-full px-4 py-16">
        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <SearchBar />
            <RegionFilter />
          </div>
        </div>
        {/* Conditional rendering based on loading and error states */}
        {loading ? (
          // Loading spinner centered in viewport
          <div className="fixed inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          // Error message
          <div className="text-center py-8">
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          </div>
        ) : (
          // Grid of country cards
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {countries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
