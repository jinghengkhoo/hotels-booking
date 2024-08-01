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

  test('successful registration', async () => {
    mockAxios.onPost('http://localhost:5555/api/user/register').reply(200);
    mockAxios.onPost('http://localhost:5555/api/user/login').reply(200);
    mockAxios.onGet('http://localhost:5555/api/user/profile').reply(200, { name: 'John' });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId("password-field");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const submitButton = screen.getByRole('button', { name: /continue/i });

    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(nameInput, 'John');
    await userEvent.type(passwordInput, 'password123$');
    await userEvent.type(confirmPasswordInput, 'password123$');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith({ name: 'John' });
    });
  });

  test('shows error message on error during registration', async () => {
    mockAxios.onPost('http://localhost:5555/api/user/login').reply(401, {
      message: 'An error occurred during registration'
    });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId("password-field");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const submitButton = screen.getByRole('button', { name: /continue/i });
    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(passwordInput, 'password123$');
    await userEvent.type(confirmPasswordInput, 'password123$');
    await userEvent.type(nameInput, 'John');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/An error occurred during registration/i)).toBeInTheDocument();
    });
  });

  test('shows validation error when fields are empty', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /continue/i });

    await userEvent.click(submitButton);

    // Check if the input fields are invalid one by one
    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId("password-field");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    expect(nameInput).toBeInvalid();

    await userEvent.type(nameInput, "John");
    await userEvent.click(submitButton);
    expect(emailInput).toBeInvalid();

    await userEvent.type(emailInput, "test@email.com");
    await userEvent.click(submitButton);
    expect(passwordInput).toBeInvalid();

    await userEvent.type(passwordInput, "password123$");
    await userEvent.click(submitButton);

    expect(confirmPasswordInput).toBeInvalid();
  });

  test('navigate to login page', async () => {
    render(
        <AuthContext.Provider value={{ setUser }}>
          <MemoryRouter>
            <Login/>
            <Register/>
          </MemoryRouter>
        </AuthContext.Provider>
      );

        await userEvent.click(screen.getByRole('button', { name: /sign in/i }));
        expect(screen.getByText(/Continue your adventure/i)).toBeInTheDocument();    
  });

  test('password not strong enough', async () => {
    mockAxios.onPost('http://localhost:5555/api/user/login').reply(401, {
      message: 'Password must be at least 8 characters long and include a number and a special character'
    });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId("password-field");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const submitButton = screen.getByRole('button', { name: /continue/i });
    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password123');
    await userEvent.type(nameInput, 'John');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters long and include a number and a special character/i)).toBeInTheDocument();
    });
  });

  test('passwords do not match', async () => {
    mockAxios.onPost('http://localhost:5555/api/user/login').reply(401, {
      message: 'Passwords do not match'
    });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId("password-field");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const submitButton = screen.getByRole('button', { name: /continue/i });
    await userEvent.type(emailInput, 'test@email.com');
    await userEvent.type(passwordInput, 'password123#');
    await userEvent.type(confirmPasswordInput, 'password123');
    await userEvent.type(nameInput, 'John');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });


  test('invalid email format', async () => {
    mockAxios.onPost('http://localhost:5555/api/user/login').reply(401, {
      message: 'Invalid email format'
    });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const nameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByTestId("password-field");
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    const submitButton = screen.getByRole('button', { name: /continue/i });
    await userEvent.type(emailInput, 'test@gmail');
    await userEvent.type(passwordInput, 'password123@');
    await userEvent.type(confirmPasswordInput, 'password123@');
    await userEvent.type(nameInput, 'John');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email format/i)).toBeInTheDocument();
    });
  });

});