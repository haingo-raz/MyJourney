import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Form.scss';
import axios from 'axios';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL + '/signup', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data === 'Success') {
          setFeedback('Account created successfully. You can now log in');
          navigate('/');
          alert('Account created successfully. You can now log in');
        } else {
          setFeedback(
            'An error occurred while creating your account. Please try again.',
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === 'User already exists') {
          setFeedback('An account with this email already exists.');
        } else {
          setFeedback(
            'An error occurred while creating your account. Please try again.',
          );
        }
      });
  }

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <h1 className="form-title">CREATE A NEW ACCOUNT</h1>
      <p>
        Already have one? <Link to="/">Log in here</Link>
      </p>
      <div className="form-section">
        <label htmlFor="loginEmail" className="form-label">
          Email<span>*</span>
        </label>
        <input
          type="email"
          id="loginEmail"
          name="loginEmail"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-section">
        <label htmlFor="loginPass" className="form-label">
          Password<span>*</span>
        </label>
        <input
          type="password"
          id="loginPass"
          name="loginPass"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="form-button" type="submit">
        Join today
      </button>
      {feedback && <p>{feedback}</p>}
    </form>
  );
}

export default SignUpForm;
