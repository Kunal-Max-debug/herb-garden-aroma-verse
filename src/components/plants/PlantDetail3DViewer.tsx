
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Info,
  Smartphone,
  Glasses
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface PlantDetail3DViewerProps {
  plantId: string;
  modelPath?: string;
  imageUrl: string;
}

interface PlantPartInfo {
  name: string;
  description: string;
  uses: string[];
  position: { x: number, y: number };
}

const PlantDetail3DViewer = ({ plantId, modelPath, imageUrl }: PlantDetail3DViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedPart, setSelectedPart] = useState<PlantPartInfo | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'ar' | 'vr'>('standard');
  
  // Sample plant parts data - would normally come from an API
  const plantParts: Record<string, PlantPartInfo[]> = {
    "mint": [
      {
        name: "Leaves",
        description: "Mint leaves are aromatic, serrated, and arranged oppositely on square stems. They contain essential oils, primarily menthol.",
        uses: [
          "Relieves indigestion and stomach cramps",
          "Soothes irritable bowel syndrome",
          "Freshens breath and treats oral infections",
          "Alleviates symptoms of colds and respiratory conditions"
        ],
        position: { x: 50, y: 30 }
      },
      {
        name: "Stem",
        description: "Mint stems are square-shaped and contain nodes where leaves grow. They're often hairy and can root when in contact with soil.",
        uses: [
          "Used in teas and infusions",
          "Contains essential oils",
          "Can be propagated to grow new plants"
        ],
        position: { x: 50, y: 60 }
      },
      {
        name: "Flowers",
        description: "Mint plants produce small purple, pink, or white flowers in clusters at stem ends or leaf axils.",
        uses: [
          "Attract beneficial pollinators",
          "Can be used in herbal garnishes",
          "Indicate when the plant is mature"
        ],
        position: { x: 50, y: 15 }
      },
      {
        name: "Roots",
        description: "Mint has vigorous rhizomatous roots that spread horizontally underground, helping the plant colonize large areas quickly.",
        uses: [
          "Used for plant propagation",
          "Some traditional medicinal preparations use root extracts",
          "Help the plant access water and nutrients"
        ],
        position: { x: 50, y: 85 }
      }
    ],
    // Add other plants as needed
  };

  // Get the plant parts for the current plant
  const currentPlantParts = plantParts[plantId] || [];

  // Handle auto-rotation animation with requestAnimationFrame for smoother performance
  useEffect(() => {
    let animationFrameId: number;
    
    if (isRotating && imageRef.current) {
      let lastTimestamp: number;
      
      const animate = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        
        // Adjust speed based on deltaTime for smoother animation
        setRotation(prevRotation => (prevRotation + deltaTime * 0.05) % 360);
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isRotating]);
  
  // Apply rotation and zoom to image
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = `rotate(${rotation}deg) scale(${zoom})`;
    }
  }, [rotation, zoom]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleRotation = () => {
    setIsRotating(prev => {
      const newState = !prev;
      if (newState) {
        toast("360° rotation started");
      }
      return newState;
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(err => {
        toast.error(`Error entering fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().catch(err => {
        toast.error(`Error exiting fullscreen: ${err.message}`);
      });
    }
  };

  const handleZoomIn = () => {
    if (zoom < 2) {
      setZoom(prev => Math.min(prev + 0.1, 2));
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      setZoom(prev => Math.max(prev - 0.1, 0.5));
    }
  };

  const handlePartClick = (part: PlantPartInfo) => {
    setSelectedPart(part);
    setShowDialog(true);
    // Pause rotation when inspecting a part
    if (isRotating) {
      setIsRotating(false);
    }
  };

  const activateAR = () => {
    // Check if the browser supports WebXR
    if ('xr' in navigator) {
      setViewMode('ar');
      toast.success("AR mode activated! Point your camera at a flat surface.");
    } else {
      toast.error("Your browser doesn't support AR. Try using Chrome or Safari on a compatible device.");
    }
  };

  const activateVR = () => {
    // Check if the browser supports WebXR VR
    if ('xr' in navigator) {
      setViewMode('vr');
      toast.success("VR mode activated! Use a compatible VR headset for the best experience.");
    } else {
      toast.error("Your browser doesn't support VR. Try using a WebXR compatible browser and device.");
    }
  };

  const resetViewMode = () => {
    setViewMode('standard');
  };

  return (
    <Card className="border border-garden-light bg-black/5 overflow-hidden">
      <CardContent className="p-0 relative">
        <div 
          ref={containerRef} 
          className={`relative ${isFullscreen ? 'h-screen flex items-center justify-center' : 'h-[400px]'} overflow-hidden bg-[url('/assets/grid-pattern.svg')]`}
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('/assets/grid-pattern.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ContextMenu>
            <ContextMenuTrigger>
              <img
                ref={imageRef}
                src={imageUrl}
                alt={`3D view of ${plantId}`}
                className="w-auto h-full max-h-full object-contain transition-transform duration-300"
                style={{ transformOrigin: 'center center' }}
                onError={(e) => {
                  // Fallback in case the image fails to load
                  const imgElement = e.currentTarget;
                  imgElement.onerror = null; // Prevent infinite fallback loop
                  imgElement.src = '/placeholder.svg';
                  toast.error("Failed to load plant image");
                }}
              />
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <div className="px-2 py-1.5 text-sm font-semibold">Plant Parts</div>
              {currentPlantParts.map((part, index) => (
                <ContextMenuItem 
                  key={index} 
                  onClick={() => handlePartClick(part)}
                  className="flex items-center cursor-pointer"
                >
                  <Info className="mr-2 h-4 w-4" />
                  <span>{part.name}</span>
                </ContextMenuItem>
              ))}
            </ContextMenuContent>
          </ContextMenu>
          
          {/* Plant part markers */}
          {currentPlantParts.map((part, index) => (
            <div 
              key={index}
              className="absolute w-6 h-6 bg-white/80 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{ 
                left: `${part.position.x}%`, 
                top: `${part.position.y}%`,
                zIndex: 10
              }}
              onClick={() => handlePartClick(part)}
              title={`View details about ${part.name}`}
            >
              <Info size={14} className="text-garden-primary" />
            </div>
          ))}
          
          {/* View mode indicator */}
          {viewMode !== 'standard' && (
            <div className="absolute top-4 left-4 right-4 bg-black/80 text-white px-4 py-2 rounded-md text-sm backdrop-blur-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                {viewMode === 'ar' ? (
                  <>
                    <Smartphone size={16} />
                    AR View Active
                  </>
                ) : (
                  <>
                    <Glasses size={16} />
                    VR View Active
                  </>
                )}
              </span>
              <Button variant="link" className="text-white p-0 h-auto" onClick={resetViewMode}>
                Exit {viewMode.toUpperCase()} Mode
              </Button>
            </div>
          )}
          
          {/* Main controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/60 rounded-full p-1.5 backdrop-blur-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleRotation}
              className={`rounded-full ${isRotating ? 'bg-garden-primary text-white' : 'text-white hover:bg-white/20'}`}
              aria-label={isRotating ? "Stop rotation" : "Start rotation"}
            >
              <RotateCw size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleZoomIn}
              className="rounded-full text-white hover:bg-white/20"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleZoomOut}
              className="rounded-full text-white hover:bg-white/20"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleFullscreen}
              className="rounded-full text-white hover:bg-white/20"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={activateAR}
              className={`rounded-full ${viewMode === 'ar' ? 'bg-garden-primary text-white' : 'text-white hover:bg-white/20'}`}
              aria-label="View in AR"
            >
              <Smartphone size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={activateVR}
              className={`rounded-full ${viewMode === 'vr' ? 'bg-garden-primary text-white' : 'text-white hover:bg-white/20'}`}
              aria-label="View in VR"
            >
              <Glasses size={18} />
            </Button>
          </div>

          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm">
            {viewMode === 'standard' ? '360° View' : viewMode === 'ar' ? 'AR View' : 'VR View'}
          </div>

          {modelPath === undefined && (
            <div className="absolute top-4 right-4 bg-yellow-500/80 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm">
              3D model coming soon
            </div>
          )}
        </div>
      </CardContent>

      {/* Plant part detail dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-garden-primary text-2xl">{selectedPart?.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-2">
            <div>
              <h3 className="font-medium text-garden-dark mb-1">Description</h3>
              <p className="text-gray-700">{selectedPart?.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-garden-dark mb-1">Medicinal & Traditional Uses</h3>
              <ul className="list-disc pl-5 space-y-1">
                {selectedPart?.uses.map((use, index) => (
                  <li key={index} className="text-gray-700">{use}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PlantDetail3DViewer;
