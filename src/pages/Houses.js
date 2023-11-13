// src/pages/Houses.js
import React, { useState, useEffect } from 'react';
import HouseCard from '../components/HouseCard';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for house links
import './Houses.css';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=5`
      );
      setHouses((prevHouses) => [...prevHouses, ...response.data]);
      setLoading(false);
    };

    fetchHouses();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="houses">
      <h1>Houses</h1>
      <div className="house-list">
        {houses.map((house) => (
          <Link to={`/houses/${house.id}`} key={house.id}> {/* Wrap the HouseCard with a Link */}
            <HouseCard house={house} />
          </Link>
        ))}
      </div>
      <div className="loading">
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      </div>
    </div>
  );
}

export default Houses;
