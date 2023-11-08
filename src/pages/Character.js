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
  }, [id, character]); // Added 'character' to the dependency array

  return (
    <div className="character">
      <h1>{character.name}</h1>
      <p>Born: {character.born}</p>
      <p>Died: {character.died}</p>
      {character.titles && (
        <p>Titles: {character.titles.join(', ')}</p>
      )}
      <p>Father: {father}</p>
      <p>Mother: {mother}</p>
      <p>Spouse: {spouse}</p>
      <p>Allegiances: {allegiances.join(', ')}</p>
    </div>
  );
};

export default Character;

// // src/pages/Character.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Import Axios
// import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
// import './Character.css'; // Import your CSS for styling

// function Character() {
//   const { id } = useParams(); // Get the ID from the URL

//   const [character, setCharacter] = useState({});
//   const [father, setFather] = useState('');
//   const [mother, setMother] = useState('');
//   const [spouse, setSpouse] = useState('');
//   const [allegiances, setAllegiances] = useState([]);

//   useEffect(() => {
//     const fetchCharacter = async () => {
//       try {
//         const response = await axios.get(`https://anapioficeandfire.com/api/characters/${id}`);
//         setCharacter(response.data);
//         console.log(JSON.stringify(character));
//         if (response.data.father) {
//           const fatherResponse = await axios.get(response.data.father);
//           setFather(fatherResponse.data.name);
//         }
//         if (response.data.mother) {
//           const motherResponse = await axios.get(response.data.mother);
//           setMother(motherResponse.data.name);
//         }
//         if (response.data.spouse) {
//           const spouseResponse = await axios.get(response.data.spouse);
//           setSpouse(spouseResponse.data.name);
//         }
//         const allegianceResponses = await Promise.all(
//           response.data.allegiances.map((allegianceUrl) =>
//             axios.get(allegianceUrl)
//           )
//         );
//         setAllegiances(allegianceResponses.map((response) => response.data.name));
//       } catch (error) {
//         console.error('Error fetching character data', error);
//       }
//     };

//     fetchCharacter();
//   }, [id]);

//   return (
//     <div className="character">
//       <h1>{character.name}</h1>
//       <p>Born: {character.born}</p>
//       <p>Died: {character.died}</p>
//       {character.titles && (
//       <p>Titles: {character.titles.join(', ')}</p>
//       )}
//       <p>Father: {father}</p>
//       <p>Mother: {mother}</p>
//       <p>Spouse: {spouse}</p>
//       <p>Allegiances: {allegiances.join(', ')}</p>
//     </div>
//   );
// }

// export default Character;
