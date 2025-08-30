
import React from 'react';

const ThermometerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H9a1 1 0 00-1 1v10a5 5 0 106 0zM12 11h.01" />
    </svg>
);

const LightBulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 01-7.072 0l-1.06-1.06a5 5 0 017.072-7.072l1.06 1.06a5 5 0 010 7.072z" />
    </svg>
);

const RefrigeratorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 8h14M8 3v2m8-2v2" />
    </svg>
);

const EVChargerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m4-10h2m-16 0h2m12.657 4.657l1.414-1.414M5.343 9.343L3.929 7.929M18 12a6 6 0 11-12 0 6 6 0 0112 0zm-2.43 2.43l-1.14-3.12a.5.5 0 00-.91-.01L12.38 15" />
    </svg>
);

const TVIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const WasherIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.586 18.414a2 2 0 01-2.828 0L12 17.828l-.758.586a2 2 0 01-2.828 0l-3.536-3.536a2 2 0 010-2.828l.586-.586 1.414 1.414L8 14l-1-1-1-1 1-1 1-1-1-1-1-1 1-1 1-1-1-1-1-1 1-1 .586.586a2 2 0 012.828 0l3.536 3.536a2 2 0 010 2.828l-.586.586zM12 12a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
);

export const LOAD_DEFINITIONS = [
  { id: 'hvac', name: 'HVAC System', icon: <ThermometerIcon />, color: '#22d3ee', min: 0.8, max: 3.5 },
  { id: 'lighting', name: 'Lighting', icon: <LightBulbIcon />, color: '#a5b4fc', min: 0.1, max: 0.5 },
  { id: 'refrigerator', name: 'Appliances', icon: <RefrigeratorIcon />, color: '#6ee7b7', min: 0.3, max: 0.8 },
  { id: 'ev', name: 'EV Charger', icon: <EVChargerIcon />, color: '#f87171', min: 0, max: 7.2 },
  { id: 'entertainment', name: 'Entertainment', icon: <TVIcon />, color: '#f0abfc', min: 0.1, max: 0.6 },
  { id: 'laundry', name: 'Laundry', icon: <WasherIcon />, color: '#fde047', min: 0, max: 2.5 },
];
