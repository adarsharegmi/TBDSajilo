'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CitySearch } from '@/components/ui/CitySearch';

interface HeaderProps {
  onCitySearch: (city: string) => void;
}

export const Header = ({ onCitySearch }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // document.documentElement.classList.toggle('dark');
  };

  // useEffect(() => {
  //   setIsMenuOpen(false);
  // }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 news-card-transition hover:opacity-80">
            <img src="/assets/logo.svg" alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-medium">NEWSHUB</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/news" className={`text-sm font-medium news-card-transition hover:text-secondary ${
              pathname === '/news' ? 'text-secondary' : ''
            }`}>
              Home
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <CitySearch onSearch={onCitySearch} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect animate-fade-in">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <CitySearch onSearch={(city) => {
              onCitySearch(city);
              setIsMenuOpen(false);
            }} />
            
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium text-center news-card-transition ${
                  pathname === '/' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {newsCategories.map(category => (
                <Link 
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-center news-card-transition ${
                    pathname === `/category/${category.toLowerCase()}` 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const newsCategories = [
  'Business', 
  'Technology', 
  'Entertainment', 
  'Sports', 
  'Health'
];