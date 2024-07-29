import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HotelDetails from '../HotelDetails';
import SearchBar from '../SearchBar';
import axios from 'axios';


// Mock the necessary components used in HotelDetails
jest.mock('../NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../SearchBar', () => () => <div data-testid="searchbar">SearchBar</div>);
jest.mock('../hoteldetails/Overview', () => () => <div data-testid="overview">Overview</div>);
jest.mock('../Map', () => () => <div data-testid="map">Map</div>);
jest.mock('../hoteldetails/RoomDisplay', () => () => <div data-testid="roomdisplay">RoomDisplay</div>);
jest.mock('../LoadingIcon', () => () => <div data-testid="loadingicon">Loading...</div>);

jest.mock('axios');

const mockHotelDetails = {
  id: 1,
  name: 'Mock Hotel',
  latitude: 1.3521,
  longitude: 103.8198,
  overview: 'Mock Hotel Overview'
};

const mockRoomDetails = {
  completed: true,
  rooms: [
    { id: 1, name: 'Deluxe Room', price: 100, description: 'A nice deluxe room' },
    { id: 2, name: 'Standard Room', price: 80, description: 'A standard room' },
  ]
};

beforeEach(() => {
  axios.get.mockResolvedValue({ data: mockRoomDetails });
});

test('renders Loading in HotelDetails', () => {
  render(
    <MemoryRouter initialEntries={[{
      pathname: '/hotel/1',
      state: {
        hotelDetails: mockHotelDetails,
        destinationId: '1',
        startDate: '2024-08-01',
        endDate: '2024-08-10',
        guests: 2,
        rooms: 1
      }
    }]}>
      <Routes>
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </MemoryRouter>
  );

  const loadingBarElement = screen.getByTestId('loadingicon');
  expect(loadingBarElement).toBeInTheDocument();
});

test('renders SearchBar in HotelDetails', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/hotel/1',
        state: {
          hotelDetails: mockHotelDetails,
          destinationId: '1',
          startDate: '2024-08-01',
          endDate: '2024-08-10',
          guests: 2,
          rooms: 1
        }
      }]}>
        <Routes>
          <Route path="/hotel/:id" element={<HotelDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the data to be fetched and the component to update
    await waitFor(() => expect(axios.get).toHaveBeenCalled());

    // Wait for the SearchBar to be rendered
    const searchBarElement = await screen.findByTestId('searchbar', {}, { timeout: 4000 });
    expect(searchBarElement).toBeInTheDocument();
  });
});