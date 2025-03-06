import useWeather from '@/hooks/useWeather';
import { WeatherContextType } from '@/types/weather';
import React, { createContext, useContext, ReactNode } from 'react';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const weatherState = useWeather();
  
  return (
    <WeatherContext.Provider value={{
      weatherData: weatherState.weatherData ?? null,
      loading: weatherState.loading,
      error: weatherState.error,
      searchResults: weatherState.weatherData,
      searchQuery: weatherState.searchQuery,
      searching: weatherState.searching,
      setSearchQuery: weatherState.setSearchQuery,
      selectCity: weatherState.selectCity,
      getCurrentLocationWeather: weatherState.getCurrentLocationWeather,
      setWeatherData: weatherState.setWeatherData
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }
  return context;
};