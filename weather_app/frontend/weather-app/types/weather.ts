import { WeatherData } from "../utils/weatherApi";
export interface GeoLocation {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }
  
  export interface WeatherContextType {
    weatherData:  WeatherData | null;
    loading: boolean;
    error: string | null;
    searchResults: any;
    searchQuery: string;
    searching: boolean;
    setSearchQuery: (query: string) => void;
    selectCity: (city: GeoLocation) => Promise<void>;
    getCurrentLocationWeather: () => Promise<void>;
    setWeatherData: (data: WeatherData | null) => void;
  }