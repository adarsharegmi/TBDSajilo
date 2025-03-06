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

// For demo purposes, we'll use this to generate mock data
const generateMockNews = (category?: string, city?: string): NewsArticle[] => {
  const categories = category ? [category] : ['Business', 'Technology', 'Entertainment', 'Sports', 'Health', 'Science'];
  const locationPrefix = city ? `${city} - ` : '';
  
  return Array.from({ length: 12 }, (_, i) => {
    const randomCategory = category || categories[Math.floor(Math.random() * categories.length)];
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 24));
    
    return {
      id: `article-${i}-${Date.now()}`,
      title: `${locationPrefix}${randomCategory} News: ${Math.random().toString(36).substring(2, 15)}`,
      description: `This is a short description of the ${randomCategory.toLowerCase()} news article, providing a summary of the content.`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`,
      url: 'https://example.com',
      image: `https://source.unsplash.com/random/800x600?${randomCategory.toLowerCase()}&sig=${i}`,
      publishedAt: date.toISOString(),
      source: {
        name: 'News Source',
        url: 'https://example.com'
      },
      category: randomCategory
    };
  });
};

export const useNews = (
  coordinates: { latitude: number; longitude: number } | null,
  city?: string,
  category?: string
) => {
  const [newsState, setNewsState] = useState<NewsState>({
    articles: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchNews = async () => {
      setNewsState(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // In a real app, we would make an API call to a news service like this:
        // const apiKey = 'YOUR_NEWS_API_KEY';
        // let url = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;
        // 
        // if (coordinates) {
        //   url += `&lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
        // } else if (city) {
        //   url += `&q=${city}`;
        // }
        // 
        // if (category) {
        //   url += `&category=${category}`;
        // }
        // 
        // const response = await fetch(url);
        // const data = await response.json();
        
        // Since we don't have a real API key, we'll use mock data
        const mockNews = generateMockNews(category, city);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setNewsState({
          articles: mockNews,
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