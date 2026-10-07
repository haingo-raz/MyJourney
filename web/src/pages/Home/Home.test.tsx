import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  const renderHome = () =>
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

  it('renders the My Journey heading', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { name: /My Journey/i }),
    ).toBeInTheDocument();
  });

  it('renders section headings for Fitness and Chat', () => {
    renderHome();
    expect(screen.getByText(/My Fitness Program/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn about workouts/i)).toBeInTheDocument();
  });

  it("renders two LET'S GO navigation buttons", () => {
    renderHome();
    const buttons = screen.getAllByRole('button', { name: /LET'S GO/i });
    expect(buttons).toHaveLength(2);
  });
});
