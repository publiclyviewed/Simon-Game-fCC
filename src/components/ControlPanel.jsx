import React from 'react';

const ControlPanel = ({ count, onStart, strict, toggleStrict }) => {
  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <div className="text-lg">
        Count: <span className="font-mono">{count.toString().padStart(2, '0')}</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onStart}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Start
        </button>
        <button
          onClick={toggleStrict}
          className={`px-4 py-2 rounded ${
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
