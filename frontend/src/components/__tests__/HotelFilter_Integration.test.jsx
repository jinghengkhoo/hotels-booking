import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import HotelSearch from '../HotelSearch';
import userEvent from '@testing-library/user-event'

const user = userEvent.setup();

// Mocking axios
jest.mock('axios');

jest.mock('../NavBar', () => ({
  __esModule: true,
  default: ({ textColor, currency, user }) => <div>Mocked NavBar with textColor: {textColor}, currency: {currency}, user: {user ? user.name : 'Guest'}</div>,
}));

jest.mock('../SearchBar', () => ({
  __esModule: true,
  default: ({ currency }) => <div>Mocked SearchBar with currency: {currency}</div>,
}));

// Mock data
const mockHotels = require('frontend/__mocks__/prices.json');

const mockHotelDetails = {
  HL87: require('frontend/__mocks__/HL87.json'),
  lA7u: require('frontend/__mocks__/lA7u.json'),
  nPbT: require('frontend/__mocks__/nPbT.json'),
  obxM: require('frontend/__mocks__/obxM.json'),
  QRuH: require('frontend/__mocks__/QRuH.json'),
  RcLc: require('frontend/__mocks__/RcLc.json'),
  T9cE: require('frontend/__mocks__/T9cE.json'),
  tYGr: require('frontend/__mocks__/tYGr.json'),
  wcfx: require('frontend/__mocks__/wcfx.json'),
  xU8z: require('frontend/__mocks__/xU8z.json'),

  // Add more mock hotel details here as needed
};

// Mock state for useLocation
const mockState = {
  destinationId: 'RsBU',
  startDate: '2024-10-01',
  endDate: '2024-10-07',
  guests: 2,
  rooms: 1,
  currency: 'SGD',
};

const mockLocation = {
  state: mockState,
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => mockLocation,
}));

describe('HotelSearch', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/hotels/prices')) {
        return Promise.resolve({ data: mockHotels });
      }
      const hotelId = url.split('/').pop();
      return Promise.resolve({ data: mockHotelDetails[hotelId] });
    });
  });

  test('renders the component correctly', () => {
    render(
      <Router>
        <HotelSearch />
      </Router>
    );

    expect(screen.getByText('All prices displayed here are the grand total, inclusive of taxes & fees')).toBeInTheDocument();
  });

  test('fetches and displays hotels data correctly', async () => {
    render(
      <Router>
        <HotelSearch />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Parc Sovereign Hotel Tyrwhitt')).toBeInTheDocument());
    expect(screen.getByText('Hotel 81 Hollywood')).toBeInTheDocument();
  });

  test('filters hotels based on star rating and price range', async () => {
    render(
      <Router>
        <HotelSearch />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Filters')).toBeInTheDocument());

    // Simulate user interaction
    await user.click(screen.getByText('4 stars'));
    await user.click(screen.getByLabelText('5 stars'));   // Select star rating
    fireEvent.change(screen.getByLabelText('Guest Rating'), { target: { value: '50' } });


    // Set price range to [200, 500]
    const sliderHandles = screen.getAllByRole('slider');
    fireEvent.mouseDown(sliderHandles[0], { clientX: 0 });
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);

    fireEvent.mouseDown(sliderHandles[1], { clientX: 1000 });
    fireEvent.mouseMove(document, { clientX: 800 });
    fireEvent.mouseUp(document);

    // Apply the filters
    fireEvent.click(screen.getByText('Apply Filters'));

    await waitFor(() => {
      expect(screen.queryByText('Parc Sovereign Hotel Tyrwhitt')).not.toBeInTheDocument();
      expect(screen.queryByText('Hotel 81 Hollywood')).not.toBeInTheDocument();
    });
  });

  test('User resets filters', async () => {
    render(
      <Router>
        <HotelSearch />
      </Router>
    );

    await waitFor(() => expect(screen.getByText('Filters')).toBeInTheDocument());

    // Simulate user interaction
    await user.click(screen.getByText('4 stars'));
    await user.click(screen.getByLabelText('5 stars'));   // Select star rating
    fireEvent.change(screen.getByLabelText('Guest Rating'), { target: { value: '50' } });


    // Set price range to [200, 500]
    const sliderHandles = screen.getAllByRole('slider');
    fireEvent.mouseDown(sliderHandles[0], { clientX: 0 });
    fireEvent.mouseMove(document, { clientX: 100 });
    fireEvent.mouseUp(document);

    fireEvent.mouseDown(sliderHandles[1], { clientX: 1000 });
    fireEvent.mouseMove(document, { clientX: 800 });
    fireEvent.mouseUp(document);

    // Apply the filters
    await user.click(screen.getByText('Apply Filters'));

    await waitFor(() => {
      expect(screen.queryByText('Parc Sovereign Hotel Tyrwhitt')).not.toBeInTheDocument();
      expect(screen.queryByText('Hotel 81 Hollywood')).not.toBeInTheDocument();
    });

    await user.click(screen.getByText('Reset Filters'));
    await user.click(screen.getByText('Apply Filters'));


    await waitFor(() => {
      expect(screen.getByText('Parc Sovereign Hotel Tyrwhitt')).toBeInTheDocument();
      expect(screen.getByText('Hotel 81 Hollywood')).toBeInTheDocument();
    });

  });
});
