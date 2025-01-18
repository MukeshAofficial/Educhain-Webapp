// components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
     <div className="flex justify-center items-center h-32">
         <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900 dark:border-gray-300"></div>
        </div>
  );
};

export default LoadingSpinner;