
import React from 'react';
import { Leaf } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getPlantById } from '@/data/plants';
import { Badge } from '@/components/ui/badge';

interface PlantInfoCardProps {
  plant: string;
}

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ plant }) => {
  const plantData = getPlantById(plant);
  
  return (
    <Card className="p-4 bg-garden-light/30">
      <div className="flex items-center gap-2 mb-2">
        <Leaf className="text-garden-primary h-5 w-5" />
        <h3 className="font-semibold text-garden-dark">Plant Information</h3>
      </div>
      
      {plantData ? (
        <div>
          <div className="mb-2">
            <h4 className="font-medium text-sm text-garden-dark">{plantData.name}</h4>
            <p className="text-xs text-muted-foreground italic">{plantData.botanicalName}</p>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {plantData.systems.map((system) => (
              <Badge key={system} variant="outline" className="text-xs py-0 h-5">
                {system}
              </Badge>
            ))}
          </div>
          
          <p className="mt-2 text-sm text-muted-foreground">
            {plantData.description.substring(0, 150)}
            {plantData.description.length > 150 ? '...' : ''}
          </p>
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted-foreground">
          {plant === 'neem' && "Neem is known for its antiseptic and pest-repellent properties. It's a hardy tree that can grow in various conditions but prefers tropical and sub-tropical climates."}
          {plant === 'tulsi' && "Tulsi (Holy Basil) is a sacred plant in Hindu tradition and has significant medicinal properties. It thrives in warm seasons and needs moderate watering."}
          {plant === 'ashwagandha' && "Ashwagandha is an adaptogenic herb that helps the body manage stress. It prefers dry soil and warm conditions, growing well in full sun."}
          {plant === 'brahmi' && "Brahmi is used in Ayurveda for improving memory and cognitive function. It prefers wet conditions and can even grow in shallow water or marshy areas."}
          {plant === 'mint' && "Mint is a versatile herb used for digestive health in Ayurveda. It grows vigorously in partial shade to full sun and prefers consistently moist soil."}
        </p>
      )}
    </Card>
  );
};

export default PlantInfoCard;
