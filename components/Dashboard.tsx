
import React, { useState, useEffect, useCallback } from 'react';
import { ElectricalLoad, FeedbackTip } from '../types';
import { fetchEnergyData } from '../services/mockDataService';
import { getEnergyFeedback } from '../services/geminiService';
import LoadCard from './LoadCard';
import FeedbackPanel from './FeedbackPanel';
import { LOAD_DEFINITIONS } from '../constants';

const SkeletonCard = () => (
  <div className="bg-slate-900 p-4 rounded-lg shadow-lg animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <div className="h-6 w-6 rounded-full bg-slate-800"></div>
      <div className="h-4 w-24 bg-slate-800 rounded"></div>
    </div>
    <div className="h-8 w-1/2 bg-slate-800 rounded mb-4"></div>
    <div className="h-32 bg-slate-800 rounded"></div>
  </div>
);

const Dashboard = () => {
  const [loads, setLoads] = useState<ElectricalLoad[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackTip[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalConsumption = loads.reduce((sum, load) => sum + load.currentConsumption, 0);

  const loadInitialData = useCallback(async () => {
    setLoadingData(true);
    try {
      const data = await fetchEnergyData();
      setLoads(data);
    } catch (err) {
      setError('Failed to load energy data.');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const handleGetFeedback = async () => {
    if (loads.length === 0) return;
    setLoadingFeedback(true);
    setError(null);
    setFeedback([]);
    try {
      const tips = await getEnergyFeedback(loads);
      setFeedback(tips);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
            <h2 className="text-lg font-semibold text-slate-400 mb-2">Total Consumption</h2>
            <p className="text-5xl font-bold text-white">
              {totalConsumption.toFixed(2)} <span className="text-3xl text-slate-400">kWh</span>
            </p>
             <p className="text-cyan-400 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" />
              </svg>
              Live Update
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
             <button
              onClick={handleGetFeedback}
              disabled={loadingFeedback || loadingData}
              className="w-full h-full bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-all duration-300 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loadingFeedback ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 01-7.072 0l-1.06-1.06a5 5 0 017.072-7.072l1.06 1.06a5 5 0 010 7.072z" />
                </svg>
                <span>Get AI Feedback</span>
                </>
              )}
            </button>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loadingData ? (
            LOAD_DEFINITIONS.map(def => <SkeletonCard key={def.id} />)
        ) : (
          loads.map(load => <LoadCard key={load.id} load={load} />)
        )}
      </div>

      <FeedbackPanel feedback={feedback} loading={loadingFeedback} error={error} />

    </div>
  );
};

export default Dashboard;
