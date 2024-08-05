// Profile.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, jest, test } from "@jest/globals";
import ProfileBookingsTable from "../profilepage/ProfileBookingsTable.jsx";
import axios from "axios";

jest.mock("axios");

const mockBookingsData = [
  {
    _id: "1",
    email: "johndoe@example.com",
    roomID: "101",
    destinationID: "5001",
    hotelID: "H001",
    numberOfNights: 3,
    startDate: "2024-08-01T00:00:00.000Z",
    endDate: "2024-08-04T00:00:00.000Z",
    adults: 2,
    children: 1,
    messageToHotel: "Please prepare a crib.",
    roomType: "Deluxe Suite",
    price: 300.0,
    salutation: "Mr.",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: 1234567890,
    stripePaymentID: "stripe_123",
    billingAddressOne: "123 Main St",
    billingAddressTwo: "Apt 4B",
    billingAddressPostalCode: 12345,
  },
  {
    _id: "2",
    email: "janedoe@example.com",
    roomID: "102",
    destinationID: "5002",
    hotelID: "H002",
    numberOfNights: 2,
    startDate: "2024-08-05T00:00:00.000Z",
    endDate: "2024-08-07T00:00:00.000Z",
    adults: 1,
    children: 0,
    messageToHotel: "Late check-in, please.",
    roomType: "Standard Room",
    price: 150.0,
    salutation: "Ms.",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: 9876543210,
    stripePaymentID: "stripe_456",
    billingAddressOne: "456 Elm St",
    billingAddressTwo: "",
    billingAddressPostalCode: 67890,
  },
];

const mockUserData = {
  userData: {
    bookingIDs: ["1", "2"], // Assume these match the mock data IDs
  },
};

describe("Profile Booking Table component", () => {
  test("renders the booking table with mock data", async () => {
    axios.get.mockResolvedValue({
      data: {
        bookingsDetails: mockBookingsData,
      },
    });
    render(<ProfileBookingsTable {...mockUserData} />);
    // Wait for the component to finish loading
    await waitFor(() =>
      expect(screen.queryByText("Loading")).not.toBeInTheDocument()
    );

    // Check if the mock data is rendered
    expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
    expect(screen.getByText("janedoe@example.com")).toBeInTheDocument();

    // Check a few more details to ensure complete rendering
    expect(screen.getByText("Deluxe Suite")).toBeInTheDocument();
    expect(screen.getByText("Standard Room")).toBeInTheDocument();

    // Check if specific cells in the table are rendered
    expect(screen.getByText("101")).toBeInTheDocument(); // Room ID for the first booking
    expect(screen.getByText("Please prepare a crib.")).toBeInTheDocument(); // Message for the first booking
    expect(screen.getByText("Mr.")).toBeInTheDocument(); // Salutation for the first booking
  });
});
