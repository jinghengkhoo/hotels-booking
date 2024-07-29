// HotelSearch.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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

  // it('renders hotel list after loading', async () => {
  //   const hotels = [
  //     {
  //       id: 1,
  //       name: 'Hotel 1',
  //       price: 100,
  //     },
  //     {
  //       id: 2,
  //       name: 'Hotel 2',
  //       price: 150,
  //     },
  //     {
  //       id: 3,
  //       name: 'Hotel 3',
  //       price: 150,
  //     },
  //     {
  //       id: 4,
  //       name: 'Hotel 4',
  //       price: 100,
  //     },
  //     {
  //       id: 5,
  //       name: 'Hotel 5',
  //       price: 150,
  //     },
  //     {
  //       id: 6,
  //       name: 'Hotel 6',
  //       price: 150,
  //     },
  //     {
  //       id: 7,
  //       name: 'Hotel 7',
  //       price: 150,
  //     },
  //     {
  //       id: 8,
  //       name: 'Hotel 8',
  //       price: 100,
  //     },
  //     {
  //       id: 9,
  //       name: 'Hotel 9',
  //       price: 150,
  //     },
  //     {
  //       id: 10,
  //       name: 'Hotel 10',
  //       price: 150,
  //     },
  //   ];

  //   axios.get.mockResolvedValueOnce({
  //     data: { completed: true, hotels },
  //   });

  //   render(
  //     <MemoryRouter>
  //       <HotelSearch />
  //     </MemoryRouter>
  //   );

  //   // Wait for the mock API call and state update
  //   await waitFor(() => {
  //     expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  //   }, { timeout: 3000 });

  //   // Debugging: output the DOM to ensure the hotels are rendered
  //   console.log(loading);
  //   screen.debug();


  //   // Check that hotel data is rendered
  //   expect(screen.getByText('Hotel 1')).toBeInTheDocument();
  //   expect(screen.getByText('Hotel 2')).toBeInTheDocument();
  // });

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


// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import HotelSearch from '../HotelSearch';
// import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';
// import { act } from 'react';
// import axios from 'axios';

// // Mock components
// jest.mock('../HotelList', () => () => <div data-testid="hotel-list" />);
// jest.mock('../LoadingIcon', () => () => <div data-testid="loading-icon" />);
// jest.mock('../NavBar', () => () => <div data-testid="nav-bar" />);
// jest.mock('../SearchBar', () => () => <div data-testid="search-bar" />);

// jest.mock('axios');

// const mockParameters = {
//   state: {
//     destinationId: 'WD0M',
//     startDate: '2024-08-01',
//     endDate: '2024-08-07',
//     guests: 2,
//     rooms: 1,
//   },
// };

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: () => mockParameters,
// }));

// describe('HotelSearch', () => {
//   test('renders Loading in HotelSearch', async () => {
//     axios.get.mockResolvedValueOnce({
//       data: {
//         completed: true,
//         currency: 'SGD',
//         hotels: [
//           { id: '1', name: 'ROOM INN VATICAN', price: 254.17 },
//           { id: '2', name: 'Rome Times Hotel', price: 457.26 },
//         ],
//       },
//     });

//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <HotelSearch />
//         </MemoryRouter>
//       );
//     });
//     screen.debug();
//     expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
//   });

// test('renders HotelSearch component correctly', async () => {
//   axios.get.mockResolvedValueOnce({
//     data: {
//       completed: true,
//       currency: 'SGD',
//       hotels: [
//         { id: '1', name: 'ROOM INN VATICAN', price: 254.17 },
//         { id: '2', name: 'Rome Times Hotel', price: 457.26 },
//       ],
//     },
//   });

//   await act(async () => {
//     render(
//       <MemoryRouter>
//         <HotelSearch />
//       </MemoryRouter>
//     );
//   });

//   screen.debug();

//   // Check if the NavBar and SearchBar components are rendered
//   expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
//   expect(screen.getByTestId('search-bar')).toBeInTheDocument();

//   // Check if the HotelList component is rendered after loading
//   expect(screen.getByTestId('hotel-list')).toBeInTheDocument();
// });
// })

// const mockParameters = {
//   state: {
//     destination_id: 'WD0M',
//     checkin: '2024-08-01',
//     chekout: '2024-08-07',
//     lang: 'en_US',
//     currency: 'SGD',
//     guests: 2,
//     partner_id: 1
//   },
// };

// const mockHotelDetails = {
//   completed: true,
//   currency: 'SGD',
//   hotels: [
//     { id: '1', name: 'ROOM INN VATICAN', price: 254.17 },
//     { id: '2', name: 'Rome Times Hotel', price: 457.26 },
//   ],
// };

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: () => mockParameters,
// }));

// describe('HotelSearch', () => {
//   test('renders HotelSearch component correctly', async () => {
//     axios.get.mockResolvedValueOnce({
//       data: {
//         completed: true,
//         currency: 'SGD',
//         hotels: [
//           { id: '1', name: 'ROOM INN VATICAN', price: 254.17 },
//           { id: '2', name: 'Rome Times Hotel', price: 457.26 },
//         ],
//       },
//     });

//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <HotelSearch />
//         </MemoryRouter>
//       );
//     });

//     screen.debug();

//     // Check if the NavBar and SearchBar components are rendered
//     expect(screen.getByTestId('nav-bar')).toBeInTheDocument();
//     expect(screen.getByTestId('search-bar')).toBeInTheDocument();

//     // Check if the HotelList component is rendered after loading
//     expect(screen.getByTestId('hotel-list')).toBeInTheDocument();
//   });

//   test('displays an error message when fetching hotels fails', async () => {
//     axios.get.mockRejectedValueOnce(new Error('Error fetching hotel data'));

//     await act(async () => {
//       render(
//         <MemoryRouter>
//           <HotelSearch />
//         </MemoryRouter>
//       );
//     });

//     // Check if an error message is displayed
//     expect(screen.getByRole('alert')).toHaveTextContent('Error fetching hotel data');
//   });
// });

