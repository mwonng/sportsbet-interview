import React from 'react'

function PlayerItem({ player, selectedSport, position, onRemovePlayer, setSelectedPlayer }) {
  return (<li key={player.id} className="flex items-center justify-between bg-white p-3 rounded-md group">
    <div className="flex items-center gap-3">
      <span className="w-8 text-center text-gray-500">{player.spot}</span>
      <span className="font-medium">{player.name}</span>
    </div>
    <div className="flex items-center gap-2 invisible group-hover:visible">
      {position && onRemovePlayer && <button
        onClick={() => onRemovePlayer(selectedSport, position, player.id)}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
      >
        Remove
      </button>}
      {position && setSelectedPlayer && <button
        onClick={() => setSelectedPlayer({ sport: selectedSport, position, ...player })}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Show Below
      </button>}
    </div>
  </li>)
}

export default PlayerItem