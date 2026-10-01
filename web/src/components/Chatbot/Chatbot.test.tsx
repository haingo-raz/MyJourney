import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../redux/reducer/userSlice';
import Chatbot from './Chatbot';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('axios');

const store = configureStore({ reducer: { user: userReducer } });

const renderChatbot = () =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Chatbot />
      </MemoryRouter>
    </Provider>,
  );

describe('Chatbot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page heading', () => {
    renderChatbot();
    expect(
      screen.getByText(/Ask questions about your workout journey/i),
    ).toBeInTheDocument();
  });

  it('renders the preset questions', () => {
    renderChatbot();
    expect(
      screen.getByText(/How many minutes have I spent working out/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/How many workout programs have I completed/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/How many days have I worked out/i),
    ).toBeInTheDocument();
  });

  it('renders the message input and Send button', () => {
    renderChatbot();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
  });

  it('switches to AI mode when the AI button is clicked', () => {
    renderChatbot();
    expect(screen.getByText(/Chat with AI/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Chat with AI/i));
    expect(
      screen.getByText(/You are chatting with an AI/i),
    ).toBeInTheDocument();
  });
});
