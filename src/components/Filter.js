import React from 'react'
import { useSelection } from "../context/SelectionContext";

const FilterComponent = ({ sportsConfig }) => {
  const { selectedSport, setSelectedSport, selectedPosition, setSelectedPosition } = useSelection()

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

      {selectedSport !== 'ALL' && <div className="relative w-full sm:w-48">
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
      </div>}
    </div>
  );
};

export default FilterComponent