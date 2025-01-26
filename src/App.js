import React from 'react';
import './App.css';
import DepthChart from './components/DepthChart';
import PlayerForm from './components/PlayerForm';
import Modal from './components/Modal';
import Skeleton from "./components/Skeleton";
import useDepthChart from "./hooks/useDepthChart";

function App() {
  const {
    depthCharts,
    sportsConfig,
    isLoading,
    addPlayer,
    removePlayer,
    isModalOpen,
    setIsModalOpen,
    handleUpdateDepthChart
  } = useDepthChart();
  const [initForm, setInitForm] = React.useState({ sport: null, position: null })

  const openAddPlayerModal = (position = null, sport = null) => {
    setInitForm({ sport: sport, position: position });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (<div>
      <Skeleton count={5} />
    </div>)
  }

  return (
    <div className="App container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-black-600 my-4">
        Sports Depth Charts
      </h1>
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
        }}
        title={`Add new ${initForm.position || 'player'}`}>
        <PlayerForm
          sportsConfig={sportsConfig}
          initialPosition={initForm.position}
          initialSport={initForm.sport}
          onAddPlayer={(sport, position, player, number) => {
            addPlayer(sport, position, player, number);
            setIsModalOpen(false);
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
