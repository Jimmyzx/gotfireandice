import React from 'react';
import { Link } from 'react-router-dom';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  if (!character) {
    return "Character Not Found"; 
  }
  return (
    <div className="character-card">
      <Link to={`/characters/${character.id}`}>
        <h2>{character.name || character.aliases[0]}</h2>
        <p>Culture: {character.culture}</p>
        <img
          src={character.gender === 'Male' ? '/male-icon.png' : '/female-icon.png'}
          alt="Gender Icon"
        />
      </Link>
    </div>
  );
};

export default CharacterCard;
