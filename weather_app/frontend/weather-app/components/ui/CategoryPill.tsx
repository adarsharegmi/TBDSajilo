
import { MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface CategoryPillProps {
  category: string;
  isActive: boolean;
  onClick: (category: string) => void;
}

export const CategoryPill = ({ category, isActive, onClick }: CategoryPillProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(category);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "py-1.5 px-4 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
        isActive ? 
          "bg-primary text-primary-foreground shadow-sm" : 
          "bg-accent hover:bg-accent/80 text-foreground"
      )}
    >
      {category}
    </button>
  );
};

export const CategoryPillSkeleton = () => (
  <div className="py-1.5 px-4 rounded-full h-9 w-24 loading-skeleton"></div>
);
