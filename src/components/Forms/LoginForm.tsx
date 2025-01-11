import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.scss';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/reducer/userSlice';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    // Pass data to the backend
    axios
      .post(process.env.REACT_APP_API_URL + '/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log('Feedback' + res.data);
        if (
          res.data.message === 'Success' &&
          res.data.email &&
          res.status === 200
        ) {
          dispatch(loginUser(res.data.email));
          localStorage.setItem('user_email', res.data.email);
          navigate('/home');
          setTimeout(() => {
            alert('User ' + res.data.email + ' has successfully logged in');
          }, 100);
        } else {
          setFeedback('An error occurred. Please try again.');
        }
        console.log(JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          setFeedback('Invalid email or password');
        } else if (err.response && err.response.status === 404) {
          setFeedback('User not found');
        } else {
          setFeedback('An error occurred. Please try again.');
        }
      });
  }

  return (
    <form action="" className="account-form" onSubmit={handleSubmit}>
      <h1 className="form-title">LOGIN</h1>
      <p>
        New here? <Link to="/signup">Create a new account.</Link>
      </p>
      <div className="form-section">
        <label htmlFor="userEmail" className="form-label">
          Email<span>*</span>
        </label>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-section">
        <label htmlFor="userPass" className="form-label">
          Password<span>*</span>
        </label>
        <input
          type="password"
          id="userPass"
          name="userPass"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="form-button" type="submit">
        <b>Sign In</b>
      </button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
}

export default LoginForm;
