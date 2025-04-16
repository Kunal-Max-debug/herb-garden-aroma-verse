
import React, { Suspense } from 'react';
import { RefreshCw } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PlantModel } from './plant-renderer/PlantModel';
import { SceneEnvironment } from './plant-renderer/SceneEnvironment';
import { MODELS } from './plant-renderer/constants';

interface PlantRendererProps {
  plant: string;
  season: string;
  timeOfDay: string;
  growthSpeed: number;
  growthStage: number;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const PlantRenderer: React.FC<PlantRendererProps> = ({
  plant,
  season,
  timeOfDay,
  growthSpeed,
  growthStage,
  isLoading,
  setIsLoading
}) => {
  const handleModelLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-garden-light/30">
          <div className="text-garden-primary animate-spin">
            <RefreshCw size={48} />
          </div>
        </div>
      )}
      
      <div className="w-full h-full">
        <Canvas 
          onCreated={handleModelLoad}
          shadows 
          camera={{ position: [0, 1, 4], fov: 50 }}
        >
          <Suspense fallback={null}>
            <SceneEnvironment timeOfDay={timeOfDay} season={season} />
            <PlantModel 
              plant={plant} 
              growthStage={growthStage} 
              season={season}
              modelPath={MODELS[plant]}
            />
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              maxPolarAngle={Math.PI / 2}
              autoRotate={growthSpeed > 0}
              autoRotateSpeed={growthSpeed * 3}
            />
          </Suspense>
        </Canvas>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 text-white py-1 px-3 rounded-full text-sm backdrop-blur-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </>
  );
};

export default PlantRenderer;
