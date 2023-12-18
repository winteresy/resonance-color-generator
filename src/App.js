import React, { useState, useRef } from 'react';
import Sketch from './Sketch';

const App = () => {
  const [image, setImage] = useState(null);
  const [stripes, setStripes] = useState(10);
  const [randomSeed, setRandomSeed] = useState(Math.random());

  const handleImageUpload = event => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = e => setImage(e.target.result);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleStripesChange = event => {
    setStripes(event.target.value);
  };

  const regenerateGradient = () => {
    setRandomSeed(Math.random());
  };

  const sketchRef = useRef();

  const handleSaveImage = () => {
    if (sketchRef.current && sketchRef.current.saveCanvasImage) {
      sketchRef.current.saveCanvasImage();
    } else {
      alert('Please upload an image first.');
    }
  };
  

  return (
    <div className="App">
      <h1>React and p5.js Gradient Generator</h1>
      <input type="file" onChange={handleImageUpload} />
      <br />
      <label>
        Number of Stripes: 
        <input
          type="range"
          min="2"
          max="100"
          value={stripes}
          onChange={handleStripesChange}
        />
      </label>
      <br />
      <button onClick={regenerateGradient}>Regenerate Gradient</button>
      <br />
      <Sketch
        ref={sketchRef}
        image={image}
        stripes={stripes}
        randomSeed={randomSeed}
      />
      
      <button onClick={handleSaveImage} disabled={!image}>Save Image</button>
    </div>
  );
};

export default App;
