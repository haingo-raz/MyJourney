import React, {useState} from 'react';
import './Form.scss';

function WorkoutForm() {

    const [titleInput, setTitleInput] = useState("");
    const [durationInput, setDurationInput] = useState(0);
    const [videoUrlInput, setVideoUrlInput] = useState("");

    const [workoutList, setWorkoutList] = useState([]);

    const addWorkout = () => {
        const id = workoutList.length + 1;
        setWorkoutList((prev) => [
            ...prev,
            {
                id:id
            }
        ])
    }

    const handleChangeTitle = (e) => {
        setTitleInput(e.target.value);      
    }
    const handleChangeDuration = (e) => {
       setDurationInput(e.target.value); 
    }
    const handleChangeUrl = (e) => {
       setVideoUrlInput(e.target.value); 
    }

    return (
        <form className="accountForm">
            <h1 className="formTitle">ADD WORKOUT</h1>
            <p>Add a new workout to your routine here.</p>
            <div className="formSection">
                <p className="formLabel">Title<span>*</span></p>
                <input 
                    type="text" 
                    name="workoutTitle"
                    value={titleInput}
                    onChange={handleChangeTitle}/>
            </div>
            <div className="formSection">
                <p className="formLabel">Duration<span>*</span></p>
                <input 
                    type="text" 
                    name="workoutDuration"
                    value={durationInput}
                    onChange={handleChangeDuration}/>
            </div>
            <div className="formSection">
                <p className="formLabel">Video url (optional)</p>
                <input 
                    type="text" 
                    name="workoutUrl"
                    value={videoUrlInput}
                    onChange={handleChangeUrl}/>
            </div>
            <button className="formButton">Add workout</button>
        </form>
    );
}

export default WorkoutForm;