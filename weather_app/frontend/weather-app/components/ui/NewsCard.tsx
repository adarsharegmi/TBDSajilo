import { useState, useEffect } from 'react';
import { NewsArticle } from '@/hooks/useNews';
import { formatDistance } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsCardProps {
  article: NewsArticle;
  priority?: boolean;
}

export const NewsCard = ({ article, priority = false }: NewsCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Add a small delay for staggered animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, priority ? 100 : Math.random() * 300 + 100);
    
    return () => clearTimeout(timer);
  }, [priority]);

  const formattedDate = formatDistance(
    new Date(),
    new Date(),
    { addSuffix: true }
  );

  return (
    <article 
      className={`glass-card news-card-transition overflow-hidden flex flex-col h-full transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="relative">
        <div className={`relative aspect-video overflow-hidden ${!isLoaded ? 'loading-skeleton' : ''}`}>
          <img
            src={article.image}
            alt={article.title}
            className={`object-cover w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            loading={priority ? 'eager' : 'lazy'}
          />
        </div>
        {article.title && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 left-3 opacity-90"
          >
            {article.title}
          </Badge>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{article.description}</p>
        <div className="flex items-center justify-between mt-auto pt-2 text-xs text-muted-foreground">
          <span>{article.title}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-3 border-t border-border flex items-center justify-center bg-accent hover:bg-accent/80 text-xs font-medium news-card-transition"
      >
        Read full article <ExternalLink className="ml-1 h-3 w-3" />
      </a>
    </article>
  );
};

export const NewsCardSkeleton = () => (
  <div className="glass-card overflow-hidden flex flex-col h-full animate-scale-in">
    <div className="aspect-video loading-skeleton"></div>
    <div className="p-4 space-y-3">
      <div className="h-5 w-full rounded loading-skeleton"></div>
      <div className="h-5 w-3/4 rounded loading-skeleton"></div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded loading-skeleton"></div>
        <div className="h-4 w-full rounded loading-skeleton"></div>
        <div className="h-4 w-2/3 rounded loading-skeleton"></div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="h-3 w-20 rounded loading-skeleton"></div>
        <div className="h-3 w-24 rounded loading-skeleton"></div>
      </div>
    </div>
    <div className="p-3 border-t border-border">
      <div className="h-6 w-full rounded loading-skeleton"></div>
    </div>
  </div>
);
