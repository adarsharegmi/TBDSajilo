import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationData {
  city: string;
  country: string;
  coordinates: Coordinates;
  isLoading: boolean;
  error: string | null;
}

const defaultLocation: LocationData = {
  city: 'london',
  country: 'nepal',
  coordinates: { latitude: 27.7172, longitude: 85.324 },
  isLoading: true,
  error: null
};

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData>(defaultLocation);
  const [manualLocation, setManualLocation] = useState<string | null>(null);

  const fetchLocationFromCoordinates = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=YOUR_API_KEY`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setLocationData({
          city: data[0].name,
          country: data[0].country,
          coordinates: { latitude, longitude },
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
      setLocationData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get location name'
      }));
    }
  };

  const getUserLocation = () => {
    setLocationData(prev => ({ ...prev, isLoading: true, error: null }));
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationData({
            ...defaultLocation,
            isLoading: false,
            error: 'Failed to get your location'
          });
          toast.error('Could not access your location. Using default location instead.');
        }
      );
    } else {
      setLocationData({
        ...defaultLocation,
        isLoading: false,
        error: 'Geolocation is not supported by this browser'
      });
      toast.error('Geolocation not supported. Using default location.');
    }
  };

  const searchLocation = async (cityName: string) => {
    if (!cityName.trim()) return;
    
    setLocationData(prev => ({ ...prev, isLoading: true, error: null }));
    setManualLocation(cityName);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=YOUR_API_KEY`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setLocationData({
          city: data[0].name,
          country: data[0].country,
          coordinates: { 
            latitude: data[0].lat, 
            longitude: data[0].lon 
          },
          isLoading: false,
          error: null
        });
      } else {
        setLocationData(prev => ({
          ...prev,
          isLoading: false,
          error: `No location found for "${cityName}"`
        }));
        toast.error(`Could not find location: ${cityName}`);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setLocationData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to search location'
      }));
      toast.error('Failed to search location. Please try again.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { 
    locationData, 
    getUserLocation, 
    searchLocation,
    manualLocation
  };
};
