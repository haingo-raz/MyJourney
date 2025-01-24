import React from 'react';
import './Navbar.scss';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="logo">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        <i>MyJourney</i>
      </NavLink>
      <div className="nav-right">
        <NavLink
          to="/fitness"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <i>Workout</i>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <i>Chat</i>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Profile
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
