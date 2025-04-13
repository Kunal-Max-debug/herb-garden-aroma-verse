
import React from 'react';
import { Leaf } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PlantInfoCardProps {
  plant: string;
}

const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ plant }) => {
  return (
    <Card className="p-4 bg-garden-light/30">
      <div className="flex items-center gap-2">
        <Leaf className="text-garden-primary h-5 w-5" />
        <h3 className="font-semibold text-garden-dark">Plant Information</h3>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {plant === 'neem' && "Neem is known for its antiseptic and pest-repellent properties. It's a hardy tree that can grow in various conditions but prefers tropical and sub-tropical climates."}
        {plant === 'tulsi' && "Tulsi (Holy Basil) is a sacred plant in Hindu tradition and has significant medicinal properties. It thrives in warm seasons and needs moderate watering."}
        {plant === 'ashwagandha' && "Ashwagandha is an adaptogenic herb that helps the body manage stress. It prefers dry soil and warm conditions, growing well in full sun."}
        {plant === 'brahmi' && "Brahmi is used in Ayurveda for improving memory and cognitive function. It prefers wet conditions and can even grow in shallow water or marshy areas."}
        {plant === 'mint' && "Mint is a versatile herb used for digestive health in Ayurveda. It grows vigorously in partial shade to full sun and prefers consistently moist soil."}
      </p>
    </Card>
  );
};

export default PlantInfoCard;
