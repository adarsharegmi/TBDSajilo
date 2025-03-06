import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchModalProps {
  onSearch: (query: string) => Promise<any>;
  onResults?: (results: any) => void; 
  placeholder?: string; 
  buttonLabel?: string; 
  searchResults?: any;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SearchModal({
  onSearch,
  onResults,
  placeholder = "Enter search term...",
  buttonLabel = "Search",
  searchResults,
  isOpen,
  setIsOpen,
}: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    if (!searchTerm) return;
    await onSearch(searchTerm);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Search size={18} /> {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">{buttonLabel}</h2>
        <div className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleSearch}>Go</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
