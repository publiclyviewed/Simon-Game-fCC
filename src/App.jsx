import React, { useState, useEffect, useRef } from 'react';
import SimonBoard from './components/SimonBoard';
import ControlPanel from './components/ControlPanel';

function App() {
  const [count, setCount] = useState(0);
  const [strict, setStrict] = useState(false);
  const [gameSequence, setGameSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const timeoutRefs = useRef([]);

  const colors = ['green', 'red', 'yellow', 'blue'];

  useEffect(() => {
    if (isGameOn && gameSequence.length === 0) {
      generateSequence();
    }
  }, [isGameOn]);

  useEffect(() => {
    return () => {
      // Clear any timeouts when the component unmounts
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const handleToggleGame = () => {
    if (isGameOn) {
      // Reset everything when turning off
      setIsGameOn(false);
      setGameSequence([]);
      setPlayerSequence([]);
      setCount(0);
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
    } else {
      setIsGameOn(true);
    }
  };

  const toggleStrict = () => {
    setStrict((prev) => !prev);
  };

  const generateSequence = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...gameSequence, randomColor];
    setGameSequence(newSequence);
    setPlayerSequence([]);
    setCount(newSequence.length);
    displaySequence(newSequence);
  };

  const displaySequence = (sequence) => {
    setIsDisplaying(true);
    sequence.forEach((color, index) => {
      const timeoutId = setTimeout(() => {
        flashColor(color);
        if (index === sequence.length - 1) setIsDisplaying(false);
      }, index * 800);
      timeoutRefs.current.push(timeoutId);
    });
  };

  const flashColor = (color) => {
    window.dispatchEvent(new Event(`flash-${color}`));
  };
  

  const handlePlayerInput = (color) => {
    if (!isGameOn || isDisplaying) return;

    const updatedPlayerSequence = [...playerSequence, color];
    setPlayerSequence(updatedPlayerSequence);

    const currentIndex = updatedPlayerSequence.length - 1;

    if (updatedPlayerSequence[currentIndex] !== gameSequence[currentIndex]) {
      if (strict) {
        alert('Game Over! Strict mode is ON!');
        setIsGameOn(false);
        setGameSequence([]);
        setPlayerSequence([]);
        setCount(0);
      } else {
        alert('Incorrect! Try again.');
        setPlayerSequence([]);
        displaySequence(gameSequence);
      }
      return;
    }

    if (updatedPlayerSequence.length === gameSequence.length) {
      setTimeout(() => generateSequence(), 1000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-6 font-bold">Simon Game</h1>
        <SimonBoard handlePlayerInput={handlePlayerInput} />
        <ControlPanel
          count={count}
          isGameOn={isGameOn}
          onToggleGame={handleToggleGame}
          strict={strict}
          toggleStrict={toggleStrict}
        />
      </div>
    </div>
  );
}

export default App;
