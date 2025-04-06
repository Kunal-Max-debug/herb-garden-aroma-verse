
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface PlantDetail3DViewerProps {
  plantId: string;
  modelPath?: string;
  imageUrl: string;
}

const PlantDetail3DViewer = ({ plantId, modelPath, imageUrl }: PlantDetail3DViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

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
          </div>

          <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm">
            360° View
          </div>

          {modelPath === undefined && (
            <div className="absolute top-4 right-4 bg-yellow-500/80 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm">
              3D model coming soon
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantDetail3DViewer;

