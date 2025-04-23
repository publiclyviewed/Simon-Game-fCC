import React from 'react';
import { Howl } from 'howler';

const SimonButton = ({ color, soundUrl, onClick }) => {
  const playSound = () => {
    const sound = new Howl({ src: [soundUrl] });
    sound.play();
    if (onClick) onClick(color);
  };

  return (
    <div
      className={`w-32 h-32 rounded-full m-2 cursor-pointer ${color} shadow-md`}
      onClick={playSound}
    />
  );
};

export default SimonButton;
