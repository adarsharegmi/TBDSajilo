import { useState, useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useNews, newsCategories } from '@/hooks/useNews';
import { Header } from '@/components/layout/Header';
import { NewsCard, NewsCardSkeleton } from '@/components/ui/NewsCard';
import { CategoryPill, CategoryPillSkeleton } from '@/components/ui/CategoryPill';
import { MapPin } from 'lucide-react';

interface NewsLayoutProps {
  initialCategory?: string;
}

export const NewsLayout = ({ initialCategory }: NewsLayoutProps) => {
  const { locationData, searchLocation, getUserLocation } = useLocation();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const { articles, isLoading } = useNews(
    locationData.isLoading ? null : locationData.coordinates,
    locationData.city,
    activeCategory === 'All' ? undefined : activeCategory
  );

  useEffect(() => {
    if (isInitialLoad && !locationData.isLoading && !isLoading) {
      setIsInitialLoad(false);
    }
  }, [locationData.isLoading, isLoading, isInitialLoad]);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCitySearch = (city: string) => {
    searchLocation(city);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onCitySearch={handleCitySearch} />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-6">
          {/* Categories Scrollable */}
          <div className="mb-8 border-y py-3">
            <div className="flex overflow-x-auto scrollbar-thin gap-2 pb-2">
              {isLoading && isInitialLoad ? (
                Array(8).fill(0).map((_, i) => (
                  <CategoryPillSkeleton key={i} />
                ))
              ) : (
                [...newsCategories].map(category => (
                  <CategoryPill
                    key={category}
                    category={category}
                    isActive={activeCategory === category}
                    onClick={handleCategoryChange}
                  />
                ))
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array(12).fill(0).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))
            ) : articles?.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium mb-2">No news articles found</h3>
                <p className="text-muted-foreground">Try changing the category or location</p>
              </div>
            ) : (
              articles?.map((article: { id: any; }, index: number) => (
                <NewsCard 
                  key={article.id} 
                  article={article as any} 
                  priority={index < 4}
                />
              ))
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-accent py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-sm font-medium">NEWSHUB</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NewsHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};