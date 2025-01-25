import React, { useState, useEffect } from 'react';
import './App.css';
import DepthChart from './components/DepthChart';
import PlayerForm from './components/PlayerForm';
import Modal from './components/Modal';
import Skeleton from "./components/Skeleton";
import {
  mockedConfigAPI,
  mockedPlayerAPI
} from './utils/api'


function App() {
  const [depthCharts, setDepthCharts] = useState({
    NFL: {},
    Soccer: {}
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedSport, setSelectedSport] = useState(null);
  const [sportsConfig, setSportsConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSportsConfig = async () => {
    try {
      const [configResponse, chartsResponse] = await Promise.all([
        mockedConfigAPI,
        mockedPlayerAPI
      ]);

      return {
        config: configResponse,
        initialData: chartsResponse
      };

    } catch (error) {
      console.error('Error fetching sports configuration:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadSportsConfig = async () => {
      setIsLoading(true);
      const mockedAPI = await fetchSportsConfig();
      setSportsConfig(mockedAPI.config);
      setDepthCharts(mockedAPI.initialData)
      setIsLoading(false);
    };

    loadSportsConfig();
  }, []);

  const addPlayer = (sport, position, player, number = null) => {
    console.log('addPlayer called at:', new Date().toISOString(), { sport, position, player, number });

    setDepthCharts(prevCharts => {
      console.log("State update at:", new Date().toISOString(), "Previous state:", prevCharts);

      const newCharts = { ...prevCharts };
      if (!newCharts[sport][position]) {
        newCharts[sport][position] = [];
      }

      const playerExists = newCharts[sport][position].some(
        existingPlayer => existingPlayer.id === player.id
      );

      if (playerExists) {
        return prevCharts; // Return previous state without changes
      }

      const positionChart = [...(newCharts[sport][position] || [])];

      positionChart.unshift(player);

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
    setSelectedPosition(position);
    setSelectedSport(sport)
    setIsModalOpen(true);
  };

  const handleUpdateDepthChart = (sport, position, updatedPositionChart) => {
    setDepthCharts({
      ...depthCharts,
      [sport]: {
        ...depthCharts[sport],
        [position]: updatedPositionChart
      }
    });
  };

  if (isLoading) {
    return (<div>
      <Skeleton count={5} /> {/* Adjust the count or other props as needed */}
    </div>)
  }

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center text-black-600 my-4">
        Sports Depth Charts
      </h1>      <button
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
          sportsConfig={sportsConfig}
          initialPosition={selectedPosition}
          initialSport={selectedSport}
          onAddPlayer={(sport, position, player, number) => {
            addPlayer(sport, position, player, number);
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
        sportsConfig={sportsConfig}
        onUpdateDepthChart={handleUpdateDepthChart}
      />
    </div>
  );
}

export default App;
