import React from 'react';
import './Home.scss';
import Navbar from '../../components/Navbar/Navbar';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-section">
        <section className="section-1">
          <h1>My Journey</h1>
          <p>Manage and enhance your fitness journey.</p>
        </section>

        <section className="section-2">
          <div>
            <h1>My Fitness Program</h1>
            <p>Manage your fitness journey. Create your own workout routine.</p>
          </div>
          <div className="home-button">
            <button onClick={() => (window.location.href = '/fitness')}>
              LET'S GO
            </button>
          </div>
          <div>
            <h1>Chat</h1>
            <p>Learn about workouts and fitness journey.</p>
          </div>
          <div className="home-button">
            <button onClick={() => (window.location.href = '/chat')}>
              LET'S GO
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
