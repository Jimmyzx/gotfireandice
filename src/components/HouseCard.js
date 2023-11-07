// src/components/HouseCard.js
import React from 'react';
import './HouseCard.css';
const HouseCard = ({ house }) => {
  return (
    <div className="house-card">
        <h2>{house.name}</h2>
        <p>Founder: {house.founder}</p>
        <p>Founded: {house.founded}</p>
        <p>Titles: {house.titles.join(', ')}</p>
        <p>Words: {house.words}</p>
        <p>Seats: {house.seats.join(', ')}</p>
        <p>CurrentLord: {house.currentlord}</p>
        <p>Heir: {house.heir}</p>
        {/* <p>Sworn Members {house.swornMembers.join('character.id,')}</p> */}
    </div>
  );
};

export default HouseCard;


// // src/components/HouseCard.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './HouseCard.css';

// const HouseCard = ({ house }) => {
//   return (
//     <div className="house-card">
//       <Link to={`/houses/${house.id}`}>
//         <h2>{house.name}</h2>
//         <p>Titles: {house.titles.join(', ')}</p>
//         {house.currentLord && (
//           <p>
//             Current Lord:{' '}
//             <Link to={`/characters/${house.currentLord.id}`}>{house.currentLord.name}</Link>
//           </p>
//         )}
//         {house.swornMembers.length > 0 && (
//           <p>
//             Sworn Members: {house.swornMembers.map((member) => member.name).join(', ')}
//           </p>
//         )}
//       </Link>
//     </div>
//   );
// };

// export default HouseCard;
