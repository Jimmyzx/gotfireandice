import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Characters from './pages/Characters';
import Character from './pages/Character';
import Houses from './pages/Houses';
import House from './pages/House';
import CharactersAndHouses from './pages/CharactersAndHouses';
import Home from './pages/Home';
import NavBar from './components/NavBar';

import gameOfThronesAudio from './gameofthrones.mp3';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<Character />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/houses/:id" element={<House />} />
            <Route path="/charactersandhouses" element={<CharactersAndHouses />} />
          </Routes>
        </div>
        <div className="audio-container">
          <audio controls autoPlay>
            <source src={gameOfThronesAudio} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;