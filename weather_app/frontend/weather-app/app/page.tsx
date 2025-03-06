"use client";
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WeatherProvider } from '@/contexts/WeatherContext';
import { useWeatherContext } from '@/contexts/WeatherContext';
import LocationButton from '@/components/LocationButton';
import WeatherCard from '@/components/WeatherCard';
import WeatherInfo from '@/components/WeatherInfo';
import SearchModal from '@/components/SearchBar';

const WeatherApp = () => {
  const {
    weatherData,
    loading,
    error,
    searchResults,
    setWeatherData,
    getCurrentLocationWeather
  } = useWeatherContext();
  
  const handleGetCurrentLocation = () => {
    getCurrentLocationWeather();
  };

  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (searchResults) {
      handleSearch(searchResults.name);
      setIsOpen(false);
    }
  }, [searchResults]);
  
  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/weather/city/${searchTerm}`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log("searchResults", data);
    } catch (error) {
      console.error("Error fetching location data:", error);
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 sm:px-6 py-8 md:py-12 bg-gradient-to-br from-weather-light-blue via-weather-blue to-weather-light-blue">
      {/* Header with search and location button */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-800">
          Weather <span className="font-light">Forecast</span>
        </h1>
        <div className="flex items-center gap-3">
          <SearchModal onSearch={handleSearch}
            placeholder="Search for a city..."
            buttonLabel="Weather Search"
            searchResults={searchResults}
            isOpen={isOpen}
            setIsOpen={setIsOpen}/>
          <LocationButton 
            onClick={handleGetCurrentLocation}
            loading={loading}
          />
        </div>
      </div>

      {/* Weather Content */}
      <div className="w-full max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 size={40} className="text-primary animate-spin mb-4" />
            <p className="text-gray-500 animate-pulse">Fetching weather data...</p>
          </div>
        ) : weatherData ? (
          <div className="flex flex-col gap-6">
            <WeatherCard data={weatherData} />
            <WeatherInfo data={weatherData} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <p className="text-gray-500 mb-2">No weather data available</p>
            <p className="text-sm text-gray-400">
              Try searching for a city or click on Current Location
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
};

export default Index;
