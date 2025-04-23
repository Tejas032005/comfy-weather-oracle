
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  defaultLocation?: string;
}

export function LocationSearch({ onLocationSelect, defaultLocation = 'London' }: LocationSearchProps) {
  const [query, setQuery] = useState<string>(defaultLocation);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query);
    }
  };

  useEffect(() => {
    if (defaultLocation && !query) {
      setQuery(defaultLocation);
    }
  }, [defaultLocation]);

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/90 backdrop-blur-sm border-blue-300 focus:border-blue-500"
        aria-label="Search for a location"
      />
      <Button type="submit" variant="default" size="icon" className="bg-blue-500 hover:bg-blue-600">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
