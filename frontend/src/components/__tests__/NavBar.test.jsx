import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import NavBar from '../NavBar';
import renderer from 'react-test-renderer';

describe('NavBar', () => {
    test('Test 1: renders the menu button', () => {
        render(
            <Router>
                <AuthProvider>
                    <NavBar textColor="white" currency="USD" />
                </AuthProvider>
            </Router>
        );
        const menuButton = screen.getByText('MENU');
        expect(menuButton).toBeInTheDocument();
    });

    test('Test 2: renders the logo button', () => {
        render(
            <Router>
                <AuthProvider>
                    <NavBar textColor="white" currency="USD" />
                </AuthProvider>
            </Router>
        );
        const logoButton = screen.getByText('Travelust');
        expect(logoButton).toBeInTheDocument();
    });

    test('Test 3: renders the currency dropdown', () => {
        render(
            <Router>
                <AuthProvider>
                    <NavBar textColor="white" currency="USD" />
                </AuthProvider>
            </Router>
        );
        const currencyDropdown = screen.getByText('USD');
        expect(currencyDropdown).toBeInTheDocument();
    });

    test('Test 4: opens the currency dropdown when clicked', () => {
        render(
            <Router>
                <AuthProvider>
                    <NavBar textColor="white" currency="USD" />
                </AuthProvider>
            </Router>
        );
        const currencyDropdown = screen.getByText('USD');
        fireEvent.click(currencyDropdown);
        const currencyOption = screen.getByText('SGD');
        expect(currencyOption).toBeInTheDocument();
    });

    test('Test 5: renders the login button when user is not logged in', () => {
        render(
            <Router>
                <AuthProvider>
                    <NavBar textColor="white" currency="USD" />
                </AuthProvider>
            </Router>
        );
        const loginButton = screen.getByText('Login/Register');
        expect(loginButton).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const tree = renderer.create(
            <Router>
                <AuthProvider>
                    <NavBar textColor="white" currency="USD" />
                </AuthProvider>
            </Router>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});