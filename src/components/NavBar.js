import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav className="navbar">
    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
      Home
    </NavLink>
    <NavLink to="/characters" className={({ isActive }) => (isActive ? 'active' : undefined)}>
      Characters
    </NavLink>
    <NavLink to="/houses" className={({ isActive }) => (isActive ? 'active' : undefined)}>
      Houses
    </NavLink>
    <NavLink to="/charactersandhouses" className={({ isActive }) => (isActive ? 'active' : undefined)}>
      Characters & Houses
    </NavLink>
  </nav>
);

export default NavBar;
