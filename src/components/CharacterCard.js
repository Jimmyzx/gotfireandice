import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  const [allegianceNames, setAllegianceNames] = useState([]);

  useEffect(() => {
    const fetchAllegianceNames = async () => {
      try {
        const allegianceResponses = await Promise.all(
          character.allegiances.map((allegianceUrl) => axios.get(allegianceUrl))
        );
        const names = allegianceResponses.map((response) => response.data.name);
        setAllegianceNames(names);
      } catch (error) {
        console.error('Error fetching allegiance data', error);
      }
    };

    if (character.allegiances && character.allegiances.length > 0) {
      fetchAllegianceNames();
    }
  }, [character.allegiances]);

  return (
    <Link to={`/characters/${character.url.replace(/[^0-9]/g, "")}`} key={character.url}>
      <div className="character-card">
        <h2>{character.name || character.aliases[0]}</h2>
        <img
        src={process.env.PUBLIC_URL + (character.gender === 'Male' ? '/male-icon.png' : '/female-icon.png')}
        alt="Gender Icon"
        />
        <p>Aliases: {character.aliases.join(', ') || 'Unknown'}</p>
        <p>Gender: {character.gender || 'Unknown'}</p>
        <p>Culture: {character.culture || 'Unknown'}</p>
        <p>Titles: {character.titles.join(', ') || 'Unknown'}</p>
        <p>Spouse: {character.spouse || 'Unknown'}</p>
        <p>Allegiances: {allegianceNames.join(', ') || 'Unknown'}</p>
      </div>
    </Link>
  );
};

export default CharacterCard;
