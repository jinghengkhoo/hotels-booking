import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import BookingFormUI from '../bookingpage/BookingFormUI';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

describe("BookingFormUI", () => {
    const formData = {
        salutation: "Mr",
        firstName: "John",
        lastName: "Doe",
        countryCode: "+65",
        phoneNumber: "123456789",
        emailAddress: "john.doe@example.com",
        adults: 2,
        children: 0,
        messageToHotel: "Test message",
        billingAddressOne: "123 Street",
        billingAddressTwo: "",
        billingAddressPostalCode: 12345,
    };

    const location = {
        state: {
            startDate: "2022-01-01",
            endDate: "2022-01-02",
            roomPrice: 100,
            roomDescription: "Test room",
        },
    };

    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    beforeEach(() => {
        render(
            <MemoryRouter>
                <Elements stripe={stripePromise}>
                    <BookingFormUI
                        errorMsg=""
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        location={location}
                    />
                </Elements>
            </MemoryRouter>
        );
    });

    test("renders salutation input", () => {
        const salutationInput = screen.getByLabelText("Salutation");
        expect(salutationInput).toBeInTheDocument();
    });

    test("renders email address input", () => {
        const emailAddressInput = screen.getByLabelText("Email Address");
        expect(emailAddressInput).toBeInTheDocument();
    });

    test("renders first name input", () => {
        const firstNameInput = screen.getByLabelText("First Name");
        expect(firstNameInput).toBeInTheDocument();
    });

    test("renders last name input", () => {
        const lastNameInput = screen.getByLabelText("Last Name");
        expect(lastNameInput).toBeInTheDocument();
    });

    test("renders phone number input", () => {
        const phoneNumberInput = screen.getByLabelText("Phone Number");
        expect(phoneNumberInput).toBeInTheDocument();
    });

    test("renders adults input", () => {
        const adultsInput = screen.getByLabelText("Adults");
        expect(adultsInput).toBeInTheDocument();
    });

    test("renders children input", () => {
        const childrenInput = screen.getByLabelText("Children");
        expect(childrenInput).toBeInTheDocument();
    });

    test("renders messageToHotel input", () => {
        const messageToHotelInput = screen.getByLabelText("Message to Hotel");
        expect(messageToHotelInput).toBeInTheDocument();
    });

    // test("renders Billing Address input", () => {
    //     const messageToHotelInput = screen.getByLabelText("Billing Address Line 1");
    //     const messageToHotelInput2 = screen.getByLabelText("Billing Address Line 2");
    //     const messageToHotelInputPC = screen.getByLabelText("Billing Address Postal Code");
    //     expect(messageToHotelInput).toBeInTheDocument();
    //     expect(messageToHotelInput2).toBeInTheDocument();
    //     expect(messageToHotelInputPC).toBeInTheDocument();
    // });

    test("calls handleSubmit when the form is submitted", () => {
        const form = screen.getByRole("button", { name: "Make Booking" });
        fireEvent.submit(form);
        expect(handleSubmit).toHaveBeenCalled();
    });
});
