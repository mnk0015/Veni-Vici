// App.jsx
import React from 'react';
import './App.css';
import CatViewer from './components/CatViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cat API Viewer</h1>
        <CatViewer />
      </header>
    </div>
  );
}

export default App;
