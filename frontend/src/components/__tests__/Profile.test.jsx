// Profile.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, jest, test } from "@jest/globals";
import Profile from "../pages/Profile.jsx";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider, AuthContext } from "../../context/AuthContext";

jest.mock("axios");

const mockUserData = {
  _id: "1",
  email: "test@example.com",
  password: "",
  bookingIDs: [],
  salutation: "Mr.",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "12345678",
  billingAddressOne: "123 Main St",
  billingAddressTwo: "",
  billingAddressPostalCode: "123456",
};

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{ user: mockUserData, setUser: jest.fn(), logout: jest.fn() }}
    >
      {children}
    </AuthContext.Provider>
  );
};

describe("Profile component", () => {
  const user = jest.fn();
  const setUser = jest.fn();
  const logout = jest.fn();

  test("Renders the necessary table if no account", () => {
    render(
      <AuthContext.Provider value={{ user, setUser, logout }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.queryByTestId("salutationField")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("emailField")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("firstNameField")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("lastNameField")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("phoneNumberField")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("billingOneField")).toBeEmptyDOMElement();
    expect(screen.queryByTestId("billingTwoField")).toBeEmptyDOMElement();
    expect(screen.getByTestId("postalCodeField")).toHaveTextContent(0);
  });

  test("Does not render Edit and Delete buttons if no account", () => {
    render(
      <AuthContext.Provider value={{ user, setUser, logout }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByTestId("noEditButton")).toBeInTheDocument();
    expect(screen.getByTestId("noDeleteButton")).toBeInTheDocument();
  });

  test("Profile Page reflect Account Details when logged in", async () => {
    axios.get.mockResolvedValue({ data: mockUserData });
    render(
      <AuthContext.Provider value={{ user, setUser, logout }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(await screen.findByTestId("salutationField")).toHaveTextContent(
      "Mr."
    );
    expect(await screen.findByTestId("emailField")).toHaveTextContent(
      "test@example.com"
    );
    expect(await screen.findByTestId("firstNameField")).toHaveTextContent(
      "John"
    );
    expect(await screen.findByTestId("lastNameField")).toHaveTextContent("Doe");
    expect(await screen.findByTestId("phoneNumberField")).toHaveTextContent(
      "12345678"
    );
    expect(await screen.findByTestId("billingOneField")).toHaveTextContent(
      "123 Main St"
    );
    expect(await screen.findByTestId("billingTwoField")).toHaveTextContent("");
    expect(await screen.findByTestId("postalCodeField")).toHaveTextContent(
      123456
    );
  });

  test("Profile Page show Edit and Delete Buttons when logged in", async () => {
    axios.get.mockResolvedValue({ data: mockUserData });
    render(
      <AuthContext.Provider value={{ user, setUser, logout }}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(await screen.findByTestId("editButton")).toBeInTheDocument();
    expect(await screen.findByTestId("deleteButton")).toBeInTheDocument();
  });
});
