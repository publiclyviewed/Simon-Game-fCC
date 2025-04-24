import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import './SimonButton.css'; // Import the custom CSS

const SimonButton = ({ color, rawColor, soundUrl, onClick }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const playSound = () => {
      const sound = new Howl({ src: [soundUrl] });
      sound.play();
    };

    const flashHandler = () => {
      setActive(true);
      playSound();
      setTimeout(() => setActive(false), 300);
    };

    window.addEventListener(`flash-${rawColor}`, flashHandler);
    return () => {
      window.removeEventListener(`flash-${rawColor}`, flashHandler);
    };
  }, [rawColor, soundUrl]);

  const handleClick = () => {
    const sound = new Howl({ src: [soundUrl] });
    sound.play();
    setActive(true);
    if (onClick) onClick(rawColor);
    setTimeout(() => setActive(false), 300);
  };

  return (
    <div
      id={rawColor}
      className={`simon-button ${color} ${active ? 'active' : ''}`}
      onClick={handleClick}
      style={{ backgroundColor: color }} // Use color to define button background
    >
      <span className="button-text">
        {rawColor === 'green'
          ? '緑'
          : rawColor === 'red'
          ? '赤'
          : rawColor === 'yellow'
          ? '黄'
          : '青'}
      </span>
    </div>
  );
};

export default SimonButton;