import React, { useState } from 'react';
import Modal from './Modal';
import PlayerItem from './PlayerItem'

function DepthChart({ depthCharts, onRemovePlayer, sportsConfig, onAddPlayer }) {
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [selectedPosition, setSelectedPosition] = useState('ALL');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const getPlayersBelow = (sport, position, playerId) => {
    const positionChart = depthCharts[sport][position] || [];
    const playerIndex = positionChart.findIndex(p => p.id === playerId);
    return playerIndex >= 0 ? positionChart.slice(playerIndex + 1) : [];
  };

  const renderDepthChart = React.useCallback(() => {
    const sportsToRender = selectedSport === 'ALL'
      ? Object.keys(sportsConfig)
      : [selectedSport];

    return (
      <div className="space-y-8">
        {sportsToRender.map(sport => {
          const availablePositions = sportsConfig[sport].positions;
          if (!availablePositions) return null;

          return (
            <div key={sport} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{sport}</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availablePositions.map(position => {
                  if (selectedPosition !== 'ALL' && position !== selectedPosition) return null;

                  const players = depthCharts[sport]?.[position] || [];

                  return (
                    <div key={position} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-700">{position}</h3>
                        <button
                          onClick={() => onAddPlayer(position, sport)}
                          className="p-1 text-green-500 hover:text-green-600 transition-colors cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      {players.length > 0 && (
                        <ul className="space-y-2">
                          {players.map((player) => (
                            <PlayerItem
                              key={player.id}
                              player={player}
                              selectedSport={sport}
                              position={position}
                              onRemovePlayer={onRemovePlayer}
                              setSelectedPlayer={setSelectedPlayer}
                            />
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [depthCharts, onRemovePlayer, selectedPosition, selectedSport, sportsConfig, onAddPlayer]);

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

      <Modal
        isOpen={selectedPlayer !== null}
        onClose={() => setSelectedPlayer(null)}
        title={`${selectedPlayer?.name} | Whom below`}
      >
        <ul className="space-y-2 mb-4">
          {selectedPlayer && getPlayersBelow(selectedPlayer.sport, selectedPlayer.position, selectedPlayer.id)
            .map(player => (
              <PlayerItem
                key={player.id}
                player={player}
                selectedSport={selectedSport}
              />
            ))}
        </ul>
      </Modal>
    </div>
  );
}

export default DepthChart; 