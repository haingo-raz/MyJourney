import React from 'react';
import './Home.scss';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
    return (
        <div className="homeSection">
            <Navbar/>
            <section className="fitnessSection">
                <div>
                  <h1>My fitness program</h1>  
                  <p>Manage your fitness journey. Create your own workout routine</p>
                </div>
                <div className="homeButton">
                    <button onClick={() => window.location.href = "/fitness"}>LET'S GO</button>
                </div>
            </section>

            <section className="wellbeingSection">
                <div>
                  <h1>My wellbeing</h1>  
                  <p>Learn the best ways to improve your mental health.</p>
                </div>
                <div className="homeButton">
                    <button onClick={() => window.location.href = "/wellbeing"}>LET'S GO</button>
                </div>
            </section>
        </div>
    );
}

export default Home;