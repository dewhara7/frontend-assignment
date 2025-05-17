import React from 'react';

// CountryCard.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../components/CountryCard';
import { FavoritesProvider } from '../context/FavoritesContext';

// Create a wrapper component that provides the necessary contexts
const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <FavoritesProvider>
        {ui}
      </FavoritesProvider>
    </MemoryRouter>
  );
};

const mockCountry = {
  name: { common: 'France' },
  population: 67000000,
  region: 'Europe',
  capital: ['Paris'],
  flags: { png: 'https://flagcdn.com/w320/fr.png' },
  cca3: 'FRA'
};

describe('CountryCard', () => {
  test('renders country card with correct details', () => {
    renderWithProviders(<CountryCard country={mockCountry} />);

    // Check for text content
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText(/Population:/)).toBeInTheDocument();
    expect(screen.getByText(/67,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/Region:/)).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText(/Capital:/)).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();

    // Check for image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCountry.flags.png);
    expect(image).toHaveAttribute('alt', `Flag of ${mockCountry.name.common}`);
  });
});
