
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ConsumptionDataPoint } from '../types';

interface ConsumptionChartProps {
  data: ConsumptionDataPoint[];
  color: string;
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ data, color }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <defs>
          <linearGradient id={`colorUv-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" stroke="#232938" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(9, 14, 26, 0.8)',
            borderColor: '#232938',
            borderRadius: '0.5rem',
            backdropFilter: 'blur(4px)',
          }}
          labelStyle={{ color: '#cbd5e1' }}
          itemStyle={{ color: color, fontWeight: 'bold' }}
        />
        <Area type="monotone" dataKey="consumption" stroke={color} fillOpacity={1} fill={`url(#colorUv-${color.replace('#','')})`} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ConsumptionChart;
