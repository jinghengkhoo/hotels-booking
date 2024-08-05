import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { AuthContext } from "../../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";

const mockAxios = new MockAdapter(axios);

describe("login component", () => {
  const setUser = jest.fn();
  window.alert = jest.fn();

  beforeEach(() => {
    mockAxios.reset();
  });

  test('successful login', async () => {
    mockAxios.onPost('http://localhost:5555/api/user/login').reply(200);
    mockAxios.onGet('http://localhost:5555/api/user/profile').reply(200, { name: 'John' });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /continue/i });

    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith({ name: "John" });
    });
  });

  test("shows error message on failed login", async () => {
    mockAxios.onPost("http://localhost:5555/api/user/login").reply(401, {
      message: "Invalid Account Details",
    });

    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /continue/i });

    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(passwordInput, "password");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid account details/i)).toBeInTheDocument();
    });
  });

  test("shows validation error when fields are empty", async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const submitButton = screen.getByRole("button", { name: /continue/i });

    // Click the submit button without filling the fields
    await userEvent.click(submitButton);

    // Check if the input fields are invalid
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  test("shows validation error when email is empty", async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /continue/i });

    // Fill the password field only
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    // Check if the email input is invalid
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toBeInvalid();
  });

  test('navigate to register page when on login page', async () => {
    render(
      <AuthContext.Provider value={{ setUser }}>
        <MemoryRouter>
          <Login />
          <Register />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(
      screen.getByText(/Ready for your next adventure?/i)
    ).toBeInTheDocument();
  });
});
