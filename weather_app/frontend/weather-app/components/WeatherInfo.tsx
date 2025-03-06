import React from 'react';
import { 
  Droplets, 
  Wind, 
  Thermometer, 
  Sunrise, 
  Sunset,
  ArrowDown,
  ArrowUp,
} from 'lucide-react';
import { WeatherData } from '@/utils/weatherApi';
import { cn } from '@/lib/utils';

interface WeatherInfoProps {
  data: WeatherData;
  className?: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ data, className }) => {
  if (!data) return null;

  const metrics = [
    {
      label: 'Feels Like',
      value: `${Math.round(data.feels_like)}°`,
      icon: <Thermometer size={18} className="text-orange-500" />
    },
    {
      label: 'Humidity',
      value: `${data.humidity}%`,
      icon: <Droplets size={18} className="text-blue-500" />
    },
    {
      label: 'Wind',
      value: `${Math.round(data.wind_speed)} m/s`,
      icon: <Wind size={18} className="text-gray-500" />
    },
    {
      label: 'Min Temp',
      value: `${Math.round(data.temperature_min)}°`,
      icon: <ArrowDown size={18} className="text-blue-500" />
    },
    {
      label: 'Max Temp',
      value: `${Math.round(data.temperature_max)}°`,
      icon: <ArrowUp size={18} className="text-red-500" />
    }
  ];

  // Additional data
  const sunrise = data.sunrise;
  const sunset = data.sunset;

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-6">
        {metrics.map((metric, i) => (
          <div 
            key={metric.label}
            className={cn(
              "flex flex-col items-center justify-center",
              "bg-white/80 backdrop-blur-xs rounded-2xl p-3 md:p-4", 
              "border border-white/20 shadow-sm",
              "transition-all duration-300",
              "hover:shadow-md hover:border-white/40",
              `animate-fade-in-delay-${Math.min(i+1, 3)}`
            )}
          >
            <div className="flex items-center mb-2">
              {metric.icon}
              <span className="text-xs text-gray-500 ml-1.5">{metric.label}</span>
            </div>
            <span className="text-lg font-medium">{metric.value}</span>
          </div>
        ))}
      </div>

      <div 
        className="flex justify-between items-center gap-4 rounded-2xl p-4
                  bg-white/80 backdrop-blur-xs shadow-sm border border-white/20
                  animate-fade-in-delay-3"
      >
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center mb-1">
            <Sunrise size={18} className="text-amber-500 mr-1.5" />
            <span className="text-xs text-gray-500">Sunrise</span>
          </div>
          <span className="text-sm font-medium">{sunrise}</span>
        </div>
        
        <div className="h-10 w-px bg-gray-100" />
        
        <div className="flex flex-col items-center flex-1">
          <div className="flex items-center mb-1">
            <Sunset size={18} className="text-orange-500 mr-1.5" />
            <span className="text-xs text-gray-500">Sunset</span>
          </div>
          <span className="text-sm font-medium">{sunset}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
