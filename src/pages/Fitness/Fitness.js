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
        const inputValidation = !Object.values(formInputData).every(res=> res==="" || res===0);

        if(inputValidation){
            const newData = (data)=>([...data, formInputData])
            setWorkoutList(newData);
            console.log(formInputData);
            const emptyInput = {titleInput: "", durationInput: 0, videoUrlInput: ""}
            setFormInputData(emptyInput); 
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
                            defaultValue={formInputData.titleInput}
                            onChange={handleChange}/>
                    </div>
                    <div className="formSection">
                        <p className="formLabel">Duration (in minutes)<span>*</span></p>
                        <input 
                            type="text" 
                            name="durationInput"
                            defaultValue={formInputData.durationInput}
                            onChange={handleChange}/>
                    </div>
                    <div className="formSection">
                        <p className="formLabel">Video url<span>*</span></p>
                        <input 
                            type="text" 
                            name="videoUrlInput"
                            defaultValue={formInputData.videoUrlInput}
                            onChange={handleChange}/>
                    </div>
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
                <a href={videoUrl} target="_blank" className="workoutBtn">START</a>
            </div>
            <div className="formActions">
                <input type="checkbox" />
            </div>
        </div>
    );
}

export default Fitness;