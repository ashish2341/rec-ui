// Import any necessary dependencies
import React from 'react';

// Define your component
const LoadingSingleText = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse mt-4 mb-4">
      <div className="h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 w-15 mb-4 mt-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Export the component
export default LoadingSingleText;
