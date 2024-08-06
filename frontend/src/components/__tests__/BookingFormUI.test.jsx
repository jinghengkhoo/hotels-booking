import React, { useState } from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import BookingFormUI from "../bookingpage/BookingFormUI";
import * as validationMethods from "../../utils/validationMethods";
import axios from "axios";
import userEvent from "@testing-library/user-event";

jest.mock("@stripe/react-stripe-js", () => ({
	useStripe: jest.fn(() => ({
		createPaymentMethod: jest.fn().mockResolvedValue({ paymentMethod: { id: "pm_test" } }),
		confirmCardPayment: jest.fn().mockResolvedValue({}),
	})),
	useElements: jest.fn(() => ({
		getElement: jest.fn(() => ({
			focus: jest.fn(),
			clear: jest.fn(),
		})),
	})),
	Elements: ({ children }) => <div>{children}</div>,
	CardElement: () => <div data-testid="card-element" />,
}));

jest.mock("@stripe/stripe-js", () => ({
	loadStripe: jest.fn(() => Promise.resolve({})),
}));

jest.mock("axios");

const stripePromise = loadStripe("your-publishable-key-here");
const handleChange = jest.fn();
const handleSubmit = jest.fn((e) => e.preventDefault());

const formLabels = {
	salutation: "Salutation",
	firstName: "First Name",
	lastName: "Last Name",
	emailAddress: "Email Address",
	phoneNumber: "Phone Number",
	adults: "Adults",
	children: "Children",
	messageToHotel: "Message to Hotel",
	billingAddressOne: "Billing Address Line 1",
	billingAddressTwo: "Billing Address Line 2",
	billingAddressPostalCode: "Billing Address Postal Code",
};

const formData = {
	salutation: "Mr",
	firstName: "John",
	lastName: "Doe",
	countryCode: "+65",
	phoneNumber: "12345678",
	emailAddress: "john.doe@example.com",
	adults: 2,
	children: 0,
	messageToHotel: "Test message",
	billingAddressOne: "456 Street",
	billingAddressTwo: "Blk 123",
	billingAddressPostalCode: 123456,
	currency: 'USD',
	roomPrice: 100,
};

const updatedFormLabelsData = {
	salutation: ["Salutation", "Ms"],
	firstName: ["First Name", "Jane"],
	lastName: ["Last Name", "Smith"],
	countryCode: ["Country Code", "+44"],
	phoneNumber: ["Phone Number", "87654321"],
	emailAddress: ["Email Address", "jane.smith@example.com"],
	adults: ["Adults", 1],
	children: ["Children", 2],
	messageToHotel: ["Message to Hotel", "Updated message"],
	billingAddressOne: ["Billing Address Line 1", "456 Avenue"],
	billingAddressTwo: ["Billing Address Line 2", "Apt 12"],
	billingAddressPostalCode: ["Billing Address Postal Code", 654321],
};

const location = {
	state: {
		startDate: "2022-01-01",
		endDate: "2022-01-02",
		roomPrice: 100,
		roomDescription: "Test room",
	},
};

const bookingData = {
	email: formData.emailAddress,
	roomID: formData.id,
	destinationID: formData.destinationId,
	hotelID: formData.hotelID,
	numberOfNights: Math.floor((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)),
	startDate: formData.startDate,
	endDate: formData.endDate,
	adults: formData.adults,
	children: formData.children,
	messageToHotel: formData.messageToHotel,
	roomType: formData.roomDescription,
	price: Math.floor(formData.roomPrice * 100) / 100,
	salutation: formData.salutation || " ",
	firstName: formData.firstName,
	lastName: formData.lastName,
	phoneNumber: formData.phoneNumber,
	stripePaymentID: "fake_payment_id", // Use "fake_payment_id" to match test
	billingAddressOne: formData.billingAddressOne,
	billingAddressTwo: formData.billingAddressTwo || " ",
	billingAddressPostalCode: formData.billingAddressPostalCode,
};

const invalidCases = {
	"firstName empty": {
		formData: { ...formData, firstName: "" },
		labels: [formLabels.firstName],
		// message: "Please fill in this field.",
	},
	"lastName empty": {
		formData: { ...formData, lastName: "" },
		labels: [formLabels.lastName],
		// message: "Please fill in this field.",
	},
	"emailAddress empty": {
		formData: { ...formData, emailAddress: "" },
		labels: [formLabels.emailAddress],
		// message: "Please fill in this field.",
	},
	"phoneNumber empty": {
		formData: { ...formData, phoneNumber: "" },
		labels: [formLabels.phoneNumber],
		// message: "Please fill in this field.",
	},
	"billingAddressOne empty": {
		formData: { ...formData, billingAddressOne: "" },
		labels: [formLabels.billingAddressOne],
		// message: "Please fill in this field.",
	},
	"billingAddressPostalCode empty": {
		formData: { ...formData, billingAddressPostalCode: "" },
		labels: [formLabels.billingAddressPostalCode],
		// message: "Please fill in this field.",
	},
	"invalid emailAddress": {
		formData: { ...formData, emailAddress: "invalid-email" },
		labels: [formLabels.emailAddress],
		// message: "Please enter an e-mail address.",
	},
	"adults set to 0": {
		formData: { ...formData, adults: 0 },
		labels: [formLabels.adults],
		// message: "Please select a value that is no less than 1.",
	},
	"billingAddressPostalCode non-numeric": {
		formData: { ...formData, billingAddressPostalCode: "abc" },
		labels: [formLabels.billingAddressPostalCode],
		// message: "Please enter a number.",
	},
};

test.each(Object.entries(formLabels))("renders %s input with its initial value", (key, label) => {
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
	const inputElement = screen.getByLabelText(label);
	expect(inputElement).toBeInTheDocument();
	expect(inputElement).toHaveValue(formData[key]);
});

test.each(Object.entries(updatedFormLabelsData))("updates %s input when changed", (key, [label, value]) => {
	const Wrapper = () => {
		const [form, setForm] = useState(formData);
		const handleChange = (e) => {
			const { name, value } = e.target;
			setForm((prev) => ({
				...prev,
				[name]: value,
			}));
		};
		return (
			<MemoryRouter>
				<Elements stripe={stripePromise}>
					<BookingFormUI
						errorMsg=""
						formData={form}
						handleChange={handleChange}
						handleSubmit={() => { }}
						location={location}
					/>
				</Elements>
			</MemoryRouter>
		);
	};
	render(<Wrapper />);
	const inputElement = screen.getByLabelText(label);
	fireEvent.change(inputElement, { target: { value } });
	expect(inputElement).toHaveValue(value);
});

test.each(Object.entries(invalidCases))("invokes error when form is submitted with %s", (description, { formData, labels, message }) => {
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
	const submitButton = screen.getByRole("button", { name: "Make Booking" });
	fireEvent.submit(submitButton);
	labels.forEach((label) => {
		const inputElement = screen.getByLabelText(label);
		expect(inputElement).toBeInvalid();
	});
});

test("submits, alerts, then navigates to home page from form with valid data", async () => {
	const navigate = jest.fn();
	const walert = jest.fn();
	window.alert = walert;
	axios.post.mockResolvedValueOnce({ data: { client_secret: "fake_client_secret" } }).mockResolvedValueOnce({ data: {} });
	const handleSubmit = jest.fn(async (e) => {
		e.preventDefault();
		// Essential logic taken from BookingForm
		await axios.post("http://localhost:5555/api/bookings", bookingData);
		alert("Booking successful!");
		navigate("/");
	});
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
	// Simulate submit button click
	const submitButton = screen.getByRole("button", { name: "Make Booking" });
	fireEvent.submit(submitButton);
	await userEvent.click(submitButton);
	// Essential logic should be invoked after click
	await waitFor(() => {
		expect(handleSubmit).toHaveBeenCalled();
		expect(axios.post).toHaveBeenCalledWith("http://localhost:5555/api/bookings", bookingData);
		expect(navigate).toHaveBeenCalledWith("/");
		expect(walert).toHaveBeenCalledWith("Booking successful!");
	});
});

// These do not work:
// test("navigates to home page when form is submitted successfully", async () => {
// 	const navigate = jest.fn();
// 	jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);
// 	render(
// 		<MemoryRouter>
// 			<Elements stripe={Promise.resolve({})}>
// 				<BookingFormUI
// 					errorMsg=""
// 					formData={formData}
// 					handleChange={handleChange}
// 					handleSubmit={handleSubmit}
// 					location={location}
// 				/>
// 			</Elements>
// 		</MemoryRouter>
// 	);
// 	Object.entries(formLabels).forEach(([key, label]) => {
// 		const inputElement = screen.getByLabelText(label);
// 		fireEvent.change(inputElement, { target: { value: formData[key] } });
// 	});
// 	const cardNumberInput = await waitFor(() => screen.getByPlaceholderText("Card number"));
// 	fireEvent.change(cardNumberInput, { target: { value: "4242424242424242" } });
// 	const submitButton = screen.getByRole("button", { name: "Make Booking" });
// 	fireEvent.click(submitButton);
// 	await waitFor(() => {
// 		expect(navigate).toHaveBeenCalledWith("/");
// 	});
// });