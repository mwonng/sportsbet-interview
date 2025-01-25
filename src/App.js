import React, { useState } from 'react';
import './App.css';
import DepthChart from './components/DepthChart';
import PlayerForm from './components/PlayerForm';
import { SPORTS_CONFIG } from './config/sportsConfig';
import Modal from './components/Modal';

function App() {
  const [depthCharts, setDepthCharts] = useState({
    NFL: {},
    Soccer: {}
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);

  const addPlayer = (sport, position, player, spot = null) => {
    console.log('addPlayer called at:', new Date().toISOString(), { sport, position, player, spot });

    setDepthCharts(prevCharts => {
      console.log("State update at:", new Date().toISOString(), "Previous state:", prevCharts);

      const newCharts = { ...prevCharts };
      if (!newCharts[sport][position]) {
        newCharts[sport][position] = [];
      }

      // Check if player already exists in this position
      const playerExists = newCharts[sport][position].some(
        existingPlayer => existingPlayer.id === player.id
      );

      if (playerExists) {
        return prevCharts; // Return previous state without changes
      }

      const positionChart = [...(newCharts[sport][position] || [])];

      if (spot !== null) {
        positionChart.splice(spot, 0, player);
      } else {
        positionChart.unshift(player);
      }

      newCharts[sport][position] = positionChart;
      return newCharts;
    });
  };

  const removePlayer = (sport, position, playerId) => {
    setDepthCharts(prevCharts => {
      const newCharts = { ...prevCharts };
      newCharts[sport][position] = newCharts[sport][position].filter(
        player => player.id !== playerId
      );
      return newCharts;
    });
  };

  const openAddPlayerModal = (position = null, sport = null) => {
    console.log("position ---", position, sport)
    setSelectedPosition(position);
    setSelectedSport(sport)
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <h1>Sports Depth Charts</h1>
      <button
        className="add-player-button"
        onClick={() => openAddPlayerModal()}
      >
        Add New Player
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPosition(null);
        }}
        title={`Add new ${selectedPosition || 'player'}`}>
        <PlayerForm
          sportsConfig={SPORTS_CONFIG}
          initialPosition={selectedPosition}
          initialSport={selectedSport}
          onAddPlayer={(sport, position, player, spot) => {
            addPlayer(sport, position, player, spot);
            setIsModalOpen(false);
            setSelectedPosition(position);
            setSelectedSport(sport);
          }}
        />
      </Modal>

      <DepthChart
        depthCharts={depthCharts}
        onRemovePlayer={removePlayer}
        onAddPlayer={openAddPlayerModal}
        sportsConfig={SPORTS_CONFIG}
      />
    </div>
  );
}

export default App;
