import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SimonBoard from './components/SimonBoard';
import ControlPanel from './components/ControlPanel';
import Popup from './components/Popup';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [strict, setStrict] = useState(false);
  const [gameSequence, setGameSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isGameOn, setIsGameOn] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [instructionsVisible, setInstructionsVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [language, setLanguage] = useState('EN');
  const [bestStreak, setBestStreak] = useState(() => parseInt(localStorage.getItem('bestStreak')) || 0);

  const timeoutRefs = useRef([]);
  const colors = useMemo(() => ['green', 'red', 'yellow', 'blue'], []);

  const translations = {
    EN: {
      start: 'Start',
      stop: 'Stop',
      strict: 'Strict',
      count: 'Count',
      win: 'You Win!',
      lose: 'You Lose!',
      instructions: `How to play:
- Click the buttons OR press the keys: A for green, S for red, D for yellow, F for blue.
- Follow the pattern of lights and sounds, and repeat it back.
- Turn on strict mode for a greater challenge!`,
      showInstructions: 'Show Instructions',
      hideInstructions: 'Hide Instructions',
      score: 'Score',
      best: 'Best Streak'
    },
    JP: {
      start: '開始',
      stop: '停止',
      strict: '厳密',
      count: '回数',
      win: '勝利！',
      lose: '敗北！',
      instructions: `遊び方：
- ボタンをクリックするか、キーを押します: A は緑, S は赤, D は黄, F は青。
- 光と音の順序を覚えて、再現してください。
- 厳密モードをオンにして、さらに挑戦しよう！`,
      showInstructions: '説明を表示',
      hideInstructions: '説明を非表示',
      score: 'スコア',
      best: '最高記録'
    }
  };

  const getFlashDelay = (length) => {
    if (length < 5) return 800;
    if (length < 10) return 600;
    if (length < 15) return 400;
    return 300;
  };

  const errorSound = useMemo(() => new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg'), []);

  const flashColor = (color) => {
    window.dispatchEvent(new Event(`flash-${color}`));
  };

  const displaySequence = useCallback(
    (sequence) => {
      setIsDisplaying(true);
      const delay = getFlashDelay(sequence.length);
      sequence.forEach((color, index) => {
        const timeoutId = setTimeout(() => {
          flashColor(color);
          if (index === sequence.length - 1) setIsDisplaying(false);
        }, index * delay);
        timeoutRefs.current.push(timeoutId);
      });
    },
    [timeoutRefs]
  );

  const generateSequence = useCallback(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...gameSequence, randomColor];
    setGameSequence(newSequence);
    setPlayerSequence([]);
    setCount(newSequence.length);
    displaySequence(newSequence);
  }, [colors, gameSequence, displaySequence]);

  useEffect(() => {
    if (isGameOn && gameSequence.length === 0) {
      generateSequence();
    }
  }, [isGameOn, gameSequence, generateSequence]);

  useEffect(() => {
    const keyMap = { a: 'green', s: 'red', d: 'yellow', f: 'blue' };
    const handleKeyPress = (e) => {
      const color = keyMap[e.key];
      if (color) {
        handlePlayerInput(color);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameSequence, playerSequence]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    errorSound.load();
  }, [errorSound]);

  const handleToggleGame = () => {
    if (isGameOn) {
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

  const toggleStrict = () => setStrict((prev) => !prev);

  const handlePlayerInput = (color) => {
    if (!isGameOn || isDisplaying) return;

    const updatedPlayerSequence = [...playerSequence, color];
    setPlayerSequence(updatedPlayerSequence);

    const currentIndex = updatedPlayerSequence.length - 1;

    if (updatedPlayerSequence[currentIndex] !== gameSequence[currentIndex]) {
      errorSound.play();
      if (strict) {
        setPopupMessage(translations[language].lose);
        setPopupVisible(true);
        setIsGameOn(false);
        setGameSequence([]);
        setPlayerSequence([]);
        setCount(0);
      } else {
        setPlayerSequence([]);
        displaySequence(gameSequence);
      }
      return;
    }

    if (updatedPlayerSequence.length === gameSequence.length) {
      if (updatedPlayerSequence.length > bestStreak) {
        setBestStreak(updatedPlayerSequence.length);
        localStorage.setItem('bestStreak', updatedPlayerSequence.length);
      }

      if (updatedPlayerSequence.length === 20) {
        setPopupMessage(translations[language].win);
        setPopupVisible(true);
        setIsGameOn(false);
        setGameSequence([]);
        setPlayerSequence([]);
        setCount(0);
      } else {
        setTimeout(() => generateSequence(), 1000);
      }
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="title">サイモン・リズムX</h1>
        <div className="language-selector">
          <label>
            {language === 'EN' ? 'Language' : '言語'}
            <select onChange={(e) => setLanguage(e.target.value)} value={language}>
              <option value="EN">English</option>
              <option value="JP">日本語</option>
            </select>
          </label>
        </div>
        <div className="score-display">
          <p>{translations[language].score}: {count}</p>
          <p>{translations[language].best}: {bestStreak}</p>
        </div>
      </header>
      <SimonBoard handlePlayerInput={handlePlayerInput} />
      <ControlPanel
        count={count}
        isGameOn={isGameOn}
        onToggleGame={handleToggleGame}
        strict={strict}
        toggleStrict={toggleStrict}
        language={language}
        translations={translations}
      />
      <button onClick={() => setInstructionsVisible((prev) => !prev)}>
        {instructionsVisible ? translations[language].hideInstructions : translations[language].showInstructions}
      </button>
      {instructionsVisible && <p className="instructions">{translations[language].instructions}</p>}
      {popupVisible && (
        <Popup
          message={popupMessage}
          kanji="勝"
          onClose={() => setPopupVisible(false)}
          onReplay={() => {
            setPopupVisible(false);
            setGameSequence([]);
            setPlayerSequence([]);
            setCount(0);
            setIsGameOn(true);
          }}
        />
      )}
    </div>
  );
}

export default App;
