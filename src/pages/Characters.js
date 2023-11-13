// src/pages/Characters.js
import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for character links
import './Characters.css';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=5`
      );
      setCharacters((prevCharacters) => [...prevCharacters, ...response.data]);
      setLoading(false);
    };

    fetchCharacters();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="characters">
      <h1>Characters</h1>
      <div className="character-list">
        {characters.map((character) => (
          <Link to={`/characters/${character.id}`} key={character.id}> {/* Wrap the CharacterCard with a Link */}
            <CharacterCard character={character} />
          </Link>
        ))}
      </div>
      <div className='loading'>
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      </div>
    </div>
  );
}

export default Characters;
