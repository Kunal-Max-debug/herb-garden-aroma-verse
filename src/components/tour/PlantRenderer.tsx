
import React, { useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
import neemTreeImage from '../../assets/neem-tree.png';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    let scene: any, camera: any, renderer: any;
    let plant3D: any, light: any;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationSpeed = 0.002 * growthSpeed;
    let autoRotate = true;
    let animationFrameId: number;

    // Import Three.js dynamically to prevent SSR issues
    import('three').then((THREE) => {
      // Initialize scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.current!.clientWidth / canvasRef.current!.clientHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      renderer.setSize(canvasRef.current!.clientWidth, canvasRef.current!.clientHeight);
      renderer.setClearColor(0x000000, 0);
      
      // Set up lighting based on time of day
      if (timeOfDay === 'day') {
        scene.background = new THREE.Color(0xb5e2ff); // Light blue sky
        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
      } else {
        scene.background = new THREE.Color(0x0a1128); // Dark blue night sky
        light = new THREE.DirectionalLight(0xb5d8ff, 0.5); // Moonlight
        light.position.set(2, 3, 1);
      }
      
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x404040, 0.5));
      
      // Position camera
      camera.position.z = 5;
      camera.position.y = 2;
      camera.lookAt(0, 1, 0);
      
      // Create plant model based on selection and growth stage
      const createPlantModel = () => {
        if (plant3D) {
          scene.remove(plant3D);
        }
        
        plant3D = new THREE.Group();
        
        // Base color by plant type
        let plantColor = {
          tulsi: 0x006400,    // Dark green
          neem: 0x228B22,     // Forest green
          ashwagandha: 0x355E3B, // Hunter green
          brahmi: 0x50C878,   // Emerald
          mint: 0x98FB98      // Pale green
        }[plant] || 0x006400;
        
        // Modify color based on season
        if (season === 'autumn') {
          plantColor = adjustColor(plantColor, 40, 20, -60); // More red/yellow
        } else if (season === 'winter') {
          plantColor = adjustColor(plantColor, -40, -20, 0); // Duller
        } else if (season === 'spring') {
          plantColor = adjustColor(plantColor, -20, 30, -10); // More vibrant
        }
        
        // Growth stage affects the size and complexity
        const stageMultiplier = 0.3 + (growthStage * 0.7);
        
        if (plant === 'neem') {
          // Create a special neem tree using the provided image
          const textureLoader = new THREE.TextureLoader();
          const neemTexture = textureLoader.load(neemTreeImage);
          
          if (growthStage < 0.3) {
            // Small seedling using billboard technique
            const geometry = new THREE.PlaneGeometry(0.8 * stageMultiplier, 0.8 * stageMultiplier);
            const material = new THREE.MeshBasicMaterial({ 
              map: neemTexture,
              transparent: true,
              side: THREE.DoubleSide
            });
            const neemPlane = new THREE.Mesh(geometry, material);
            neemPlane.position.y = 0.4 * stageMultiplier;
            plant3D.add(neemPlane);
            
            // Add a second plane rotated 90 degrees for 3D effect
            const neemPlane2 = new THREE.Mesh(geometry, material);
            neemPlane2.position.y = 0.4 * stageMultiplier;
            neemPlane2.rotation.y = Math.PI / 2;
            plant3D.add(neemPlane2);
          } 
          else if (growthStage < 0.6) {
            // Medium sized plant with multiple cross planes
            const geometry = new THREE.PlaneGeometry(1.3 * stageMultiplier, 1.3 * stageMultiplier);
            const material = new THREE.MeshBasicMaterial({ 
              map: neemTexture,
              transparent: true,
              side: THREE.DoubleSide
            });
            
            // Create multiple planes at different angles
            for (let i = 0; i < 4; i++) {
              const neemPlane = new THREE.Mesh(geometry, material);
              neemPlane.position.y = 0.65 * stageMultiplier;
              neemPlane.rotation.y = i * Math.PI / 4;
              plant3D.add(neemPlane);
            }
          }
          else {
            // Full grown plant with multiple intersecting planes
            const geometry = new THREE.PlaneGeometry(2 * stageMultiplier, 2 * stageMultiplier);
            const material = new THREE.MeshBasicMaterial({ 
              map: neemTexture,
              transparent: true,
              side: THREE.DoubleSide
            });
            
            // Create multiple planes at different angles
            for (let i = 0; i < 8; i++) {
              const neemPlane = new THREE.Mesh(geometry, material);
              neemPlane.position.y = 1 * stageMultiplier;
              neemPlane.rotation.y = i * Math.PI / 8;
              plant3D.add(neemPlane);
            }
            
            // Add a smaller group of planes higher up
            const topGeometry = new THREE.PlaneGeometry(1.2 * stageMultiplier, 1.2 * stageMultiplier);
            for (let i = 0; i < 6; i++) {
              const topPlane = new THREE.Mesh(topGeometry, material);
              topPlane.position.y = 1.5 * stageMultiplier;
              topPlane.rotation.y = i * Math.PI / 6;
              plant3D.add(topPlane);
            }
            
            // Add fruits specific to neem tree
            const fruitGeometry = new THREE.SphereGeometry(0.08, 8, 8);
            const fruitMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); // Gold
            
            for (let i = 0; i < 7; i++) {
              const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
              fruit.position.y = 1.2 * stageMultiplier;
              fruit.position.x = Math.sin(i * (Math.PI * 2 / 7)) * 0.6;
              fruit.position.z = Math.cos(i * (Math.PI * 2 / 7)) * 0.6;
              plant3D.add(fruit);
            }
          }
        } else if (plant === 'tulsi') {
          // Use the existing geometry for tulsi plants
          // Create growth stage appropriate model
          if (growthStage < 0.3) {
            // Seedling
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2 * stageMultiplier, 8);
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.1 * stageMultiplier;
            
            // Small leaves
            const leafGeometry = new THREE.SphereGeometry(0.1 * stageMultiplier, 8, 8);
            const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.position.y = 0.2 * stageMultiplier;
            
            plant3D.add(stemMesh);
            plant3D.add(leaf);
          } 
          else if (growthStage < 0.6) {
            // Young plant
            const geometry = new THREE.CylinderGeometry(0.1, 0.15, 0.8 * stageMultiplier, 8);
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.4 * stageMultiplier;
            
            // Several leaves
            plant3D.add(stemMesh);
            
            for (let i = 0; i < 3; i++) {
              const leafGeometry = new THREE.SphereGeometry(0.15 * stageMultiplier, 8, 8);
              leafGeometry.scale(1, 0.5, 1);
              const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
              const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
              leaf.position.y = 0.4 + (i * 0.2) * stageMultiplier;
              leaf.rotation.z = i * (Math.PI * 2 / 3);
              leaf.position.x = Math.sin(i * (Math.PI * 2 / 3)) * 0.3 * stageMultiplier;
              leaf.position.z = Math.cos(i * (Math.PI * 2 / 3)) * 0.3 * stageMultiplier;
              plant3D.add(leaf);
            }
          }
          else {
            // Mature plant
            const geometry = new THREE.CylinderGeometry(0.15, 0.2, 1.5 * stageMultiplier, 8);
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.75 * stageMultiplier;
            
            plant3D.add(stemMesh);
            
            // Multiple branches with leaves
            for (let i = 0; i < 5; i++) {
              const branchGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.5 * stageMultiplier, 8);
              const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
              const branch = new THREE.Mesh(branchGeometry, branchMaterial);
              
              branch.position.y = 0.6 + (i * 0.2) * stageMultiplier;
              branch.rotation.z = Math.PI / 4;
              branch.rotation.y = i * (Math.PI * 2 / 5);
              branch.position.x = Math.sin(i * (Math.PI * 2 / 5)) * 0.3;
              branch.position.z = Math.cos(i * (Math.PI * 2 / 5)) * 0.3;
              
              // Leaves on each branch
              const leafGeometry = new THREE.SphereGeometry(0.2 * stageMultiplier, 8, 8);
              leafGeometry.scale(1, 0.5, 1);
              const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
              const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
              leaf.position.y = 0.3 * stageMultiplier;
              leaf.position.x = 0.2 * stageMultiplier;
              
              branch.add(leaf);
              plant3D.add(branch);
            }
            
            // Small flowers on top for tulsi
            const flowerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0x9932CC }); // Purple
            
            for (let i = 0; i < 7; i++) {
              const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
              flower.position.y = 1.6 * stageMultiplier;
              flower.position.x = (Math.random() - 0.5) * 0.4;
              flower.position.z = (Math.random() - 0.5) * 0.4;
              plant3D.add(flower);
            }
          }
        } else {
          // Use the existing geometry for other plants
          // Create growth stage appropriate model
          if (growthStage < 0.3) {
            // Seedling
            const geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2 * stageMultiplier, 8);
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.1 * stageMultiplier;
            
            // Small leaves
            const leafGeometry = new THREE.SphereGeometry(0.1 * stageMultiplier, 8, 8);
            const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.position.y = 0.2 * stageMultiplier;
            
            plant3D.add(stemMesh);
            plant3D.add(leaf);
          } 
          else if (growthStage < 0.6) {
            // Young plant
            const geometry = new THREE.CylinderGeometry(0.1, 0.15, 0.8 * stageMultiplier, 8);
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.4 * stageMultiplier;
            
            // Several leaves
            plant3D.add(stemMesh);
            
            for (let i = 0; i < 3; i++) {
              const leafGeometry = new THREE.SphereGeometry(0.15 * stageMultiplier, 8, 8);
              leafGeometry.scale(1, 0.5, 1);
              const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
              const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
              leaf.position.y = 0.4 + (i * 0.2) * stageMultiplier;
              leaf.rotation.z = i * (Math.PI * 2 / 3);
              leaf.position.x = Math.sin(i * (Math.PI * 2 / 3)) * 0.3 * stageMultiplier;
              leaf.position.z = Math.cos(i * (Math.PI * 2 / 3)) * 0.3 * stageMultiplier;
              plant3D.add(leaf);
            }
          }
          else {
            // Mature plant
            const geometry = new THREE.CylinderGeometry(0.15, 0.2, 1.5 * stageMultiplier, 8);
            const material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.75 * stageMultiplier;
            
            plant3D.add(stemMesh);
            
            // Multiple branches with leaves
            for (let i = 0; i < 5; i++) {
              const branchGeometry = new THREE.CylinderGeometry(0.05, 0.08, 0.5 * stageMultiplier, 8);
              const branchMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
              const branch = new THREE.Mesh(branchGeometry, branchMaterial);
              
              branch.position.y = 0.6 + (i * 0.2) * stageMultiplier;
              branch.rotation.z = Math.PI / 4;
              branch.rotation.y = i * (Math.PI * 2 / 5);
              branch.position.x = Math.sin(i * (Math.PI * 2 / 5)) * 0.3;
              branch.position.z = Math.cos(i * (Math.PI * 2 / 5)) * 0.3;
              
              // Leaves on each branch
              const leafGeometry = new THREE.SphereGeometry(0.2 * stageMultiplier, 8, 8);
              leafGeometry.scale(1, 0.5, 1);
              const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
              const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
              leaf.position.y = 0.3 * stageMultiplier;
              leaf.position.x = 0.2 * stageMultiplier;
              
              branch.add(leaf);
              plant3D.add(branch);
            }
            
            // For mature plants, add flowers/fruits based on plant type
            if (plant === 'neem') {
              // Add fruits
              const fruitGeometry = new THREE.SphereGeometry(0.08, 8, 8);
              const fruitMaterial = new THREE.MeshStandardMaterial({ color: 0xFFD700 }); // Gold
              
              for (let i = 0; i < 5; i++) {
                const fruit = new THREE.Mesh(fruitGeometry, fruitMaterial);
                fruit.position.y = 1.2 * stageMultiplier;
                fruit.position.x = Math.sin(i * (Math.PI * 2 / 5)) * 0.5;
                fruit.position.z = Math.cos(i * (Math.PI * 2 / 5)) * 0.5;
                plant3D.add(fruit);
              }
            } else if (plant !== 'tulsi') {
              // Add small flowers on top for other plants
              const flowerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
              const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0x9932CC }); // Purple
              
              for (let i = 0; i < 7; i++) {
                const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
                flower.position.y = 1.6 * stageMultiplier;
                flower.position.x = (Math.random() - 0.5) * 0.4;
                flower.position.z = (Math.random() - 0.5) * 0.4;
                plant3D.add(flower);
              }
            }
          }
        }
        
        // Add ground
        const groundGeometry = new THREE.CircleGeometry(2, 32);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
          color: season === 'winter' ? 0xFFFFFF : 0x654321  // Snow in winter, brown otherwise
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        plant3D.add(ground);
        
        // Set initial rotation
        plant3D.rotation.y = Math.PI / 4;
        
        scene.add(plant3D);
      };
      
      // Helper function to adjust RGB values for seasonal colors
      function adjustColor(hexColor: number, r: number, g: number, b: number) {
        const red = ((hexColor >> 16) & 0xFF) + r;
        const green = ((hexColor >> 8) & 0xFF) + g;
        const blue = (hexColor & 0xFF) + b;
        
        const clampedR = Math.max(0, Math.min(255, red));
        const clampedG = Math.max(0, Math.min(255, green));
        const clampedB = Math.max(0, Math.min(255, blue));
        
        return (clampedR << 16) | (clampedG << 8) | clampedB;
      }
      
      createPlantModel();
      
      // Event listeners for interaction
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = {
          x: e.clientX,
          y: e.clientY
        };
      };
      
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
          };
          
          if (plant3D) {
            plant3D.rotation.y += deltaMove.x * 0.01;
            plant3D.rotation.x += deltaMove.y * 0.01;
            
            // Limit vertical rotation
            plant3D.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, plant3D.rotation.x));
          }
          
          previousMousePosition = {
            x: e.clientX,
            y: e.clientY
          };
          
          // Temporarily disable auto-rotation during manual rotation
          autoRotate = false;
          setTimeout(() => { autoRotate = true; }, 3000);
        }
      };
      
      const handleMouseUp = () => {
        isDragging = false;
      };
      
      const handleTouchStart = (e: TouchEvent) => {
        isDragging = true;
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        if (isDragging) {
          const deltaMove = {
            x: e.touches[0].clientX - previousMousePosition.x,
            y: e.touches[0].clientY - previousMousePosition.y
          };
          
          if (plant3D) {
            plant3D.rotation.y += deltaMove.x * 0.01;
            plant3D.rotation.x += deltaMove.y * 0.01;
            
            // Limit vertical rotation
            plant3D.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, plant3D.rotation.x));
          }
          
          previousMousePosition = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
          };
          
          // Temporarily disable auto-rotation during manual rotation
          autoRotate = false;
          setTimeout(() => { autoRotate = true; }, 3000);
        }
      };
      
      const handleTouchEnd = () => {
        isDragging = false;
      };
      
      // Add event listeners
      canvasRef.current!.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      canvasRef.current!.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      
      // Handle window resize
      const handleResize = () => {
        if (canvasRef.current) {
          const width = canvasRef.current.clientWidth;
          const height = canvasRef.current.clientHeight;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Animation loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        
        if (plant3D && autoRotate) {
          plant3D.rotation.y += rotationSpeed;
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
      setIsLoading(false);
      
      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        canvasRef.current!.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current!.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
        cancelAnimationFrame(animationFrameId);
        
        if (renderer) {
          renderer.dispose();
        }
      };
    });

    // Cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [plant, season, timeOfDay, growthSpeed, growthStage]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-garden-light/30">
          <div className="text-garden-primary animate-spin">
            <RefreshCw size={48} />
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 text-white py-1 px-3 rounded-full text-sm backdrop-blur-sm">
        Drag to rotate • Scroll to zoom
      </div>
    </>
  );
};

export default PlantRenderer;
