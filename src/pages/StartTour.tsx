
import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sun, Moon, Leaf, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const StartTour = () => {
  const { isLoggedIn } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [plant, setPlant] = useState('tulsi');
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

  useEffect(() => {
    // Only initialize Three.js if user is logged in
    if (isLoggedIn && canvasRef.current) {
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
        
        // Function to create plant model based on selection and growth stage
        const createPlantModel = () => {
          if (plant3D) {
            scene.remove(plant3D);
          }
          
          // Simple placeholder geometry for different plants and growth stages
          let geometry, material;
          
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
          
          // Create growth stage appropriate model
          if (growthStage < 0.3) {
            // Seedling
            geometry = new THREE.CylinderGeometry(0.05, 0.05, 0.2 * stageMultiplier, 8);
            material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.1 * stageMultiplier;
            
            // Small leaves
            const leafGeometry = new THREE.SphereGeometry(0.1 * stageMultiplier, 8, 8);
            const leafMaterial = new THREE.MeshStandardMaterial({ color: plantColor });
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.position.y = 0.2 * stageMultiplier;
            
            plant3D = new THREE.Group();
            plant3D.add(stemMesh);
            plant3D.add(leaf);
          } 
          else if (growthStage < 0.6) {
            // Young plant
            geometry = new THREE.CylinderGeometry(0.1, 0.15, 0.8 * stageMultiplier, 8);
            material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.4 * stageMultiplier;
            
            // Several leaves
            plant3D = new THREE.Group();
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
            geometry = new THREE.CylinderGeometry(0.15, 0.2, 1.5 * stageMultiplier, 8);
            material = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown stem
            
            const stemMesh = new THREE.Mesh(geometry, material);
            stemMesh.position.y = 0.75 * stageMultiplier;
            
            plant3D = new THREE.Group();
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
            if (plant === 'tulsi' || plant === 'mint') {
              // Add small flowers on top
              const flowerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
              const flowerMaterial = new THREE.MeshStandardMaterial({ color: 0x9932CC }); // Purple
              
              for (let i = 0; i < 7; i++) {
                const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
                flower.position.y = 1.6 * stageMultiplier;
                flower.position.x = (Math.random() - 0.5) * 0.4;
                flower.position.z = (Math.random() - 0.5) * 0.4;
                plant3D.add(flower);
              }
            } else if (plant === 'neem') {
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
    }
  }, [isLoggedIn, plant, season, timeOfDay, growthSpeed, growthStage]);
  
  const handlePlantChange = (value: string) => {
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
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-garden-light/30">
                  <div className="text-garden-primary animate-spin">
                    <RefreshCw size={48} />
                  </div>
                </div>
              )}
              <CardContent className="p-0 h-full">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 text-white py-1 px-3 rounded-full text-sm backdrop-blur-sm">
                  Drag to rotate • Scroll to zoom
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-garden-dark">
                Plant Controls
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Plant</label>
                  <Select defaultValue={plant} onValueChange={handlePlantChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tulsi">Tulsi (Holy Basil)</SelectItem>
                      <SelectItem value="neem">Neem</SelectItem>
                      <SelectItem value="ashwagandha">Ashwagandha</SelectItem>
                      <SelectItem value="brahmi">Brahmi</SelectItem>
                      <SelectItem value="mint">Mint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Season</label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button 
                      variant={season === "spring" ? "default" : "outline"}
                      className={season === "spring" ? "bg-garden-primary" : ""} 
                      onClick={() => handleSeasonChange("spring")}
                    >
                      Spring
                    </Button>
                    <Button 
                      variant={season === "summer" ? "default" : "outline"}
                      className={season === "summer" ? "bg-garden-primary" : ""} 
                      onClick={() => handleSeasonChange("summer")}
                    >
                      Summer
                    </Button>
                    <Button 
                      variant={season === "autumn" ? "default" : "outline"}
                      className={season === "autumn" ? "bg-garden-primary" : ""} 
                      onClick={() => handleSeasonChange("autumn")}
                    >
                      Autumn
                    </Button>
                    <Button 
                      variant={season === "winter" ? "default" : "outline"}
                      className={season === "winter" ? "bg-garden-primary" : ""} 
                      onClick={() => handleSeasonChange("winter")}
                    >
                      Winter
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time of Day</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={timeOfDay === "day" ? "default" : "outline"} 
                      className={timeOfDay === "day" ? "bg-garden-primary" : ""}
                      onClick={() => handleTimeChange("day")}
                    >
                      <Sun className="mr-2 h-4 w-4" /> Day
                    </Button>
                    <Button 
                      variant={timeOfDay === "night" ? "default" : "outline"} 
                      className={timeOfDay === "night" ? "bg-garden-primary" : ""}
                      onClick={() => handleTimeChange("night")}
                    >
                      <Moon className="mr-2 h-4 w-4" /> Night
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Growth Stage</label>
                  <div className="pt-2">
                    <Slider
                      value={[growthStage]}
                      min={0}
                      max={1}
                      step={0.1}
                      onValueChange={handleGrowthStageChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Seedling</span>
                      <span>Young</span>
                      <span>Mature</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rotation Speed</label>
                  <div className="pt-2">
                    <Slider
                      value={[growthSpeed]}
                      min={0}
                      max={3}
                      step={0.5}
                      onValueChange={handleGrowthSpeedChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Still</span>
                      <span>Slow</span>
                      <span>Medium</span>
                      <span>Fast</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="mt-6">
              <Card className="p-4 bg-garden-light/30">
                <div className="flex items-center gap-2">
                  <Leaf className="text-garden-primary h-5 w-5" />
                  <h3 className="font-semibold text-garden-dark">Plant Information</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plant === 'tulsi' && "Tulsi (Holy Basil) is a sacred plant in Hindu tradition and has significant medicinal properties. It thrives in warm seasons and needs moderate watering."}
                  {plant === 'neem' && "Neem is known for its antiseptic and pest-repellent properties. It's a hardy tree that can grow in various conditions but prefers tropical and sub-tropical climates."}
                  {plant === 'ashwagandha' && "Ashwagandha is an adaptogenic herb that helps the body manage stress. It prefers dry soil and warm conditions, growing well in full sun."}
                  {plant === 'brahmi' && "Brahmi is used in Ayurveda for improving memory and cognitive function. It prefers wet conditions and can even grow in shallow water or marshy areas."}
                  {plant === 'mint' && "Mint is a versatile herb used for digestive health in Ayurveda. It grows vigorously in partial shade to full sun and prefers consistently moist soil."}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartTour;
