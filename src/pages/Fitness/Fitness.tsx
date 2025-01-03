import React, { useState, useEffect } from 'react';
import './Fitness.scss';
import '../../components/Forms/Form.scss';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dateFormatter } from '../../utils/helper';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  urlPattern,
  getVideoYoutubeDetails,
  convertISO8601DurationToMinutes,
  getWorkoutImageSrc,
} from '../../utils/helper';

function Fitness() {
  const today = new Date();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialDate = queryParams.get('date')
    ? new Date(queryParams.get('date') || today)
    : today;

  interface Workout {
    workout_id: number;
    title: string;
    duration: number;
    video_url: string;
  }

  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [chosenDate, setChosenDate] = useState(initialDate);
  const [formattedDate, setFormattedDate] = useState(
    dateFormatter(initialDate),
  );
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const loggedInUser = localStorage.getItem('user_email');

  useEffect(() => {
    setFormattedDate(dateFormatter(chosenDate));
  }, [chosenDate]);

  useEffect(() => {
    // Update the URL with the selected date in UTC
    navigate(`?date=${chosenDate.toISOString().split('T')[0]}`);
  }, [chosenDate, navigate]);

  const [formInputData, setFormInputData] = useState({
    titleInput: '',
    durationInput: 10,
    videoUrlInput: '',
  });

  // Fetch workouts from the backend
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/workout/${loggedInUser}/${formattedDate}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setWorkoutList(res.workouts);
      })
      .catch((err) => console.log(err));
  }, [formattedDate, loggedInUser]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/workout/${loggedInUser}/${formattedDate}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setCount(res.count);
        setDuration(res.totalDuration);
      })
      .catch((err) => console.log(err));
  }, [formattedDate, loggedInUser, workoutList]);

  const emptyInput = { titleInput: '', durationInput: 10, videoUrlInput: '' };

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const newInput = (data: any) => ({ ...data, [e.target.name]: e.target.value });
    setFormInputData(newInput);

    // Automatic title and duration fetching from youtube video url
    if (e.target.name === 'videoUrlInput') {
      getVideoYoutubeDetails(e.target.value)
        .then((res) => {
          setFormInputData((prevData) => ({
            ...prevData,
            titleInput: res.title,
            durationInput: convertISO8601DurationToMinutes(res.duration),
          }));
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const areInputsValid = !Object.values(formInputData).every(
      (res) => res === '' || res === 0 || res === ' ',
    );

    // Title should be more than 3 characters
    const isTitleValid = formInputData?.titleInput.length > 3;
    if (!isTitleValid) {
      setFeedback('The workout title should be more than 3 characters.');
      setTimeout(() => {
        setFeedback('');
      }, 5000);
      return;
    }

    // Make sure that the video url is a youtube url
    const isUrlValid = urlPattern.test(formInputData?.videoUrlInput);
    if (!isUrlValid) {
      setFeedback('Url format incorrect');
      setTimeout(() => {
        setFeedback('');
      }, 5000);
      return;
    }

    if (areInputsValid && isTitleValid && isUrlValid) {
      // edit workout
      if (editId !== null) {
        axios
          .put(`${process.env.REACT_APP_API_URL}/edit/${editId}`, {
            workout_id: editId,
            title: formInputData.titleInput,
            video_url: formInputData.videoUrlInput,
            duration: formInputData.durationInput,
          })
          .then((res) => {
            console.log(res);
            setWorkoutList(res.data);
          })
          .catch((err) => console.log(err));
        setEditId(null);
      } else {
        const newWorkout = {
          workout_id: Date.now(), // Generate a unique ID for the new workout
          title: formInputData.titleInput,
          video_url: formInputData.videoUrlInput,
          duration: formInputData.durationInput,
          user_email: loggedInUser,
          day_created: dateFormatter(today),
          status: 'False',
        };

        axios
          .post(`${process.env.REACT_APP_API_URL}/add`, newWorkout)
          .then((res) => {
            if (res.data === 'Success') {
              setWorkoutList((prevWorkouts) => [...prevWorkouts, newWorkout]);
              setFeedback('Workout added successfully.');
            }
          })
          .catch((err) => console.log(err));
      }
      setFormInputData(emptyInput);
      setFeedback('');
    }
  };

  function removeWorkout(idToRemove: number) {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/delete/${idToRemove}`)
        .then(() => {
          setWorkoutList((prevWorkouts) =>
            Array.isArray(prevWorkouts)
              ? prevWorkouts.filter(
                  (workout) => workout.workout_id !== idToRemove,
                )
              : [],
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleEditWorkout(idToEdit: number, title: any, duration: any, videoUrl: any) {
    setFormInputData((prevData) => ({
      ...prevData,
      titleInput: title,
      videoUrlInput: videoUrl,
      durationInput: duration,
    }));
    setEditId(idToEdit);
  }

  function handleDateChange(date: React.SetStateAction<Date> | null) {
      if (date !== null) {
          setChosenDate(date);
      }
  }

  interface WorkoutInstanceProps {
    id: number;
    title: string;
    duration: number;
    videoUrl: string;
  }

  const WorkoutInstance: React.FC<WorkoutInstanceProps> = ({ id, title, duration, videoUrl }) => {
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
            <input type="checkbox" />
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

  return (
    <>
      <Navbar />
      <div className="fitness-page">
        <section className="workout-section">
          <div className="section-title">
            <h1>My fitness program :</h1>
            <DatePicker
              selected={chosenDate}
              onChange={(date) => handleDateChange(date)}
            />
          </div>

          {workoutList.length !== 0 && (
            <>
              <div className="workout-info">
                <h3>Number of exercises:</h3>
                <span> {count}</span>
                <h3>Total duration:</h3>
                <span> {duration} mn</span>
              </div>

              <div className="workout-list" id="workout-list">
                {Array.isArray(workoutList) &&
                  workoutList.map((data, index) => {
                    return (
                      <WorkoutInstance
                        key={index}
                        id={data.workout_id}
                        title={data.title}
                        duration={data.duration}
                        videoUrl={data.video_url}
                      />
                    );
                  })}
              </div>
            </>
          )}
        </section>

        <section className="workout-form">
          <form action="POST" className="account-form" onSubmit={handleSubmit}>
            <h1 className="form-title">ADD WORKOUT</h1>
            <p>Add a new workout to your routine here.</p>
            <div className="form-section">
              <p className="formLabel">
                Video url<span>*</span>
              </p>
              <input
                type="text"
                name="videoUrlInput"
                value={formInputData.videoUrlInput}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-section">
              <p className="form-label">
                Title<span>*</span>
              </p>
              <input
                type="text"
                name="titleInput"
                value={formInputData.titleInput}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-section">
              <p className="form-label">
                Duration (in minutes)<span>*</span>
              </p>
              <input
                type="number"
                name="durationInput"
                value={formInputData.durationInput}
                onChange={handleChange}
                required
              />
            </div>
            <div>{feedback}</div>

            <button type="submit" className="form-button">
              {editId !== null ? 'Save' : 'Submit'}
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Fitness;
