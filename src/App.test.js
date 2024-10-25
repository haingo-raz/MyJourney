import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './App';
import Account from './pages/Account/Account';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import axios from 'axios';
import { jest } from '@jest/globals';

// Create a mock store
const mockStore = configureStore([]);

jest.mock('axios');

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isLoggedIn: false,
      },
    });
  });

  test('renders login screen when not logged in', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test('unsuccessful login with wrong credentials', async () => {
    // Mock axios post request for unsuccessful login
    axios.post.mockResolvedValue({
      data: { message: 'Error' },
      status: 400,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Account component={<LoginForm />} />
        </MemoryRouter>
      </Provider>,
    );

    const wrongUserEmail = 'wronguser@test.com';
    const wrongPassword = 'wrongpassword';

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: wrongUserEmail },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: wrongPassword },
    });
    fireEvent.click(screen.getByText(/Sign In/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid email or password/i),
      ).toBeInTheDocument();
    });
  });

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
    axios.post.mockResolvedValue({
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
