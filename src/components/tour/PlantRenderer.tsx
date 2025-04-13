
import React, { Suspense, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// Sample models (in production, you'd want to use real model paths)
const MODELS = {
  neem: "/models/neem_tree.glb",
  tulsi: "/models/tulsi_plant.glb",
  ashwagandha: "/models/ashwagandha.glb",
  brahmi: "/models/brahmi_plant.glb", 
  mint: "/models/mint_plant.glb"
};

// Fallback model when specific model is not available
const FALLBACK_MODEL = "/models/generic_plant.glb";

// Model component with fallback capability
const PlantModel = ({ plant, growthStage, season }) => {
  let modelPath = MODELS[plant];
  
  // Create a mesh group as fallback when model fails to load
  const createFallbackPlant = () => {
    const plantColor = {
      neem: 0x228B22,     // Forest green
      tulsi: 0x006400,    // Dark green
      ashwagandha: 0x355E3B, // Hunter green
      brahmi: 0x50C878,   // Emerald
      mint: 0x98FB98      // Pale green
    }[plant] || 0x006400;

    // Create plant based on growth stage
    const group = new THREE.Group();
    const stageMultiplier = 0.3 + (growthStage * 0.7);
    
    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, stageMultiplier * 1.5, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = stageMultiplier * 0.75 - 0.5;
    group.add(trunk);
    
    // Foliage
    const topSize = stageMultiplier * 1.2;
    const foliageGeometry = new THREE.SphereGeometry(topSize, 8, 8);
    const foliageMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.y = stageMultiplier * 1.2;
    group.add(foliage);
    
    // Ground
    const groundGeometry = new THREE.CircleGeometry(2, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: season === 'winter' ? 0xFFFFFF : 0x654321  // Snow in winter, brown otherwise
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    group.add(ground);
    
    return group;
  };

  // Try to load the model, fall back to procedural if it fails
  try {
    const gltf = useLoader(GLTFLoader, modelPath);
    
    // Adjust model based on growth stage
    const scaleValue = 0.5 + (growthStage * 0.7);
    gltf.scene.scale.set(scaleValue, scaleValue, scaleValue);
    
    // Add simple animations
    useFrame((state) => {
      // Add subtle wind animation
      const time = state.clock.getElapsedTime();
      if (gltf.scene.children.length > 0) {
        // Find leaf objects and apply gentle movement
        gltf.scene.traverse((object) => {
          if (object.name.includes('leaf') || object.name.includes('foliage')) {
            object.rotation.x = Math.sin(time * 0.5) * 0.05;
            object.rotation.z = Math.cos(time * 0.3) * 0.05;
          }
        });
      }
    });
    
    return <primitive object={gltf.scene} position={[0, -0.5, 0]} />;
  } catch (error) {
    console.warn(`Failed to load model for ${plant}, using fallback`, error);
    const fallbackModel = createFallbackPlant();
    return <primitive object={fallbackModel} position={[0, 0, 0]} />;
  }
};

// Scene environment adjustments based on time of day and season
const SceneEnvironment = ({ timeOfDay, season }) => {
  // Configure scene based on time of day and season
  const backgroundColor = timeOfDay === 'day' 
    ? new THREE.Color(0x87CEEB) // Sky blue for day
    : new THREE.Color(0x0A1128); // Dark blue for night
  
  const lightIntensity = timeOfDay === 'day' ? 1 : 0.3;
  const lightColor = timeOfDay === 'day' ? 0xFFFFFF : 0xB5D8FF;
  
  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <ambientLight intensity={lightIntensity * 0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={lightIntensity} 
        color={lightColor} 
      />
      <Environment preset={timeOfDay === 'day' ? "sunset" : "night"} />
    </>
  );
};

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
            <PlantModel plant={plant} growthStage={growthStage} season={season} />
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
