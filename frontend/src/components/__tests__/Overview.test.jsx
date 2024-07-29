import React from 'react';
import { render, screen } from '@testing-library/react';
import Overview from '../hoteldetails/Overview';

const mockHotelDetails = {
    name: 'Mock Hotel',
    address: '123 Mock Street',
    description: 'A nice hotel',
};

const mockRoomDetails = {
    completed: true,
    rooms: [
        { id: 1, name: 'Deluxe Room', price: 100, description: 'A nice deluxe room' },
        { id: 2, name: 'Standard Room', price: 80, description: 'A standard room' },
    ],
};

jest.mock('../hoteldetails/ImageCarousel', () => {
    return () => <div data-testid="image-carousel">Image Carousel</div>
});

test('renders Overview component with hotel details', () => {
    render(<Overview hotelDetails={mockHotelDetails} roomDetails={mockRoomDetails} />);
    screen.debug();

    const hotelNameElement = screen.getByText('Mock Hotel');
    const hotelAddressElement = screen.getByText('123 Mock Street');

    expect(hotelNameElement).toBeInTheDocument();
    expect(hotelAddressElement).toBeInTheDocument();
    expect(screen.getByText('A nice hotel')).toBeInTheDocument();

});

test('renders Overview component with default selected tab', () => {
    render(<Overview hotelDetails={mockHotelDetails} roomDetails={mockRoomDetails} />);

    const overviewTabElement = screen.getByText('Overview');
    const infoTabElement = screen.getByText('Info & Prices');
    const facilitiesTabElement = screen.getByText('Facilities');
    const reviewsTabElement = screen.getByText('Reviews');

    expect(overviewTabElement).toHaveClass('border-b-2 border-accent');
    expect(infoTabElement).not.toHaveClass('border-b-2 border-accent');
    expect(facilitiesTabElement).not.toHaveClass('border-b-2 border-accent');
    expect(reviewsTabElement).not.toHaveClass('border-b-2 border-accent');
});

test('renders correct content based on selected tab', () => {
    render(<Overview hotelDetails={mockHotelDetails} roomDetails={mockRoomDetails} />);

    const overviewTabElement = screen.getByText('Overview');
    const infoTabElement = screen.getByText('Info & Prices');
    const facilitiesTabElement = screen.getByText('Facilities');
    const reviewsTabElement = screen.getByText('Reviews');

    // Click on the "Info & Prices" tab
    infoTabElement.click();

    // "Info & Prices" is rendered
    const infoContentElement = screen.getByText('Info & Prices');
    expect(infoContentElement).toBeInTheDocument();

    // Click on the "Facilities" tab
    facilitiesTabElement.click();

    // Verify that the content for "Facilities" is rendered
    const facilitiesContentElement = screen.getByText('Facilities');
    expect(facilitiesContentElement).toBeInTheDocument();

    // Click on the "Reviews" tab
    reviewsTabElement.click();

    // Verify that the content for "Reviews" is rendered
    const reviewsContentElement = screen.getByText('Reviews');
    expect(reviewsContentElement).toBeInTheDocument();

    // Click on the "Overview" tab
    overviewTabElement.click();

    // Verify that the default content for "Overview" is rendered
    const overviewContentElement = screen.getByText('Overview');
    expect(overviewContentElement).toBeInTheDocument();
});