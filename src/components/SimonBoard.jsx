import React from 'react';
import SimonButton from './SimonButton';

const sounds = {
  green: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound1.mp3',
  red: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound2.mp3',
  yellow: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound3.mp3',
  blue: 'https://cdn.freecodecamp.org/curriculum/take-home-projects/simonSound4.mp3',
};

const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-500',
  };
  
  const SimonBoard = ({ handlePlayerInput }) => {
    return (
      <div className="grid grid-cols-2 gap-4 justify-center items-center">
        {Object.entries(sounds).map(([color, url]) => (
          <SimonButton
            key={color}
            id={color}
            color={colorClasses[color]}
            rawColor={color}
            soundUrl={url}
            onClick={handlePlayerInput}
          />
        ))}
      </div>
    );
  };
  

export default SimonBoard;
