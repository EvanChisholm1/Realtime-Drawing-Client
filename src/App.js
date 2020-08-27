import React from 'react';
import './App.css';
import { Canvas } from './components/Canvas';

function App() {
  return (
    <div className="App">
      <Canvas height={1000} width={1000} />
    </div>
  );
}

export default App;
