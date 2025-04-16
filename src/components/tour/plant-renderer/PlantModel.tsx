
import React, { useEffect } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { createFallbackPlant } from './utils/fallbackPlant';

interface PlantModelProps {
  plant: string;
  growthStage: number;
  season: string;
  modelPath: string;
}

export const PlantModel: React.FC<PlantModelProps> = ({ 
  plant, 
  growthStage, 
  season,
  modelPath 
}) => {
  try {
    const gltf = useLoader(GLTFLoader, modelPath);
    
    const scaleValue = 0.5 + (growthStage * 0.7);
    gltf.scene.scale.set(scaleValue, scaleValue, scaleValue);
    
    useEffect(() => {
      if (gltf.scene && plant === 'neem') {
        gltf.scene.position.y = -0.5;
      }
    }, [gltf.scene, plant]);
    
    useFrame((state) => {
      const time = state.clock.getElapsedTime();
      if (gltf.scene.children.length > 0) {
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
    const fallbackModel = createFallbackPlant(plant, growthStage, season);
    return <primitive object={fallbackModel} position={[0, 0, 0]} />;
  }
};
