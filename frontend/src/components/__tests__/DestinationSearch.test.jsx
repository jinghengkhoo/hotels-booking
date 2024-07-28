import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DestinationSearch from '../homepage/DestinationSearch';
import singaporeImage from '../../assets/singapore.jpg'; // Correct import for the image
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

jest.mock('../NavBar', () => () => <div data-testid="navbar">NavBar Mock</div>);
jest.mock('../SearchBar', () => () => <div data-testid="searchbar">SearchBar Mock</div>);

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockAuthContextValue = {
  user: { name: 'Test User' },
  logout: jest.fn(),
};

describe('DestinationSearch', () => {
  test('renders NavBar, background image, heading, and SearchBar', () => {
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <DestinationSearch />
        </Router>
      </AuthContext.Provider>
    );

    // Check if NavBar is rendered
    const navBarElement = screen.getByTestId('navbar');
    expect(navBarElement).toBeInTheDocument();

    // Check if the background image is set correctly
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveStyle(`background-image: url(${singaporeImage})`);

    // Check if heading is rendered
    const headingElement = screen.getByText('Singapore, Singapore');
    expect(headingElement).toBeInTheDocument();

    // Check if the subheading is rendered
    const subheadingElement = screen.getByText('Get ready for your next adventure →');
    expect(subheadingElement).toBeInTheDocument();

    // Check if SearchBar is rendered
    const searchBarElement = screen.getByTestId('searchbar');
    expect(searchBarElement).toBeInTheDocument();
  });
  test('matches snapshot', () => {
    const tree = renderer.create(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Router>
          <DestinationSearch />
        </Router>
      </AuthContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
