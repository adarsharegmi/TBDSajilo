import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationButtonProps {
  onClick: () => void;
  loading?: boolean;
  className?: string;
}

const LocationButton: React.FC<LocationButtonProps> = ({ 
  onClick, 
  loading = false,
  className 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={cn(
        "flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full",
        "bg-white/90 hover:bg-white text-gray-700 shadow-sm",
        "transition-all duration-300 ease-in-out",
        "border border-gray-100",
        "disabled:opacity-70 disabled:cursor-not-allowed",
        loading ? "animate-pulse" : "",
        className
      )}
    >
      <MapPin size={16} className="text-primary" />
      <span className="text-sm font-medium">Current Location</span>
      
      {loading && (
        <div className="loading-dots text-primary ml-1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </button>
  );
};

export default LocationButton;