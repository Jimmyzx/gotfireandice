import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Character.css';

const Character = () => {
  const { id } = useParams();

  const [character, setCharacter] = useState({});
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [spouse, setSpouse] = useState('');
  const [allegiances, setAllegiances] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://anapioficeandfire.com/api/characters/${id}`);
        setCharacter(response.data);
        console.log(JSON.stringify(character));
        if (response.data.father) {
          const fatherResponse = await axios.get(response.data.father);
          setFather(fatherResponse.data.name);
        }
        if (response.data.mother) {
          const motherResponse = await axios.get(response.data.mother);
          setMother(motherResponse.data.name);
        }
        if (response.data.spouse) {
          const spouseResponse = await axios.get(response.data.spouse);
          setSpouse(spouseResponse.data.name);
        }
        const allegianceResponses = await Promise.all(
          response.data.allegiances.map((allegianceUrl) =>
            axios.get(allegianceUrl)
          )
        );
        setAllegiances(allegianceResponses.map((response) => response.data.name));
        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching character data', error);
      }
    };

    fetchCharacter();
  }, [id, character]); 

  return (
    <div className="character">
      <h1>{character.name || character.aliases}</h1>
      <p>Born: {character.born || 'Unknown'}</p>
      <p>Died: {character.died || 'Unknown'}</p>
      {character.titles && (
      <p>Titles: {character.titles.join(', ' || 'Unknown')}</p>)}
      <p>Father: {father || character.father || 'Unknown'}</p>
      <p>Mother: {mother || character.mother || 'Unknown'}</p>
      <p>Spouse: {spouse || character.spouse || 'Unknown'}</p>
      <p>Allegiances: {allegiances.join(', ') || character.allegiances || 'Unknown'}</p>
    </div>
  );
};

export default Character;
