import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './House.css';

const House = () => {
  const { id } = useParams(); 

  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await axios.get(`https://anapioficeandfire.com/api/houses/${id}`);

        const houseData = {
          name: response.data.name || 'Unknown',
          titles: response.data.titles?.join(', ') || 'Unknown',
          region: response.data.region || 'Unknown',
          coatOfArms: response.data.coatOfArms || 'Unknown',
          currentLord: '',
          overlord: '',
          heir: '',
          swornMembers: [],
        };

        if (response.data.currentLord) {
          const currentLordResponse = await axios.get(response.data.currentLord);
          houseData.currentLord = currentLordResponse.data.name;
        }

        if (response.data.overlord) {
          const overlordResponse = await axios.get(response.data.overlord);
          houseData.overlord = overlordResponse.data.name;
        }

        if (response.data.heir) {
          const heirResponse = await axios.get(response.data.heir);
          houseData.heir = heirResponse.data.name;
        }

        const swornMembersResponses = await Promise.all(
          response.data.swornMembers.map((swornMemberUrl) => axios.get(swornMemberUrl))
        );
        houseData.swornMembers = swornMembersResponses.map((response) => response.data);

        setHouse(houseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching house data', error);
        setLoading(false);
      }
    };

    fetchHouseData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="house">
      <h1>{house.name}</h1>
      <p>Titles: {house.titles || 'Unknown'}</p>
      <p>Region: {house.region || 'Unknown'}</p>
      <p>Coat Of Arms: {house.coatOfArms || 'Unknown'}</p>
      <p>Current Lord: {house.currentLord || 'Unknown'}</p>
      <p>Overlord: {house.overlord || 'Unknown'}</p>
      <p>Heir: {house.heir || 'Unknown'}</p>
      <p>
        Sworn Members:{' '}
        {house.swornMembers.length > 0
          ? house.swornMembers.map((swornMember) => swornMember.name).join(', ')
          : 'Unknown'}
      </p>
    </div>
  );
};

export default House;
