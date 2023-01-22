import React from 'react';
import { Link } from 'react-router-dom';
import './Form.scss';

function LoginForm(props) {
    
    return (
        <form className="accountForm">
            <h1 className="formTitle">LOGIN</h1>
            <p>New here? <Link to="/signup">Create a new account.</Link></p>
            <div className="formSection">
                <p className="formLabel">Email<span>*</span></p>
                <input type="email" name="userEmail"/>
            </div>
            <div className="formSection">
                <p className="formLabel">Password<span>*</span></p>
                <input type="password" name="userPass"/>
            </div>
            <button className="formButton"><Link to="/home"><b>Join today</b></Link></button>
        </form>
    );
}

export default LoginForm;