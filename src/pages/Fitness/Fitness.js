import React, { useState, useEffect } from 'react';
import './Fitness.scss';
import '../../components/Forms/Form.scss';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

function Fitness() {

    const [workoutList, setWorkoutList] = useState([]);

    const [formInputData, setFormInputData] = useState({
        titleInput: "",
        durationInput: 10,
        videoUrlInput: ""
    });

    const [feedback, setFeedback] = useState("");

    const [editId, setEditId] = useState(null);

    const loggedInUser = localStorage.getItem("user_email");

    const today = `${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}-${("0" + new Date().getDate()).slice(-2)}`;

    // Fetch workouts from the backend
    useEffect(() => {
        fetch(`http://localhost:8080/workout/${loggedInUser}`)
            .then(res => res.json())
            .then(res => setWorkoutList(res))
            .catch(err => console.log(err));
    }, [loggedInUser]);

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
                let editedWorkout = workoutList.map(workout => {
                    if (workout.id === editId) {
                        workout.title = formInputData.titleInput;
                        workout.duration = formInputData.durationInput;
                        workout.videoUrl = formInputData.videoUrlInput;
                    }
                    return workout;
                });
                setWorkoutList(editedWorkout);
                setEditId(null);
            } else {
                const newWorkout = {
                    title: formInputData.titleInput,
                    videoUrl: formInputData.videoUrlInput,
                    duration: formInputData.durationInput,
                    user_email: loggedInUser,
                    dayCreated: today
                };

                axios.post('http://localhost:8080/add', newWorkout)
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
            axios.delete(`http://localhost:8080/delete/${idToRemove}`)
                .then(res => {
                    setWorkoutList(prevWorkouts => prevWorkouts.filter(workout => workout.id !== idToRemove));
                })
                .catch(err => console.log(err));
        }
    };


    function handleEditWorkout(idToEdit, title, duration, videoUrl) {
        setEditId(idToEdit);
        setFormInputData(prevData => ({
            ...prevData,
            titleInput: title,
            durationInput: duration,
            videoUrlInput: videoUrl
        }));
    }


    const WorkoutInstance = ({ id, title, duration, videoUrl }) => {
        return (
            <div className="workoutInstance">
                <div className="imgContainer">
                    <img src="./assets/workout.png" alt="" />
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
            <Navbar />
            <div className="fitnessPage">
                <section className="workoutSection">

                    <h1 className="sectionTitle">
                        My fitness program : {today}
                    </h1>

                    <div className="workoutList" id="workoutList">

                        {
                            workoutList.map((data, index) => {
                                return (
                                    <WorkoutInstance
                                        key={index}
                                        id={data.id}
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