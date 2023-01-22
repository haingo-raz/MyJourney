import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

function Home() {
    return (
        <div className="homeSection">
            <div className="logo">
                <Link to="/home"><i>MJ</i></Link>
                <div className="navRight">
                    <Link to="/fitness"><i>Workout</i></Link>
                    <Link to="/wellbeing"><i>Wellbeing</i></Link>
                </div>
            </div>
            <section className="fitnessSection">
                <div>
                  <h1>My fitness program</h1>  
                  <p>Manage your fitness journey. Create your own workout routine</p>
                </div>
                <div className="homeButton">
                    <button><Link to="/fitness">LET'S GO</Link></button>
                </div>
            </section>

            <section className="wellbeingSection">
                <div>
                  <h1>My wellbeing</h1>  
                  <p>Learn the best ways to improve your mental health.</p>
                </div>
                <div className="homeButton">
                    <button><Link to="/wellbeing">LET'S GO</Link></button>
                </div>
            </section>
        </div>
    );
}

export default Home;