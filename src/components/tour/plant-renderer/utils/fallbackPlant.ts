
import * as THREE from 'three';

const PLANT_COLORS = {
  neem: 0x228B22,
  tulsi: 0x006400,
  ashwagandha: 0x355E3B,
  brahmi: 0x50C878,
  mint: 0x98FB98
};

export const createFallbackPlant = (
  plant: string, 
  growthStage: number, 
  season: string
): THREE.Group => {
  const plantColor = PLANT_COLORS[plant] || 0x006400;
  const group = new THREE.Group();
  const stageMultiplier = 0.3 + (growthStage * 0.7);
  
  // Create trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.15, stageMultiplier * 1.5, 8);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = stageMultiplier * 0.75 - 0.5;
  group.add(trunk);
  
  // Create foliage
  const topSize = stageMultiplier * 1.2;
  const foliageGeometry = new THREE.SphereGeometry(topSize, 8, 8);
  const foliageMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
  const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
  foliage.position.y = stageMultiplier * 1.2;
  group.add(foliage);
  
  // Create ground
  const groundGeometry = new THREE.CircleGeometry(2, 32);
  const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: season === 'winter' ? 0xFFFFFF : 0x654321
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.5;
  group.add(ground);
  
  return group;
};
