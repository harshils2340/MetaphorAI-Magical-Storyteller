import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import './MainPage.css';

function MainPage() {
  const [prompt, setPrompt] = useState('');
  const history = useHistory();

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleCreateStory = () => {
    fetch('http://localhost:3002/process_user_input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: prompt }), // Send the user's input as JSON
    })
      .then((response) => response.json()) 
      .then((data) => {
        // Handle the response from the Python backend (e.g., display the result)
        console.log(data);

        history.push(`/story/1`);
      });
  };  

  return (
    <div className="main-page">
      <div className="centered-content">
        <h1>Metaphor Magic Storyteller</h1>
        <p>Make me a story about:</p>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={handlePromptChange}
        />
        <button onClick={handleCreateStory}>Create</button>
      </div>
    </div>
  );
  
}

export default MainPage;
