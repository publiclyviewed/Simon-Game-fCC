import React from 'react';

const ControlPanel = ({ count, onToggleGame, isGameOn, strict, toggleStrict }) => {
  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <div className="text-lg">
        Count: <span className="font-mono">{count.toString().padStart(2, '0')}</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onToggleGame}
          className={`px-4 py-2 rounded font-semibold ${
            isGameOn ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {isGameOn ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={toggleStrict}
          className={`px-4 py-2 rounded font-semibold ${
            strict ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'
          }`}
        >
          Strict {strict ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
