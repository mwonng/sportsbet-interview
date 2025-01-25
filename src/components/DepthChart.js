import React, { useState } from 'react';


function DepthChart({ depthCharts, onRemovePlayer, sportsConfig }) {
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [selectedPosition, setSelectedPosition] = useState('ALL');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const getPlayersBelow = (sport, position, playerId) => {
    const positionChart = depthCharts[sport][position] || [];
    const playerIndex = positionChart.findIndex(p => p.id === playerId);
    return playerIndex >= 0 ? positionChart.slice(playerIndex + 1) : [];
  };

  const renderDepthChart = React.useCallback(() => {
    if (selectedSport === 'ALL') {
      return (
        <div className="text-center text-gray-600 py-8">
          Please select a sport to view its depth chart
        </div>
      );
    }

    const positions = depthCharts[selectedSport];
    if (!positions) return null;

    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedSport}</h2>
        {Object.entries(positions).map(([position, players]) => {
          if (selectedPosition !== 'ALL' && position !== selectedPosition) return null;

          return (
            <div key={position} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{position}</h3>
              <ul className="space-y-2">
                {players.map((player, index) => (
                  <li key={player.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                    <span className="font-medium">{player.name}</span>
                    <button
                      onClick={() => onRemovePlayer(selectedSport, position, player.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => setSelectedPlayer({ sport: selectedSport, position, ...player })}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Show Players Below
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }, [depthCharts, onRemovePlayer, selectedPosition, selectedSport]);

  const FilterComponent = React.memo(() => {
    return (
      <div className="mb-6 flex gap-4">
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Sports</option>
          {Object.keys(sportsConfig).map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>

        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Positions</option>
          {selectedSport !== 'ALL' &&
            sportsConfig[selectedSport].positions.map(position => (
              <option key={position} value={position}>{position}</option>
            ))
          }
        </select>
      </div>
    );
  });

  return (
    <div className="p-4">
      <FilterComponent />
      <div className="space-y-6">
        {renderDepthChart()}
      </div>

      {selectedPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Players Below {selectedPlayer.name}</h3>
            <ul className="space-y-2 mb-4">
              {getPlayersBelow(selectedPlayer.sport, selectedPlayer.position, selectedPlayer.id)
                .map(player => (
                  <li key={player.id} className="p-2 bg-gray-50 rounded">{player.name}</li>
                ))}
            </ul>
            <button
              onClick={() => setSelectedPlayer(null)}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepthChart; 