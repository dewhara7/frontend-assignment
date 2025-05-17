import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CountryDetail = () => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        setLoading(false);
      });
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400">Country not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-12 px-6 py-2 flex items-center gap-2 bg-white dark:bg-gray-800 shadow-md rounded-md text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="w-full">
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              className="w-full h-auto shadow-lg rounded-lg"
            />
          </div>

          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {country.name.common}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Native Name: </span>
                  {Object.values(country.name.nativeName || {})[0]?.common || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Population: </span>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Region: </span>
                  {country.region}
                </p>
                <p>
                  <span className="font-semibold">Sub Region: </span>
                  {country.subregion || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Capital: </span>
                  {country.capital?.[0] || 'N/A'}
                </p>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <span className="font-semibold">Top Level Domain: </span>
                  {country.tld?.[0] || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Currencies: </span>
                  {Object.values(country.currencies || {})
                    .map(currency => currency.name)
                    .join(', ') || 'N/A'}
                </p>
                <p>
                  <span className="font-semibold">Languages: </span>
                  {Object.values(country.languages || {}).join(', ') || 'N/A'}
                </p>
              </div>
            </div>

            {country.borders && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Border Countries:
                </h2>
                <div className="flex flex-wrap gap-3">
                  {country.borders.map((border) => (
                    <button
                      key={border}
                      onClick={() => navigate(`/country/${border}`)}
                      className="px-6 py-2 bg-white dark:bg-gray-800 shadow-md rounded-md text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      {border}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail; 