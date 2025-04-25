import React from 'react';
import './ControlPanel.css'; // Import the custom CSS

const ControlPanel = ({ count, onToggleGame, isGameOn, strict, toggleStrict, language }) => {
  const countLabel = language === 'JP' ? '回数' : 'Count';

  return (
    <div className="control-panel">
      <div className="count">
        {countLabel}: <span>{count.toString().padStart(2, '0')}</span>
      </div>
      <div className="buttons">
        <button
          onClick={onToggleGame}
          className={`toggle-button ${isGameOn ? 'game-on' : 'game-off'}`}
        >
          {isGameOn ? (language === 'JP' ? '停止' : 'Stop') : (language === 'JP' ? '開始' : 'Start')}
        </button>
        <button
          onClick={toggleStrict}
          className={`strict-button ${strict ? 'strict-on' : 'strict-off'}`}
        >
          {language === 'JP' ? '厳密' : 'Strict'} {strict ? (language === 'JP' ? 'オン' : 'On') : (language === 'JP' ? 'オフ' : 'Off')}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;