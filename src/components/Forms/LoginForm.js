import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.scss';

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState(""); // New state for feedback

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        // Pass data to the backend
        axios.post('http://localhost:8080/login', {
            email: email,
            password: password
        })
        .then(res => {
            if (res.data.message === "Success" && res.data.email && res.status === 200) {
                localStorage.setItem("user_email", res.data.email);
                navigate('/home');
            } else if (res.data.message !== "Success") {
                setFeedback("Invalid email or password")
            } else { setFeedback("An error occurred. Please try again.") }
            console.log(JSON.stringify(res))
        })
        .catch(err => console.log(err))
    }

    return (
        <form action="" className="accountForm" onSubmit={handleSubmit}>
            <h1 className="formTitle">LOGIN</h1>
            <p>New here? <Link to="/signup">Create a new account.</Link></p>
            <div className="formSection">
                <p className="formLabel">Email<span>*</span></p>
                <input type="email" name="userEmail"
                    onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="formSection">
                <p className="formLabel">Password<span>*</span></p>
                <input type="password" name="userPass"
                    onChange={e => setPassword(e.target.value)} required/>
            </div>
            <button className="formButton" type="submit"><b>Sign In</b></button>
            {feedback && <p>{feedback}</p>}
        </form>
    );
}

export default LoginForm;
