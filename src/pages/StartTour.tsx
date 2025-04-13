
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import PlantRenderer from '@/components/tour/PlantRenderer';
import PlantControls from '@/components/tour/PlantControls';
import PlantInfoCard from '@/components/tour/PlantInfoCard';

const StartTour = () => {
  const { isLoggedIn } = useAuth();
  const [plant, setPlant] = useState('neem');
  const [season, setSeason] = useState('summer');
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [growthSpeed, setGrowthSpeed] = useState(1);
  const [growthStage, setGrowthStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not logged in
  if (!isLoggedIn) {
    toast.error("Please login to access the 3D Plant Tour");
    return <Navigate to="/login" />;
  }
  
  const handlePlantChange = (value: string) => {
    setIsLoading(true);
    setPlant(value);
  };
  
  const handleSeasonChange = (value: string) => {
    setSeason(value);
  };
  
  const handleTimeChange = (value: string) => {
    setTimeOfDay(value);
  };
  
  const handleGrowthStageChange = (value: number[]) => {
    setGrowthStage(value[0]);
  };
  
  const handleGrowthSpeedChange = (value: number[]) => {
    setGrowthSpeed(value[0]);
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-garden-dark mb-6">AYUSH Plants 3D Tour</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden h-[60vh] relative">
              <CardContent className="p-0 h-full">
                <PlantRenderer
                  plant={plant}
                  season={season}
                  timeOfDay={timeOfDay}
                  growthSpeed={growthSpeed}
                  growthStage={growthStage}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <PlantControls
              plant={plant}
              season={season}
              timeOfDay={timeOfDay}
              growthSpeed={growthSpeed}
              growthStage={growthStage}
              onPlantChange={handlePlantChange}
              onSeasonChange={handleSeasonChange}
              onTimeChange={handleTimeChange}
              onGrowthStageChange={handleGrowthStageChange}
              onGrowthSpeedChange={handleGrowthSpeedChange}
            />
            
            <div className="mt-6">
              <PlantInfoCard plant={plant} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartTour;
