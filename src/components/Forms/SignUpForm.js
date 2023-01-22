import React from 'react';
import { Link } from 'react-router-dom';
import './Form.scss';

function SignUpForm() {

    return (
        <form className="accountForm">
            <h1 className="formTitle">CREATE A NEW ACCOUNT</h1>
            <p>Already have one? <Link to="/">Log in here</Link></p>
            <div className="formSection">
                <p className="formLabel">Name<span>*</span></p>
                <input type="text" name="loginName"/>
            </div>
            <div className="formSection">
                <p className="formLabel">Email<span>*</span></p>
                <input type="email" name="loginEmail"/>
            </div>
            <div className="formSection">
                <p className="formLabel">Password<span>*</span></p>
                <input type="password" name="loginPass"/>
            </div>
            <button className="formButton"><Link to="/home">Join today</Link></button>
        </form>
    );
}

export default SignUpForm;