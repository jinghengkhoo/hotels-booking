import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw';
import HotelDetails from '../HotelDetails';
import LoadingIcon from '../LoadingIcon';

const hotelDetailsMock = {
  name: 'Mock Hotel',
  address: '123 Mock St',
  latitude: 1.2921,
  longitude: 103.7761,
  image_details: {
    prefix: 'https://example.com/',
    suffix: '.jpg',
  },
  hires_image_index: '1,2,3',
  description: '<p>Mock hotel description</p>',
};

const roomDetailsMock = [
  { key: '1', price: '100', description: 'Room 1' },
  { key: '2', price: '150', description: 'Room 2' },
];

const server = setupServer(
  rest.get('http://localhost:5555/api/hotels/:id/price', (req, res, ctx) => {
    return res(ctx.json({ completed: true, rooms: roomDetailsMock }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  useLocation: () => ({
    state: {
      destinationId: '1',
      startDate: '2023-01-01',
      endDate: '2023-01-05',
      guests: 2,
      rooms: 1,
      hotelDetails: hotelDetailsMock,
    },
  }),
  useNavigate: jest.fn(),
}));

describe('HotelDetails', () => {
  test('renders loading icon initially', () => {
    render(
      <BrowserRouter>
        <HotelDetails />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders hotel details and room details after fetching data', async () => {
    render(
      <BrowserRouter>
        <HotelDetails />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText(hotelDetailsMock.name)).toBeInTheDocument());
    expect(screen.getByText(hotelDetailsMock.address)).toBeInTheDocument();
    expect(screen.getByText('See Rates')).toBeInTheDocument();
    expect(screen.getByText('Room 1')).toBeInTheDocument();
    expect(screen.getByText('Room 2')).toBeInTheDocument();
  });

  test('handles room selection correctly', async () => {
    const navigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

    render(
      <BrowserRouter>
        <HotelDetails />
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Room 1')).toBeInTheDocument());
    const room1Button = screen.getByText('Room 1').closest('button');
    room1Button.click();

    expect(navigate).toHaveBeenCalledWith('/book/1', {
      state: {
        hotelID: '123',
        destinationId: '1',
        startDate: '2023-01-01',
        endDate: '2023-01-05',
        roomPrice: '100',
        roomDescription: 'Room 1',
      },
    });
  });
});
