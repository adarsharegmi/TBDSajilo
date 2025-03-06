import React, { useEffect, useState } from 'react';
import { WeatherData, getWeatherIconUrl } from '@/utils/weatherApi';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, className }) => {
  if (!data) return null;

  const weatherCondition = data;
  const temperature = Math.round(data.temperature);
  const iconUrl = getWeatherIconUrl(weatherCondition.weather_icon);

  const [formattedDate, setFormattedDate] = useState('Loading...');
  const [formattedTime, setFormattedTime] = useState('Loading...');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const timestamp = new Date();

    const dateStr = timestamp.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    const timeStr = timestamp.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setFormattedDate(dateStr);
    setFormattedTime(timeStr);

    const timer = setInterval(() => {
      const newTimestamp = new Date();
      setFormattedDate(newTimestamp.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      }));
      setFormattedTime(newTimestamp.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }));
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto",
        "flex flex-col items-center",
        "glass-morphism rounded-3xl p-6 md:p-8",
        "animate-scale-in",
        className
      )}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">{data.city}</h1>
          <div className="flex items-center text-gray-500 mt-1 text-sm">
            <span className="flex items-center mr-3">
              <Calendar size={14} className="mr-1" /> {formattedDate}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" /> {formattedTime}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-primary/10 rounded-full px-2.5 py-1">
          <span className="text-xs font-medium text-primary">{data.country}</span>
        </div>
      </div>

      <div className="my-4 flex items-center justify-center relative w-full">
        <img
          src={iconUrl}
          alt={weatherCondition.weather_description}
          className="w-32 h-32 animate-float"
        />
      </div>

      <div className="text-center mb-5">
        <div className="text-6xl font-extralight mb-2">{temperature}°</div>
        <div className="text-xl capitalize font-medium">{weatherCondition.weather_description}</div>
      </div>
    </div>
  );
};

export default WeatherCard;
