import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import CountryCard from './CountryCard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const FavoritesList = ({ onClose }) => {
  const { favorites } = useFavorites();
  const [user] = useAuthState(auth);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user ? `Favorite Countries (${favorites.length})` : 'Favorites'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {!user ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Please log in to view and manage your favorite countries.
          </p>
        ) : favorites.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            No favorite countries yet. Click the heart icon on a country card to add it to your favorites.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesList; 