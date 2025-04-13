
import React from 'react';
import { Sun, Moon, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface PlantControlsProps {
  plant: string;
  season: string;
  timeOfDay: string;
  growthSpeed: number;
  growthStage: number;
  onPlantChange: (value: string) => void;
  onSeasonChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onGrowthStageChange: (value: number[]) => void;
  onGrowthSpeedChange: (value: number[]) => void;
}

const PlantControls: React.FC<PlantControlsProps> = ({
  plant,
  season,
  timeOfDay,
  growthSpeed,
  growthStage,
  onPlantChange,
  onSeasonChange,
  onTimeChange,
  onGrowthStageChange,
  onGrowthSpeedChange,
}) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-garden-dark">
        Plant Controls
      </h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Plant</label>
          <Select defaultValue={plant} onValueChange={onPlantChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a plant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neem">Neem</SelectItem>
              <SelectItem value="tulsi">Tulsi (Holy Basil)</SelectItem>
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
              onClick={() => onSeasonChange("spring")}
            >
              Spring
            </Button>
            <Button 
              variant={season === "summer" ? "default" : "outline"}
              className={season === "summer" ? "bg-garden-primary" : ""} 
              onClick={() => onSeasonChange("summer")}
            >
              Summer
            </Button>
            <Button 
              variant={season === "autumn" ? "default" : "outline"}
              className={season === "autumn" ? "bg-garden-primary" : ""} 
              onClick={() => onSeasonChange("autumn")}
            >
              Autumn
            </Button>
            <Button 
              variant={season === "winter" ? "default" : "outline"}
              className={season === "winter" ? "bg-garden-primary" : ""} 
              onClick={() => onSeasonChange("winter")}
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
              onClick={() => onTimeChange("day")}
            >
              <Sun className="mr-2 h-4 w-4" /> Day
            </Button>
            <Button 
              variant={timeOfDay === "night" ? "default" : "outline"} 
              className={timeOfDay === "night" ? "bg-garden-primary" : ""}
              onClick={() => onTimeChange("night")}
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
              onValueChange={onGrowthStageChange}
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
              onValueChange={onGrowthSpeedChange}
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
  );
};

export default PlantControls;
