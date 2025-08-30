
export interface ConsumptionDataPoint {
  name: string;
  consumption: number;
}

export type Timeframe = 'day' | 'week' | 'month';

export interface ElectricalLoad {
  id: string;
  name: string;
  icon: React.ReactNode;
  currentConsumption: number; // in kWh
  historicalData: {
    day: ConsumptionDataPoint[];
    week: ConsumptionDataPoint[];
    month: ConsumptionDataPoint[];
  };
  color: string;
}

export interface FeedbackTip {
  title: string;
  suggestion: string;
  priority: 'High' | 'Medium' | 'Low';
}
