
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

// Plant parts data - organized by plant ID
const plantPartsData: Record<string, PlantPartInfo[]> = {
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
  "tulsi": [
    {
      name: "Leaves",
      description: "Tulsi leaves are aromatic with a clove-like scent, oval-shaped with slightly serrated edges. They contain essential oils with medicinal properties.",
      uses: [
        "Treats cough, cold, and respiratory disorders",
        "Reduces stress and anxiety when consumed as tea",
        "Helps in detoxification of the body",
        "Used in herbal teas and infusions for daily health maintenance"
      ],
      position: { x: 40, y: 35 }
    },
    {
      name: "Stems",
      description: "Tulsi has hairy, woody stems that are often purplish in color, especially in the Krishna variety. They contain similar compounds as the leaves but in lesser concentration.",
      uses: [
        "Used in making herbal teas and decoctions",
        "Can be chewed directly for oral health benefits",
        "Useful for propagation of new plants"
      ],
      position: { x: 50, y: 60 }
    },
    {
      name: "Flowers",
      description: "Tulsi produces small purple or white flowers arranged in elongated racemes. The flowers are tubular and aromatic.",
      uses: [
        "Made into floral waters for ritual use",
        "Used in certain Ayurvedic formulations",
        "Attract pollinators to the garden"
      ],
      position: { x: 50, y: 15 }
    },
    {
      name: "Seeds",
      description: "Tiny yellow-brown seeds that develop after flowering. They swell and form a gelatinous coating when soaked in water.",
      uses: [
        "Consumed as a cooling drink when soaked in water",
        "Used as a natural laxative",
        "Can be sprouted and used in salads"
      ],
      position: { x: 60, y: 20 }
    }
  ],
  "ashwagandha": [
    {
      name: "Roots",
      description: "The primary medicinal part of the ashwagandha plant, these roots are thick, fleshy, and whitish-brown in color. They have a strong horse-like smell when fresh or dried.",
      uses: [
        "Primary adaptogenic component, helping the body resist stress",
        "Used to enhance vitality, energy, and endurance",
        "Supports healthy nervous system function and cognitive abilities",
        "Helps support healthy sleep patterns"
      ],
      position: { x: 50, y: 85 }
    },
    {
      name: "Leaves",
      description: "Oval-shaped leaves with a dull green color and covered in fine hairs. Smaller than many other medicinal plants.",
      uses: [
        "Applied externally as a poultice for wounds and swellings",
        "Used in some Ayurvedic formulations for skin conditions",
        "Sometimes used in teas but less common than root preparations"
      ],
      position: { x: 40, y: 30 }
    },
    {
      name: "Berries",
      description: "Small, round, orange-red berries that are enclosed in a papery husk similar to cape gooseberries.",
      uses: [
        "Used as a coagulant in traditional cheese-making",
        "Seeds can be harvested for propagation",
        "Limited medicinal use compared to roots"
      ],
      position: { x: 60, y: 40 }
    },
    {
      name: "Flowers",
      description: "Small, bell-shaped greenish or yellowish flowers that appear in clusters.",
      uses: [
        "Limited medicinal applications",
        "Indicate when the plant is mature and berries will soon develop",
        "Support pollinator populations in the garden"
      ],
      position: { x: 55, y: 20 }
    }
  ],
  "turmeric": [
    {
      name: "Rhizome",
      description: "The underground stem of turmeric, bright orange or yellow inside with a tough brown skin. Contains high concentrations of curcumin and essential oils.",
      uses: [
        "Primary medicinal component with powerful anti-inflammatory properties",
        "Used in cooking as a spice and food coloring",
        "Applied topically for skin conditions and wounds",
        "Processed into supplements and extracts"
      ],
      position: { x: 50, y: 80 }
    },
    {
      name: "Leaves",
      description: "Large, oblong leaves with long stems that emerge directly from the rhizome. Bright green and aromatic when fresh.",
      uses: [
        "Used as wrapping material for steaming certain foods in Southeast Asian cuisine",
        "Contain essential oils with some medicinal properties",
        "Can be used as a natural food wrapper"
      ],
      position: { x: 45, y: 40 }
    },
    {
      name: "Flowers",
      description: "Pale yellow to white flowers arranged in a dense spike on a separate stem from the leaves.",
      uses: [
        "Limited medicinal use",
        "Ornamental value in gardens",
        "Indicates plant maturity"
      ],
      position: { x: 60, y: 30 }
    }
  ],
  "neem": [
    {
      name: "Leaves",
      description: "Elongated, pointed leaves with serrated edges arranged in pairs along the branches. They have a strong bitter taste and distinct smell.",
      uses: [
        "Used for skin conditions including acne, psoriasis, and eczema",
        "Natural insect repellent and pesticide",
        "Blood purifier and detoxification agent",
        "Used in baths for treating skin infections"
      ],
      position: { x: 45, y: 30 }
    },
    {
      name: "Bark",
      description: "The outer covering of the neem tree trunk, which is rough, fissured, and dark gray to reddish-brown in color.",
      uses: [
        "Used for dental hygiene to prevent gum disease and tooth decay",
        "Has antibacterial and antimicrobial properties",
        "Used in treating skin conditions and infections",
        "Helps with fever reduction"
      ],
      position: { x: 30, y: 60 }
    },
    {
      name: "Seeds/Oil",
      description: "Olive-shaped fruits that yield bitter neem oil when pressed. The oil is dark yellow to brown with a strong garlic-like odor.",
      uses: [
        "Potent insecticide and pesticide",
        "Treats various skin conditions including scabies and ringworm",
        "Used in hair care products for dandruff and scalp conditions",
        "Natural contraceptive properties in traditional medicine"
      ],
      position: { x: 60, y: 40 }
    },
    {
      name: "Flowers",
      description: "Small, white, fragrant flowers that grow in drooping clusters.",
      uses: [
        "Used in some traditional diabetes treatments",
        "Made into teas for fever reduction",
        "Added to foods in some regions of India",
        "Support pollinator populations"
      ],
      position: { x: 70, y: 20 }
    }
  ],
  "brahmi": [
    {
      name: "Leaves",
      description: "Small, succulent, oblong leaves arranged oppositely on creeping stems. They contain bacosides, the primary active compounds.",
      uses: [
        "Enhance memory and cognitive function",
        "Reduce anxiety and stress",
        "Improve focus and concentration",
        "Support overall brain health"
      ],
      position: { x: 50, y: 35 }
    },
    {
      name: "Stems",
      description: "Thin, creeping stems that root at nodes when in contact with moist soil, allowing the plant to spread rapidly.",
      uses: [
        "Used in whole-plant preparations and extracts",
        "Contain some active compounds, though less concentrated than leaves",
        "Used for propagation of new plants"
      ],
      position: { x: 45, y: 60 }
    },
    {
      name: "Flowers",
      description: "Small, white to pale blue flowers that grow singularly on stalks from leaf axils.",
      uses: [
        "Limited medicinal applications",
        "Indicate plant health and vitality",
        "Support pollinators in wetland ecosystems"
      ],
      position: { x: 60, y: 25 }
    },
    {
      name: "Whole Plant",
      description: "The entire brahmi plant, including leaves, stems, and sometimes flowers, used in many traditional preparations.",
      uses: [
        "Made into medicated ghee (Brahmi Ghrita)",
        "Prepared as rejuvenating tonics and elixirs",
        "Used in hair oils to promote hair growth and brain cooling",
        "Added to herbal baths for calming effects"
      ],
      position: { x: 40, y: 45 }
    }
  ],
  "amla": [
    {
      name: "Fruit",
      description: "Round, light green fruits with six vertical stripes. Exceptionally high in vitamin C and antioxidants with a sour, astringent taste.",
      uses: [
        "Powerful antioxidant and immunity booster",
        "Supports digestion and metabolism",
        "Enhances hair growth and prevents premature graying",
        "Improves eye health and vision"
      ],
      position: { x: 50, y: 40 }
    },
    {
      name: "Seeds",
      description: "Hard, brown seeds found in the center of the fruit, usually not used medicinally but important for propagation.",
      uses: [
        "Limited medicinal use",
        "Used for growing new amla trees",
        "Sometimes ground and used in specific Ayurvedic formulations"
      ],
      position: { x: 50, y: 60 }
    },
    {
      name: "Leaves",
      description: "Small, feathery leaves arranged closely on branchlets, giving a fern-like appearance.",
      uses: [
        "Made into teas for cooling effects",
        "Used in some traditional treatments for jaundice",
        "Applied externally for skin conditions in some preparations"
      ],
      position: { x: 40, y: 25 }
    },
    {
      name: "Bark",
      description: "Grayish-brown bark that is rough and flaking.",
      uses: [
        "Used in some traditional preparations for liver conditions",
        "Has astringent properties useful for treating diarrhea",
        "Sometimes used for wound healing"
      ],
      position: { x: 30, y: 50 }
    }
  ],
  "shatavari": [
    {
      name: "Roots",
      description: "Tuberous, finger-like roots that are succulent and pearly white. The primary medicinal part of the plant.",
      uses: [
        "Female reproductive tonic supporting hormonal balance",
        "Galactagogue that enhances milk production in nursing mothers",
        "Adaptogenic herb that helps manage stress",
        "Supports the digestive system and soothes irritation"
      ],
      position: { x: 50, y: 85 }
    },
    {
      name: "Leaves",
      description: "Fine, needle-like leaves that grow in clusters, similar to asparagus foliage.",
      uses: [
        "Limited medicinal use compared to roots",
        "Sometimes used in local traditional remedies",
        "Indicate plant health and can be used to identify the plant"
      ],
      position: { x: 45, y: 35 }
    },
    {
      name: "Berries",
      description: "Small, red berries that develop after flowering.",
      uses: [
        "Limited medicinal applications",
        "Contain seeds for plant propagation",
        "Sometimes used in traditional preparations"
      ],
      position: { x: 60, y: 40 }
    },
    {
      name: "Flowers",
      description: "Small, white flowers that bloom in clusters.",
      uses: [
        "Limited medicinal use",
        "Indicate plant maturity and health",
        "Support pollinator populations"
      ],
      position: { x: 55, y: 20 }
    }
  ],
  "triphala": [
    {
      name: "Amalaki (Amla)",
      description: "One of the three fruits in Triphala, it's round with light green flesh and exceptionally high in vitamin C.",
      uses: [
        "Provides antioxidant benefits",
        "Supports digestive health and metabolism",
        "Enhances immunity",
        "Improves eye health"
      ],
      position: { x: 35, y: 40 }
    },
    {
      name: "Bibhitaki",
      description: "Oval or egg-shaped fruit with a hard seed inside. The fruit has a grayish-brown color when dried.",
      uses: [
        "Supports respiratory health",
        "Has astringent properties that benefit the digestive system",
        "Helps remove excess mucus from the body",
        "Supports healthy elimination"
      ],
      position: { x: 50, y: 50 }
    },
    {
      name: "Haritaki",
      description: "Yellowish-brown fruit with a hard, ribbed shell and a central stone. Often described as the 'king of medicines' in Tibet.",
      uses: [
        "Gentle laxative effect supporting elimination",
        "Enhances absorption and assimilation of nutrients",
        "Supports healthy brain function",
        "Cleanses the digestive tract"
      ],
      position: { x: 65, y: 40 }
    },
    {
      name: "Combined Powder",
      description: "The fine powder made from equal parts of all three dried fruits, which is the traditional preparation of Triphala.",
      uses: [
        "Balances all three doshas in Ayurveda",
        "Supports complete digestive health",
        "Acts as a gentle daily detoxifier",
        "Supports overall wellness when used regularly"
      ],
      position: { x: 50, y: 65 }
    }
  ],
  "guduchi": [
    {
      name: "Stem",
      description: "Climbing, succulent stems with a bitter taste. Contains starch (Guduchi-satva) and various alkaloids that give it medicinal properties.",
      uses: [
        "Primary medicinal part, used in many Ayurvedic preparations",
        "Boosts immunity and fights infections",
        "Reduces inflammation and fever",
        "Supports liver function and detoxification"
      ],
      position: { x: 50, y: 50 }
    },
    {
      name: "Leaves",
      description: "Heart-shaped leaves with a smooth texture and pronounced veins. They grow alternately on the stem.",
      uses: [
        "Made into juices and decoctions for fever",
        "Used in some traditional remedies for skin conditions",
        "Less commonly used than stems but contain similar compounds"
      ],
      position: { x: 40, y: 30 }
    },
    {
      name: "Roots",
      description: "Long, thread-like roots that emerge from the nodes of the stems.",
      uses: [
        "Used in some traditional preparations for chronic fever",
        "Have adaptogenic properties similar to stems",
        "Support the plant's climbing growth habit"
      ],
      position: { x: 50, y: 75 }
    },
    {
      name: "Starch (Guduchi-satva)",
      description: "A starch extracted from the stems by soaking them in water, crushing, and filtering. It appears as a white, tasteless powder.",
      uses: [
        "Easier to digest than whole stem preparations",
        "Particularly useful for children and the elderly",
        "Used in fevers, especially when digestive fire is low",
        "Soothes burning sensations and inflammation"
      ],
      position: { x: 65, y: 45 }
    }
  ]
};

const PlantDetail3DViewer = ({ plantId, modelPath, imageUrl }: PlantDetail3DViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRotating, setIsRotating] = useState(true); // Auto-rotate by default
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedPart, setSelectedPart] = useState<PlantPartInfo | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'standard' | 'ar' | 'vr'>('standard');
  
  // Get the plant parts for the current plant
  const currentPlantParts = plantPartsData[plantId] || [];

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
            <div className="absolute top-4 left-4 bg-yellow-500/80 text-black px-3 py-1 rounded-md text-sm backdrop-blur-sm">
              Interactive 3D Model
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
