import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  category?: string;
}

interface NewsState {
  articles: NewsArticle[];
  isLoading: boolean;
  error: string | null;
}

export const useNews = (
  coordinates: { latitude: number; longitude: number } | null,
  city?: string,
  category?: string
) => {
  const [newsState, setNewsState] = useState<NewsState>({
    articles: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    const fetchNews = async () => {
      setNewsState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        let url = `${process.env.NEXT_PUBLIC_NEWS_API_URL}`;
        
        if (coordinates) {
          url += `/coordinates?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
        } else if (city) {
          url += `/city/${city}`;
        }
        if (category) {
          url += `?category=${category}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setNewsState({
          articles: data.articles,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to fetch news'
        }));
        toast.error('Failed to fetch news. Please try again later.');
      }
    };

    fetchNews();
  }, [coordinates, city, category]);

  return newsState;
};

export const newsCategories = [
  'All',
  'Business',
  'Technology',
  'Entertainment',
  'Sports',
  'Health',
  'Science',
  'Politics'
];
