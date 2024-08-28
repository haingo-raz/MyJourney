import React from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <div className="logo">
            <Link to="/home"><i>MJ</i></Link>
            <div className="navRight">
                <Link to="/fitness"><i>Workout</i></Link>
                <Link to="/chat"><i>Chat</i></Link>
                <Link to="/profile">Profile</Link>
            </div>
        </div>
    );
}

export default Navbar;