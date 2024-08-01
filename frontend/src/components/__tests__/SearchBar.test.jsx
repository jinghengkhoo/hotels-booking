// src/components/__tests__/SearchBar.test.jsx
import React from 'react';
import { cleanup, render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../SearchBar';
import axios from 'axios';

jest.mock("axios");

describe('SearchBar', () => {
  const currency = 'USD';

  const mockCountries = [
    { term: 'United States', id: '1' },
    { term: 'Canada', id: '2' },
    { term: 'United Kingdom', id: '3' },
    { term: 'Australia', id: '4' },
    { term: 'Germany', id: '5' },
    { term: 'France', id: '6' },
    { term: 'Japan', id: '7' },
    { term: 'China', id: '8' },
    { term: 'India', id: '9' },
    { term: 'Brazil', id: '10' },
    { term: 'Singapore', id: '11' },
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  test('Test Nil: renders SearchBar component', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });

    screen.debug();

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

  test('Test 0: destination input changes', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });

    const destination = screen.getByTestId('destination');
    expect(destination).toBeInTheDocument();
    expect(destination).toHaveAttribute('placeholder', 'where to next?');

    //changing the value of the destination
    fireEvent.change(destination, { target: { value: 'Singapore' } });
    expect(destination.value).toBe('Singapore');
  });

  test('Test 1: Should catch error and log to console on failed API call', async () => {
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => { });
    const mockError = new Error('API Error');

    axios.get.mockResolvedValueOnce({ data: mockCountries });
    axios.get.mockRejectedValueOnce(mockError);

    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });

    // Simulate user typing in the destination input
    const input = screen.getByPlaceholderText('where to next?');
    fireEvent.change(input, { target: { value: 'Test' } });

    // Wait for useEffect to complete and axios to throw an error
    await waitFor(() => {
      expect(consoleErrorMock).toHaveBeenCalledWith(mockError);
    });

    consoleErrorMock.mockRestore();
  });

  // // Test 2: Successful form submission
  // test('Successful form submission', async () => {
  //   axios.get.mockResolvedValueOnce({ data: mockCountries });
  //   await act(async () => {
  //     render(
  //       <Router>
  //         <SearchBar currency={currency} renderDatePicker={false} />
  //       </Router>
  //     );
  //   });

  //   // Fill out the form
  //   fireEvent.change(screen.getByTestId('destination'), { target: { value: 'Singapore' } });
  //   fireEvent.change(screen.getByTestId('startDate'), { target: { value: '2024-08-01' } });
  //   fireEvent.change(screen.getByTestId('endDate'), { target: { value: '2024-08-10' } });
  //   fireEvent.change(screen.getByTestId('guests'), { target: { value: '2' } });
  //   fireEvent.change(screen.getByTestId('rooms'), { target: { value: '1' } });

  //   console.log("destination", screen.getByTestId('destination').value);

  //   // Mock the destinationId (in a real app, this might be set by an API call)
  //   localStorage.setItem('destinationId', '123');

  //   // Submit the form
  //   console.log(screen.getByTestId('submit-button'));
  //   fireEvent.click(screen.getByTestId('submit-button'));
  //   // fireEvent.submit(screen.getByRole('button'));
  //   console.log("locsl storage dest", localStorage.getItem('destination'));
  //   console.log("locsl storage dest", localStorage.getItem('destinationId'));


  //   // Check local storage
  //   expect(localStorage.getItem('destinationId')).toBe('123');
  //   expect(localStorage.getItem('startDate')).toBe('2024-08-01');
  //   expect(localStorage.getItem('endDate')).toBe('2024-08-10');
  //   expect(localStorage.getItem('guests')).toBe('2');
  //   expect(localStorage.getItem('rooms')).toBe('1');

  //   // Check navigation
  //   expect(history.location.pathname).toBe('/hotels');
  //   expect(history.location.state).toEqual({
  //     destinationId: '123',
  //     startDate: '2024-08-01',
  //     endDate: '2024-08-10',
  //     guests: 2,
  //     rooms: 1,
  //     currency,
  //   });
  // });

  // Test 6: Test to check if the start / end date input changes
  test('Test 6: startDate input changes', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });

    const startDate = screen.getByTestId('startDate');
    expect(startDate).toBeInTheDocument();

    //changing the value of the startDate
    fireEvent.change(startDate, { target: { value: '2024-08-10' } });
    expect(startDate.value).toBe('2024-08-10');
  });

  test('Test 6: valid endDate change', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });
    const endDate = screen.getByTestId('endDate');
    expect(endDate).toBeInTheDocument();

    //changing the value of the endDate
    fireEvent.change(endDate, { target: { value: '2024-08-12' } });
    expect(endDate.value).toBe('2024-08-12');
  });

  test('Test 8: valid guest change', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });

    const guests = screen.getByTestId('guests');
    expect(guests).toBeInTheDocument();

    //changing the value of the guests
    fireEvent.change(guests, { target: { value: '2' } });
    expect(guests.value).toBe('2');
  });

  // Test 8: Test to check if the guests/rooms change
  test('Test 8: valid rooms change', async () => {
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    await act(async () => {
      render(
        <Router>
          <SearchBar currency={currency} renderDatePicker={false} />
        </Router>
      );
    });

    const rooms = screen.getByTestId('rooms');
    expect(rooms).toBeInTheDocument();

    //changing the value of the rooms
    fireEvent.change(rooms, { target: { value: '2' } });
    expect(rooms.value).toBe('2');
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
