import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Fitness.scss';
import '../../components/Forms/Form.scss';
import Navbar from '../../components/Navbar/Navbar';
//import WorkoutForm from '../../components/Forms/WorkoutForm';

function Fitness() {

    const [workoutList, setWorkoutList] = useState([]);

    const [formInputData, setFormInputData] = useState(
        {
        titleInput: "",
        durationInput: 10, 
        videoUrlInput: ""
        }
    )

    const [feedback, setFeedback] = useState("")

    const handleChange = (e) => {
        const newInput = (data) => ({...data, 
        [e.target.name]:e.target.value})
        setFormInputData(newInput)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        // Only proceed if not all inputs are empty
        const areInputsValid = !Object.values(formInputData).every(res=> res==="" || res===0 || res===" ");

        // Title should be more than 5 characters
        const isTitleValid = formInputData?.titleInput.length > 5;
        if (!isTitleValid) {
            setFeedback("The workout title should be more than 5 characters.")
            setTimeout(() => {
                setFeedback("")
            }, 5000)
        }

        // Make sure that the video url is a youtube url
        const urlPattern = new RegExp(
            '^(https?\\:\\/\\/)?'+
            '((www\\.)?youtube\\.com|youtu\\.?be)'+
            '\\/.+$','i');  

        const isUrlValid = urlPattern.test(formInputData?.videoUrlInput)
        if (!isUrlValid) {
            setFeedback("Url format incorrect")
            setTimeout(() => {
                setFeedback("")
            }, 5000)
        }

        if(areInputsValid & isTitleValid & isUrlValid){
            const newData = (data)=>([...data, formInputData])
            setWorkoutList(newData);
            console.log(formInputData);
            const emptyInput = {titleInput: "", durationInput: 10, videoUrlInput: ""}
            setFormInputData(emptyInput); 
            setFeedback("");
        }   
    }

    return (
        <div className="fitnessPage">
            <Navbar/>

            <section className="workoutSection">

                <h1 className="sectionTitle">
                    My fitness program : {new Date().toLocaleString("en-US", { month: "long" })} {new Date().toLocaleString("en-US", { day : '2-digit'}) }, {new Date().getFullYear()}
                </h1>

                <div className="workoutList" id="workoutList">

                    {
                        workoutList.map((data, index) => {
                            return(
                                <WorkoutInstance
                                    key={index}
                                    title={data.titleInput}
                                    duration={data.durationInput}
                                    videoUrl={data.videoUrlInput}
                                />
                            )
                        })
                    }
                </div>   

            </section>

            <section className="workoutForm">
                {/* Form */}
                <form className="accountForm">
                    <h1 className="formTitle">ADD WORKOUT</h1>
                    <p>Add a new workout to your routine here.</p>
                    <div className="formSection">
                        <p className="formLabel">Title<span>*</span></p>
                        <input 
                            type="text" 
                            name="titleInput"
                            value={formInputData.titleInput}
                            onChange={handleChange}/>
                    </div>
                    <div className="formSection">
                        <p className="formLabel">Duration (in minutes)<span>*</span></p>
                        <input 
                            type="number" 
                            name="durationInput"
                            value={formInputData.durationInput}
                            onChange={handleChange}/>
                    </div>
                    <div className="formSection">
                        <p className="formLabel">Video url<span>*</span></p>
                        <input 
                            type="text" 
                            name="videoUrlInput"
                            value={formInputData.videoUrlInput}
                            onChange={handleChange}/>
                    </div>
                    <div id="workout-form-feedback">{feedback}</div>
                    <input type="submit" onClick={handleSubmit} className="formButton"/>
                </form>
            </section>
            
        </div>
    );
}

const WorkoutInstance = ({title, duration, videoUrl}) => {
    return(
        <div className="workoutInstance">
            <div className="imgContainer">
                <img src="./assets/workout.png" alt=""/>
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
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Fitness;