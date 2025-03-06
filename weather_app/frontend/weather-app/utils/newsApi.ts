import { GeoLocation } from "./weatherApi";

export interface NewsData {
  articles: Article[];
  totalResults: number;
  status: string;
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Source {
  id: string;
  name: string;
}


export const getNewsByCity = async (city: string): Promise<NewsData> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEWS_API_URL}/city/${city}`
    );
    
    if (!response.ok) {
      throw new Error('City not found');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

// Get news by coordinates
export const getNewsByCoords = async (
  lat: number,
  lon: number
): Promise<NewsData> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NEWS_API_URL}/coordinates?lat=${lat}&lon=${lon}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching news data:", error);
    throw error;
  }
};

// Get city suggestions for search
export const getCitySuggestions = async (query: string): Promise<GeoLocation[]> => {
  if (!query || query.length < 2) return [];
  
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEWS_API_URL}/geo/direct?q=${query}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch city suggestions');
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
