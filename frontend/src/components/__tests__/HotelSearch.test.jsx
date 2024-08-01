// HotelSearch.test.js
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import HotelSearch from '../HotelSearch';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../SearchBar', () => () => <div data-testid="searchbar">SearchBar</div>);

jest.mock('axios');

const mockLocation = {
  state: {
    destinationId: '123',
    startDate: '2023-07-01',
    endDate: '2023-07-05',
    guests: 2,
    rooms: 1,
  },
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
}));

describe('HotelSearch Component', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <HotelSearch />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders the NavBar and SearchBar components', async () => {
    const mockHotels = Array.from({ length: 5 }, (v, i) => ({
      id: "ABC" + i,
      name: `Hotel ${i + 1}`,
      destinationId: 100 + i,
      startDate: `2023-12-${String(i + 1).padStart(2, '0')}`,
      endDate: `2023-12-${String(i + 5).padStart(2, '0')}`,
      address: `Address ${i + 1}`,
      price: 100 + i,
      guests: 2 + (i % 3),
      rooms: 1 + (i % 2),
      currency: 'SGD',
      rating: 1 + (i % 5),
      image_details: {
        prefix: 'https://example.com/',
        suffix: '/image.jpg',
      },
      default_image_index: i % 3,
      trustyou: {
        score: {
          overall: parseFloat((Math.random() * 5).toFixed(1)), // Random rating between 0 and 5
        },
      },
    }));

    const mockData = {
      completed: true,
      hotels: mockHotels,
    };
    axios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(
        <MemoryRouter>
          <HotelSearch />
        </MemoryRouter>
      );
    });

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();

    // ensure sorting feature exists
    expect(screen.getByText('Sort By: Highest Price')).toBeInTheDocument();

    // ensure filter features exist
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Star Rating')).toBeInTheDocument();
    expect(screen.getByText('Guest Rating')).toBeInTheDocument();
    expect(screen.getByText('Price Range (per night):')).toBeInTheDocument();

    // check if star ratings are displayed
    expect(screen.getByText('1 stars')).toBeInTheDocument();
    expect(screen.getByText('2 stars')).toBeInTheDocument();
    expect(screen.getByText('3 stars')).toBeInTheDocument();
    expect(screen.getByText('4 stars')).toBeInTheDocument();
    expect(screen.getByText('5 stars')).toBeInTheDocument();
  });

  it('logs "Waiting" and retries fetching when data is incomplete', async () => {
    // Mock axios response for an incomplete data fetch
    const mockData = {
      completed: false,
      hotels: [],
    };
    axios.get.mockResolvedValueOnce({ data: mockData });

    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    await act(async () => {
      render(
        <MemoryRouter>
          <HotelSearch />
        </MemoryRouter>
      );
    });

    // Optionally, debug to check the state
    screen.debug();

    // Verify that the "Waiting" message is logged to the console
    expect(consoleSpy).toHaveBeenCalledWith('Waiting...');

    // Clean up the console spy
    consoleSpy.mockRestore();

    // You can add more checks for retry mechanism or loading state if needed
  });

  it('fetches and displays hotels successfully', async () => {
    // Mock axios response for a successful data fetch

    const mockHotels = Array.from({ length: 20 }, (v, i) => ({
      id: "ABC" + i,
      name: `Hotel ${i + 1}`,
      destinationId: 100 + i,
      startDate: `2023-12-${String(i + 1).padStart(2, '0')}`,
      endDate: `2023-12-${String(i + 5).padStart(2, '0')}`,
      address: `Address ${i + 1}`,
      price: 100 + i,
      guests: 2 + (i % 3),
      rooms: 1 + (i % 2),
      currency: 'SGD',
      rating: 1 + (i % 5),
      image_details: {
        prefix: 'https://example.com/',
        suffix: '/image.jpg',
      },
      default_image_index: i % 3,
      trustyou: {
        score: {
          overall: parseFloat((Math.random() * 5).toFixed(1)), // Random rating between 0 and 5
        },
      },
    }));

    const mockData = {
      completed: true,
      hotels: mockHotels,
    };
    axios.get.mockResolvedValueOnce({ data: mockData });

    await act(async () => {
      render(
        <MemoryRouter>
          <HotelSearch />
        </MemoryRouter>
      );
    });

    // Wait for the hotels to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText('Hotel 1')).toBeInTheDocument();
      expect(screen.getByText('Hotel 2')).toBeInTheDocument();
      expect(screen.getByText('Hotel 3')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching hotel data'));

    render(
      <MemoryRouter>
        <HotelSearch />
      </MemoryRouter>
    );

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Error fetching hotel data'));
  });
});

