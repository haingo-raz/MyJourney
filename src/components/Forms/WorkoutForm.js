import React, {useState} from 'react';
import './Form.scss';

function WorkoutForm() {

    const [workoutList, setWorkoutList] = useState([]);

    const [formInputData, setFormInputData] = useState(
        {
        titleInput: "",
        durationInput: 0, 
        videoUrlInput: ""
        }
    )

    const handleChange = (e) => {
        const newInput = (data) => ({...data, 
        [e.target.name]:e.target.value})
        setFormInputData(newInput)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        const newData = (data)=>([...data, formInputData])
        setWorkoutList(newData);
        const emptyInput = {titleInput: "", durationInput: 0, videoUrlInput: ""}
        setFormInputData(emptyInput);
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
                <p className="formLabel">Duration<span>*</span ></p>
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