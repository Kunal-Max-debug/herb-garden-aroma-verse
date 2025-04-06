
import { Plant } from '@/types';
import PlantCard from './PlantCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Leaf } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PlantGridProps {
  plants: Plant[];
  title?: string;
}

const PlantGrid = ({ plants, title }: PlantGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    systems: string[];
    categories: string[];
  }>({
    systems: [],
    categories: []
  });

  // Get unique systems and categories from all plants
  const allSystems = [...new Set(plants.flatMap(p => p.systems))];
  const allCategories = [...new Set(plants.flatMap(p => p.categories))];

  const toggleFilter = (type: 'systems' | 'categories', value: string) => {
    setFilters(prev => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(value) 
          ? current.filter(item => item !== value) 
          : [...current, value]
      };
    });
  };

  const filteredPlants = plants.filter(plant => {
    // Apply search filter
    const matchesSearch = searchQuery === '' || 
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.commonNames.some(name => name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Apply system filter
    const matchesSystems = filters.systems.length === 0 || 
      plant.systems.some(system => filters.systems.includes(system));
    
    // Apply category filter
    const matchesCategories = filters.categories.length === 0 || 
      plant.categories.some(category => filters.categories.includes(category));
    
    return matchesSearch && matchesSystems && matchesCategories;
  });

  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center gap-2 mb-6">
          <Leaf className="h-5 w-5 text-garden-primary" />
          <h2 className="text-2xl font-semibold text-garden-dark">{title}</h2>
        </div>
      )}
      
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="search"
            placeholder="Search plants by name..."
            className="pl-10 border-garden-primary/30 focus:border-garden-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-garden-dark">Filter by system:</p>
          <div className="flex flex-wrap gap-2">
            {allSystems.map(system => (
              <Button
                key={system}
                variant={filters.systems.includes(system) ? "default" : "outline"}
                size="sm"
                className={filters.systems.includes(system) 
                  ? "bg-garden-primary hover:bg-garden-dark" 
                  : "hover:bg-garden-light text-garden-dark"
                }
                onClick={() => toggleFilter('systems', system)}
              >
                {system}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-garden-dark">Filter by properties:</p>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={filters.categories.includes(category) ? "default" : "outline"}
                size="sm"
                className={filters.categories.includes(category) 
                  ? "bg-garden-accent text-white hover:bg-garden-primary" 
                  : "hover:bg-garden-light text-garden-dark"
                }
                onClick={() => toggleFilter('categories', category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-garden-light/50 rounded-lg">
          <Leaf className="mx-auto h-12 w-12 text-garden-primary/50 mb-2" />
          <h3 className="text-lg font-medium text-garden-dark mb-1">No Plants Found</h3>
          <p className="text-gray-500">Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  );
};

export default PlantGrid;
