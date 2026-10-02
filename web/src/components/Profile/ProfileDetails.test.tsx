import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/reducer/userSlice';
import ProfileDetails from './ProfileDetails';
import axios from 'axios';

jest.mock('axios');
const mockedGet = axios.get as jest.Mock;
const mockedPut = axios.put as jest.Mock;

const store = configureStore({
  reducer: { user: userReducer },
  preloadedState: { user: { userId: 1, email: 'test@test.com', isLoggedIn: true } } as any,
});

const renderProfileDetails = () =>
  render(
    <Provider store={store}>
      <ProfileDetails />
    </Provider>,
  );

describe('ProfileDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGet.mockResolvedValue({ data: {} });
  });

  it('renders all profile form fields', () => {
    renderProfileDetails();

    expect(screen.getByLabelText('Age:')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender:')).toBeInTheDocument();
    expect(screen.getByLabelText('Height (cm):')).toBeInTheDocument();
    expect(screen.getByLabelText('Weight (kg):')).toBeInTheDocument();
    expect(screen.getByLabelText('Daily Calorie Target:')).toBeInTheDocument();
    expect(screen.getByLabelText('Fitness Goals:')).toBeInTheDocument();
    expect(screen.getByLabelText('Weight Goal (kg):')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('pre-fills the age field with fetched profile data', async () => {
    mockedGet.mockResolvedValue({ data: { age: 25, gender: 'male', height_cm: 180 } });

    renderProfileDetails();

    await waitFor(() => {
      expect((screen.getByLabelText('Age:') as HTMLInputElement).value).toBe('25');
    });
  });

  it('shows success feedback after saving profile', async () => {
    mockedPut.mockResolvedValue({ data: 'Success' });

    renderProfileDetails();

    fireEvent.submit(
      screen.getByRole('button', { name: /Save/i }).closest('form')!,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Profile details updated successfully/i),
      ).toBeInTheDocument();
    });
  });

  it('shows failure feedback when save fails', async () => {
    mockedPut.mockRejectedValue(new Error('Network error'));

    renderProfileDetails();

    fireEvent.submit(
      screen.getByRole('button', { name: /Save/i }).closest('form')!,
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Profile details update failed/i),
      ).toBeInTheDocument();
    });
  });
});
