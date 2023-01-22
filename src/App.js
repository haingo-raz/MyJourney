import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.scss';
import Account from './pages/Account/Account';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import Home from './pages/Home/Home';
import Fitness from './pages/Fitness/Fitness';
import Wellbeing from './pages/Wellbeing/Wellbeing';
import Modal from './components/Forms/Modal/Modal';


function App() {

  return (
    <div className="App">
      <div className="logo">
        <Link to="/"><i>MJ</i></Link>
      </div>
      <Routes>
        <Route path="/" element={<Account component={<LoginForm/>} />} />
        <Route path="/signup" element={<Account component={<SignUpForm/>} />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/fitness" element={<Fitness />}/>
        <Route path="/wellbeing" element={<Wellbeing />}/>
    </Routes>
    </div>
  );
}

export default App;
