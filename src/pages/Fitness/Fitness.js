import React from 'react';
import './Fitness.scss';
import WorkoutForm from '../../components/Forms/WorkoutForm';

function Fitness() {
    return (
        <div className="fitnessPage">

            <section className="workoutSection">

                <h1 className="sectionTitle">My fitness program : {new Date().toLocaleString("en-US", { month: "long" })} {new Date().toLocaleString("en-US", { day : '2-digit'})}</h1>

                <div className="workoutList" id="workoutList">

                    <div className="workoutInstance">
                        <div className="imgContainer">
                            <img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-12/211208-working-out-stock-mn-1310-55e1c7.jpg" alt=""/>
                        </div>
                        <div className="workoutDetails">
                            <h1 className="workoutTitle">Warm up</h1>
                            <p className="workout duration">15mn</p>
                            <button className="workoutBtn">START TIMER</button>
                        </div>
                        <div className="formActions">
                            <input type="checkbox" />
                        </div>
                    </div>

                </div>   

            </section>

            <section className="workoutForm">
                <WorkoutForm/>
            </section>
            
        </div>
    );
}

export default Fitness;