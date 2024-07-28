import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelSearch from '../components/HotelSearch';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import axios from 'axios';

// Mock components
jest.mock('../components/HotelList', () => () => <div data-testid="hotel-list" />);
jest.mock('../components/LoadingIcon', () => () => <div data-testid="loading-icon" />);
jest.mock('../components/NavBar', () => () => <div data-testid="nav-bar" />);
jest.mock('../components/SearchBar', () => () => <div data-testid="search-bar" />);

jest.mock('axios');

const mockLocation = {
	state: {
	  destinationId: 'A6Dz',
	  startDate: '2024-08-01',
	  endDate: '2024-08-02',
	  guests: 2,
	  rooms: 1,
	},
  };

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
}));

describe('HotelSearch', () => {
  test('renders HotelSearch component correctly', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        completed: true,
        hotels: [
			{ id: '1', name: 'ROOM INN VATICAN', price: 254.17 },
			{ id: '2', name: 'Rome Times Hotel', price: 457.26 },
        ],
      },
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <HotelSearch />
        </MemoryRouter>
      );
    });

    // Check if the NavBar and SearchBar components are rendered
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();

    // Check if the HotelList component is rendered after loading
    expect(screen.getByTestId('hotel-list')).toBeInTheDocument();
  });

  test('displays an error message when fetching hotels fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching hotel data'));

    await act(async () => {
      render(
        <MemoryRouter>
          <HotelSearch />
        </MemoryRouter>
      );
    });

    // Check if an error message is displayed
    expect(screen.getByRole('alert')).toHaveTextContent('Error fetching hotel data');
  });
});

