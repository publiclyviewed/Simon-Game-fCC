import React from 'react';
import SimonButton from './SimonButton';
import './SimonBoard.css'; // Import the new CSS file

const sounds = {
  green: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3',
  red: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3',
  yellow: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3',
  blue: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3',
};

const colors = {
  green: '#00ff00',
  red: '#ff0000',
  yellow: '#ffff00',
  blue: '#0000ff',
};

const SimonBoard = ({ handlePlayerInput }) => {
  return (
    <div className="simon-board">
      {Object.entries(sounds).map(([color, url]) => (
        <SimonButton
          key={color}
          color={colors[color]} // Use the actual color code here
          rawColor={color}
          soundUrl={url}
          onClick={handlePlayerInput}
        />
      ))}
    </div>
  );
};

export default SimonBoard;