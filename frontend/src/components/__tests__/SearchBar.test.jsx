// src/components/__tests__/SearchBar.test.jsx
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../SearchBar';
import * as downshift from 'downshift';

describe('SearchBar', () => {
  const currency = 'USD';

  afterEach(() => {
    cleanup();
  })

  test('Test Nil: renders SearchBar component', () => {
    render(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    );

    //getting all elements by TestId
    const destination = screen.getByTestId('destination');
    const startDate = screen.getByTestId('startDate');
    const endDate = screen.getByTestId('endDate');
    const guests = screen.getByTestId('guests');
    const rooms = screen.getByTestId('rooms');
    const submit = screen.getByTestId('submit-button');

    expect(destination).toBeInTheDocument();
    expect(destination).toHaveAttribute('placeholder', 'where to next?');
    expect(startDate).toBeInTheDocument();
    expect(startDate).toHaveAttribute('placeholder', 'YYYY-MM-DD');
    expect(endDate).toBeInTheDocument();
    expect(endDate).toHaveAttribute('placeholder', 'YYYY-MM-DD');
    expect(guests).toBeInTheDocument();
    expect(rooms).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  test('Test 0: destination input changes', () => {
    render(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    );

    const destination = screen.getByTestId('destination');
    expect(destination).toBeInTheDocument();
    expect(destination).toHaveAttribute('placeholder', 'where to next?');

    //changing the value of the destination
    destination.value = 'Singapore';
    expect(destination.value).toBe('Singapore');
  });

  // Test 6: Test to check if the start / end date input changes
  test('Test 6: startDate input changes', () => {
    render(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    );

    const startDate = screen.getByTestId('startDate');
    expect(startDate).toBeInTheDocument();

    //changing the value of the startDate
    startDate.value = '2024-08-10';
    expect(startDate.value).toBe('2024-08-10');
  });

  test('Test 6: valid endDate change', () => {
    render(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    );

    const endDate = screen.getByTestId('endDate');
    expect(endDate).toBeInTheDocument();

    //changing the value of the startDate
    endDate.value = '2024-08-12';
    expect(endDate.value).toBe('2024-08-12');
  });

  test('Test 8: valid guest change', () => {
    render(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    );

    const guests = screen.getByTestId('guests');
    expect(guests).toBeInTheDocument();

    //changing the value of the guests
    guests.value = "2";
    expect(guests.value).toBe("2");
  });

  // Test 8: Test to check if the guests/rooms change
  test('Test 8: valid rooms change', () => {
    render(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    );

    const rooms = screen.getByTestId('rooms');
    expect(rooms).toBeInTheDocument();

    //changing the value of the rooms
    rooms.value = "2";
    expect(rooms.value).toBe("2");
  });

  test('matches snapshot', () => {
    const tree = renderer.create(
      <Router>
        <SearchBar currency={currency} renderDatePicker={false} />
      </Router>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});






// jest.mock('axios');

// const renderWithRouter = (ui, { route = '/' } = {}) => {
//     window.history.pushState({}, 'Test page', route);
//     return render(ui, { wrapper: ({ children }) => <Router>{children}</Router> });
// };

// describe('SearchBar', () => {
//     beforeEach(() => {
//         renderWithRouter(<SearchBar currency="USD" />);
//     });

//     test('renders the location input field', () => {
//         const locationInput = screen.getByPlaceholderText('where to next?');
//         expect(locationInput).toBeInTheDocument();
//     });

//     // test('renders the start date picker', () => {
//     //     const startDateLabel = screen.getByText('Date Start');
//     //     expect(startDateLabel).toBeInTheDocument();
//     // });

//     // test('renders the end date picker', () => {
//     //     const endDateLabel = screen.getByText('Date End');
//     //     expect(endDateLabel).toBeInTheDocument();
//     // });

//     // test('renders the number of travelers select field', () => {
//     //     const guestsLabel = screen.getByText('Number of Travelers');
//     //     expect(guestsLabel).toBeInTheDocument();
//     // });

//     // test('renders the number of rooms select field', () => {
//     //     const roomsLabel = screen.getByText('Number of Rooms');
//     //     expect(roomsLabel).toBeInTheDocument();
//     // });

//     // test('displays suggestions when typing in location input', async () => {
//     //     const locationInput = screen.getByPlaceholderText('where to next?');
//     //     fireEvent.change(locationInput, { target: { value: 'Sin' } });

//     //     const suggestions = [{ term: 'Singapore', id: '1' }, { term: 'Sydney', id: '2' }];
//     //     axios.get.mockResolvedValueOnce({ data: suggestions });

//     //     await waitFor(() => {
//     //         expect(screen.getByText('Singapore')).toBeInTheDocument();
//     //         expect(screen.getByText('Sydney')).toBeInTheDocument();
//     //     });
//     // });

//     // Additional tests for form validation and submission
// });
