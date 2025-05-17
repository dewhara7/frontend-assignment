import React from 'react';

// CountryList.test.js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryList from '../components/CountryList';
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

const mockCountries = [
  {
    name: { common: 'France' },
    population: 67000000,
    region: 'Europe',
    capital: ['Paris'],
    flags: { png: 'https://flagcdn.com/w320/fr.png' },
    cca3: 'FRA'
  },
  {
    name: { common: 'Japan' },
    population: 125800000,
    region: 'Asia',
    capital: ['Tokyo'],
    flags: { png: 'https://flagcdn.com/w320/jp.png' },
    cca3: 'JPN'
  }
];

describe('CountryList', () => {
  test('renders a list of country cards', () => {
    renderWithProviders(<CountryList countries={mockCountries} />);

    // Check for country names
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();

    // Check for regions
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();

    // Check for capitals
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Tokyo')).toBeInTheDocument();

    // Check for images
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', mockCountries[0].flags.png);
    expect(images[1]).toHaveAttribute('src', mockCountries[1].flags.png);
  });
});
