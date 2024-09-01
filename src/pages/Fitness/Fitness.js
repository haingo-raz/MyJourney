import React, { useState, useEffect } from 'react';
import './Fitness.scss';
import '../../components/Forms/Form.scss';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { dateFormatter } from '../../utils/helper';
import apiUrl from '../../const/const';
import { useNavigate, useLocation } from 'react-router-dom';

function Fitness() {

    const today = new Date();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialDate = queryParams.get('date') ? new Date(queryParams.get('date') + 'T00:00:00-05:00') : today;

    const [workoutList, setWorkoutList] = useState([]);
    const [chosenDate, setChosenDate] = useState(initialDate);
    const [formattedDate, setFormattedDate] = useState(dateFormatter(initialDate));
    const [count, setCount] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        setFormattedDate(dateFormatter(chosenDate));
    }, [chosenDate]);

    useEffect(() => {
        // Update the URL with the selected date in UTC
        navigate(`?date=${chosenDate.toISOString().split('T')[0]}`);
    }, [chosenDate, navigate]);

    const [formInputData, setFormInputData] = useState({
        titleInput: "",
        durationInput: 10,
        videoUrlInput: ""
    });

    const [feedback, setFeedback] = useState("");
    const [editId, setEditId] = useState(null);
    const loggedInUser = localStorage.getItem("user_email");

    // Fetch workouts from the backend
    useEffect(() => {
        fetch(`${apiUrl}/workout/${loggedInUser}/${formattedDate}`)
            .then(res => res.json())
            .then(res => {
                setWorkoutList(res.workouts)
            })
            .catch(err => console.log(err));
    }, [formattedDate, loggedInUser]);

    useEffect(() => {
        fetch(`${apiUrl}/workout/${loggedInUser}/${formattedDate}`)
            .then(res => res.json())
            .then(res => {
                setCount(res.count)
                setDuration(res.totalDuration)
            })
            .catch(err => console.log(err));
    }, [formattedDate, loggedInUser, workoutList]);

    const emptyInput = { titleInput: "", durationInput: 10, videoUrlInput: "" };

    const handleChange = (e) => {
        const newInput = (data) => ({ ...data, [e.target.name]: e.target.value });
        setFormInputData(newInput);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Only proceed if not all inputs are empty
        const areInputsValid = !Object.values(formInputData).every(res => res === "" || res === 0 || res === " ");

        // Title should be more than 3 characters
        const isTitleValid = formInputData?.titleInput.length > 3;
        if (!isTitleValid) {
            setFeedback("The workout title should be more than 3 characters.");
            setTimeout(() => {
                setFeedback("");
            }, 5000);
            return;
        }

        // Make sure that the video url is a youtube url
        const urlPattern = new RegExp(
            '^(https?\\:\\/\\/)?' +
            '((www\\.)?youtube\\.com|youtu\\.?be)' +
            '\\/.+$', 'i');

        const isUrlValid = urlPattern.test(formInputData?.videoUrlInput);
        if (!isUrlValid) {
            setFeedback("Url format incorrect");
            setTimeout(() => {
                setFeedback("");
            }, 5000);
            return;
        }

        if (areInputsValid & isTitleValid & isUrlValid) {

            // edit workout
            if (editId !== null) {
                axios.put(`${apiUrl}/edit/${editId}`, {
                    workoutId: editId,
                    title: formInputData.titleInput,
                    videoUrl: formInputData.videoUrlInput,
                    duration: formInputData.durationInput
                })
                .then(res => {
                    console.log(res)
                    setWorkoutList(res)
                    window.location.reload();
                })
                .catch(err => console.log(err));
                setEditId(null);
            } else {
                const newWorkout = {
                    title: formInputData.titleInput,
                    videoUrl: formInputData.videoUrlInput,
                    duration: formInputData.durationInput,
                    user_email: loggedInUser,
                    dayCreated: today
                };

                axios.post(`${apiUrl}/add`, newWorkout)
                    .then(res => {
                        if (res.data === "Success") {
                            setWorkoutList(prevWorkouts => [
                                ...prevWorkouts, newWorkout
                            ]);
                        }
                    })
                    .catch(err => console.log(err));
            }
            setFormInputData(emptyInput);
            setFeedback("");
        }
    };

    function removeWorkout(idToRemove) {
        if (window.confirm("Are you sure you want to delete this workout?")) {
            axios.delete(`${apiUrl}/delete/${idToRemove}`)
                .then(res => {
                    setWorkoutList(prevWorkouts => Array.isArray(prevWorkouts) ? prevWorkouts.filter(workout => workout.workoutId !== idToRemove) : []);
                })
                .catch(err => console.log(err));
        }
    };    


    function handleEditWorkout(idToEdit, title, duration, videoUrl) {
        setFormInputData(prevData => ({
            ...prevData,
            titleInput: title,
            videoUrlInput: videoUrl,
            durationInput: duration
        }));
        setEditId(idToEdit);
    }

    function handleDateChange(date) {
        setChosenDate(date);
    }

    function getImageSrc(title) {
        if (title.toLowerCase().includes("stretching") || title.toLowerCase().includes("yoga") || title.toLowerCase().includes("stretch")) {
            return "./assets/stretching.png";
        } else if (title.toLowerCase().includes("train") || title.toLowerCase().includes("weight")) {
            return "./assets/weight.png";
        } else if (title.toLowerCase().includes("cardio") || title.toLowerCase().includes("hiit")) {
            return "./assets/cardio.png";
        } else {
            return "./assets/workout.png";
        }
    }

    const WorkoutInstance = ({ id, title, duration, videoUrl }) => {
        return (
            <div className="workoutInstance">
                <div className="imgContainer">
                    <img src={getImageSrc(title)} alt="" />
                </div>
                <div className="workoutDetails">
                    <h1 className="workoutTitle">{title}</h1>
                    <p className="workout duration">{duration}mn</p>
                    <a href={videoUrl} target="_blank" rel="noreferrer" className="workoutBtn">START</a>
                </div>
                <div className="formActions">
                    <div>
                        <label>Mark as done </label>
                        <input type="checkbox" />
                    </div>
                    <div className="icon-actions">
                        <button onClick={() => handleEditWorkout(id, title, duration, videoUrl)} disabled={editId !== null}>Edit</button>
                        <button onClick={() => removeWorkout(id)}>Delete</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Navbar/>
            <div className="fitnessPage">
                <section className="workoutSection">
                    <div className="sectionTitle">
                        <h1>
                            My fitness program :
                        </h1>
                        <DatePicker 
                            selected={chosenDate} 
                            onChange={(date) => handleDateChange(date)} 
                        />
                    </div>

                    <div className="workoutInfo"> 
                        <h3>Number of exercises:</h3>
                        <span> {count}</span>
                        <h3>Total duration:</h3>
                        <span> {duration} mn</span>
                    </div>

                    <div className="workoutList" id="workoutList">
                        {
                            Array.isArray(workoutList) && workoutList.map((data, index) => {
                                return (
                                    <WorkoutInstance
                                        key={index}
                                        id={data.workoutId}
                                        title={data.title}
                                        duration={data.duration}
                                        videoUrl={data.videoUrl}
                                    />
                                );
                            })
                        }
                    </div>

                </section>

                <section className="workoutForm">
                    {/* Form */}
                    <form action="POST" className="accountForm" onSubmit={handleSubmit}>
                        <h1 className="formTitle">ADD WORKOUT</h1>
                        <p>Add a new workout to your routine here.</p>
                        <div className="formSection">
                            <p className="formLabel">Title<span>*</span></p>
                            <input
                                type="text"
                                name="titleInput"
                                value={formInputData.titleInput}
                                onChange={handleChange} 
                                required/>
                        </div>
                        <div className="formSection">
                            <p className="formLabel">Duration (in minutes)<span>*</span></p>
                            <input
                                type="number"
                                name="durationInput"
                                value={formInputData.durationInput}
                                onChange={handleChange} 
                                required/>
                        </div>
                        <div className="formSection">
                            <p className="formLabel">Video url<span>*</span></p>
                            <input
                                type="text"
                                name="videoUrlInput"
                                value={formInputData.videoUrlInput}
                                onChange={handleChange} 
                                required/>
                        </div>
                        <div id="workout-form-feedback">{feedback}</div>

                        <button type="submit" className="formButton">{editId !== null ? "Save" : "Submit"}</button>
                    </form>
                </section>
            </div>
        </>
    );
}

export default Fitness;