import React, { useState } from 'react';
import SimonBoard from './components/SimonBoard';
import ControlPanel from './components/ControlPanel';

function App() {
  const [count, setCount] = useState(0);
  const [strict, setStrict] = useState(false);
  const [gameSequence, setGameSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Start the game by generating the first sequence
  const handleStart = () => {
    setCount(1);  // Reset the count for the start
    setGameSequence([]);  // Clear previous game sequence
    setPlayerSequence([]);  // Clear the player's input sequence
    setGameOver(false);
    generateSequence();  // Generate the first color
  };

  // Toggle the strict mode
  const toggleStrict = () => {
    setStrict((prev) => !prev);
  };

  // Generate a random sequence
  const generateSequence = () => {
    const colors = ['green', 'red', 'yellow', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...gameSequence, randomColor];
    setGameSequence(newSequence);
    setPlayerSequence([]);
    displaySequence(newSequence);
  };

  // Display the sequence to the player
  const displaySequence = (sequence) => {
    sequence.forEach((color, index) => {
      setTimeout(() => {
        flashColor(color); // Flash each color in the sequence
      }, index * 1000); // Flash colors one by one with a delay
    });
  };

  // Flash the button with the color
  const flashColor = (color) => {
    const button = document.getElementById(color);
    button.classList.add('bg-opacity-75');
    setTimeout(() => {
      button.classList.remove('bg-opacity-75');
    }, 500);
  };

  // Handle the player's input
  const handlePlayerInput = (color) => {
    if (gameOver) return;

    const updatedPlayerSequence = [...playerSequence, color];
    setPlayerSequence(updatedPlayerSequence);

    // Check if the player's input matches the sequence
    if (updatedPlayerSequence[updatedPlayerSequence.length - 1] !== gameSequence[updatedPlayerSequence.length - 1]) {
      // Incorrect input - game over
      setGameOver(true);
      alert(strict ? 'Game Over! Strict mode is ON!' : 'Game Over! Try again!');
      return;
    }

    // If the player completes the sequence correctly
    if (updatedPlayerSequence.length === gameSequence.length) {
      setCount((prev) => prev + 1); // Increment the score
      setPlayerSequence([]);
      generateSequence(); // Generate a new sequence
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-6 font-bold">Simon Game</h1>
      <SimonBoard handlePlayerInput={handlePlayerInput} />
      <ControlPanel
        count={count}
        onStart={handleStart}
        strict={strict}
        toggleStrict={toggleStrict}
      />
    </div>
  );
}

export default App;
