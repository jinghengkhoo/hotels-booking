import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HotelFilter from "../hotelsearchpage/HotelFilter";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'

// Mock the onFilterChange function
const mockOnFilterChange = jest.fn();

const user = userEvent.setup();

describe('testing hotel filter panel', () => {
    test('render filter UI', async () => {
      render(<HotelFilter/>);
      expect(screen.getByText('Filters')).toBeInTheDocument();
      expect(screen.getByLabelText('Star Rating')).toBeInTheDocument();
      expect(screen.getByLabelText('Guest Rating')).toBeInTheDocument();
      expect(screen.getByText('Price Range (per night):')).toBeInTheDocument();
      expect(screen.getByText('Apply Filters')).toBeInTheDocument();
      expect(screen.getByText('Reset Filters')).toBeInTheDocument();
    });

    test('check star ratings', async () => {
      render(<HotelFilter onFilterChange={mockOnFilterChange} />);
  
      // Simulate user interaction
      await user.click(screen.getByLabelText('4 stars'));
      await user.click(screen.getByLabelText('5 stars'));   // Select star rating

      expect(screen.getByLabelText('4 stars').checked).toBe(true);
      expect(screen.getByLabelText('5 stars').checked).toBe(true);
  });

    test('uncheck star ratings', async () => {
      render(<HotelFilter onFilterChange={mockOnFilterChange} />);

      // Simulate user interaction
      await user.click(screen.getByLabelText('4 stars'));
      await user.click(screen.getByLabelText('5 stars'));   // Select star rating

      // Check correct display
      await user.click(screen.getByLabelText('4 stars'));
      expect(screen.getByLabelText('4 stars').checked).toBe(false);
      expect(screen.getByLabelText('5 stars').checked).toBe(true);
    });

    test('guest rating changes', async () => {
      render(<HotelFilter onFilterChange={mockOnFilterChange} />);

      // Simulate user interaction
      fireEvent.change(screen.getByLabelText('Guest Rating'), { target: { value: '50' } }); // Input guest rating

      // Check correct display
      expect(screen.getByLabelText('Guest Rating').value).toBe('50');
    });

    test('price range changes', async () => {
      render(<HotelFilter onFilterChange={mockOnFilterChange} />);

      // Simulate user interaction
      const minSlider = screen.getByRole('slider', { name: 'price-range-slider-min' });
      const maxSlider = screen.getByRole('slider', { name: 'price-range-slider-max' });

      fireEvent.change(minSlider, { target: { value: 100 } });    // Select min
      fireEvent.change(maxSlider, { target: { value: 800 } });    // Select max

    // Check correct display
      expect(minSlider.value).toEqual("100");
      expect(maxSlider.value).toEqual("800");
    });
  
    // date selected is from 2024-09-01 to 2024-09-03
    test('click applies filters', async () => {
        render(<HotelFilter onFilterChange={mockOnFilterChange}/>);
    
        // Simulate user interaction
        await user.click(screen.getByLabelText('4 stars'));   // Select star rating
        await user.click(screen.getByLabelText('5 stars'));   // Select star rating
        fireEvent.change(screen.getByLabelText('Guest Rating'), { target: { value: '50' } }); // Input guest rating

        // Simulate user interaction for price range slider
        const minSlider = screen.getByRole('slider', { name: 'price-range-slider-min' });
        const maxSlider = screen.getByRole('slider', { name: 'price-range-slider-max' });
        
        fireEvent.change(minSlider, { target: { value: 100 } });    // Select min
        fireEvent.change(maxSlider, { target: { value: 800 } });    // Select max
    
        // Apply filter
        await user.click(screen.getByText('Apply Filters'));
    
        expect(mockOnFilterChange).toHaveBeenCalledWith(
            expect.objectContaining({
                starRatings: ['4', '5'],
                minGuestRating: '50',
              })
        );
        expect(minSlider.value).toEqual("100");
        expect(maxSlider.value).toEqual("800");
    });
  
    test('click resets filters', async() => {
      render(<HotelFilter onFilterChange={mockOnFilterChange} />);
  
      // Simulate user interaction
      await user.click(screen.getByLabelText('4 stars'));
      await user.click(screen.getByLabelText('5 stars'));   // Select star rating
      fireEvent.change(screen.getByLabelText('Guest Rating'), { target: { value: '50' } });

      // Simulate user interaction for price range slider
      const minSlider = screen.getByRole('slider', { name: 'price-range-slider-min' });
      const maxSlider = screen.getByRole('slider', { name: 'price-range-slider-max' });
      
      fireEvent.change(minSlider, { target: { value: 100 } });
      fireEvent.change(maxSlider, { target: { value: 800 } });
  
      // Apply filter
      await user.click(screen.getByText('Apply Filters'));
  
      expect(mockOnFilterChange).toHaveBeenCalledWith(
          expect.objectContaining({
              starRatings: ['4', '5'],
              minGuestRating: '50',
            })
      );
      expect(minSlider.value).toEqual("100");
      expect(maxSlider.value).toEqual("800");

      // Reset filter
      await user.click(screen.getByText('Reset Filters'));

      fireEvent.change(minSlider, { target: { value: 0 } });
      fireEvent.change(maxSlider, { target: { value: 1000 } });
  
      expect(screen.getByLabelText('Guest Rating').value).toBe('0');
      expect(screen.getByLabelText('4 stars').checked).toBe(false);
      expect(screen.getByLabelText('5 stars').checked).toBe(false);
      expect(minSlider.value).toEqual("0");
      expect(maxSlider.value).toEqual("1000");
    });

  });
