// CharactersAndHouses.js

import React from 'react';
import Characters from './Characters'; // Import the Characters component
import Houses from './Houses';       // Import the Houses component

function CharactersAndHouses() {
  return (
    <div>
      <h1>Characters & Houses</h1>
      <Characters /> {/* Display the Characters component */}
      <Houses />     {/* Display the Houses component */}
    </div>
  );
}

export default CharactersAndHouses;
