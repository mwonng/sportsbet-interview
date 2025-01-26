import React from 'react'
import { FaTrash, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa'

function PlayerItem({
  player,
  selectedSport,
  position,
  onRemovePlayer,
  setSelectedPlayer,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) {
  return (
    <li key={player.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between bg-white p-3 rounded-md group border border-gray-300 gap-4">
      <div className="flex items-center gap-3 mb-2 md:mb-0">
        <span className="w-8 text-center text-gray-500">{player.number}</span>
        <span className="font-medium">{player.name}</span>
      </div>
      <div className="flex items-center gap-2 invisible group-hover:visible pb-2 lg:pb-0">
        {position && !isFirst && onMoveUp && (
          <button
            onClick={onMoveUp}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <FaArrowUp size={16} />
          </button>
        )}
        {position && !isLast && onMoveDown && (
          <button
            onClick={onMoveDown}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <FaArrowDown size={16} />
          </button>
        )}
        {position && onRemovePlayer && (
          <button
            onClick={() => onRemovePlayer(selectedSport, position, player.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
          >
            <FaTrash size={16} />
          </button>
        )}
        {position && setSelectedPlayer && (
          <button
            onClick={() => setSelectedPlayer({ sport: selectedSport, position, ...player })}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <FaEye size={16} />
          </button>
        )}
      </div>
    </li>
  )
}

export default PlayerItem