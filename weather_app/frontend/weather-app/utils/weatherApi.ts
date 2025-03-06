
export interface WeatherData {
  city: string;
  cloudiness: number;
  country: string;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  temperature: number;
  temperature_min: number;
  temperature_max: number;
  timezone: number;
  units: string;
  visibility: number;
  weather_condition: string;
  weather_description: string;
  weather_icon: string;
  weather_id: number;
  wind_direction: string;
  wind_speed: number;
}

export interface GeoLocation {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}


export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEATHER_API_URL}/weather?q=${city}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Get weather by coordinates
export const getWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/coordinates?lat=${lat}&lon=${lon}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Get city suggestions for search
export const getCitySuggestions = async (query: string): Promise<GeoLocation[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_WEATHER_API_URL}/geo/direct?q=${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch city suggestions');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};

// Helper to get icon URL
export const getWeatherIconUrl = (iconCode: string, size: 2 | 4 = 4): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}x.png`;
};
