// CatViewer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatViewer = () => {
  const [catData, setCatData] = useState(null);
  const [bannedLocations, setBannedLocations] = useState([]);
  const [bannedBreeds, setBannedBreeds] = useState([]);
  const [bannedWeights, setBannedWeights] = useState([]);

  const fetchCatData = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_91uvp8eFui3hOavZZeGGHDhE9DcgWbVrTFzVzmlNZWSUx0nklNpWUb6nZXiwzPtn'
        }
      });
      setCatData(response.data[0]);
    } catch (error) {
      console.error('Error fetching cat data:', error);
    }
  };

  const handleBanLocation = (location) => {
    setBannedLocations([...bannedLocations, location]);
  };

  const handleBanBreed = (breed) => {
    setBannedBreeds([...bannedBreeds, breed]);
  };

  const handleBanWeight = (weight) => {
    setBannedWeights([...bannedWeights, weight]);
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  if (!catData) return <div>Loading...</div>;

  // Filter out banned attributes
  const isAllowedCat = () => {
    return (
      !bannedLocations.includes(catData.origin) &&
      !bannedBreeds.includes(catData.breeds) &&
      !bannedWeights.includes(catData.weight)
    );
  };

  const getNextCat = () => {
    fetchCatData();
  };

  return (
    <div className="CatViewer">
      {isAllowedCat() ? (
        <img src={catData.url} alt="Cat" />
      ) : (
        <div>No more cats matching your preferences.</div>
      )}
      <button onClick={getNextCat}>Next Cat</button>
      <div>
        <h3>Attributes:</h3>
        <ul>
          <li>
            Location: {catData.origin}
            <button onClick={() => handleBanLocation(catData.origin)}>Ban</button>
          </li>
          <li>
            Breed: {catData.breeds}
            <button onClick={() => handleBanBreed(catData.breeds)}>Ban</button>
          </li>
          <li>
            Weight: {catData.weight}
            <button onClick={() => handleBanWeight(catData.weight)}>Ban</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CatViewer;
