import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import axios from 'axios';

jest.mock('axios');
const mockedPost = axios.post as jest.Mock;

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
  });

  it('renders all required form fields', () => {
    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    expect(screen.getByText(/CREATE A NEW ACCOUNT/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Join today/i }),
    ).toBeInTheDocument();
  });

  it('shows a success message after a successful signup', async () => {
    mockedPost.mockResolvedValue({ data: 'Success' });

    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'newuser@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'newpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Join today/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Account created successfully. You can now log in/i),
      ).toBeInTheDocument();
    });
  });

  it('shows an error message when the email is already registered', async () => {
    mockedPost.mockRejectedValue({
      response: { data: { message: 'User already exists' } },
    });

    render(
      <MemoryRouter>
        <SignUpForm />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'existing@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Join today/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/An account with this email already exists/i),
      ).toBeInTheDocument();
    });
  });
});
