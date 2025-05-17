import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.uid}`);
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    } else {
      // Clear favorites when user logs out
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  // Add or remove country from favorites
  const toggleFavorite = (country) => {
    if (!user) return; // Don't allow changes if not logged in

    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.cca3 === country.cca3);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.cca3 !== country.cca3);
      } else {
        return [...prevFavorites, country];
      }
    });
  };

  // Check if a country is in favorites
  const isFavorite = (countryCode) => {
    if (!user) return false; // Return false if not logged in
    return favorites.some(fav => fav.cca3 === countryCode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}; 