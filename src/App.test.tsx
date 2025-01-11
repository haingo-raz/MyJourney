import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Account from './pages/Account/Account';
import SignUpForm from './components/Forms/SignUpForm';
import axios from 'axios';
import { jest } from '@jest/globals';

jest.mock('axios');

describe('App Component', () => {
  // SignUpForm tests
  test('renders signup screen', () => {
    render(
      <MemoryRouter>
        <Account component={<SignUpForm />} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/CREATE A NEW ACCOUNT/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Join today/i)).toBeInTheDocument();
  });

  test('successful signup', async () => {
    // Mock axios post request for successful signup
    (axios.post as jest.Mock).mockResolvedValue({
      data: 'Success',
    });

    render(
      <MemoryRouter>
        <Account component={<SignUpForm />} />
      </MemoryRouter>,
    );

    const newEmail = 'newuser@test.com';
    const newPassword = 'newpassword';

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: newEmail },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: newPassword },
    });
    fireEvent.click(screen.getByText(/Join today/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Account created successfully. You can now log in/i),
      ).toBeInTheDocument();
    });
  });
});
