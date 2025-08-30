
import React from 'react';
import { FeedbackTip } from '../types';

interface FeedbackPanelProps {
  feedback: FeedbackTip[];
  loading: boolean;
  error: string | null;
}

const priorityStyles = {
    High: {
        bg: 'bg-red-500/10',
        border: 'border-red-500',
        text: 'text-red-400',
        icon: '🔥',
    },
    Medium: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500',
        text: 'text-yellow-400',
        icon: '💡',
    },
    Low: {
        bg: 'bg-green-500/10',
        border: 'border-green-500',
        text: 'text-green-400',
        icon: '✅',
    }
};

const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ feedback, loading, error }) => {
    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center p-8">
                    <p className="text-slate-400">Analyzing your consumption patterns...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            );
        }

        if (feedback.length === 0) {
            return (
                <div className="text-center p-8">
                    <p className="text-slate-400">Click "Get AI Feedback" to generate personalized energy-saving tips.</p>
                </div>
            );
        }

        return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {feedback.map((tip, index) => {
                    const styles = priorityStyles[tip.priority];
                    return (
                        <div key={index} className={`rounded-lg p-5 flex flex-col border ${styles.bg} ${styles.border}`}>
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-lg text-white">{tip.title}</h4>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${styles.bg} ${styles.text}`}>
                                    {tip.priority.toUpperCase()} {styles.icon}
                                </span>
                            </div>
                            <p className="text-slate-300 text-sm flex-grow">{tip.suggestion}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
    
  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-white">AI-Powered Feedback</h2>
      {renderContent()}
    </div>
  );
};

export default FeedbackPanel;
