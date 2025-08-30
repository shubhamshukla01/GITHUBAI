
import { ElectricalLoad } from '../types';
import { LOAD_DEFINITIONS } from '../constants';

const generateRandomData = (labels: string[], max: number): { name: string; consumption: number }[] => {
  return labels.map(label => ({
    name: label,
    consumption: parseFloat((Math.random() * max).toFixed(2)),
  }));
};

const createHistoricalData = () => ({
  day: generateRandomData(
    ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
    5
  ),
  week: generateRandomData(
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    35
  ),
  month: generateRandomData(
    ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    150
  ),
});

export const fetchEnergyData = (): Promise<ElectricalLoad[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const loads: ElectricalLoad[] = LOAD_DEFINITIONS.map(def => ({
        ...def,
        currentConsumption: parseFloat((Math.random() * (def.max || 1) + (def.min || 0.1)).toFixed(2)),
        historicalData: createHistoricalData(),
      }));
      resolve(loads);
    }, 500);
  });
};
