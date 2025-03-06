"use client";
import { useState, useEffect, useCallback } from 'react';
import { 
  getWeatherByCity,
  getWeatherByCoords,
  getCitySuggestions
} from '../utils/weatherApi';
import { GeoLocation, WeatherData } from '../utils/weatherApi';

interface UseWeatherResult {
  weatherData: WeatherData | null;
  loading: boolean;
    error: string | null;
    setWeatherData: (data: WeatherData | null) => void;
  searchQuery: string;
  searching: boolean;
  setSearchQuery: (query: string) => void;
  selectCity: (city: GeoLocation) => Promise<void>;
  getCurrentLocationWeather: () => Promise<void>;
}

export const useWeather = (): UseWeatherResult => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<GeoLocation[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  // Fetch weather by coordinates
  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCoords(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get current location weather
  const getCurrentLocationWeather = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

        const { latitude, longitude } = position.coords;
          await fetchWeatherByCoords(latitude, longitude);
    } catch (err) {
      setError('Unable to get your location. Please search for a city instead.');
      setLoading(false);
    }
  }, [fetchWeatherByCoords]);

  // Select city from search results
  const selectCity = useCallback(async (city: GeoLocation) => {
    setSearchQuery('');
    setSearchResults([]);
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherByCity(city.name);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data for this city');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search for cities when query changes
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    const searchTimer = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await getCitySuggestions(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Error searching for cities:', err);
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

  // Get current location weather on first load
  useEffect(() => {
    getCurrentLocationWeather();
  }, [getCurrentLocationWeather]);

  return {
    weatherData,
    loading,
    error,
    searchQuery,
    searching,
    setSearchQuery,
    selectCity,
    getCurrentLocationWeather,
    setWeatherData
  };
};

export default useWeather;