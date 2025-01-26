import { useState, useEffect } from 'react';
import { mockedConfigAPI, mockedPlayerAPI } from '../utils/api';

function useDepthChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [depthCharts, setDepthCharts] = useState({
    NFL: {},
    Soccer: {}
  });
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
      setDepthCharts(mockedAPI.initialData);
      setIsLoading(false);
    };

    loadSportsConfig();
  }, []);

  const addPlayer = (sport, position, player, number = null) => {
    setDepthCharts(prevCharts => {
      const newCharts = { ...prevCharts };
      if (!newCharts[sport][position]) {
        newCharts[sport][position] = [];
      }

      const playerExists = newCharts[sport][position].some(
        existingPlayer => existingPlayer.id === player.id
      );

      if (playerExists) {
        return prevCharts;
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

  const handleUpdateDepthChart = (sport, position, updatedPositionChart) => {
    setDepthCharts({
      ...depthCharts,
      [sport]: {
        ...depthCharts[sport],
        [position]: updatedPositionChart
      }
    });
  };

  return {
    depthCharts,
    isModalOpen,
    selectedPosition,
    selectedSport,
    sportsConfig,
    isLoading,
    setIsModalOpen,
    setSportsConfig,
    setSelectedPosition,
    addPlayer,
    removePlayer,
    setSelectedSport,
    handleUpdateDepthChart
  };
}

export default useDepthChart;