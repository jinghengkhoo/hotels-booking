// src/components/__tests__/SimplePage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SimplePage from '../SimplePage';

test('renders Hello, World! heading', () => {
    render(<SimplePage />);
    const headingElement = screen.getByText(/Hello, World!/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders This is a simple page paragraph', () => {
    render(<SimplePage />);
    const paragraphElement = screen.getByText(/This is a simple page./i);
    expect(paragraphElement).toBeInTheDocument();
});
