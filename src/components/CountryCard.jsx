import React from 'react';
import { Link } from "react-router-dom";
import { useFavorites } from '../context/FavoritesContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import toast from 'react-hot-toast';

const CountryCard = ({ country }) => {
  const { name, population, region, capital, flags, cca3 } = country;
  const { toggleFavorite, isFavorite } = useFavorites();
  const [user] = useAuthState(auth);
  const isCountryFavorite = isFavorite(cca3);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    if (!user) {
      toast.error('Please log in to add countries to favorites');
      return;
    }
    toggleFavorite(country);
  };

  return (
    // Wrap card in Link component for navigation to country detail page
    <Link to={`/country/${cca3}`} className="block h-full group relative">
      {/* Card container with hover animations */}
      <div className="w-full max-w-sm h-[420px] w-[320px] rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
        {/* Country flag with hover zoom effect */}
        <img
          src={flags.png}
          alt={`Flag of ${name.common}`}
          className="w-[320px] h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {name.common}
            </h2>

            {/* favorite button */}
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isCountryFavorite 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
              title={user ? 'Add to favorites' : 'Log in to add to favorites'}
            >
              {isCountryFavorite ? (
                <FaHeart className="w-5 h-5" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </button>
          </div>
          {/* Country details section */}
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p>
              <span className="font-semibold">Population:</span>{" "}
              {population.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Region:</span> {region}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {capital?.[0] || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
