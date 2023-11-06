// src/pages/House.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import './House.css';

function House() {
  const { id } = useParams(); // Get the ID from the URL

  const [house, setHouse] = useState({});
  const [swornMembers, setSwornMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const response = await axios.get(`https://anapioficeandfire.com/api/houses/${id}`);
        setHouse(response.data);
        const swornMemberResponses = await Promise.all(
          response.data.swornMembers.map((swornMemberUrl) =>
            axios.get(swornMemberUrl)
          )
        );
        setSwornMembers(swornMemberResponses.map((response) => response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching house data', error);
      }
    };

    fetchHouse();
  }, [id]);

  return (
    <div className="house">
      <h1>{house.name}</h1>
      <p>Titles: {house.titles?.join(', ')}</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Sworn Members:</h2>
          <ul>
            {swornMembers.map((swornMember) => (
              <li key={swornMember.url}>{swornMember.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default House;
