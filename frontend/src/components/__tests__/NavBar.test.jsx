// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { BrowserRouter as Router } from 'react-router-dom';
// import NavBar from '../NavBar';

// describe('NavBar', () => {
//     test('renders the menu button', () => {
//         render(
//             <Router>
//                 <NavBar textColor="white" currency="USD" />
//             </Router>
//         );
//         const menuButton = screen.getByText('MENU');
//         expect(menuButton).toBeInTheDocument();
//     });

//     // test('renders the logo button', () => {
//     //     render(
//     //         <Router>
//     //             <NavBar textColor="white" currency="USD" />
//     //         </Router>
//     //     );
//     //     const logoButton = screen.getByText('Travelust');
//     //     expect(logoButton).toBeInTheDocument();
//     // });

//     // test('renders the currency dropdown', () => {
//     //     render(
//     //         <Router>
//     //             <NavBar textColor="white" currency="USD" />
//     //         </Router>
//     //     );
//     //     const currencyDropdown = screen.getByText('USD');
//     //     expect(currencyDropdown).toBeInTheDocument();
//     // });

//     // test('opens the currency dropdown when clicked', () => {
//     //     render(
//     //         <Router>
//     //             <NavBar textColor="white" currency="USD" />
//     //         </Router>
//     //     );
//     //     const currencyDropdown = screen.getByText('USD');
//     //     fireEvent.click(currencyDropdown);
//     //     const currencyOption = screen.getByText('SGD');
//     //     expect(currencyOption).toBeInTheDocument();
//     // });

//     // test('renders the user icon', () => {
//     //     render(
//     //         <Router>
//     //             <NavBar textColor="white" currency="USD" />
//     //         </Router>
//     //     );
//     //     const userIcon = screen.getByTestId('user-icon');
//     //     expect(userIcon).toBeInTheDocument();
//     // });

//     // test('renders the login button when user is not logged in', () => {
//     //     render(
//     //         <Router>
//     //             <NavBar textColor="white" currency="USD" />
//     //         </Router>
//     //     );
//     //     const loginButton = screen.getByText('Login/Register');
//     //     expect(loginButton).toBeInTheDocument();
//     // });

//     // test('renders the user email and logout button when user is logged in', () => {
//     //     render(
//     //         <Router>
//     //             <NavBar textColor="white" currency="USD" />
//     //         </Router>
//     //     );
//     //     const user = { email: 'test@example.com' };
//     //     const logoutButton = screen.getByText('Logout');
//     //     expect(logoutButton).toBeInTheDocument();
//     // });
// });