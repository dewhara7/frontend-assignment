import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CountriesProvider } from "./context/CountriesContext";
import RegionFilter from "./components/RegionFilter";
import CountryCard from "./components/CountryCard";
import CountryDetail from "./components/CountryDetail";
import HeroSection from "./components/HeroSection";
import { getCountryByName, getAllCountries } from "./services/api";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { Toaster } from 'react-hot-toast';
import Login from './components/Login';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useCountries } from "./context/CountriesContext";

const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  
  // Hide header on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className={`fixed w-full ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} shadow-md transition-colors duration-200 backdrop-blur-sm z-50`}>
      <div className="w-full px-4 py-6 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Where in the world?
        </h1>
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } transition-colors duration-200`}
        >
          {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

const Home = () => {
  const { 
    countries, 
    loading, 
    error, 
    searchInput, 
    setSearchInput, 
    handleSearch 
  } = useCountries();

  return (
    <div>
      <HeroSection />
      <div className="w-full px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
              placeholder="Search for a country..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Search
            </button>
            <RegionFilter />
          </div>
        </div>
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          </div>
        ) : (
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

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Toaster position="top-center" />
      <CountriesProvider>
        <div className={`min-h-screen w-full ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="w-full">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/country/:code" element={<CountryDetail />} />
                      </Routes>
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </CountriesProvider>
    </Router>
  );
}

export default App;
