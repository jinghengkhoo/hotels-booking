import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelSearch from '../HotelSearch';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react';
import axios from 'axios';

// Mock components
jest.mock('../HotelList', () => () => <div data-testid="hotel-list" />);
jest.mock('../LoadingIcon', () => () => <div data-testid="loading-icon" />);
jest.mock('../NavBar', () => () => <div data-testid="nav-bar" />);
jest.mock('../SearchBar', () => () => <div data-testid="search-bar" />);

jest.mock('axios');

const mockParameters = {
  state: {
    destination_id: 'WD0M',
    checkin: '2024-08-01',
    chekout: '2024-08-07',
    lang: 'en_US',
    currency: 'SGD',
    guests: 2,
    partner_id: 1
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockParameters,
}));

describe('HotelSearch', () => {
  test('renders HotelSearch component correctly', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        completed: true,
        currency: 'SGD',
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

