
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      <p className="ml-3 text-gray-700">Loading earthquake data...</p>
    </div>
  );
};

export default LoadingSpinner;