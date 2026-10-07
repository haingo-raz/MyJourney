import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/reducer/userSlice';
import LoginForm from './LoginForm';
import axios from 'axios';

jest.mock('axios');
const mockedPost = axios.post as jest.Mock;

const store = configureStore({ reducer: { user: userReducer } });

const renderLoginForm = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </Provider>,
  );

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn();
    localStorage.clear();
  });

  it('renders all required form fields', () => {
    renderLoginForm();

    expect(screen.getByText(/LOGIN/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign In/i }),
    ).toBeInTheDocument();
  });

  it('shows an error message for invalid credentials (400)', async () => {
    mockedPost.mockRejectedValue({ response: { status: 400 } });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid email or password/i),
      ).toBeInTheDocument();
    });
  });

  it('shows an error message when the user is not found (404)', async () => {
    mockedPost.mockRejectedValue({ response: { status: 404 } });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'unknown@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(screen.getByText(/User not found/i)).toBeInTheDocument();
    });
  });

  it('saves user data to localStorage on successful login', async () => {
    mockedPost.mockResolvedValue({
      data: { message: 'Success', user_id: 42, email: 'user@test.com' },
      status: 200,
    });

    renderLoginForm();

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'user@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

    await waitFor(() => {
      expect(localStorage.getItem('user_id')).toBe('42');
      expect(localStorage.getItem('user_email')).toBe('user@test.com');
    });
  });
});
