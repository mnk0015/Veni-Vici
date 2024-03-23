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

  useEffect(() => {
    fetchCatData();
  }, []);

  if (!catData) return <div>Loading...</div>;

  return (
    <div>
      <img src={catData.url} alt="Cat" />
      <button onClick={fetchCatData}>Next Cat</button>
      <div>
        <h3>Attributes:</h3>
        <ul>
          {Object.entries(catData).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
              <button onClick={() => handleBanAttribute(key)}>Ban</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Banned Attributes:</h3>
        <ul>
          {bannedAttributes.map((attribute, index) => (
            <li key={index}>{attribute}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatViewer;
