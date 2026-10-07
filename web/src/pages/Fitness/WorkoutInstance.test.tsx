import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutInstance from './WorkoutInstance';

const defaultProps = {
  id: 1,
  title: 'Morning Cardio',
  duration: 30,
  videoUrl: 'https://www.youtube.com/watch?v=abc123',
  isCompleted: 0,
  removeWorkout: jest.fn(),
  handleEditWorkout: jest.fn(),
  handleStatusChange: jest.fn(),
  editId: null,
};

describe('WorkoutInstance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders workout title and duration', () => {
    render(<WorkoutInstance {...defaultProps} />);
    expect(screen.getByText('Morning Cardio')).toBeInTheDocument();
    expect(screen.getByText('30mn')).toBeInTheDocument();
  });

  it('renders the START link with the correct href', () => {
    render(<WorkoutInstance {...defaultProps} />);
    expect(screen.getByRole('link', { name: /START/i })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=abc123',
    );
  });

  it('renders an unchecked checkbox when isCompleted is 0', () => {
    render(<WorkoutInstance {...defaultProps} isCompleted={0} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders a checked checkbox when isCompleted is 1', () => {
    render(<WorkoutInstance {...defaultProps} isCompleted={1} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls handleStatusChange when the checkbox is toggled', () => {
    render(<WorkoutInstance {...defaultProps} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(defaultProps.handleStatusChange).toHaveBeenCalledWith(1, true);
  });

  it('calls removeWorkout with the correct id when Delete is clicked', () => {
    render(<WorkoutInstance {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
    expect(defaultProps.removeWorkout).toHaveBeenCalledWith(1);
  });

  it('calls handleEditWorkout with the correct args when Edit is clicked', () => {
    render(<WorkoutInstance {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
    expect(defaultProps.handleEditWorkout).toHaveBeenCalledWith(
      1,
      'Morning Cardio',
      30,
      'https://www.youtube.com/watch?v=abc123',
    );
  });

  it('disables the Edit button when editId is set', () => {
    render(<WorkoutInstance {...defaultProps} editId={2} />);
    expect(screen.getByRole('button', { name: /Edit/i })).toBeDisabled();
  });
});
