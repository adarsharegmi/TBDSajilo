'use client';
import { useState, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CitySearchProps {
  onSearch: (city: string) => void;
}

export const CitySearch = ({ onSearch }: CitySearchProps) => {
  const [searchText, setSearchText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      onSearch(searchText.trim());
      setIsExpanded(false);
    }
  };
  
  const handleClear = () => {
    setSearchText('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      {isExpanded ? (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative flex-grow">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search city..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-9 pr-8 py-2 w-full md:w-[220px] news-card-transition focus:w-full"
              autoFocus
            />
            {searchText && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-8"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit" size="sm" className="ml-1 news-card-transition">
            Search
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-1 news-card-transition"
            onClick={() => setIsExpanded(false)}
          >
            Cancel
          </Button>
        </form>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 news-card-transition"
          onClick={() => setIsExpanded(true)}
        >
          <Search className="h-4 w-4" />
          <span>Find City</span>
        </Button>
      )}
    </div>
  );
};
