
import React from 'react';
import { Cloud } from 'lucide-react';

const Header = () => {
  return (
    <div className="max-w-4xl mx-auto mb-8 text-center">
      <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300 mb-3">
        <Cloud className="h-4 w-4" />
        <span>Weather Intelligence</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Agricultural Weather Forecast</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Access precise weather data optimized for agricultural planning and decision-making.
      </p>
    </div>
  );
};

export default Header;
