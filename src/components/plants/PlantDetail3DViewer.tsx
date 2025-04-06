
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

  // Placeholder for 3D rotation - in a real app, this would use a 3D library
  useEffect(() => {
    let rotationInterval: NodeJS.Timeout | null = null;
    
    if (isRotating && imageRef.current) {
      let rotation = 0;
      rotationInterval = setInterval(() => {
        rotation = (rotation + 1) % 360;
        if (imageRef.current) {
          imageRef.current.style.transform = `rotate(${rotation}deg) scale(${zoom})`;
        }
      }, 50);
    }

    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [isRotating, zoom]);

  const toggleRotation = () => {
    if (isRotating) {
      setIsRotating(false);
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(${zoom})`;
      }
    } else {
      setIsRotating(true);
      toast("3D rotation started");
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        toast.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleZoomIn = () => {
    if (zoom < 2) {
      const newZoom = zoom + 0.1;
      setZoom(newZoom);
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(${newZoom})`;
      }
    }
  };

  const handleZoomOut = () => {
    if (zoom > 0.5) {
      const newZoom = zoom - 0.1;
      setZoom(newZoom);
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(${newZoom})`;
      }
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
            alt={`3D model of ${plantId}`}
            className="w-auto h-full max-h-full object-contain transition-transform duration-300"
            style={{ transformOrigin: 'center center' }}
          />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/60 rounded-full p-1.5 backdrop-blur-sm">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleRotation}
              className={`rounded-full ${isRotating ? 'bg-garden-primary text-white' : 'text-white hover:bg-white/20'}`}
            >
              <RotateCw size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleZoomIn}
              className="rounded-full text-white hover:bg-white/20"
            >
              <ZoomIn size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleZoomOut}
              className="rounded-full text-white hover:bg-white/20"
            >
              <ZoomOut size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleFullscreen}
              className="rounded-full text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>
          </div>

          <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm">
            Interactive View
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
