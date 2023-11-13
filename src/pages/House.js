import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './House.css';

const House = () => {
  const { id } = useParams(); // Get the ID from the URL

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

        // Fetch data for currentLord
        if (response.data.currentLord) {
          const currentLordResponse = await axios.get(response.data.currentLord);
          houseData.currentLord = currentLordResponse.data.name;
        }

        // Fetch data for overlord
        if (response.data.overlord) {
          const overlordResponse = await axios.get(response.data.overlord);
          houseData.overlord = overlordResponse.data.name;
        }

        // Fetch data for heir
        if (response.data.heir) {
          const heirResponse = await axios.get(response.data.heir);
          houseData.heir = heirResponse.data.name;
        }

        // Fetch data for swornMembers
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './House.css';

// const House = () => {
//   const { id } = useParams(); // Get the ID from the URL

//   const [house, setHouse] = useState({});
//   const [currentLord, setCurrentLord] = useState([]);
//   const [heir, setHeir] = useState([]);
//   const [swornMembers, setSwornMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentLord = async () => {
//       try {
//         const response = await axios.get(`https://anapioficeandfire.com/api/houses/${id}`);
//         const currentLordResponses = await Promise.all(
//           response.data.currentLord.map((currentLordUrl) =>
//             axios.get(currentLordUrl)
//           )
//         );
//         setCurrentLord(currentLordResponses.map((response) => response.data));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching current lord data', error);
//       }
//     };

//     fetchCurrentLord();
//   }, [id]);

//   useEffect(() => {
//     const fetchHeir = async () => {
//       try {
//         const response = await axios.get(`https://anapioficeandfire.com/api/houses/${id}`);
//         setHouse(response.data);
//         const heirResponses = await Promise.all(
//           response.data.heirs.map((heirUrl) =>
//             axios.get(heirUrl)
//           )
//         );
//         setHeir(heirResponses.map((response) => response.data));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching heir data', error);
//       }
//     };

//     fetchHeir();
//   }, [id]);

//   useEffect(() => {
//     const fetchSwornMembers = async () => {
//       try {
//         const response = await axios.get(`https://anapioficeandfire.com/api/houses/${id}`);
//         const swornMemberResponses = await Promise.all(
//           response.data.swornMembers.map((swornMemberUrl) =>
//             axios.get(swornMemberUrl)
//           )
//         );
//         setSwornMembers(swornMemberResponses.map((response) => response.data));
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching sworn members data', error);
//       }
//     };

//     fetchSwornMembers();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="house">
//       <h1>{house.name}</h1>
//       <p>Titles: {house.titles?.join(', ') || 'Unknown'}</p>
//       <p>Region: {house.region || 'Unknown'}</p>
//       <p>Coat Of Arms: {house.coatOfArms || 'Unknown'}</p>
//       <p>Current Lord: {currentLord.map((currentLord) => currentLord.name).join(', ') || 'Unknown'}</p>
//       <p>Overlord: {house.overlord || 'Unknown'}</p>
//       <p>Heir: {heir.map((heir) => heir.name).join(', ') || 'Unknown'}</p>
//       <p>Sworn Members: {swornMembers.map((swornMembers) => swornMembers.name).join(', ') || 'Unknown'}</p>
// {/*   
//           <p>Sworn Members:</p>
//           <ul>
//             {swornMembers.map((swornMember) => (
//               <li key={swornMember.url}>{swornMember.name}</li>
//             ))}
//           </ul> */}
   
//     </div>
//   );
// };

// export default House;

