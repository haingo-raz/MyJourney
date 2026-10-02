import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  const renderNavbar = () =>
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

  it('renders the brand name link', () => {
    renderNavbar();
    expect(screen.getByText(/MyJourney/i)).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderNavbar();
    expect(screen.getByText(/Workout/i)).toBeInTheDocument();
    expect(screen.getByText(/Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  });
});
