import React, { createContext, useState, useContext, useEffect } from 'react';

const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
  const [selectedSport, setSelectedSport] = useState('ALL');
  const [selectedPosition, setSelectedPosition] = useState('ALL');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    setSelectedPosition('ALL')
  }, [selectedSport])


  return (
    <SelectionContext.Provider value={{
      selectedSport,
      setSelectedSport,
      selectedPosition,
      setSelectedPosition,
      selectedPlayer,
      setSelectedPlayer
    }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  return useContext(SelectionContext);
};