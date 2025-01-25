import React, { useState } from 'react';

const defaultValue = {
  name: '',
  sport: 'NFL',
  position: 'QB',
  spot: ''
}

function PlayerForm({ sportsConfig, onAddPlayer }) {
  const [formData, setFormData] = useState({
    name: '',
    sport: 'NFL',
    position: 'QB',
    spot: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const player = {
      id: Date.now(), // Simple ID generation
      name: formData.name
    };

    onAddPlayer(
      formData.sport,
      formData.position,
      player,
      formData.spot ? parseInt(formData.spot) : null
    );

    setFormData(defaultValue)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Player Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-2">
        <select
          value={formData.sport}
          onChange={(e) => setFormData({
            ...formData,
            sport: e.target.value,
            position: sportsConfig[e.target.value].positions[0]
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {Object.keys(sportsConfig).map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <select
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          {sportsConfig[formData.sport].positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <input
          type="number"
          value={formData.spot}
          onChange={(e) => setFormData({ ...formData, spot: e.target.value })}
          placeholder="Position Number (optional)"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Add Player
      </button>
    </form >
  );
}

export default PlayerForm; 