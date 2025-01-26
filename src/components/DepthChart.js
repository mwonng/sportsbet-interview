import React from 'react';
import Modal from './Modal';
import PlayerItem from './PlayerItem'
import { useSelection } from "../context/SelectionContext";

function DepthChart({ depthCharts, onRemovePlayer, sportsConfig, onAddPlayer, onUpdateDepthChart }) {
  const {
    selectedSport,
    setSelectedSport,
    selectedPosition,
    setSelectedPosition,
    selectedPlayer,
    setSelectedPlayer
  } = useSelection();

  const getPlayersBelow = (sport, position, playerId) => {
    const positionChart = depthCharts[sport][position] || [];
    const playerIndex = positionChart.findIndex(p => p.id === playerId);
    return playerIndex >= 0 ? positionChart.slice(playerIndex + 1) : [];
  };

  const renderDepthChart = React.useCallback(() => {
    const movePlayer = (sport, position, currentIndex, direction) => {
      const newIndex = currentIndex + direction;
      const positionChart = [...(depthCharts[sport][position] || [])];

      if (newIndex >= 0 && newIndex < positionChart.length) {
        [positionChart[currentIndex], positionChart[newIndex]] =
          [positionChart[newIndex], positionChart[currentIndex]];
        onUpdateDepthChart(sport, position, positionChart);
      }
    };

    const movePlayerUp = (sport, position, playerId) => {
      const positionChart = depthCharts[sport][position] || [];
      const currentIndex = positionChart.findIndex(p => p.id === playerId);
      movePlayer(sport, position, currentIndex, -1);
    };

    const movePlayerDown = (sport, position, playerId) => {
      const positionChart = depthCharts[sport][position] || [];
      const currentIndex = positionChart.findIndex(p => p.id === playerId);
      movePlayer(sport, position, currentIndex, 1);
    };

    const sportsToRender = selectedSport === 'ALL'
      ? Object.keys(sportsConfig)
      : [selectedSport];


    return (
      <div className="space-y-8">
        {sportsToRender.map(sport => {
          const availablePositions = sportsConfig[sport].positions;
          if (!availablePositions) return null;

          return (
            <div key={sport} className="bg-white rounded-lg p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{sport}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-4">
                {availablePositions.map(position => {
                  if (selectedPosition !== 'ALL' && position !== selectedPosition) return null;

                  const players = depthCharts[sport]?.[position] || [];

                  return (
                    <div key={position} className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-w-[250px]">
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
                          {players.map((player, index) => (
                            <PlayerItem
                              key={player.id}
                              player={player}
                              selectedSport={sport}
                              position={position}
                              onRemovePlayer={onRemovePlayer}
                              setSelectedPlayer={setSelectedPlayer}
                              onMoveUp={() => movePlayerUp(sport, position, player.id)}
                              onMoveDown={() => movePlayerDown(sport, position, player.id)}
                              isFirst={index === 0}
                              isLast={index === players.length - 1}
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
  }, [selectedSport, sportsConfig, depthCharts, onUpdateDepthChart, selectedPosition, onAddPlayer, onRemovePlayer, setSelectedPlayer]);

  const FilterComponent = React.memo(() => {
    return (
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-center ">
        <div className="relative w-full sm:w-48">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="appearance-none w-full sm:w-48 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 
              font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 
              focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="ALL">All Sports</option>
            {Object.keys(sportsConfig).map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative w-full sm:w-48">
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="appearance-none w-full sm:w-48 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 
              font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 
              focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          >
            <option value="ALL">All Positions</option>
            {selectedSport !== 'ALL' &&
              sportsConfig[selectedSport].positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))
            }
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }, [sportsConfig]);

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