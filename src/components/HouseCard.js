// src/components/HouseCard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HouseCard.css';

const HouseCard = ({ house }) => {
  const [currentLord, setCurrentLord] = useState('');
  const [overlord, setOverlord] = useState('');
  const [heir, setHeir] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentLord = async () => {
      try {
        if (house.currentLord) {
          const response = await axios.get(house.currentLord);
          setCurrentLord(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching current lord data', error);
      }
    };

    const fetchOverlord = async () => {
      try {
        if (house.overlord) {
          const response = await axios.get(house.overlord);
          setOverlord(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching overlord data', error);
      }
    };

    const fetchHeir = async () => {
      try {
        if (house.heir) {
          const response = await axios.get(house.heir);
          setHeir(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching heir data', error);
      }
    };

    Promise.all([fetchCurrentLord(), fetchOverlord(), fetchHeir()])
      .then(() => setLoading(false))
      .catch((error) => console.error('Error fetching data', error));
  }, [house.currentLord, house.overlord, house.heir]);

  return (
    <Link to={`/houses/${house.url.replace(/[^0-9]/g, "")}`} key={house.url}>
      <div className="house-card">
        <h2>{house.name}</h2>
        <p>Words: {house.words}</p>
        <p>Seats: {house.seats.join(', ')}</p>
        <p>Current Lord: {loading ? 'Loading...' : currentLord || 'Unknown'}</p>
        <p>Overlord: {loading ? 'Loading...' : overlord || 'Unknown'}</p>
        <p>Heir: {loading ? 'Loading...' : heir || 'Unknown'}</p>
      </div>
    </Link>
  );
};

export default HouseCard;
