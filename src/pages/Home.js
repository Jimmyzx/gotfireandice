import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


const Home = () => {
  return (
    <div>
      <h1>Welcome to the Game of Thrones App</h1>
      <ul>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
        <li>
          <Link to="/houses">Houses</Link>
        </li>
        <li>
          <Link to="/charactersandhouses">Characters & Houses</Link>
        </li>
      </ul>
      <p>Explore the characters and houses of Westeros!</p>
    </div>
  );
};

export default Home;


