import React from 'react'
import { FaTrash, FaEye } from 'react-icons/fa'

function PlayerItem({ player, selectedSport, position, onRemovePlayer, setSelectedPlayer }) {
  return (<li key={player.id} className="flex items-center justify-between bg-white p-3 rounded-md group">
    <div className="flex items-center gap-3">
      <span className="w-8 text-center text-gray-500">{player.spot}</span>
      <span className="font-medium">{player.name}</span>
    </div>
    <div className="flex items-center gap-2 invisible group-hover:visible">
      {position && onRemovePlayer && <button
        onClick={() => onRemovePlayer(selectedSport, position, player.id)}
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
      >
        <FaTrash size={16} />
      </button>}
      {position && setSelectedPlayer && <button
        onClick={() => setSelectedPlayer({ sport: selectedSport, position, ...player })}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
      >
        <FaEye size={16} />
      </button>}
    </div>
  </li>)
}

export default PlayerItem