import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HotelDetails from '../HotelDetails';
import axios from 'axios';

jest.mock('../NavBar', () => () => <div data-testid="navbar">NavBar</div>);
jest.mock('../SearchBar', () => () => <div data-testid="searchbar">SearchBar</div>);
jest.mock('../hoteldetails/Overview', () => () => <div data-testid="overview">Overview</div>);
jest.mock('../Map', () => () => <div data-testid="map">Map</div>);
jest.mock('../hoteldetails/RoomDisplay', () => () => <div data-testid="roomdisplay">RoomDisplay</div>);
jest.mock('../LoadingIcon', () => () => <div data-testid="loadingicon">Loading...</div>);

jest.mock('axios');

const mockHotelDetails = {
  hotelID: 1,
  name: 'Mock Hotel',
  latitude: 1.3521,
  longitude: 103.8198,
  overview: 'Mock Hotel Overview'
};

const mockState = {

  hotelDetails: mockHotelDetails,
  destinationId: '1',
  startDate: '2024-08-01',
  endDate: '2024-08-10',
  guests: 2,
  rooms: 1
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

describe('HotelDetails', () => {
  test('renders Loading in HotelDetails', () => {
    render(
      <MemoryRouter initialEntries={[{
        pathname: '/hotel/1',
        state: mockState
      }]}>
        <Routes>
          <Route path="/hotel/:id" element={<HotelDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const loadingBarElement = screen.getByTestId('loadingicon');
    expect(loadingBarElement).toBeInTheDocument();
  });

  test('renders HotelDetails component with given state', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={[{ pathname: '/hotel/1', state: mockState }]}>
          <Routes>
            <Route path="/hotel/:id" element={<HotelDetails />} />
          </Routes>
        </MemoryRouter>
      );
    });
    // Add assertions to verify if the component rendered correctly with the state
    // expect(screen.getByText(/Hotel Mock/i)).toBeInTheDocument();
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('searchbar')).toBeInTheDocument();
    expect(screen.getByTestId('overview')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('roomdisplay')).toBeInTheDocument();
  });
});
