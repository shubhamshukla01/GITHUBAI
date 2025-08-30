
import React, { useState } from 'react';
import { ElectricalLoad, Timeframe } from '../types';
import ConsumptionChart from './ConsumptionChart';

interface LoadCardProps {
  load: ElectricalLoad;
}

const TimeframeButton: React.FC<{
    timeframe: Timeframe;
    activeTimeframe: Timeframe;
    onClick: (timeframe: Timeframe) => void;
    children: React.ReactNode;
}> = ({ timeframe, activeTimeframe, onClick, children }) => {
    const isActive = timeframe === activeTimeframe;
    return (
        <button
            onClick={() => onClick(timeframe)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                isActive
                    ? 'bg-cyan-500 text-white'
                    : 'text-slate-400 hover:bg-slate-700'
            }`}
        >
            {children}
        </button>
    );
};

const LoadCard: React.FC<LoadCardProps> = ({ load }) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('day');

  return (
    <div className="bg-slate-900 p-4 rounded-lg shadow-lg flex flex-col h-full border border-slate-800 hover:border-cyan-500 transition-colors duration-300">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full" style={{ backgroundColor: `${load.color}20`, color: load.color }}>
            {load.icon}
          </div>
          <h3 className="font-bold text-lg text-white">{load.name}</h3>
        </div>
        <div className="flex items-center space-x-1 bg-slate-800 p-1 rounded-lg">
           <TimeframeButton timeframe="day" activeTimeframe={timeframe} onClick={setTimeframe}>1D</TimeframeButton>
           <TimeframeButton timeframe="week" activeTimeframe={timeframe} onClick={setTimeframe}>1W</TimeframeButton>
           <TimeframeButton timeframe="month" activeTimeframe={timeframe} onClick={setTimeframe}>1M</TimeframeButton>
        </div>
      </div>
      <div className="flex items-baseline mb-4">
        <p className="text-3xl font-bold text-white">{load.currentConsumption.toFixed(2)}</p>
        <span className="text-slate-400 ml-1">kWh</span>
         {load.currentConsumption > 0 && <div className="ml-3 w-3 h-3 rounded-full bg-green-500 animate-pulse-fast"></div>}
      </div>
      <div className="flex-grow min-h-[150px]">
        <ConsumptionChart data={load.historicalData[timeframe]} color={load.color} />
      </div>
    </div>
  );
};

export default LoadCard;
