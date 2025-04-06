
import { Plant } from '@/types';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedPlantsProps {
  plants: Plant[];
}

const FeaturedPlants = ({ plants }: FeaturedPlantsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % plants.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + plants.length) % plants.length);
  };

  const currentPlant = plants[currentIndex];
  
  return (
    <section className="py-16 bg-garden-light">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-garden-primary" />
            <h2 className="text-2xl md:text-3xl font-semibold text-garden-dark">Featured Medicinal Plants</h2>
          </div>
          <Button asChild variant="link" className="text-garden-primary hover:text-garden-dark">
            <Link to="/garden" className="flex items-center gap-1">
              View All Plants <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Card className="bg-white border-none shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto overflow-hidden">
                <img 
                  src={currentPlant.imageUrl} 
                  alt={currentPlant.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex gap-2 mb-3">
                  {currentPlant.systems.map((system) => (
                    <Badge key={system} className="bg-garden-primary text-white">
                      {system}
                    </Badge>
                  ))}
                </div>
                
                <h3 className="text-2xl font-semibold text-garden-dark mb-1">{currentPlant.name}</h3>
                <p className="text-sm italic text-gray-600 mb-4">{currentPlant.botanicalName}</p>
                
                <p className="text-gray-700 mb-6">{currentPlant.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePrev}>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                  
                  <Button asChild variant="default" className="bg-garden-primary hover:bg-garden-dark">
                    <Link to={`/plant/${currentPlant.id}`}>
                      Explore Plant
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FeaturedPlants;
