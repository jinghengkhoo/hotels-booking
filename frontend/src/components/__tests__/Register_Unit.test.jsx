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

describe('register component', () => {
  const setUser = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
  });

    test('renders register form', () => {
      render(
        <AuthContext.Provider value={{ setUser }}>
          <MemoryRouter>
            <Register />
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByTestId("password-field")).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
      expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  test('email input changes', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);

    await userEvent.type(emailInput, 'test@gmail.com');

    await waitFor(() => {
      expect(emailInput.value).toBe('test@gmail.com');
    });
  })

  test('password input changes', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const passwordInput = screen.getByTestId("password-field");

    await userEvent.type(passwordInput, 'password123$');

    await waitFor(() => {
      expect(passwordInput.value).toBe('password123$');
    });
  });

  test('confirm password input changes', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await userEvent.type(confirmPasswordInput, 'password123$');

    await waitFor(() => {
      expect(confirmPasswordInput.value).toBe('password123$');
    });
  }); 

  test('full name input changes', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);

    await userEvent.type(nameInput, 'John Doe');

    await waitFor(() => {
      expect(nameInput.value).toBe('John Doe');
    });
  }); 

});