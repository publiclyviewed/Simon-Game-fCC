import React, { useEffect, useState } from 'react';
import './Popup.css';

const PopupModal = ({ message, onClose, kanji }) => {
  const [floatingKanji, setFloatingKanji] = useState([]);

  // Generate floating kanji particles
  useEffect(() => {
    const numKanji = 10; // Number of floating kanji
    const generatedKanji = Array.from({ length: numKanji }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${4 + Math.random() * 3}s`,
      size: `${20 + Math.random() * 10}px`,
    }));
    setFloatingKanji(generatedKanji);
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
      </div>
      {floatingKanji.map((particle) => (
        <div
          key={particle.id}
          className="floating-kanji"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            fontSize: particle.size,
          }}
        >
          {kanji}
        </div>
      ))}
    </div>
  );
};

export default PopupModal;