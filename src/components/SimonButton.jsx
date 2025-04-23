import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const SimonButton = ({ color, rawColor, soundUrl, onClick }) => {
    const [active, setActive] = useState(false);
  
    const playSound = () => {
      const sound = new Howl({ src: [soundUrl] });
      sound.play();
    };
  
    useEffect(() => {
      // This effect allows external flash trigger
      const flashHandler = () => {
        setActive(true);
        playSound();
        setTimeout(() => setActive(false), 300);
      };
  
      window.addEventListener(`flash-${rawColor}`, flashHandler);
      return () => {
        window.removeEventListener(`flash-${rawColor}`, flashHandler);
      };
    }, [rawColor]);
  
    const handleClick = () => {
      setActive(true);
      playSound();
      if (onClick) onClick(rawColor);
      setTimeout(() => setActive(false), 300);
    };
  
    return (
      <div
        id={rawColor}
        className={`w-32 h-32 rounded-full m-2 cursor-pointer ${color} shadow-md transition-all duration-200 ${
          active ? 'brightness-150' : ''
        }`}
        onClick={handleClick}
      />
    );
  };
  

export default SimonButton;
