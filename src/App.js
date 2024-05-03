import React from 'react';
import { Route, Routes} from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Account component={<LoginForm/>} />} />
        <Route path="/signup" element={<Account component={<SignUpForm/>} />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/fitness" element={<Fitness />}/>
        <Route path="/wellbeing" element={<Wellbeing />}/>
        <Route path="/combat_stress" element={<Modal title="5 ways to combat stress" advice1="Use guided meditation" advice2="Use guided meditation" advice3="Maintain physical exercise and good nutrition" advice4="Manage social media time" advice5="Connect with others"/>}/>
        <Route path="/communication_tips" element={<Modal title="5 communication tips" advice1="Be Present" advice2="Really Listen" advice3="Seek to Understand" advice4="Use Active/Reflective Listening" advice5="Practice Silence"/>}/>
        <Route path="/avoid_procastination" element={<Modal title="5 tips to avoid procrastination" advice1="Set small goals " advice2="Organise your tasks " advice3="Focus your attention " advice4="Remove distractions" advice5="Forgive yourself"/>}/>
        <Route path="/increase_happiness" element={<Modal title="5 ways to increase happiness" advice1="Make sure your basic needs are met" advice2="Start a gratitude practice " advice3="Try journaling" advice4="Spend some time in nature " advice5="Listen to music that makes you happy"/>}/>
      </Routes>
    </div>
  );
}

export default App;



 





