// CatViewer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatViewer = () => {
  const [catData, setCatData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);

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

  const handleBanAttribute = (attribute) => {
    setBannedAttributes([...bannedAttributes, attribute]);
  };

  const handleUnbanAttribute = (attribute) => {
    setBannedAttributes(bannedAttributes.filter((attr) => attr !== attribute));
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  if (!catData) return <div>Loading...</div>;

  return (
    <div className="CatViewer">
      <img src={catData.url} alt="Cat" />
      <button onClick={fetchCatData}>Next Cat</button>
      <div>
        <h3>Attributes:</h3>
        <ul>
          <li>Breed: {catData.breeds[0]?.name}</li>
          <button onClick={() => handleBanAttribute('breed')}>Ban Breed</button>
          <li>Life Span: {catData.breeds[0]?.life_span}</li>
          <button onClick={() => handleBanAttribute('life_span')}>Ban Life Span</button>
          <li>Origin: {catData.breeds[0]?.origin}</li>
          <button onClick={() => handleBanAttribute('origin')}>Ban Origin</button>
        </ul>
      </div>
      <div>
        <h3>Banned Attributes:</h3>
        <ul>
          {bannedAttributes.map((attribute, index) => (
            <li key={index}>
              {attribute}
              <button onClick={() => handleUnbanAttribute(attribute)}>Unban</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatViewer;
