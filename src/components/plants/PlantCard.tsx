
import { Plant } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-garden-light">
      <div className="h-48 overflow-hidden">
        <img 
          src={plant.imageUrl} 
          alt={plant.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-garden-dark text-xl">{plant.name}</CardTitle>
            <CardDescription className="text-sm italic">{plant.botanicalName}</CardDescription>
          </div>
          <Leaf className="h-5 w-5 text-garden-primary" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{plant.description.substring(0, 120)}...</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {plant.systems.slice(0, 2).map((system) => (
            <Badge key={system} variant="outline" className="bg-garden-light text-garden-dark border-garden-primary">
              {system}
            </Badge>
          ))}
          {plant.categories.slice(0, 2).map((category) => (
            <Badge key={category} className="bg-garden-primary text-white">
              {category}
            </Badge>
          ))}
          {(plant.systems.length > 2 || plant.categories.length > 2) && (
            <Badge variant="outline" className="bg-transparent">+</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" className="w-full bg-garden-primary hover:bg-garden-dark">
          <Link to={`/plant/${plant.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
