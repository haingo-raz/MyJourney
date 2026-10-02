import React from 'react';
import { render, screen } from '@testing-library/react';
import Account from './Account';

describe('Account', () => {
  it('renders the passed component prop', () => {
    render(<Account component={<div>Test Component Content</div>} />);
    expect(screen.getByText('Test Component Content')).toBeInTheDocument();
  });

  it('renders the brand headline and tagline', () => {
    render(<Account component={<div />} />);
    expect(screen.getByRole('heading', { name: /My journey/i })).toBeInTheDocument();
    expect(
      screen.getByText(/An easier way to manage your workout/i),
    ).toBeInTheDocument();
  });
});
