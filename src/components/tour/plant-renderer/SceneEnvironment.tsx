
import React from 'react';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

interface SceneEnvironmentProps {
  timeOfDay: string;
  season: string;
}

export const SceneEnvironment: React.FC<SceneEnvironmentProps> = ({ 
  timeOfDay, 
  season 
}) => {
  const backgroundColor = timeOfDay === 'day' 
    ? new THREE.Color(0x87CEEB)
    : new THREE.Color(0x0A1128);
  
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
