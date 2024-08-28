import React from 'react';
import { Route, Routes} from 'react-router-dom';
import './App.scss';
import Account from './pages/Account/Account';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import Home from './pages/Home/Home';
import Fitness from './pages/Fitness/Fitness';
import Profile from './pages/Profile/Profile';
import Chatbot from './components/Chatbot/Chatbot';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Account component={<LoginForm/>} />} />
        <Route path="/signup" element={<Account component={<SignUpForm/>} />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/fitness" element={<Fitness />}/>
        <Route path="/chat" element={<Chatbot/>}/>
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </div>
  );
}

export default App;



 





