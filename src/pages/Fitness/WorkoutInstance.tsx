import React from 'react';
import { getWorkoutImageSrc } from '../../utils/helper';

interface WorkoutInstanceProps {
  id: number;
  title: string;
  duration: number;
  videoUrl: string;
  status: number;
  removeWorkout: (id: number) => void;
  handleEditWorkout: (
    id: number,
    title: string,
    duration: number,
    videoUrl: string,
  ) => void;
  handleStatusChange: (id: number, newStatus: number) => void;
  editId: number | null;
}

const WorkoutInstance: React.FC<WorkoutInstanceProps> = ({
  id,
  title,
  duration,
  videoUrl,
  status,
  removeWorkout,
  handleEditWorkout,
  handleStatusChange,
  editId,
}) => {

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.checked ? 1 : 0;
    handleStatusChange(id, newStatus); // Call the function from Fitness.tsx
  };

  return (
    <div className="workout-instance">
      <div className="img-container">
        <img src={getWorkoutImageSrc(title)} alt="" />
      </div>
      <div className="workout-details">
        <h1 className="workout-title">{title}</h1>
        <p className="workout duration">{duration}mn</p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="workout-btn"
        >
          START
        </a>
      </div>
      <div className="form-actions">
        <div>
          <label> Done </label>
          <input
            type="checkbox"
            checked={status === 1}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="icon-actions">
          <button
            onClick={() => handleEditWorkout(id, title, duration, videoUrl)}
            disabled={editId !== null}
            className="form-button"
          >
            Edit
          </button>
          <button
            onClick={() => removeWorkout(id)}
            className="form-button danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutInstance;
