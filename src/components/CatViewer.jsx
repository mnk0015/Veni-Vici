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
    if (!bannedAttributes.includes(attribute)) {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  };

  const handleUnbanAttribute = (attribute) => {
    setBannedAttributes(bannedAttributes.filter((attr) => attr !== attribute));
  };

  useEffect(() => {
    fetchCatData();
  }, []);

  if (!catData) return <div>Loading...</div>;

  // Filter out banned attributes
  const filteredAttributes = Object.entries(catData)
    .filter(([key, value]) => !bannedAttributes.includes(value));

  return (
    <div className="CatViewer">
      <img src={catData.url} alt="Cat" />
      <button onClick={fetchCatData}>Next Cat</button>
      <div>
        <h3>Attributes:</h3>
        <ul>
          {filteredAttributes.map(([key, value]) => (
            <li key={key}>
              {key}: {value}
              <button onClick={() => handleBanAttribute(value)}>Ban</button>
            </li>
          ))}
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
