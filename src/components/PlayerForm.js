import React, { useState } from 'react';

const defaultValue = {
  name: '',
  sport: '',
  position: '',
  number: ''
}

function PlayerForm({ sportsConfig, onAddPlayer, initialPosition, initialSport }) {
  const [formData, setFormData] = useState({
    name: '',
    sport: initialSport || '',
    position: initialPosition || (initialSport ? sportsConfig[initialSport].positions[0] : ''),
    number: ''
  });
  const [showWarning, setShowWarning] = useState(false);

  console.log("pc, ", initialPosition, initialSport)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sport || !formData.position) {
      setShowWarning(true);
      return;
    }
    const player = {
      id: Date.now(), // Simple ID generation
      name: formData.name,
      number: formData.number
    };

    onAddPlayer(
      formData.sport,
      formData.position,
      player,
      formData.number ? parseInt(formData.number) : null
    );

    setFormData(defaultValue)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow-md">
      {showWarning && (
        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          Please fill in all required fields
        </div>
      )}
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
        <input
          type="number"
          value={formData.number}
          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
          placeholder="Number (optional)"
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="space-y-2">
        <select
          required
          value={formData.sport}
          onChange={(e) => setFormData({
            ...formData,
            sport: e.target.value,
            position: e.target.value ? sportsConfig[e.target.value].positions[0] : ''
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Please select</option>
          {Object.keys(sportsConfig).map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <select
          required
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Select...</option>
          {formData.sport && sportsConfig[formData.sport].positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer"
      >
        Add Player
      </button>
    </form >
  );
}

export default PlayerForm; 