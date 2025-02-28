
import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, CloudLightning, CloudDrizzle } from 'lucide-react';

interface WeatherData {
  location: string;
  date: string;
  temperature: number;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy' | 'stormy' | 'drizzle';
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

interface WeatherWidgetProps {
  data: WeatherData;
  className?: string;
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
  windy: Wind,
  stormy: CloudLightning,
  drizzle: CloudDrizzle,
};

const WeatherWidget = ({ data, className }: WeatherWidgetProps) => {
  const WeatherIcon = weatherIcons[data.weatherType];

  return (
    <div className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{data.location}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.date}</p>
        </div>
        <div className="flex items-center">
          <WeatherIcon className="h-10 w-10 text-sky-500" />
        </div>
      </div>
      
      <div className="flex items-end gap-2 mb-6">
        <div className="text-4xl font-bold">{data.temperature}°</div>
        <div className="text-gray-500 dark:text-gray-400 ml-1 mb-1">C</div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Humidity</div>
          <div className="font-semibold">{data.humidity}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Wind</div>
          <div className="font-semibold">{data.windSpeed} km/h</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Precip.</div>
          <div className="font-semibold">{data.precipitation} mm</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
