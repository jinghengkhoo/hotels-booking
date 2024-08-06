import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthContext } from '../../context/AuthContext';
import Login from "../pages/Login";
import Register from '../pages/Register';

const mockAxios = new MockAdapter(axios);

describe('login component', () => {
  const setUser = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
  });

  test('renders login form', () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
});

  test('email input changes', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(emailInput, 'test@gmail.com');

    await waitFor(() => {
      expect(emailInput.value).toBe('test@gmail.com');
    });
  });

  test('password input changes', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(passwordInput, 'password123$');

    await waitFor(() => {
      expect(passwordInput.value).toBe('password123$');
    });
  });

});