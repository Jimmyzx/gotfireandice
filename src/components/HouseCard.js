import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HouseCard.css';

const HouseCard = ({ house }) => {
  return (
    <div className="house-card">
      <Link to={`/houses/${house.id}`}> {/* Wrap the content with a Link */}
        <h2>{house.name}</h2>
        <p>Titles: {house.titles.join(', ')}</p>
        {house.currentLord && (
          <p>
            Current Lord:{' '}
            <Link to={`/characters/${house.currentLord.id}`}>{house.currentLord.name}</Link>
          </p>
        )}
        {house.swornMembers.length > 0 && (
          <p>
            Sworn Members: {house.swornMembers.map((member) => (
              <Link to={`/characters/${member.id}`} key={member.id}>{member.name}</Link>
            )).join(', ')}
          </p>
        )}
      </Link>
    </div>
  );
};

export default HouseCard;
